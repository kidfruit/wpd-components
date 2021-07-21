<template>
  <div
    :class="classNames"
    :style="seriesQZStyle"
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
        <div class="z">
          <span class="max-z">最高水位：{{maxZ}}</span>
          <span class="min-z">最低水位：{{minZ}}</span>
        </div>
        <div class="q" v-if="shuiWenShow">
          <span class="max-q">最高流量：{{maxQ}}</span>
          <span class="min-q">最低流量：{{minQ}}</span>
        </div>
        <div class="in-q" v-if="shuiKuShow">
          <span class="max-in-q">最大入库流量：{{maxInQ}}</span>
          <span class="min-in-q">最小入库流量：{{minInQ}}</span>
        </div>
        <div class="out-q" v-if="shuiKuShow">
          <span class="max-out-q">最大出库流量：{{maxOutQ}}</span>
          <span class="min-out-q">最小出库流量：{{minOutQ}}</span>
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
import moment from "moment";
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
      zArr: [],
      qArr: [],
      inQArr: [],
      outQArr: [],
      maxZ: '',
      minZ: '',
      maxQ: '',
      minQ: '',
      maxInQ: '',
      minInQ: '',
      maxOutQ: '',
      minOutQ: '',
      shuiWenShow: true,
      shuiKuShow: false
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
        item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
        this.singleData.forEach(element => {
          item[element.field] = element.value
        })
      })
      this.newData = this.tableData

      // 构造series
      const tempSeries = []
      this.chartAxis.series = []
      this.tableColumns.forEach((item, index) => {
        if (index > 0) {
          if (item.field === 'z') {
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

      // 构造legend
      const legendData = []
      const legendSelected = {}
      this.chartAxis.series.forEach(item => {
        legendData.push(item.title)
        if (Object.keys(legendSelected).includes(item.title)) return
        legendSelected[item.title] = item.selected
      })
      this.chartOption.legend.data = legendData
      this.chartOption.legend.selected = legendSelected

      // 构造tooltip (有bug)
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
      if (Object.keys(this.tableData[0]).includes('q')) {
        this.shuiKuShow = false
        this.shuiWenShow = true

        this.zArr = []
        this.qArr = []
        this.tableData.forEach(item => {
          if (item.z !== null) {
            this.zArr.push(item.z)
          }
          if (item.q !== null) {
            this.qArr.push((item.q))
          }
        })
        const maxZ = Math.max(...this.zArr)
        const minZ = Math.min(...this.zArr)
        const maxQ = Math.max(...this.qArr)
        const minQ = Math.min(...this.qArr)
        const maxZIndex = this.zArr.findIndex(element => element === maxZ)
        const minZIndex = this.zArr.findIndex(element => element === minZ)
        const maxQIndex = this.qArr.findIndex(element => element === maxQ)
        const minQIndex = this.qArr.findIndex(element => element === minQ)
        this.maxZ = `${maxZ} (${moment(this.tableData[maxZIndex].time).format('YYYY-MM-DD HH:mm:ss')})`
        this.minZ = `${minZ} (${moment(this.tableData[minZIndex].time).format('YYYY-MM-DD HH:mm:ss')})`
        this.maxQ = `${maxQ} (${moment(this.tableData[maxQIndex].time).format('YYYY-MM-DD HH:mm:ss')})`
        this.minQ = `${minQ} (${moment(this.tableData[minQIndex].time).format('YYYY-MM-DD HH:mm:ss')})`
      } else {
        this.shuiKuShow = true
        this.shuiWenShow = false

        this.zArr = []
        this.inQArr = []
        this.outQArr = []
        this.tableData.forEach(item => {
          if (item.z !== null) {
            this.zArr.push(item.z)
          }
          if (item.inq !== null) {
            this.inQArr.push(item.inq)
          }
          if (item.outq !== null) {
            this.outQArr.push(item.outq)
          }
        })
        const maxZ = Math.max(...this.zArr)
        const minZ = Math.min(...this.zArr)
        const maxInQ = Math.max(...this.inQArr)
        const minInQ = Math.min(...this.inQArr)
        const maxOutQ = Math.max(...this.outQArr)
        const minOutQ = Math.min(...this.outQArr)
        const maxZIndex = this.zArr.findIndex(element => element === maxZ)
        const minZIndex = this.zArr.findIndex(element => element === minZ)
        const maxInQIndex = this.inQArr.findIndex(element => element === maxInQ)
        const minInQIndex = this.inQArr.findIndex(element => element === minInQ)
        const maxOutQIndex = this.outQArr.findIndex(element => element === maxOutQ)
        const minOutQIndex = this.outQArr.findIndex(element => element === minOutQ)
        this.maxZ = `${maxZ} (${moment(this.tableData[maxZIndex].time).format('YYYY-MM-DD HH:mm:ss')})`
        this.minZ = `${minZ} (${moment(this.tableData[minZIndex].time).format('YYYY-MM-DD HH:mm:ss')})`
        this.maxInQ = `${maxInQ} (${moment(this.tableData[maxInQIndex].time).format('YYYY-MM-DD HH:mm:ss')})`
        this.minInQ = `${minInQ} (${moment(this.tableData[minInQIndex].time).format('YYYY-MM-DD HH:mm:ss')})`
        this.maxOutQ = `${maxOutQ} (${moment(this.tableData[maxOutQIndex].time).format('YYYY-MM-DD HH:mm:ss')})`
        this.minOutQ = `${minOutQ} (${moment(this.tableData[minOutQIndex].time).format('YYYY-MM-DD HH:mm:ss')})`
      }

    },
    cellEditDone(value) {
      console.log(value)
      const { field, newValue, oldValue, rowIndex } = value
      // this.$set(this.data[rowIndex], field, +newValue)
      this.newData[rowIndex][field] = +newValue
      this.$refs.tableRef.reset()
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
      .z,
      .q,
      .in-q,
      .out-q {
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
      .max-z,
      .max-q,
      .max-in-q,
      .max-out-q {
        text-align: left;
        line-height: 25px;
        float: left;
      }
      .min-z,
      .min-q,
      .min-in-q,
      .min-out-q {
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
      .z,
      .q,
      .in-q,
      .out-q {
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
      .max-z,
      .max-q,
      .max-in-q,
      .max-out-q {
        text-align: left;
        line-height: 25px;
        float: left;
      }
      .min-z,
      .min-q,
      .min-in-q,
      .min-out-q {
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
