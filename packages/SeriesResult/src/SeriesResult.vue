<template>
  <div :class="classNames" :key="seriesResultRandomKey">
    <div :class="['chart-box', `${collapseTable}`, isShowMaximum ? '' : 'unShowMaximum']">
      <div class="chart-switch-button">
        <a-select v-model="targetChartIndex">
          <a-select-option
            v-for="(title, i) in d_chartTitle"
            :value="i"
            :key="i"
          >
            {{ title }}
          </a-select-option>
        </a-select>
      </div>
      <div class="chart-content">
        <chart
          :key="chartList[targetChartIndex].id"
          ref="chartRef"
          :chartOption="chartList[targetChartIndex].chartOption"
          :chartAxis="chartList[targetChartIndex].chartAxis"
          :id="chartList[targetChartIndex].id"
          :splitIndex="showSplitIndex ? splitIndex : 0"
          :classes="['series-result-chart']"
          :chartData="chartList[targetChartIndex].chartData"
        />
      </div>
      <div class="chart-des" v-if="isShowMaximum">
        <div
          class="des-item"
          v-for="item in currentFields"
          :key="item.field"
        >
          <div class="des-item-title">最大{{item.title}}</div>
          <div class="des-item-maxValue">{{item.maxValue}}({{item.unit}})</div>
          <div class="des-item-time">[{{item.time}}]</div>
        </div>
      </div>
    </div>
    <div :class="['table-box', `${collapseTable}`, isShowMaximum ? '' : 'unShowMaximum']">
      <simple-table
        ref="tableRef"
        :targetChartIndex="targetChartIndex"
        :splitIndex="splitIndex"
        :tableData="newTableData"
        :setting="newSetting"
        :tableColumns="newTableColumns"
        @cellEditDone="cellEditDone"
      />
      <div class="collapse-table" @click="toggleTableStatus">
        {{ collapseTable ?  '展开表格' : '折叠表格' }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import lodash from 'lodash'
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
    chartOption: {
      type: Object
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
    showSplitIndex: {
      type: Boolean,
      default: true
    },
    isShowMaximum: {
      type: Boolean,
      default: false
    },
    isMultiSeriesResult: {
      type: Boolean,
      default: false
    },
    chartTitle: {
      type: Array,
    },
    editable: {
      type: Boolean,
      default: true
    },
    singleData: {
      type: Array,
      default: () => {
        return []
      }
    }
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
      tableAndSingleData: [],
      tableFields: [],
      currentFields: [],
      newSetting: {},
      isShow: false,
      activeField: '',
      //   记录单元格修改记录，采用拼接方法:prop#row
      editCells: [],
      targetChartIndex: 0,
      d_chartTitle: [],
      seriesResultRandomKey: +new Date() + (Math.random() * 1000).toFixed(0),
      collapseTable: false
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
      this.$emit('cellEditDone', value)
    },
    clearData() {
      this.chartList = []
      this.seriesList = []
      this.targetChartIndex = 0
      this.isShow = false
    },
    handleData() {
      // 备份表格数据
      this.tableData.forEach(item => {
        this.singleData && this.singleData.forEach(val => {
          item[val.field] = val.value
        })
      })
      this.newTableData = JSON.parse(JSON.stringify(this.tableData))
      this.newTableColumns = JSON.parse(JSON.stringify(this.tableColumns))
      this.newSetting = Object.assign({}, this.setting, {
        readOnly: !this.editable
      })
      this.clearData()
      this.tableAndSingleData = this.tableColumns.concat(this.singleData)
      let showTypeList = this.tableAndSingleData
          .map((el) => {
            return {
              field: el.field,
              title: el.title.split('(')[0],
              showType: el.showType,
              echartsOptions_l: el.echartsOptions_l,
              echartsOptions_r: el.echartsOptions_r,
              dataUnit: el.dataUnit
            }
          })
          .filter((el) => el.showType)

      let filterList = showTypeList.map((el) => el.showType.split('-')[0])
      let carouselCount = unique(filterList)

      // console.log(carouselCount, showTypeList)
      this.generateChartData(carouselCount, showTypeList)

      // chart-des
     if (this.isShowMaximum) {
       this.tableFields = []
       this.tableColumns.forEach(item => {
         if (item.field !== 'time') {
           this.tableFields.push({
             unit: item.dataUnit.standardShow,
             field: item.field,
             title: item.title.split('(')[0],
             chartIndex: +item.showType.split('-')[0] - 1
           })
         }
       })
       this.chartDes()
     }
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
      // 图例控制在左右两边
      let legendList = showTypeList.filter(
          (el) => el.showType.indexOf(current) !== -1
      )
      let legends = []
      // let leftTop = 0,
      //     rightTop = 0
      legendList = legendList.sort((a, b) => {
        if (a.showType < b.showType) {
          return -1
        }
        if (a.showType > b.showType) {
          return 1
        }
        return 0
      })
      // console.log('legendList', legendList)
      let legendListNum = legendList.length
      let temp = (legendListNum - 1) * 12 / 2
      for (let i = 0; i < legendListNum; i++) {
        if (this.isShowMaximum) {
          if (this.isMultiSeriesResult) {
            // console.log(legendList)
            let topStep = Math.floor(i / 3)
            let leftStep = i - topStep * 3
            legends.push({
              top: topStep * 20,
              left: `${25 + leftStep * 25}%`,
              itemWidth: 30,
              show: true,
              textStyle: { fontSize: 14 },
              itemStyle: legendList[i].echartsOptions_l && legendList[i].echartsOptions_l.lineStyle,
              data: [{ name: legendList[i].title, icon: 'line' }], //rect为矩形
            })
          } else {
            legends.push({
              top: 15,
              left: `${47 - temp + i * 12}%`,
              itemWidth: 30,
              show: true,
              textStyle: { fontSize: 14 },
              itemStyle: legendList[i].echartsOptions_l && legendList[i].echartsOptions_l.lineStyle,
              data: [{ name: legendList[i].title, icon: 'line' }], //rect为矩形
            })
          }
        } else {
          legends.push({
            bottom: 15,
            left: `${47 - temp + i * 12}%`,
            itemWidth: 30,
            show: true,
            textStyle: { fontSize: 14 },
            itemStyle: legendList[i].echartsOptions_l && legendList[i].echartsOptions_l.lineStyle,
            data: [{ name: legendList[i].title, icon: 'line' }], //rect为矩形
          })
        }
      }
      // console.log('legends', legends)
      return legends
    },
    generateChartYaxis(showTypeList, current) {
      let yAxisList = showTypeList.filter(
          (el) => el.showType.indexOf(current) !== -1
      )

      yAxisList = uniqueObj(yAxisList, 'showType')
      // console.log('yAxisList', yAxisList)
      let yAxis = []
      for (let i = 0; i < yAxisList.length; i++) {
        let yAxisItem = {
          title: `${yAxisList[i].dataUnit.name}(${yAxisList[i].dataUnit.standardShow})`,
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
        }
        // console.log(yAxisList)
        if (yAxisList.length === 1) {
          yAxis[0] = yAxisItem
        } else {
          if (yAxisList[i].showType.split('-')[1] === 'L') {
            yAxis[0] = yAxisItem
          } else {
            yAxis[1] = yAxisItem
          }
        }
      }

      return yAxis
    },
    generateChartSeries(showTypeList, current) {
      // console.log(showTypeList, current, this.showSplitIndex)
      if (this.showSplitIndex) {
        let firstTime = ''
        if (this.splitIndex) {
          firstTime = this.newTableData[this.splitIndex].time
        }
        if (firstTime !== '') {
          let list = showTypeList
              .filter((el) => el.showType.indexOf(current) !== -1)
              .map((el, index) => {
                // console.log(el,"----------------------")

                if (!el.echartsOptions_r.emphasis) {
                  el.echartsOptions_r.emphasis = {
                    scale: false,
                    lineStyle: el.echartsOptions_r.lineStyle
                  }
                }
                let obj = {
                  field: el.field,
                  title: el.title,
                  selected: true,
                  yAxisIndex: positionMaps[el.showType.split('-')[1]] === 'left' ? 0 : 1,
                  markLine: el.echartsOptions_l && el.echartsOptions_l.echartstype !== 'bar' ? {
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
                return Object.assign(obj, el.echartsOptions_l)
              })

          const listYAxisIndexArray = []
          list.forEach(item => {
            listYAxisIndexArray.push(item.yAxisIndex)
          })
          // console.log(listYAxisIndexArray)
          // console.log(!listYAxisIndexArray.includes(0))
          if (!listYAxisIndexArray.includes(0)) {
            list.forEach(item => {
              item.yAxisIndex = 0
            })
          }

          // 将3个series处理成一半实线一半虚线的series，一起应该6个series
          let allList = []
          for (let i = 0; i < list.length; i++) {
            allList.push(list[i])
            if (list[i].type !== 'bar') {//如果为柱状图则不需要实现虚线
              showTypeList.forEach(item => {
                if (item.field === list[i].field) {
                  let obj = Object.assign({}, list[i], {
                    // smooth: true, //关键点，为true是不支持虚线，实线就用true
                    itemStyle: {
                      normal: {
                        lineStyle: Object.assign({}, list[i].lineStyle, item.echartsOptions_r.lineStyle),
                      },
                    },
                  })
                  // console.log(obj)
                  allList.push(obj)
                }
              })
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
                      positionMaps[el.showType.split('-')[1]] === 'left' ? 0 : 1,
                }
              })
        }
      } else {
        // console.log(showTypeList)
        let list = showTypeList
            .filter(el => el.showType.indexOf(current) !== -1)
            .map(el => {
              let obj = {
                field: el.field,
                title: el.title,
                selected: true,
                yAxisIndex: positionMaps[el.showType.split('-')[1]] === 'left' ? 0 : 1,
              }
              return Object.assign(obj, el.echartsOptions_r)
            })
        const listYAxisIndexArray = []
        list.forEach(item => {
          listYAxisIndexArray.push(item.yAxisIndex)
        })
        // console.log(listYAxisIndexArray)
        // console.log(!listYAxisIndexArray.includes(0))
        if (!listYAxisIndexArray.includes(0)) {
          list.forEach(item => {
            item.yAxisIndex = 0
          })
        }

        return list
      }
    },
    generateChartData(carouselCount, showTypeList) {
      for (let i = 0; i < carouselCount.length; i++) {
        let chartOption = {
          title: {
            text: '',
            left: 'center',
          },
          legend: []
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
        // console.log(chartAxis.series)
        chartOption.legend = this.generateChartLegend(
            showTypeList,
            carouselCount[i]
        )
        chartOption = Object.assign(chartOption, this.chartOption)
        //   Math.max(...chartOption.legend.map((i) => i.top || 0)) + 34
        let chartData
        if (this.showSplitIndex) {
          chartData = this.tableData
        } else {
          chartData = this.tableData.slice(this.splitIndex)
        }
        // console.log(chartData)
        this.chartList.push({
          chartOption,
          chartAxis,
          chartData,
          id: guid(),
        })

        //console.log('454545', chartAxis.series)
      }
      if (this.chartTitle && this.chartTitle instanceof Array && this.chartTitle.length > 0) {
        this.d_chartTitle = this.chartTitle
      } else {
        this.d_chartTitle = this.chartList.map((j, i) => `图表（${i + 1}）`)
      }
    },
    updateShow() {
      this.seriesResultRandomKey = +new Date() + (Math.random() * 1000).toFixed(0)
    },
    toggleTableStatus() {
      this.collapseTable = !this.collapseTable
      // console.log(this.collapseTable)
    },
    chartDes() {
      const currentFields = []
      this.currentFields = []
      this.tableFields.forEach(item => {
        if (item.chartIndex === this.targetChartIndex) {
          currentFields.push(item)
        }
      })

      this.currentFields = lodash.unionWith(currentFields, lodash.isEqual)

      // console.log(this.currentFields)

      this.currentFields.forEach(item => {
        let tempArr = []
        this.tableData.forEach(val => {
          tempArr.push(val[item.field])
        })
        item.maxValue = Math.max(...tempArr)
        let index = tempArr.findIndex(element => element === item.maxValue)
        item.time = moment(this.tableData[index].time).format('YYYY-MM-DD HH')
      })
    }
  },
  watch: {
    collapseTable: {
      deep: true,
      handler() {
        this.updateShow()
      }
    },
    targetChartIndex: {
      deep: true,
      handler() {
        this.chartDes()
      }
    }
  }
}
</script>

<style lang="scss">
.series-result {
  .chart-box {
    height: 375px;
    .chart-content {
      height: calc(100% - 107px);
    }
    .chart-des {
      height: 60px;
      margin-bottom: 15px;
      display: flex;
      flex-wrap: wrap;
      .des-item {
        width: 50%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .des-item-title, .des-item-maxValue {
          margin-right: 10px;
        }
      }
    }
  }
  .chart-box.unShowMaximum {
    height: 300px;
    .chart-content {
      height: calc(100% - 32px);
    }
  }
  .chart-box.true {
    height: calc(100% - 32px);
  }
  .table-box {
    height: calc(100% - 375px);
    .simple-table {
      height: calc(100% - 32px);
      overflow: auto;
    }
    .collapse-table {
      height: 32px;
      line-height: 32px;
      background: #F5F5F5;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .table-box.unShowMaximum {
    height: calc(100% - 300px);
  }
  .table-box.true {
    height: 0;
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
