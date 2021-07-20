<template>
  <div
    :class="classNames"
    :style="seriesQZStyle"
    :key="randomKey"
  >
    <div class="chart-container">
      <standard-chart
          ref="chartRef"
          :classes="['result-hydro-dynamic']"
          :splitIndex="splitIndex"
          :chartOption="chartOption"
          :chartAxis="chartAxis"
          :chartData="newData"
          :id="id"
      />
      <div class="chart-des">
        <div class="water-lever">
          <span class="max-water-level">最高水位：{{maxWaterLevel}}</span>
          <span class="min-water-level">最低水位：{{minWaterLevel}}</span>
        </div>
        <div class="incoming-flow">
          <span class="max-incoming-flow">最大入库流量：{{maxIncomingFlow}}</span>
          <span class="min-incoming-flow">最小入库流量：{{minIncomingFlow}}</span>
        </div>
      </div>
    </div>
    <div class="table-container">
      <simple-table
          class="simple-table"
          ref="tableRef"
          :tableData="tableData"
          :tableColumns="tableColumns"
          :splitIndex="splitIndex"
          :setting="setting"
          @cellEditDone="cellEditDone"
      ></simple-table>
    </div>
  </div>
</template>

<script>
import StandardChart from "../../StandardChart/src/StandardChart.vue";
import SimpleTable from "../../SimpleTable/src/SimpleTable.vue";

const defaultChartAxis =  {
  xAxis: "time",
  timeSeries: true,
  yAxis: [
    {
      title: "水位(m)",
      yAxisIndex: 0
    },
    {
      title: "流量(m³/s)",
      yAxisIndex: 1
    }
  ],
  series: []
}

const defaultChartOption = {
  legend: {
    top: 0
  },
  dataZoom: [{
    show: true
  }]
}

