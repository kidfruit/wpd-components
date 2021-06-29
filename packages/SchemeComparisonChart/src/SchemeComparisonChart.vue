<template>
  <div class="scheme-comparison-chart">
    <div class="scheme-comparison-single-chart">
      <Chart
        ref="singleChar"
        :classes="singleClassNames"
        :chartOption="singleChartOption"
        :chartAxis="singleChartAxis"
        :chartData="singleChartData"
        :id="singleChartId"
      />
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
            :key="processChartKey"
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
      singleClassNames: ['single-chart'],
      singleChartOption: {
        title: {
          text: '单值图',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            let list = []
            params.map((i) => {
              i.key = this.singleChartData[i.dataIndex]
              if (
                  !list.find(
                      (j) => i.value === j.value && i.seriesName === j.seriesName
                  )
              ) {

                list.push(i)
              }
            })
            return list
                .map((item) => {
                  if (item.value === null || item.value === '-') return ''
                  else
                    return (
                        item.marker +
                        item.key.name +
                        `<b style="margin-left:5px;">${item.value}</b>`
                    )
                })
                .filter((i) => i)
                .join('<br />')
          }
        }
      },
      singleChartAxis: {
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
        series: [
          {
            field: 'singleValue1',
            title: this.schemeComparisonData[0].schemeName,
            selected: true,
            type: 'bar'
          },
          {
            field: 'singleValue2',
            title: this.schemeComparisonData[1].schemeName,
            selected: true,
            type: 'bar'
          }
        ],
        legend: {
          top: 30
        }
      },
      singleChartData: [
        //  数据结构
        // {index: 0, singleValue1: 2500, singleValue2: 46, name: '水库出库最大值',  key: 'outQMax',}
      ],
      singleChartId: +new Date() + (Math.random() * 1000).toFixed(0),
      processClassNames: ['process-chart'],
      processChartOption: {
        title: {
          text: '过程图',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            let list = []
            params.map((i) => {
              if (
                  !list.find(
                      (j) => i.value === j.value && i.seriesName === j.seriesName
                  )
              ) {
                list.push(i)
              }
            })
            return list
                .map((item) => {
                  if (item.value === null || item.value === '-') return ''
                  else
                    return (
                        item.marker +
                        this.processChartTitles[this.processChartTargetIndex] +
                        `<b style="margin-left:10px;">${item.value}</b>`
                    )
                })
                .filter((i) => i)
                .join('<br />')
          }
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
        series: [
          {
            field: 'processValue1',
            title: this.schemeComparisonData[0].schemeName,
            selected: true,
            type: 'line'
          },
          {
            field: 'processValue2',
            title: this.schemeComparisonData[1].schemeName,
            selected: true,
            type: 'line'
          }
        ],
        legend: {
          top: 30
        }
      },
      processChartTargetIndex: 0,
      processChartAllData: [],
      processChartCurrentData: {},
      processChartData: [],
      processChartTitles: [],
      processChartId: +new Date() + (Math.random() * 1000).toFixed(0),
      processChartKey: +new Date() + (Math.random() * 1000).toFixed(0)
    }
  },
  created() {
    // 单值数据预处理
    this.initSingleChart()

    // 过程数据预处理
    this.initProcessChart()
  },
  watch: {
    processChartTargetIndex: {
      immediate: true,
      deep: true,
      handler() {
        this.processChartData = []
        this.processChartAllData = []
        this.processChartCurrentData = {}
        this.processChartTitles = []
        this.initProcessChart()
        this.processChartKey = +new Date() + (Math.random() * 1000).toFixed(0)
      }
    }
  },
  methods: {
    initSingleChart() {
      const singleData1 = this.schemeComparisonData[0].value.single
      const singleData2 = this.schemeComparisonData[1].value.single
      const singleChartData1 = []
      const singleChartData2 = []
      singleData1.forEach(item => {
        if (typeof item.value === 'number') {
          singleChartData1.push({
            index: singleChartData1.length + 1,
            singleValue1: item.value,
            name: item.name,
            key: item.key
          })
        }
      })
      // console.log(singleChartData1)
      singleData2.forEach(item => {
        if (typeof item.value === 'number') {
          singleChartData2.push({
            index: singleChartData2.length + 1,
            singleValue2: item.value,
            name: item.name,
            key: item.key
          })
        }
      })
      // console.log(singleChartData2)
      singleChartData1.forEach(i => {
        singleChartData2.forEach(j => {
          if (i.key === j.key) {
            this.singleChartData.push(lodash.merge(i, j))
          }
        })
      })
      // console.log(this.singleChartData)
    },
    initProcessChart() {
      const processData1 = this.schemeComparisonData[0].value.process
      const processData2 = this.schemeComparisonData[1].value.process
      const processChartData1 = []
      const processChartData2 = []
      processData1.forEach(item => {
        processChartData1.push({
          processValue1: item.value,
          name: item.name,
          id: item.id,
          unit: item.unit
        })
      })
      processData2.forEach(item => {
        processChartData2.push({
          processValue2: item.value,
          name: item.name,
          id: item.id,
          unit: item.unit
        })
      })
      processChartData1.forEach(i => {
        processChartData2.forEach(j => {
          if (i.id === j.id) {
            this.processChartAllData.push(lodash.merge(i, j))
          }
        })
      })
      // console.log(this.processChartAllData)
      this.processChartAllData.forEach(item => {
        this.processChartTitles.push(item.name + '（' + item.unit + ')')
      })
      this.processChartCurrentData = this.processChartAllData[this.processChartTargetIndex]
      // console.log(this.processChartCurrentData)

      if (this.processChartCurrentData.processValue1.length < this.processChartCurrentData.processValue2.length) {
        for (let i = 0; i < this.processChartCurrentData.processValue1.length; i++) {
          this.processChartData.push({
            id: this.processChartCurrentData.id,
            name: this.processChartCurrentData.name,
            unit: this.processChartCurrentData.unit,
            processValue1: this.processChartCurrentData.processValue1[i],
            processValue2: this.processChartCurrentData.processValue2[i],
            index: i + 1
          })
        }
      } else {
        for (let i = 0; i < this.processChartCurrentData.processValue2.length; i++) {
          this.processChartData.push({
            id: this.processChartCurrentData.id,
            name: this.processChartCurrentData.name,
            unit: this.processChartCurrentData.unit,
            processValue1: this.processChartCurrentData.processValue1[i],
            processValue2: this.processChartCurrentData.processValue2[i],
            index: i + 1
          })
        }
      }

      // console.log(this.processChartData)
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