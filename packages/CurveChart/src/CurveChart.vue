<template>
  <div>
    <!-- 上下结构 -->
    <div v-if="this.structure === 'Upanddown'||!tableShow">
      <a-row type="flex"
             justify="center"
             :gutter="16">
        <a-col :span="24">
          <div ref="chartRef"
               v-if="chartShow"
               :class="classNames"
               :id="id"></div>
        </a-col>
      </a-row>
      <a-row type="flex"
             justify="center"
             :gutter="16">
        <a-col :span="24">
          <simple-table v-if="tableShow"
                        ref="tableChart"
                        :tableData="chartData"
                        :tableColumns="tableColumns"></simple-table>
        </a-col>
      </a-row>
    </div>
    <div v-if="this.structure === 'about' && tableShow">
      <a-row type="flex"
             justify="center">
        <a-col :span="12">
          <div ref="chartRef"
               v-if="chartShow"
               :class="classNames"
               :id="id"></div>
        </a-col>
        <a-col :span="12">
          <simple-table v-if="tableShow"
                        style="margin-top: 40px;"
                        ref="tableChart"
                        :tableData="chartData"
                        :tableColumns="tableColumns"></simple-table>
        </a-col>
      </a-row>
      <!-- <a-row type="flex"
             justify="center"
             >

      </a-row> -->
    </div>
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
              {{ i.title }}
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
    // formatter: function (arg) {
    //   return arg[0].seriesName + ':' + arg[0].data
    // },
  },
  grid: {
    bottom: 50,
    right: 100,
    left: 100,
    top: 40,
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
    return +(value.max + (value.max - value.min) * 0.15).toFixed(2)
  },
  min: function (value) {
    let minV = +(value.min - (value.max - value.min) * 0.15).toFixed(2)
    return minV >= 0 ? minV : 0
  }
}
let echartsInstance = null
export default {
  name: 'CurveChart',
  props: {
    legendNumber: {
      type: Number,
    },
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
    structure: {
      type: String,
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
    id: {
      type: String,
      default: 'curve-chart',
      required: false,
    },
  },
  components: {
    SimpleTable,
    // VChart,
  },
  created() {},
  beforeMount() {},
  mounted() {
    //console.log(this.structure)
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
      if (this.structure === 'Upanddown') {
        this.span = 24
      } else if (this.structure === 'about') {
        this.span = 12
      }
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
      echartsInstance = echarts.init(document.getElementById(this.id))
      this.setDynamicOption()
    },
    getChartInstance() {
      if (this.$refs.chartRef) {
        this.instance = this.$refs.chartRef
      }
    },
    threedimensional() {
      let xydata = []
      let judge = ''
      xydata[0] = this.chartAxis.xAxis.id
      xydata[1] = this.chartAxis.yAxis.id
      for (let k = 0; k < this.tableColumns.length; k++) {
        if (
          xydata.indexOf(this.tableColumns[k].field) == -1 &&
          this.tableColumns[k].field != 'index'
        ) {
          judge = this.tableColumns[k].field
        }
      }
      var map = {},
        dest = []
      for (var i = 0; i < this.chartData.length; i++) {
        var ai = this.chartData[i]
        if (!map[ai[judge]]) {
          dest.push({
            dim2: ai[judge],
            name: ai[judge],
            data: [ai],
          })
          map[ai[judge]] = ai
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j]
            if (dj[judge] == ai[judge]) {
              dj.data.push(ai)
              break
            }
          }
        }
      }
      for (let m = 0; m < dest.lengthl; m++) {
        dest[m].data = dest[m].data.sort(this.compare(judge))
      }
      return dest
    },
    compare(property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value1 - value2
      }
    },
    clear() {
      echartsInstance.clear()
    },
    setDynamicOption() {
      let option
      if (this.tableColumns.length == 2) {
        option = this.prepareSeries()
      } else {
        option = this.handledata()
      }
      echartsInstance.setOption(option)
    },
    resizeTheChart() {
      if (this.$refs && this.$refs.chartRef) {
        echartsInstance.resize()
      }
    },
    group(array, subGroupLength) {
      let index = 0
      let newArray = []
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)))
      }
      return newArray
    },
    handledata() {
      let option = {
        title: {
          text: '',
          x: 'left',
          y: 'top',
        },
        // tooltip: {
        //   trigger: 'axis',
        // },
        grid: {
          bottom: 50,
          right: 100,
          left: 100,
          top: 80,
        },
        // legend: [],

        xAxis: {
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
        },
        series: [],
      }
      option.title.text = this.chartOption.title.text
      if (this.chartOption.title.x) {
        option.title.x = this.chartOption.title.x
      }
      option.xAxis.name = this.chartAxis.xAxis.title
      // console.log(this.chartAxis.yAxis.title)
      option.yAxis = {
        name: this.chartAxis.yAxis.title,
        type: 'value',
        nameTextStyle: {
          padding: [0, 70, 0, 0],
        },
      }
      let threedimensionaldata = this.threedimensional()
      let xAxismin = []
      let xAxismax = []
      let legenddata = []
      for (let i = 0; i < threedimensionaldata.length; i++) {
        legenddata.push(threedimensionaldata[i].name)
        let seriesObj = {
          name: threedimensionaldata[i].name,
          type: 'line',
          data: [],
          symbol: 'none', //取消折点圆圈
        }
        let arrdata = []
        threedimensionaldata[i].data.map((cd, index) => {
          let arr = []
          arr[0] = cd[this.chartAxis.xAxis.id]
          arr[1] = cd[this.chartAxis.yAxis.id]
          arrdata[index] = arr
        })
        seriesObj.data = arrdata
        xAxismin.push(seriesObj.data[0][0])
        xAxismax.push(seriesObj.data[seriesObj.data.length - 1][0])
        option.series.push(seriesObj)
      }
    //   legenddata = legenddata
    //     .sort(function (a, b) {
    //       return a - b
    //     })
    //     .map(String)
    //   if (this.legendNumber) {
    //     legenddata = this.group(legenddata, this.legendNumber)
    //     if (legenddata.length > 0) {
    //       for (let j = 0; j < legenddata.length; j++) {
    //         if (j > 0) {
    //           let selected = {}
    //           for (let z = 0; z < legenddata[j].length; z++) {
    //             selected[legenddata[j][z]] = false
    //           }
    //           let legendobj = {
    //             selected: selected,
    //             y: 20 + 15 * j,
    //             data: legenddata[j],
    //           }
    //           option.legend.push(legendobj)
    //         }else{
    //             let legendobj = {
    //             y: 20 + 15 * j,
    //             data: legenddata[j],
    //           }
    //           option.legend.push(legendobj)
    //         }
    //       }
    //     }
    //   } else {
    //     option.legend = {
    //       y: 20,
    //       data: legenddata,
    //     }
    //   }

      if (this.chartAxis.xAxis.max) {
        option.xAxis.max = this.chartAxis.xAxis.max
      } else {
        option.xAxis.max = Math.ceil(Math.max.apply(null, xAxismax))
      }
      if (this.chartAxis.xAxis.min) {
        option.xAxis.min = this.chartAxis.xAxis.min
      } else {
        option.xAxis.min = Math.floor(Math.min.apply(null, xAxismin))
      }
      if (this.chartAxis.yAxis.max) {
        option.yAxis.max = this.chartAxis.yAxis.max
      }
      if (this.chartAxis.yAxis.min) {
        option.yAxis.min = this.chartAxis.yAxis.min
      }
      return {
        baseOption: option,
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
      // console.log(series)
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
      option.yAxis = yAxis.map((ax) => {
        return Object.assign({}, yAxisOption, {
          name: ax.title,
          gridIndex: ax.gridIndex,
        })
      })

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
