<template>
  <div :class="classNames" :key="randomKey">
    <div class="chart-container">
      <standard-chart
          ref="chartRef"
          :classes="['result-hydro-dynamic']"
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
export default {
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
      return ["series-qz"].concat(this.classes);
    },
    id() {
      return 'series-qz-' + this.randomKey
    }
  },
  methods: {
    handleData() {
      // 构造newData
      this.newData = []
      this.tableData.forEach(item => {
        this.singleData.forEach(element => {
          item[element.field] = element.value
        })
      })
      this.newData = this.tableData

      // 构造series
      this.chartAxis.series = []
      this.tableColumns.forEach((item, index) => {
        if (index > 1) {
          if (item.field === 'RD_RR_UPZ_P') {
            this.chartAxis.series.push({
              title: item.title,
              field: item.field,
              yAxisIndex: 0
            })
          } else {
            this.chartAxis.series.push({
              title: item.title,
              field: item.field,
              yAxisIndex: 1
            })
          }
        }
      })
      this.singleData.forEach(item => {
        this.chartAxis.series.push({
          title: item.title,
          field: item.field,
          yAxisIndex: 0
        })
      })

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
      this.randomKey = +new Date() + ((Math.random() * 1000).toFixed(0) + '')
    }
  }
};
</script>

<style lang="scss" scoped>
.series-qz {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 400px;
  .chart-container,
  .table-container {
    width: 50%;
    height: 100%;
  }
  .chart-container {
    .result-hydro-dynamic {
      height: 350px !important;
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
</style>
