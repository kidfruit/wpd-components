<template>
  <div class="engineering-info">
    <div class="engineering-info-chart">
      <div class="gauge-chart-wrapper">
        <div class="gauge-chart-title">
          <div class="tips"/>
          <div class="title">流域实时可用防洪库容</div>
          <div class="unit">单位：{{ gaugeChartUnitSymbol }}</div>
        </div>
        <div class="all-gauge-chart-container">
          <div
            class="gauge-chart-container"
            v-for="item in reservoirCapacity"
            :key="item.name"
          >
            <div class="gauge-chart">
              <div
                class="chart"
                :id="`gauge-chart-${item.name}`"
              />
            </div>
            <div class="gauge-chart-name">{{ item.name }}</div>
            <div class="gauge-chart-des">{{ item.used }} / {{ item.total }}</div>
          </div>
        </div>
      </div>
      <div class="bar-chart-wrapper">
        <div class="bar-chart-title">
          <div class="tips"/>
          <div class="title">蓄滞洪区容量分布</div>
        </div>
        <div class="bar-chart-container">
          <div
            class="bar-chart"
            id="bar-char"
          />
        </div>
      </div>
    </div>
    <div class="engineering-info-table">
      <div class="table-container">
        <SimpleTable
          :tableColumns="tableColumns"
          :tableData="tableData"
          :setting="tableSetting"
          :textAlignment="tableTextAlignment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import lodash from 'lodash'
