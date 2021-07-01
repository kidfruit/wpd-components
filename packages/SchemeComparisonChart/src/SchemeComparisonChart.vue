<template>
  <div class="scheme-comparison-chart" :key="schemeComparisonKey">
    <div class="scheme-comparison-single-chart">
      <div class="single-chart-switch">
        <a-select v-model="singleChartTargetIndex">
          <a-select-option
              v-for="(title, i) in singleChartTitles"
              :value="i"
              :key="i"
          >
            {{ title }}
          </a-select-option>
        </a-select>
      </div>
      <div class="single-chart-content">
        <Chart
            ref="singleChar"
            :classes="singleClassNames"
            :chartOption="singleChartOption"
            :chartAxis="singleChartAxis"
            :chartData="singleChartData"
            :id="singleChartId"
        />
      </div>
    </div>
    <div class="scheme-comparison-process-chart">
      <div class="process-chart-switch">
        <a-select v-model="processChartTargetIndex">
          <a-select-option
              v-for="(title, i) in processChartTitles"
              :value="i"
              :key="i"
          >
            {{ title }}
          </a-select-option>
        </a-select>
      </div>
      <div class="process-chart-content">
        <Chart
            ref="processChar"
            :classes="processClassNames"
            :chartOption="processChartOption"
            :chartAxis="processChartAxis"
            :chartData="processChartData"
            :id="processChartId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import lodash from 'lodash'
