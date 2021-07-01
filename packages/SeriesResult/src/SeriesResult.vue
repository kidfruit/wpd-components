<template>
  <div :class="classNames">
    <div class="chart-box">
      <div class="chart-switch-button">
        <a-select v-model="targetChartIndex">
          <a-select-option v-for="(title, i) in d_chartTitle"
                           :value="i"
                           :key="i"> {{ title }} </a-select-option>
        </a-select>
      </div>
      <div class="chart-content">
        <chart :key="chartList[targetChartIndex].id"
               ref="chartRef"
               :chartOption="chartList[targetChartIndex].chartOption"
               :chartAxis="chartList[targetChartIndex].chartAxis"
               :id="chartList[targetChartIndex].id"
               :splitIndex="splitIndex"
               :classes="['series-result-chart']"
               :chartData="chartList[targetChartIndex].chartData" />
      </div>
    </div>
    <div class="table-box">
      <simple-table ref="tableRef"
                    :targetChartIndex="targetChartIndex"
                    :splitIndex="splitIndex"
                    :tableData="newTableData"
                    :setting="setting"
                    :tableColumns="newTableColumns"
                    @cellEditDone="cellEditDone"></simple-table>
    </div>
    <!-- <div class="reset">
        <a-button icon="undo" @click="handleReset" shape="circle"> </a-button>
      </div> -->
  </div>
</template>