export default {
  name: 'SeriesQZ',
  components: {
    StandardChart,
    SimpleTable,
  },
  props: {
    classes: {
      type: Array,
      required: false,
    },
    chartAxis: {
      type: Object,
    },
    setting: {
      type: Object,
    },
    chartOption: {
      type: Object,
      required: false,
    },
    tableColumns: {
      type: Array
    },
    tableData: {
      type: Array
    },
    singleData: {
      type: Array
    },
    splitIndex: {
      type: Number
    },
    structure: {
      type: String,
      default: 'leftright'
    },
    seriesQZStyle: {
      type: Object
    }
  },
  data() {
    return {
      newData: [],
      randomKey: +new Date() + (Math.random() * 1000).toFixed(0),
      waterLevelArr: [],
      maxWaterLevel: '',
      minWaterLevel: '',
      incomingFlowArr: [],
      maxIncomingFlow: '',
      minIncomingFlow: ''
    };
  },
  created() {
    this.handleData();
  },
  computed: {
    classNames() {
      return ["series-qz", this.structure].concat(this.classes);
    },
    id() {
      return 'series-qz-' + this.randomKey
    }
  },
  methods: {
    handleData() {
      this.chartAxis = Object.assign(this.chartAxis, defaultChartAxis)
      this.chartOption = Object.assign(this.chartOption, defaultChartOption)

      // 构造newData
      this.newData = []
      this.tableData.forEach(item => {
        this.singleData.forEach(element => {
          item[element.field] = element.value
        })
      })
      this.newData = this.tableData

      // 构造series
      const tempSeries = []
      this.chartAxis.series = []
      this.tableColumns.forEach((item, index) => {
        if (index > 1) {
          if (item.field === 'RD_RR_UPZ_P') {
            tempSeries.push({
              title: item.title,
              field: item.field,
              selected: true,
              yAxisIndex: 0
            })
          } else {
            tempSeries.push({
              title: item.title,
              field: item.field,
              selected: true,
              yAxisIndex: 1
            })
          }
        }
      })
      this.singleData.forEach(item => {
        tempSeries.push({
          title: item.title,
          field: item.field,
          selected: false,
          yAxisIndex: 0
        })
      })
      // series 有splitIndex，前面为实线，后面为虚线
      let tempTime = ''
      if (this.splitIndex) {
        tempTime = this.newData[this.splitIndex].time
      }
      if (tempTime !== '') {
        const list = tempSeries.map(el => ({
          type: el.echartstype,
          areaStyle: el.areaStyle,
          color: el.color,
          step: el.step,
          field: el.field,
          title: el.title,
          smooth:el.smooth,
          selected: el.selected,
          yAxisIndex: el.yAxisIndex,
          markLine: el.echartstype !== 'bar' ? {
            symbol: 'none',
            data: [{
              name: '标记线',
              xAxis: tempTime,
              lineStyle: {
                //警戒线的样式  ，虚实  颜色
                type: 'dash',
                color: '#000'
              }
            }],
            label: { show: true, position: 'end' },
            silent: true
          } : null,
        }))

        const listYAxisIndexArray = []
        list.forEach(item => {
          listYAxisIndexArray.push(item.yAxisIndex)
        })
        if (!listYAxisIndexArray.includes(0)) {
          list.forEach(item => {
            item.yAxisIndex = 0
          })
        }

        let allList = []
        for (let i = 0; i < list.length; i++) {
          allList.push(list[i])
          if (list[i].type !== 'bar') {//如果为柱状图则不需要实现虚线
            let obj = Object.assign({}, list[i], {
              // smooth: true, //关键点，为true是不支持虚线，实线就用true
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 2,
                    type: 'dotted', //'dotted'虚线 'solid'实线
                  },
                },
              },
            })
            allList.push(obj)
          }
        }
        this.chartAxis.series = allList
      } else {
        this.chartAxis.series = tempSeries.map(el => ({
          field: el.field,
          title: el.title,
          selected: el.selected,
          yAxisIndex: el.yAxisIndex,
        }))
      }

      // 构造tooltip
      this.chartOption.tooltip = {
        trigger: "axis",
        formatter: (params) => {
          let paramsNameArr = []
          params.forEach(item => paramsNameArr.push(item.seriesName))
          paramsNameArr = [...new Set(paramsNameArr)]
          const tempParamsArr = []
          const tempParams = []
          paramsNameArr.forEach((item) => {
            params.forEach(el => {
              if (tempParamsArr.includes(item)) {
                return
              }
              if (item === el.seriesName) {
                tempParamsArr.push(item)
                tempParams.push(el)
              }
            })
          })
          tempParams.forEach(el => {
            this.chartAxis.series.forEach(item => {
              if (el.seriesName === item.title) {
                el.value = this.tableData[el.dataIndex][item.field]
              }
            })
          })
          params = tempParams

          var htmlStr =
              '<div style="height: auto;overflow-y: hidden;"><p style="color: #666;font-weight:700;font-size:14px;">' +
              params[0].axisValue +
              "</p>";
          let arr = params.filter((el) => el.value !== null);
          arr = arr.sort((a, b) => b.value - a.value);
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].value !== null) {
              htmlStr +=
                  '<div style="display:flex;justify-content:space-between;"><p style="color: #000;textAlign:left;">' +
                  arr[i].marker +
                  arr[i].seriesName +
                  ":&nbsp;&nbsp;" +
                  "<span>" +
                  arr[i].value +
                  "</span>" +
                  "</p></div>";
            }
          }
          htmlStr += "</div>";
          return htmlStr;
        },
        extraCssText: "box-shadow: 0 0 3px rgba(150,150,150, 0.7);",
        textStyle: {
          fontSize: 14,
          color: "#000"
        }
      }

      // 构造chart-des
      this.waterLevelArr = []
      this.incomingFlowArr = []
      this.tableData.forEach(item => {
        this.waterLevelArr.push(item.RD_RR_UPZ_P)
        this.incomingFlowArr.push((item.RD_RR_AVGINQ_P))
      })
      const maxWaterLevel = Math.max(...this.waterLevelArr)
      const minWaterLevel = Math.min(...this.waterLevelArr)
      const maxIncomingFlow = Math.max(...this.incomingFlowArr)
      const minIncomingFlow = Math.min(...this.incomingFlowArr)
      const maxWaterLevelIndex = this.waterLevelArr.findIndex(element => element === maxWaterLevel)
      const minWaterLevelIndex = this.waterLevelArr.findIndex(element => element === minWaterLevel)
      const maxIncomingFlowIndex = this.incomingFlowArr.findIndex(element => element === maxIncomingFlow)
      const minIncomingFlowIndex = this.incomingFlowArr.findIndex(element => element === minIncomingFlow)
      this.maxWaterLevel = `${maxWaterLevel} (${this.tableData[maxWaterLevelIndex].time}})`
      this.minWaterLevel = `${minWaterLevel} (${this.tableData[minWaterLevelIndex].time})`
      this.maxIncomingFlow = `${maxIncomingFlow} (${this.tableData[maxIncomingFlowIndex].time})`
      this.minIncomingFlow = `${minIncomingFlow} (${this.tableData[minIncomingFlowIndex].time})`

    },
    cellEditDone(value) {
      console.log(value)
      const { field, newValue, oldValue, rowIndex } = value
      // this.$set(this.data[rowIndex], field, +newValue)
      this.newData[rowIndex][field] = +newValue
      this.$refs.tableRef.reset()
    },
    update() {
      this.randomKey = +new Date() + (Math.random() * 1000).toFixed(0)
    }
  }
};
</script>

<style lang="scss" scoped>
.series-qz.leftright {
  display: flex;
  flex-direction: row;
  .chart-container,
  .table-container {
    width: 50%;
    height: 100%;
  }
  .chart-container {
    .result-hydro-dynamic {
      height: calc(100% - 50px) !important;
    }
    .chart-des {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 50px;
      padding: 0 20px;
      .water-lever,
      .incoming-flow {
        display: flex;
        align-items: center;
        width: 100%;
        height: 25px;
        span {
          font-size: 14px;
          width: 50%;
          height: 25px;
        }
      }
      .max-incoming-flow,
      .max-water-level {
        text-align: left;
        line-height: 25px;
        float: left;
      }
      .min-incoming-flow,
      .min-water-level {
        text-align: right;
        line-height: 25px;
        float: right;
      }
    }
  }
  .table-container {
    .simple-table {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}
.series-qz.topbottom {
  display: flex;
  flex-direction: column;
  .chart-container {
    width: 100%;
    height: 75%;
    .result-hydro-dynamic {
      height: calc(100% - 50px) !important;
    }
    .chart-des {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 50px;
      padding: 0 50px;
      .water-lever,
      .incoming-flow {
        display: flex;
        align-items: center;
        width: 100%;
        height: 25px;
        span {
          font-size: 14px;
          width: 50%;
          height: 25px;
        }
      }
      .max-incoming-flow,
      .max-water-level {
        text-align: left;
        line-height: 25px;
        float: left;
      }
      .min-incoming-flow,
      .min-water-level {
        text-align: right;
        line-height: 25px;
        float: right;
      }
    }
  }
  .table-container {
    width: 100%;
    height: 25%;
    .simple-table {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}
</style>