import Chart from '~/SeriesResult/src/chart'
export default {
  name: "SchemeComparisonChart",
  components: { Chart },
  props: {
    schemeComparisonData: {
      type: Array,
      required: true
    },
  },
  data: function () {
    return {
      schemeComparisonKey: +new Date() + (Math.random() * 1000).toFixed(0),
      singleClassNames: ['single-chart'],
      singleChartOption: {
        title: {
          text: '单值图',
          left: 'center'
        }
      },
      singleChartAxis: {
        xAxis: 'name',
        yAxis: [{
          type: 'value',
          axisLabel: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: '#40a9ff'
            },
            show: true,
            symbol: {
              0: "none",
              1: "arrow"
            }
          },
          axisTick: {
            show: true
          }
        }],
        series: [],
        legend: {
          top: 30
        }
      },
      singleChartAllData: [],
      singleChartData: [],
      singleChartFilterData: [],
      singleChartTargetIndex: 0,
      singleChartTitles: [],
      singleChartId: +new Date() + (Math.random() * 1000).toFixed(0),
      processClassNames: ['process-chart'],
      processChartOption: {
        title: {
          text: '过程图',
          left: 'center'
        }
      },
      processChartAxis: {
        xAxis: 'index',
        yAxis: [{
          type: 'value',
          axisLabel: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: '#40a9ff'
            },
            show: true,
            symbol: {
              0: "none",
              1: "arrow"
            }
          },
          axisTick: {
            show: true
          }
        }],
        series: [],
        legend: {
          top: 30
        }
      },
      processChartTargetIndex: 0,
      processChartAllData: [],
      processChartCurrentData: {},
      processChartData: [],
      processChartFilterData: [],
      processChartTitles: [],
      processChartId: +new Date() + (Math.random() * 1000).toFixed(0),
    }
  },
  watch: {
    singleChartTargetIndex: {
      immediate: true,
      deep: true,
      handler() {
        this.singleChartData = []
        this.singleChartAllData = []
        this.singleChartTitles = []
        this.singleChartAxis.series = []
        this.singleChartFilterData = []
        this.initSingleChartData()
        this.initSingleChartOptions()
        this.schemeComparisonKey = +new Date() + (Math.random() * 1000).toFixed(0)
      }
    },
    processChartTargetIndex: {
      immediate: true,
      deep: true,
      handler() {
        this.processChartData = []
        this.processChartAllData = []
        this.processChartCurrentData = {}
        this.processChartTitles = []
        this.processChartAxis.series = []
        this.processChartFilterData = []
        this.initProcessChartData()
        this.initProcessChartOptions()
        this.schemeComparisonKey = +new Date() + (Math.random() * 1000).toFixed(0)
      }
    }
  },
  methods: {
    initSingleChartData() {
      // 可能多方案对比
      this.schemeComparisonData.forEach((item, index) => {
        const singleData = item.value.single
        const singleChartData = []
        if (singleData !== undefined) {
          singleData.forEach(i => {
            // 排除不是数字的single数据
            if (typeof i.value === 'number') {
              singleChartData.push({
                [`singleValue${index}`]: i.value,
                name: i.name,
                key: i.key
              })
            }
          })
          this.singleChartFilterData.push(singleChartData)
        }
      })

      let tempData = []
      for (let i = 0; i < this.singleChartFilterData.length; i++) {
        if (i === 0) {
          this.singleChartFilterData[i].forEach(j => {
            tempData.push(lodash.merge({}, j))
          })
        } else if (i === this.singleChartFilterData.length - 1) {
          this.singleChartFilterData[i].forEach(m => {
            tempData.forEach(n => {
              if (m.key === n.key) {
                this.singleChartAllData.push(lodash.merge(m, n))
              }
            })
          })
        } else {
          this.singleChartFilterData[i].forEach(m => {
            tempData.forEach(n => {
              if (m.key === n.key) {
                tempData.push(lodash.merge(m, n))
              }
            })
          })
        }
      }
      this.singleChartAllData = lodash.uniq(this.singleChartAllData)

      // selectTitle
      this.singleChartAllData.forEach(item => {
        this.singleChartTitles.push(item.name)
      })

      this.singleChartData = [this.singleChartAllData[this.singleChartTargetIndex]]
    },
    initSingleChartOptions() {
      this.schemeComparisonData.forEach((item, index) => {
        if (this.singleChartData[0][`singleValue${index}`] !== undefined) {
          this.singleChartAxis.series.push({
            field: `singleValue${index}`,
            title: item.schemeName,
            selected: true,
            type: 'bar'
          })
        }
      })
    },
    initProcessChartData() {
      this.schemeComparisonData.forEach((item, index) => {
        const processData = item.value.process
        const processChartData = []
        if (processData !== undefined) {
          processData.forEach(i => {
            processChartData.push({
              [`processValue${index}`]: i.value,
              name: i.name,
              id: i.id,
              unit: i.unit
            })
          })
          this.processChartFilterData.push(processChartData)
        }
      })

      let tempData = []
      for (let i = 0; i < this.processChartFilterData.length; i++) {
        if (i === 0) {
          this.processChartFilterData[i].forEach(j => {
            tempData.push(lodash.merge({}, j))
          })
        } else if (i === this.processChartFilterData.length - 1) {
          this.processChartFilterData[i].forEach(m => {
            tempData.forEach(n => {
              if (m.id === n.id) {
                this.processChartAllData.push(lodash.merge(m, n))
              }
            })
          })
        } else {
          this.processChartFilterData[i].forEach(m => {
            tempData.forEach(n => {
              if (m.id === n.id) {
                tempData.push(lodash.merge(m, n))
              }
            })
          })
        }
      }
      this.processChartAllData = lodash.uniq(this.processChartAllData)


      this.processChartAllData.forEach(item => {
        this.processChartTitles.push(item.name + '（' + item.unit + ')')
      })
      this.processChartCurrentData = this.processChartAllData[this.processChartTargetIndex]
      // console.log(this.processChartCurrentData)

      let tempLength = []
      for (let i = 0; i < this.schemeComparisonData.length; i++) {
        if (this.processChartCurrentData[`processValue${i}`]) {
          tempLength.push(this.processChartCurrentData[`processValue${i}`].length)
        }
      }
      let minLength = Math.min(...tempLength)


      for (let i = 0; i < minLength; i++) {
        let temp = {}
        for (let j = 0; j < this.schemeComparisonData.length; j++) {
          if (this.processChartCurrentData[`processValue${j}`]) {
            temp[`processValue${j}`] = this.processChartCurrentData[`processValue${j}`][i]
          }
        }
        this.processChartData.push(
          lodash.merge({
            id: this.processChartCurrentData.id,
            name: this.processChartCurrentData.name,
            unit: this.processChartCurrentData.unit,
            index: i + 1
          }, temp)
        )
      }

      // eslint-disable-next-line no-debugger
      // debugger
      // console.log(this.processChartData)
    },
    initProcessChartOptions() {
      this.schemeComparisonData.forEach((item, index) => {
        if (this.processChartData[0][`processValue${index}`] !== undefined) {
          this.processChartAxis.series.push({
            field: `processValue${index}`,
            title: item.schemeName,
            selected: true,
            type: 'line'
          })
        }
      })
    },
    updateChart() {
      this.singleChartTargetIndex = 0
      this.processChartTargetIndex = 0
    }
  }
}
</script>

<style lang="less" scoped>
.scheme-comparison-chart {
  width: 100%;
  .scheme-comparison-single-chart {
    width: 100%;
    float: left;
    .single-chart-switch {
      margin-bottom: 10px;
    }
  }
  .scheme-comparison-process-chart {
    width: 100%;
    float: left;
    .process-chart-switch {
      margin-bottom: 10px;
    }
  }
}
.ant-select {
  width: 200px;
}
</style>