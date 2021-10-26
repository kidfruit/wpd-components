<template>
  <div class="ChartsSingle">
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
let echartsInstances = null
export default {
  name: 'ChartsSingle',
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
            //   saveAsImage: {},
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
                type: 'bar',
                data: this.chartcontent[j].value,
                smooth: true,
              })
            }
          }
          this.finaldata.push(this.programmedata)
        }
      }
    },
    drawChart() {
      for (let i = 0; i < this.finaldata.length; i++) {
        echartsInstances = echarts.init(
          document.getElementById(this.finaldata[i].key)
        )
        this.setDynamicOption(this.finaldata[i])
        //   let myChart = echarts.getInstanceByDom(document.getElementById(this.id))
        //   if (myChart == null) {
        //     // 如果不存在，就进行初始化
        //     echartsInstances = echarts.init(document.getElementById(this.id))
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
      echartsInstances.clear()
    },
    setDynamicOption(data) {
      // console.log(data)
      let option = data.option
      echartsInstances.setOption(option)
    },
    resizeTheChart() {
      if (this.$refs && this.$refs.chartRef) {
        echartsInstances.resize()
      }
    },
    
    sortTime(timeList) {
      return timeList.sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime()
      })
    },
  },
  beforeDestroy() {
    echarts.dispose(echartsInstances)
    window.removeEventListener('resize', this.resizeTheChart)
  },
}
</script>
<style>
.chartRef {
  /* margin-top: 10px;
  margin-left: 10px; */
  background-color: #f7f5f5;
  float: left;
}
.chart {
  width: 100%;
  height: 300px;
}
.ChartsSingle {
  text-align: cente;
}
</style>
