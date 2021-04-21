<template>
  <div>
    <div ref="chartRef"
         v-if="chartShow"
         :class="classNames"
         id="curve-chart"></div>
    <simple-table v-if="tableShow"
                  ref="tableChart"
                  :tableData="chartData"
                  :tableColumns="tableColumns"></simple-table>
    <div v-if="interpolateCalcShow">
      <a-row type="flex"
             justify="center"
             :gutter="16">
        <a-col :span="1.5">
          <a-select :default-value="handleselect"
                    style="width: 120px"
                    @change="handleChange">
            <a-select-option v-for="i in dropdown"
                             :key="i.id"
                             :value="i.id">
              {{i.title}}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="1.5">
          <a-input v-model="value" />
        </a-col>
        <a-col :span="1.5"
               style="padding-top: 5px">
          <span style="margin-top: 5px;">插值结果：</span>
        </a-col>
        <a-col :span="1.5">
          <a-input v-model="value2"
                   disabled />
        </a-col>
        <a-col :span="1.5"
               style="padding-top: 3px">
          <button @click="calculation">计算</button>
        </a-col>

      </a-row>
      <!-- <button @click="qiehuan">切换</button> -->
    </div>
    <!-- @cellEditDone="cellEditDone" -->
  </div>
</template>
<script>
import SimpleTable from '../../SimpleTable/src/SimpleTable.vue'
import * as echarts from 'echarts'

const defaultOption = {
  title: {
    text: '',
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (arg) {
      return arg[0].seriesName + ':' + arg[0].data
    },
  },
  grid: {
    bottom: 50,
    right: 100,
    left: 100,
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
  name: 'CurveChart',
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

    chartShow: {
      type: Boolean,
      default: true,
      required: false,
    },
    tableShow: {
      type: Boolean,
      default: true,
      required: false,
    },
    interpolateCalcShow: {
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
    tableColumns: {
      type: Array,
      required: false,
    },
    chartData: {
      type: Array,
    },
    sections: {
      type: Array,
    },
  },
  components: {
    SimpleTable,
    // VChart,
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.dropdowndata()
    

    this.drawChart()
    this.getChartInstance()
    window.addEventListener('resize', this.resizeTheChart)
  },
  data() {
    return {
      value2: '',
      options: '',
      value: '',
      dropdown: [],
      handleselect: '',
      instance: null,
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
    _calculationresults(value) {
      this.value2 = value
    },
    calculation() {
      this.$emit('compute', { options: this.options, value: this.value })
    },
    dropdowndata() {
      this.handleselect = this.chartAxis.xAxis.id
     
      this.dropdown.push(this.chartAxis.xAxis)
      this.dropdown.push(this.chartAxis.yAxis)
    },
    handleChange(value) {
      this.options = value
      this.value = ''
      this.value2 = ''
    },
    drawChart() {
      echartsInstance = echarts.init(document.getElementById('curve-chart'))
      this.setDynamicOption()
    },
    getChartInstance() {
      if (this.$refs.chartRef) {
        this.instance = this.$refs.chartRef
      }
    },
    clear() {
      echartsInstance.clear()
    },
    setDynamicOption() {
      let option = this.prepareSeries()
  
      echartsInstance.setOption(option)
    },
    resizeTheChart() {
      if (this.$refs && this.$refs.chartRef) {
        echartsInstance.resize()
      }
    },
    prepareSeries() {
      let yAxis = []
      let series = []
      yAxis.push({
        title: this.chartAxis.yAxis.title,
        yAxisIndex: 0,
      })
      series.push({
        field: this.chartAxis.yAxis.id,
        title: this.chartAxis.yAxis.title,
        selected: true,
        yAxisIndex: 0,
      })
      let option = Object.assign({}, defaultOption, this.chartOption)

   
      //x轴
      option.xAxis.name = this.chartAxis.xAxis.title
      option.xAxis.data = this.chartData.map(
        (cd) => cd[this.chartAxis.xAxis.id]
      )
      if (this.chartAxis.timeSeries) {
        option.xAxis.data = this.sortTime(option.xAxis.data)
      }
      if (option.timeline) {
        option.xAxis.data = this.sections
      }
      if (Array.isArray(option.grid) && option.grid.length > 0) {
        option.xAxis = this.chartAxis.xAxis.id
      }
     
      //y轴
      //按照yAxisIndex排序
      if (Object.prototype.hasOwnProperty.call(yAxis[0], 'yAxisIndex')) {
        yAxis = yAxis.sort((a, b) => {
          return a['yAxisIndex'] - b['yAxisIndex']
        })
      }

      // this.chartAxis.yAxis = yAxis
      // this.chartAxis.series = series

      option.yAxis = yAxis.map((ax) => {
        return Object.assign({}, yAxisOption, {
          name: ax.title,
          gridIndex: ax.gridIndex,
        })
      })
     
      //legend
      //   this.chartAxis.series.forEach((yx) => {
      //     option.legend.data.push(yx.title)
      //     option.legend.selected[yx.title] = Object.prototype.hasOwnProperty.call(
      //       yx,
      //       'selected'
      //     )
      //       ? yx.selected
      //       : true
      //   })

      //data
      this.chartData = this.chartData.sort((a, b) => {
        let timeField = this.chartAxis.xAxis
        return (
          new Date(a[timeField]).getTime() - new Date(b[timeField]).getTime()
        )
      })
      option.series = []
      series.forEach((yax) => {
        let seriesObj = {
          name: yax.title,
          type: 'line',
          data: [],
          yAxisIndex: yax.yAxisIndex,
          xAxisIndex: yax.xAxisIndex,
          smooth: yax.smooth,
          id: yax.id,
          symbolSize: yax.symbolSize,
        }
        seriesObj.data = this.chartData.map((cd) => cd[yax.field])
        option.series.push(seriesObj)
      })
      if (!option.timeline) {
        return {
          baseOption: option,
        }
      } else {
        // 带有时间线的chart
        let options = []
        let fields = series.map((el) => el.field)
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
