<template>
  <div class="ManyChart">
    <div>
      <div ref="chartRef"
           class="chartRef"
           v-for=" item in finaldata"
           :key="item.key"
           :class="classNames"
           :id="item.key"></div>
    </div>
  </div>

</template>
<script>
import * as echarts from 'echarts'
const defaultOption = {
  title: {
    text: '',
  },
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    bottom: 50,
  },
  legend: {
    data: [],
    selected: {},
    left: 'center',
    top: '30',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
  },
  yAxis: [],
  series: [],
}

const yAxisOption = {
  type: 'value',
  splitNumber: 5,
  axisLine: { show: true },
  splitLine: {
    show: true,
    lineStyle: {
      color: ['#eee'],
    },
  },
  splitArea: {
    show: true,
    areaStyle: {
      color: ['#fafafa'],
    },
  },
  max: function (value) {
    return value.max + (value.max - value.min) * 0.15
  },
  min: function (value) {
    let minV = value.min - (value.max - value.min) * 0.15
    return minV >= 0 ? minV : 0
  },
}
let echartsInstance = null
export default {
  name: 'ManyChart',
  props: {
    isVisible: {
      type: Boolean,
      default: true,
      required: false,
    },
    isRefresh: {
      type: Boolean,
      default: true,
      required: false,
    },
    classes: {
      type: Array,
      required: false,
    },
    theme: {
      type: String,
      default: 'macarons',
      required: false,
    },
    chartOption: {
      type: Object,
      required: false,
    },
    chartAxis: {
      type: Object,
    },
    chartData: {
      type: Array,
    },
    chartDatas: {
      type: Array,
    },
    sections: {
      type: Array,
    },
    id: {
      type: String,
      default: 'standard-chart',
    },
  },
  components: {
    // VChart,
  },
  created() {
    this.dataprocessing()
  },
  beforeMount() {},
  mounted() {
    this.drawChart()
    // this.getChartInstance();
    // window.addEventListener("resize", this.resizeTheChart);
  },
  data() {
    return {
      chartcontent: [],
      chartlist: [],
      finaldata: [],
      instance: null,
      programmedata: {
        // key: '',
        // option: {
        //   title: {
        //     text: '',
        //   },
        //   tooltip: {
        //     trigger: 'axis',
        //   },
        //   legend: {
        //     data: [],
        //   },
        //   grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true,
        //   },
        //   toolbox: {
        //     feature: {
        //       saveAsImage: {},
        //     },
        //   },
        //   xAxis: {
        //     type: 'category',
        //     boundaryGap: false,
        //     data: [],
        //   },
        //   yAxis: {
        //     name: '',
        //     type: 'value',
        //   },
        //   series: [],
        // },
      },
    }
  },
  computed: {
    classNames() {
      return ['chart'].concat(this.classes)
    },
    // option() {
    //   return this.prepareSeries();
    // },
  },
  methods: {
    optiondata() {
      this.programmedata = {
        key: '',
        option: {
          title: {
            text: '',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: [],
          },
          grid: {
            left: '25px',
            right: '30px',
            bottom: '3%',
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLabel: {
              //   interval: 0,
              //   rotate: 90,
            },
          },
          yAxis: {
            name: '',
            type: 'value',
          },
        //   dataZoom: [
        //     {
        //       type: 'inside',
        //       start: 0,
        //       end: 10,
        //     },
        //     {
        //       start: 0,
        //       end: 10,
        //     },
        //   ],
          series: [],
        },
      }
    },
    dataprocessing() {
      //找到有多少个不重复的图表chartlist
      //   console.log('初始数据',this.chartDatas)
      let contentlist = []
      let data = []
      if (this.chartDatas.length > 0) {
        for (let i = 0; i < this.chartDatas.length; i++) {
          if (this.chartDatas[i].value.length > 0) {
            for (let j = 0; j < this.chartDatas[i].value.length; j++) {
              if (this.chartDatas[i].value[j].value.process.length > 0) {
                let contentdata = this.chartDatas[i].value[j].value.process.map(
                  (item) => {
                    return {
                      programme: this.chartDatas[i].value[j].title, //方案标题
                      title: item.title, //标题
                      timeList: this.chartDatas[i].value[j].value.timeList, //横坐标
                      key: item.key,
                      showType: item.showType,
                      value: item.value, //纵坐标
                    }
                  }
                )
                contentlist = Array.from(
                  new Set([...contentlist, ...contentdata])
                )

                let temporarydata = this.chartDatas[i].value[
                  j
                ].value.process.map((item) => {
                  return item.key
                })
                data = Array.from(new Set([...data, ...temporarydata]))
                this.chartlist = data
                this.chartcontent = contentlist
              }
            }
          }
        }
        this.initializationdata()
      }
    },
    initializationdata() {
      //初始化数据
      if (this.chartlist.length > 0 && this.chartcontent.length > 0) {
        for (let i = 0; i < this.chartlist.length; i++) {
          this.optiondata()
          this.programmedata.key = this.chartlist[i]
          for (let j = 0; j < this.chartcontent.length; j++) {
            if (this.chartlist[i] == this.chartcontent[j].key) {
              this.programmedata.option.title.text = this.chartcontent[j].title

              this.programmedata.option.legend.data.push(
                this.chartcontent[j].programme
              )
              //   this.programmedata.option.xAxis.data.push(
              //     this.chartcontent[j].timeList
              //   )
              this.programmedata.option.xAxis.data = this.chartcontent[
                j
              ].timeList

              this.programmedata.option.series.push({
                name: this.chartcontent[j].programme,
                type: 'line',
                data: this.chartcontent[j].value,
                smooth: true,
              })
            }
          }
          this.finaldata.push(this.programmedata)
        }
      }
    //   console.log(this.finaldata, '0.0.00.0')
    },
    drawChart() {
      console.log(this.finaldata, '45454545445')
      for (let i = 0; i < this.finaldata.length; i++) {
        echartsInstance = echarts.init(
          document.getElementById(this.finaldata[i].key)
        )
        this.setDynamicOption(this.finaldata[i])
        //   let myChart = echarts.getInstanceByDom(document.getElementById(this.id))
        //   if (myChart == null) {
        //     // 如果不存在，就进行初始化
        //     echartsInstance = echarts.init(document.getElementById(this.id))
        //     this.setDynamicOption()
        //   }
      }
    },
    getChartInstance() {
      if (this.$refs.chartRef) {
        this.instance = this.$refs.chartRef
      }
    },
    clear() {
      echartsInstance.clear()
    },
    setDynamicOption(data) {
      console.log(data)
      let option = data.option
      echartsInstance.setOption(option)
    },
    resizeTheChart() {
      if (this.$refs && this.$refs.chartRef) {
        echartsInstance.resize()
      }
    },
    prepareSeries() {
      let option = Object.assign({}, defaultOption, this.chartOption)
      //x轴
      option.xAxis.data = this.chartData.map((cd) => cd[this.chartAxis.xAxis])
      // console.log(option.xAxis.data);
      if (this.chartAxis.timeSeries) {
        option.xAxis.data = this.sortTime(option.xAxis.data)
      }
      if (option.timeline) {
        option.xAxis.data = this.sections
      }
      if (Array.isArray(option.grid) && option.grid.length > 0) {
        option.xAxis = this.chartAxis.xAxis
      }

      //y轴
      //按照yAxisIndex排序
      if (
        Object.prototype.hasOwnProperty.call(
          this.chartAxis.yAxis[0],
          'yAxisIndex'
        )
      ) {
        this.chartAxis.yAxis = this.chartAxis.yAxis.sort((a, b) => {
          return a['yAxisIndex'] - b['yAxisIndex']
        })
      }

      option.yAxis = this.chartAxis.yAxis.map((ax) => {
        return Object.assign({}, yAxisOption, {
          name: ax.title,
          gridIndex: ax.gridIndex,
          position: ax.position,
          axisLabel: ax.axisLabel,
          axisLine: ax.axisLine,
          max: ax.max,
          min: ax.min,
        })
      })
      // 如果legend存在并且是个数组，就不会走这个逻辑
      if (!this.chartOption.legend) {
        //legend
        this.chartAxis.series.forEach((yx) => {
          option.legend.data.push(yx.title)
          option.legend.selected[
            yx.title
          ] = Object.prototype.hasOwnProperty.call(yx, 'selected')
            ? yx.selected
            : true
        })
      }

      //data
      this.chartData = this.chartData.sort((a, b) => {
        let timeField = this.chartAxis.xAxis
        return (
          new Date(a[timeField]).getTime() - new Date(b[timeField]).getTime()
        )
      })
      option.series = []
      this.chartAxis.series.forEach((yax) => {
        let seriesObj = {
          name: yax.title,
          type: 'line',
          data: [],
          yAxisIndex: yax.yAxisIndex,
          xAxisIndex: yax.xAxisIndex,
          smooth: yax.smooth,
          id: yax.id,
          symbolSize: yax.symbolSize,
          lineStyle: yax.lineStyle,
          markLine: yax.markLine,
          color: yax.color,
          itemStyle: yax.itemStyle,
        }
        seriesObj.data = this.chartData.map((cd) => cd[yax.field])
        option.series.push(seriesObj)
      })
      if (!option.timeline) {
        console.log('option', option)
        return {
          baseOption: option,
        }
      } else {
        // 带有时间线的chart
        let options = []
        let fields = this.chartAxis.series.map((el) => el.field)
        this.chartData.forEach((cd, index) => {
          let series = []
          fields.forEach((item) => {
            if (cd[item]) {
              series.push({ data: cd[item] })
            }
          })
          options.push({
            series,
            title: {
              text: `${this.chartOption.title.text}    ${this.chartOption.timeline.data[index]}`,
            },
          })
        })
        return {
          baseOption: option,
          options,
        }
      }
    },
    sortTime(timeList) {
      return timeList.sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime()
      })
    },
  },
  beforeDestroy() {
    echarts.dispose(echartsInstance)
    window.removeEventListener('resize', this.resizeTheChart)
  },
}
</script>
<style>
.chartRef {
  margin-top: 10px;
  margin-left: 10px;
  background-color: #ccc;
  float: left;
}
.chart {
  width: 100%;
  height: 300px;
}
.ManyChart {
  text-align: cente;
}
</style>