import * as echarts from 'echarts'
import SimpleTable from "../../SimpleTable/src/SimpleTable";
export default {
  name: 'EngineeringInfo',
  components: { SimpleTable },
  props: {
    engineeringInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    this.copyEngineeringInfo = lodash.cloneDeep(this.engineeringInfo)
    this.floodCapacity = this.copyEngineeringInfo.floodCapacity
    return {
      reservoirCapacity: null,
      gaugeChartUnitSymbol: null,
      tableColumns: [],
      tableData: [],
      tableSetting: {
        mergeCells: []
      },
      tableTextAlignment: ['htCenter', 'htMiddle'],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initGaugeChart()
      this.initBarChart()
      this.initSimpleTable()
    },
    initGaugeChart() {
      this.reservoirCapacity = this.copyEngineeringInfo.reservoirCapacity

      this.reservoirCapacity.forEach(item => {
        this.$nextTick(() => {
          this.gaugeChartUnitSymbol = item.unitSymbol
          let gaugeChartDom = document.getElementById(`gauge-chart-${item.name}`)
          let gaugeChart = echarts.init(gaugeChartDom)

          // 设置progress颜色
          let value = (item.used / item.total) * 100
          let progressStyle = {}
          if (value < 50) {
            progressStyle.color = '#2783FF'
          } else if (value > 80) {
            progressStyle.color = '#ED4014'
          } else {
            progressStyle.color = '#FF9400'
          }

          let option = {
            series: [
              {
                name: item.name,
                type: 'gauge',
                progress: {
                  show: true,
                  itemStyle: progressStyle
                },
                detail: {
                  valueAnimation: true,
                  formatter: '{value}%',
                  offsetCenter: [0, 0],
                  fontSize: 18
                },
                title: {
                  offsetCenter: [0, '50%']
                },
                data: [
                  {
                    value: `${((item.used / item.total) * 100).toFixed(1)}`,
                    // name: `${item.name} \n ${item.used} / ${item.total}`
                  }
                ],
                radius: '100%',
                max: 100,
                splitLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: false
                },
                pointer: {
                  show: false
                }
              }
            ]
          }
          gaugeChart.setOption(option)
        })
      })

    },
    initBarChart() {
      let xAxisData = []
      let remainingData = []
      let usedData = []
      let unitSymbol = ''
      this.floodCapacity.forEach(item => {
        xAxisData.push(item.name)
        remainingData.push((item.total - item.used).toFixed(2))
        usedData.push(item.used)
        unitSymbol = item.unitSymbol
      })
      this.$nextTick(() => {
        let barChartDom = document.getElementById('bar-char')
        let barChart = echarts.init(barChartDom)
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {},
          xAxis: {
            type: 'category',
            data: xAxisData
          },
          yAxis: {
            type: 'value',
            name: `单位：${unitSymbol}`
          },
          series: [
            {
              name: `已用容量（${unitSymbol}）`,
              type: 'bar',
              stack: 'flood',
              data: usedData,
              itemStyle: {
                color: '#FF9400'
              },
              label: {
                show: true,
                position: 'inside'
              },
            },
            {
              name: `可用容量（${unitSymbol}）`,
              type: 'bar',
              stack: 'flood',
              data: remainingData,
              itemStyle: {
                color: '#2783FF'
              },
              label: {
                show: true,
                position: 'inside'
              },
            }
          ]
        }
        barChart.setOption(option)
      })
    },
    initSimpleTable() {
      this.tableColumns = this.copyEngineeringInfo.reservoirData.tableColumns.filter(i => !i.hidden)
      this.tableData = this.copyEngineeringInfo.reservoirData.tableData

      // 三峡的数据放置在最前面
      let sanXiaArr = []
      this.tableData.forEach((item, index) => {
        if (item.zone === '三峡') {
          this.tableData.splice(index, 1)
          sanXiaArr.push(item)
        }
      })
      this.tableData = sanXiaArr.concat(this.tableData)

      // mergeCells
      this.tableSetting.mergeCells = []
      let startZone = ''
      let startIndex = null
      let tempZone = ''
      for (let i = 0; i < this.tableData.length; i++) {
        // console.log(i)
        if (startZone === '') {
          startZone = this.tableData[i].zone
          startIndex = i
        } else if (i === this.tableData.length - 1) {
          if (startZone === tempZone) {
            this.tableSetting.mergeCells.push({
              row: startIndex,
              col: 0,
              rowspan: i - startIndex,
              colspan: 1
            })
          }
        } else {
          tempZone = this.tableData[i].zone
          if (startZone !== tempZone) {
            this.tableSetting.mergeCells.push({
              row: startIndex,
              col: 0,
              rowspan: i - startIndex,
              colspan: 1
            })
            startZone = this.tableData[i].zone
            startIndex = i
            tempZone = ''
          }
        }
      }

      // 警戒
      this.tableSetting.cell = []
      this.tableData.forEach((item, index) => {
        this.tableSetting.cell.push({
          row: index,
          col: 0,
          className: 'white-cell',
        })
        if (item.value >= item.floodHighLevel) {
          this.tableSetting.cell.push({
            row: index,
            col: 2,
            className: 'red-cell',
          })
        } else if (item.value < item.floodHighLevel && item.value >= item.floodLevel) {
          this.tableSetting.cell.push({
            row: index,
            col: 2,
            className: 'orange-cell',
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.engineering-info {
  .red-cell {
    color: red;
  }
  .orange-cell {
    color: orange;
  }
  .white-cell {
    background: white;
  }
}
</style>
<style lang="less" scoped>
.engineering-info {
  width: 100%;
  height: 800px;
  display: flex;
  .engineering-info-chart {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .gauge-chart-wrapper {
      width: 100%;
      height: 50%;
      padding: 25px;
      //overflow: auto;
      .gauge-chart-title {
        height: 40px;
        text-align: left;
        font-size: 20px;
        font-weight: bold;
        margin: 0 20px 10px 0;
        display: flex;
        justify-content: space-between;
        .tips {
          width: 5px;
          height: 30px;
          margin-right: 10px;
          background: #40a9ff;
        }
        .title {
          width: calc(100% - 100px);
          text-align: left;
        }
        .unit {
          font-size: 16px;
          font-weight: normal;
        }
      }
      .all-gauge-chart-container {
        width: 100%;
        height: calc(100% - 50px);
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        .gauge-chart-container {
          width: 25%;
          height: 150px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .gauge-chart {
            width: 100%;
            height: 125px;
            .chart {
              width: 100%;
              height: 100%;
            }
          }
          .gauge-chart-name {
            font-size: 18px;
            font-weight: bold;
          }
          .gauge-chart-des {
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
    }
    .bar-chart-wrapper {
      width: 100%;
      height: 50%;
      padding: 25px;
      overflow: auto;
      .bar-chart-title {
        height: 40px;
        text-align: left;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        .tips {
          width: 5px;
          height: 30px;
          margin-right: 10px;
          background: #40a9ff;
        }
        .title {
          width: calc(100% - 15px);
          text-align: left;
        }
      }
      .bar-chart-container {
        width: 100%;
        height: 300px;
        .bar-chart {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .engineering-info-table {
    width: 60%;
    height: 100%;
    padding: 25px;
    .table-container {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }
}
</style>