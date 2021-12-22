<template>
  <div class="water-info">
    <div class="water-info-item">
      <div class="water-info-table">
        <SimpleTable
          :tableColumns="tableColumns"
          :tableData="tableData"
          :setting="tableSetting"
          :textAlignment="tableTextAlignment"
        />
      </div>
    </div>
    <div class="water-info-item">
      <div class="water-info-tree-pie-chart">
        <div class="tree-container">
          <a-tree
            :key="treeRandomKey"
            :treeData="treeData"
            :defaultExpandAll="true"
            :defaultSelectedKeys="defaultSelectedKeys"
            @select="handleSelectTreeNode"
          />
        </div>
        <div class="pie-chart-container">
          <div id="pie-chart"/>
        </div>
      </div>
    </div>
    <div class="water-info-item">
      <div
        class="water-info-line-chart"
        v-if="lineChartAxis.yAxis.length > 0"
      >
        <StandardChart
          :chartOption="lineChartOption"
          :chartAxis="lineChartAxis"
          :chartData="lineChartData"
        />
      </div>
    </div>
    <div class="water-info-item">
      <div class="water-info-recommend-reservoir">
        <div
          class="recommend-reservoir-title"
          v-if="recommendReservoir.length > 0"
        >
          推荐工程
        </div>
        <div
          class="recommend-reservoir"
          v-for="(item, index) in recommendReservoir"
          :key="item['工程编码']"
        >
          <div class="title">
            {{ index + 1 }}、 {{ item['工程名称'] }}
          </div>
          <div class="des">
            工程已用防洪库容：{{ item['工程已用防洪库容'] }}
          </div>
          <div class="des">
            工程剩余防洪库容：{{ item['工程剩余防洪库容'] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lodash from 'lodash'
import moment from 'moment'
import * as echarts from 'echarts'
import { v4 as uuidv4 } from 'uuid'
import SimpleTable from "../../SimpleTable/src/SimpleTable";
import StandardChart from "../../StandardChart/src/StandardChart";
export default {
  name: 'WaterInfo',
  components: {
    SimpleTable,
    StandardChart
  },
  props: {
    waterInfo:{
      type: Object,
      required: true
    }
  },
  data() {
    this.copyWaterInfo = lodash.cloneDeep(this.waterInfo)
    this.currentSelectedTableRow = null
    this.currentSelectedTreeNode = null
    return {
      tableColumns: [],
      tableData: [],
      tableSetting: {
        rowHeaders: true
      },
      tableTextAlignment: ['htCenter', 'htMiddle'],
      treeData: [],
      treeRandomKey: uuidv4(),
      defaultSelectedKeys: [],
      lineChartOption: {
        grid: {
          top: 50,
          bottom: 50,
          left: 75,
          right: 75
        },
        legend: {
          top: 0
        }
      },
      lineChartAxis: {
        xAxis: 'time',
        timeSeries: true,
        yAxis: [],
        series: []
      },
      lineChartData: [],
      recommendReservoir: [],
    }
  },
  created() {
    this.organizeTableData()
  },
  mounted() {
    this.initPieChart(this.currentSelectedTableRow, this.currentSelectedTreeNode)
  },
  methods: {
    organizeTableData() {
      this.tableColumns = this.copyWaterInfo.stTable.tableColumns
      this.tableData = this.copyWaterInfo.stTable.tableData
      this.currentSelectedTableRow = this.copyWaterInfo.stTable.tableData[0].id
      this.tableSetting.afterSelection = (row, column, row2, column2, preventScrolling, selectionLayerLevel) => {
        this.currentSelectedTableRow = this.tableData[row].id
        // console.log(this.currentSelectedTableRow)
        this.$nextTick(() => {
          this.organizeTreePieChartData(this.currentSelectedTableRow)
          this.organizeLineChartData(this.currentSelectedTableRow)
          this.organizeRecommendReservoirData(this.currentSelectedTableRow)
          this.initPieChart(this.currentSelectedTableRow, this.currentSelectedTreeNode)
        })
      }
      this.organizeTreePieChartData(this.currentSelectedTableRow)
      this.organizeLineChartData(this.currentSelectedTableRow)
      this.organizeRecommendReservoirData(this.currentSelectedTableRow)
    },
    organizeTreePieChartData(currentSelectedTableRow) {
      // id 默认湖口
      // 构造树节点
      this.initTree(currentSelectedTableRow)
      // this.initPieChart()
    },
    initTree(currentSelectedTableRow) {
      this.treeRandomKey = uuidv4()
      this.treeData = []
      this.copyWaterInfo.stData.forEach(item => {
        if (item.id === currentSelectedTableRow) {
          this.treeData.push({
            title: item.name,
            key: item.id,
            children: []
          })
          this.defaultSelectedKeys = [item.id]
          this.currentSelectedTreeNode = this.defaultSelectedKeys[0]
          item.floodSource.forEach(val => {
            if (val['控制站码'] === currentSelectedTableRow) {
              val['洪水组成'].forEach(el => {
                // 构造treeData
                this.treeData[0].children.push({
                  title: el['控制站点'],
                  key: el['控制站码']
                })
              })
            }
          })
        }
      })
    },
    initPieChart(currentSelectedTableRow, currentSelectedTreeNode) {
      let data = []
      this.copyWaterInfo.stData.forEach(item => {
        if (item.id === currentSelectedTableRow) {
          item.floodSource.forEach(val => {
            if (val['控制站码'] === currentSelectedTreeNode) {
              val['洪水组成'].forEach(el => {
                data.push({
                  value: el['判断量值'],
                  name: el['控制站点']
                })
              })
            }
          })
        }
      })

      let pieChartDom = document.getElementById('pie-chart')
      let pieChart = echarts.init(pieChartDom)
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: 0,
          left: 'center'
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              formatter: (param) => {
                return `${param.name}: ${param.value}`
              }
            },
            data
          }
        ]
      }
      this.$nextTick(() => {
        pieChart.setOption(option)
      })
    },
    handleSelectTreeNode(selectedkeys, e) {
      // console.log(selectedkeys, e)
      this.currentSelectedTreeNode = selectedkeys[0]
      this.initPieChart(this.currentSelectedTableRow, this.currentSelectedTreeNode)
    },
    organizeLineChartData(currentSelectedTableRow) {
      // id 默认湖口
      this.lineChartAxis.yAxis = []
      this.lineChartAxis.series = []
      this.copyWaterInfo.stData.forEach(item => {
        if (item.id === currentSelectedTableRow) {
          item.tableColumns.forEach((val, key) => {
            if (key !== 0) {
              // 构造 yAxis series
              if (val.showType.split('-')[1] === 'L') {
                this.lineChartAxis.yAxis.push({
                  title: val.title,
                  yAxisIndex: 0
                })
                this.lineChartAxis.series.push({
                  ...val,
                  yAxisIndex: 0,
                  smooth: true
                })
              } else {
                this.lineChartAxis.yAxis.push({
                  title: val.title,
                  yAxisIndex: 1
                })
                this.lineChartAxis.series.push({
                  ...val,
                  yAxisIndex: 1,
                  smooth: true
                })
              }
            }
          })
          // 构造 data
          this.lineChartData = []
          item.tableData.forEach(val => {
            this.lineChartData.push({
              time: moment(val.time).format('YYYY-MM-DD HH'),
              q: val.q,
              z: val.z
            })
          })
        }
      })
    },
    organizeRecommendReservoirData(currentSelectedTableRow) {
      // id 默认湖口
      this.recommendReservoir = []
      this.copyWaterInfo.stData.forEach(item => {
        if (item.id === currentSelectedTableRow) {
          this.recommendReservoir = item.recommendReservoir
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.water-info {
  width: 100%;
  height: 800px;
  display: flex;
  flex-wrap: wrap;
  .water-info-item {
    width: 50%;
    height: 50%;
    padding: 25px;
    .water-info-table {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
    .water-info-tree-pie-chart {
      width: 100%;
      height: 100%;
      display: flex;
      .tree-container {
        width: 200px;
        height: 100%;
        text-align: left;
      }
      .pie-chart-container {
        width: calc(100% - 200px);
        height: 100%;
        #pie-chart {
          width: 100%;
          height: 100%;
        }
      }
    }
    .water-info-line-chart {
      width: 100%;
      height: 100%;
    }
    .water-info-recommend-reservoir {
      font-size: 24px;
      font-weight: bold;
      text-align: left;
      .recommend-reservoir {
        margin-bottom: 10px;
        .title {
          font-size: 20px;
          margin-bottom: 5px;
        }
        .des {
          font-size: 18px;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>