<script>
import { MinMaxFunction } from '../../../utils/'
import SimpleTable from '../../SimpleTable/src/SimpleTable.vue'
import Chart from './chart'
let positionMaps = {
  L: 'left',
  R: 'right',
}
function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }

  return S4() + '-' + S4()
}
function unique(arr) {
  return Array.from(new Set(arr))
}
function uniqueObj(origin, key) {
  let temp = {}
  return origin
    .reverse()
    .filter((item) => (item[key] in temp ? false : (temp[item[key]] = true)))
}
export default {
  name: 'SeriesResult',
  props: {
    classes: {
      type: Array,
      required: false,
    },
    tableData: {
      type: Array,
    },
    tableColumns: {
      type: Array,
    },
    setting: {
      type: Object,
    },
    topmargin:{
        type: Number,
    },
    splitIndex: {
      type: Number,
    },
    chartTitle: {
      type: Array,
    },
  },
  components: {
    SimpleTable,
    Chart,
  },
  computed: {
    classNames() {
      return ['series-result'].concat(this.classes)
    },
  },
  data() {
    return {
      chartList: [],
      seriesList: [],
      newTableData: [],
      newTableColumns: [],
      newSetting: {},
      isShow: false,
      activeField: '',
      //   记录单元格修改记录，采用拼接方法:prop#row
      editCells: [],
      targetChartIndex: 0,
      d_chartTitle: [],
    }
  },
  created() {
    this.handleData()
  },
  methods: {
    getTableData() {
      return this.newTableData
    },
    // 获取被编辑过的列名
    getEditColumnField() {
      // return this.editCells;
      if (this.editCells[0]) {
        return this.editCells[0].split("#")[0];
      } else {
        return null;
      }
    },
    cellEditDone(value) {
      // 表格到图表的单向数据联动
      const { field, newValue, oldValue, rowIndex } = value
      if (newValue !== oldValue.toString() && this.activeField === '') {
        this.editCells.push(field)
        this.activeField = field
        this.newTableColumns.forEach((el, index) => {
          if (el.field !== field) {
            // el.readOnly = true;
            // el.isEdit = false;
            this.$set(this.newTableColumns, index, {
              ...this.newTableColumns[index],
              readOnly: true,
              isEdit: false,
            })
          }
        })
        this.$refs.tableRef.reset()
        this.$refs.tableRef.updateShow()
      }
      this.newTableData[rowIndex][field] = newValue
      this.chartList.forEach((el) => {
        el.chartData = this.newTableData
        el.id = guid()
      })
    },
    clearData() {
      this.chartList = []
      this.seriesList = []
      this.targetChartIndex = 0
      this.isShow = false
    },
    handleData() {
      // 备份表格数据
      this.newTableData = JSON.parse(JSON.stringify(this.tableData))
      this.newTableColumns = JSON.parse(JSON.stringify(this.tableColumns))
      this.clearData()
      let showTypeList = this.tableColumns
        .map((el) => {
          return {
            showType: el.showType,
            field: el.field,
            title: el.title,
            echartstype: el.echartstype,
            areaStyle: el.areaStyle,
            step: el.step,
            color: el.color,
            smooth:el.smooth
          }
        })
        .filter((el) => el.showType)

      let filterList = showTypeList.map((el) => el.showType.split('-')[0])
      let carouselCount = unique(filterList)
      this.generateChartData(carouselCount, showTypeList)
    },
    handleReset() {
      this.activeField = ''
      this.newTableData = JSON.parse(JSON.stringify(this.tableData))
      this.newTableColumns = JSON.parse(JSON.stringify(this.tableColumns))
      this.chartList.forEach((el) => {
        el.chartData = this.newTableData
        el.id = guid()
      })
      this.editCells = []
    },
    generateChartLegend(showTypeList, current) {
      let legendList = showTypeList.filter(
        (el) => el.showType.indexOf(current) !== -1
      )
      let legends = []
      let leftTop = 0,
        rightTop = 0
      legendList = legendList.sort((a, b) => {
        if (a.showType < b.showType) {
          return -1
        }
        if (a.showType > b.showType) {
          return 1
        }
        return 0
      })
      for (let i = 0; i < legendList.length; i++) {
        let obj = {
          itemWidth: 27,
          itemHeight: 16,
          show: true,
          textStyle: { fontSize: 14 },
          data: [{ name: legendList[i].title, icon: 'line' }], //rect为矩形
        }
        //console.log("positionMaps[legendList[i].showType.split('-')[1]]",positionMaps)
        let leftRight = positionMaps[legendList[i].showType.split('-')[1]]
        if (leftRight === 'left') {
          obj = Object.assign({}, obj, {
            top: this.topmargin+ leftTop * 24, //调整位置
            left: '1%',
          })
          leftTop++
        } else {
          obj = Object.assign({}, obj, {
            top: rightTop * 24, //调整位置
            right: '1%',
          })
          rightTop++
        }
        legends.push(obj)
      }
      return legends
    },
    generateChartYaxis(showTypeList, current) {
      let yAxisList = showTypeList.filter(
        (el) => el.showType.indexOf(current) !== -1
      )
      
      yAxisList = uniqueObj(yAxisList, 'showType')
      //console.log("555555555555555",yAxisList)
      let yAxis = []
      for (let i = 0; i < yAxisList.length; i++) {
        yAxis.push({
          title: '',
          // title: yAxisList[i].title,
          type: 'value',
          axisLabel: {
            show: true,
          },
          axisTick: {
            //y轴刻度线
            show: true,
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            show: true,
            lineStyle: {
              color: '#40a9ff  ',
            },
          },
          position: positionMaps[yAxisList[i].showType.split('-')[1]],
          min: (v) => MinMaxFunction('min', v),
          max: (v) => MinMaxFunction('max', v),
        })
      }

      return yAxis
    },
    generateChartSeries(showTypeList, current) {
      //console.log('showTypeList', showTypeList)
      let firstTime = ''
      if (this.splitIndex) {
        firstTime = this.newTableData[this.splitIndex].time
      }
      if (firstTime !== '') {
        let list = showTypeList
          .filter((el) => el.showType.indexOf(current) !== -1)
          .map((el, index) => {
            //console.log(el,"----------------------")
            return {
              type: el.echartstype,
              areaStyle: el.areaStyle,
              color: el.color,
              step: el.step,
              field: el.field,
              title: el.title,
              smooth:el.smooth,
              selected: true,
              yAxisIndex:
                positionMaps[el.showType.split('-')[1]] === 'left' ? 1 : 0,
              markLine: el.echartstype!='bar'? {
                symbol: 'none',
                data: [
                  {
                    name: '标记线',
                    xAxis: firstTime,
                    lineStyle: {
                      //警戒线的样式  ，虚实  颜色
                      type: 'solid',
                      color: '#000',
                    },
                  },
                ],
                label: { show: true, position: 'end' },
                silent: true,
              } :null,
            }
          })
        // 将3个series处理成一半实线一半虚线的series，一起应该6个series
        let allList = []
        for (let i = 0; i < list.length; i++) {
          allList.push(list[i])
          if (list[i].type != 'bar') {//如果为柱状图则不需要实现虚线
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
        allList = allList.sort((a, b) => {
          return a.name - b.name
        })
        return allList
      } else {
        return showTypeList
          .filter((el) => el.showType.indexOf(current) !== -1)
          .map((el, index) => {
            return {
              field: el.field,
              title: el.title,
              selected: true,
              yAxisIndex:
                positionMaps[el.showType.split('-')[1]] === 'left' ? 1 : 0,
            }
          })
      }
    },
    generateChartData(carouselCount, showTypeList) {
      for (let i = 0; i < carouselCount.length; i++) {
        let chartOption = {
          title: {
            text: '',
            left: 'center',
          },
          legend: [],
          grid: {
            left: 200,
            right: 200,
            bottom: 50,
          },
        }
        let chartAxis = {
          xAxis: 'time',
          yAxis: [],
          series: [],
        }
        chartAxis.yAxis = this.generateChartYaxis(
          showTypeList,
          carouselCount[i]
        )
        chartAxis.series = this.generateChartSeries(
          showTypeList,
          carouselCount[i]
        )
        chartOption.legend = this.generateChartLegend(
          showTypeList,
          carouselCount[i]
        )
        chartOption.grid.top =20
        //   Math.max(...chartOption.legend.map((i) => i.top || 0)) + 34
        let chartData = this.tableData
        this.chartList.push({
          chartOption,
          chartAxis,
          chartData,
          id: guid(),
        })

        //console.log('454545', chartAxis.series)
      }
      if (this.chartTitle instanceof Array) {
        this.d_chartTitle = this.chartTitle
      } else {
        this.d_chartTitle = this.chartList.map((j, i) => `图表（${i + 1}）`)
      }
    },
  },
}
</script>

<style lang="scss">
.series-result {
  padding: 40px 10px 10px;
  .chart-box,
  .table-box {
    height: 50%;
    position: relative;
    min-height: 250px;
  }
  .show-hide {
    position: absolute;
    top: 4px;
    left: 12px;
    z-index: 999;
    .ops {
      display: inline-block;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
}
</style>
