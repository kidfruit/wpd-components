<template>
  <div :class="classNames">
    <a-row
      type="flex"
      justify="space-around"
      style="margin-bottom: 5px;height: 100%;"
      align="middle"
    >
      <a-col :span="4" class="tree-container">
        <simple-tree
          ref="treeRef"
          :treeData="treeData"
          @select="handleSelect"
        ></simple-tree>
      </a-col>
      <a-col :span="20" style="height: 100%;">
        <a-row class="chart-container">
          <standard-chart
            ref="chartRef"
            :id="id"
            :chartOption="newOption"
            :isRefresh="isRefresh"
            :chartAxis="newAxis"
            :chartData="newData"
          />
        </a-row>
        <a-row class="table-container">
          <simple-table
            ref="tableRef"
            :tableData="newData"
            :setting="setting"
            :tableColumns="columns"
          ></simple-table>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import StandardChart from '../../StandardChart/src/StandardChart.vue'
import SimpleTable from '../../SimpleTable/src/SimpleTable.vue'
import SimpleTree from '../../SimpleTree/src/SimpleTree.vue'
import * as echarts from 'echarts'
let rCols = [
  {
    field: 'sectionCode',
    title: '断面编码',
    readOnly: true,
  },
  {
    field: 'sectionDistanceArray',
    title: '断面间距',
    readOnly: true,
  },
  {
    field: 'sectionQArray',
    title: '初始流量(m³/s)',
    readOnly: true,
  },
  {
    field: 'sectionZArray',
    title: '初始水位(m)',
    readOnly: true,
  },
  {
    field: 'rough',
    title: '断面糙率',
    readOnly: true,
  },
]
let qCols = [
  {
    field: 'diArray',
    title: '起点距',
    titleAlign: 'center',
    columnAlign: 'center',
    readOnly: true,
  },
  {
    field: 'zbArray',
    title: '高程',
    titleAlign: 'center',
    columnAlign: 'center',
    isResize: true,
    readOnly: true,
  },
]
let rAxis = {
  xAxis: [
    {
      // gridIndex: 0,
      type: 'category',
      show: true,
      data: [],
    },
    // {
    //   // gridIndex: 0,
    //   type: "category",
    //   data: [],
    // },
  ],
  timeSeries: true,
  yAxis: [
    {
      title: '初始水位(m)',
      yAxisIndex: 0,
      xAxisIndex: 0,
      gridIndex: 0,
    },
    {
      title: '初始流量(m³/s)',
      yAxisIndex: 1,
      xAxisIndex: 0,
      gridIndex: 0,
    },
  ],
  series: [
    {
      field: 'sectionZArray',
      title: '初始水位(m)',
      selected: true,
      yAxisIndex: 0,
      xAxisIndex: 0,
    },
    {
      field: 'sectionQArray',
      title: '初始流量(m³/s)',
      selected: true,
      yAxisIndex: 1,
      xAxisIndex: 0,
    },
  ],
}

let qAxis = {
  xAxis: 'diArray',
  timeSeries: true,
  yAxis: [
    {
      title: '高程(m)',
      yAxisIndex: 0,
    },
  ],
  series: [
    {
      field: 'zbArray',
      title: '高程(m)',
      selected: true,
      yAxisIndex: 0,
    },
  ],
}
let rGrid = [
  //0降雨
  { x: '9%', y: '9%', height: '84%', left: '5%', right: '5%' },
  //1水位流量
  // { x: "7%", y2: "7%", height: "35%", left: "10%", bottom: "7%" },
]
let qGrid = {
  bottom: 70,
}
export default {
  name: 'TreeChartTable',
  components: {
    StandardChart,
    SimpleTable,
    SimpleTree,
  },
  props: {
    classes: {
      type: Array,
      required: false,
    },
    isRefresh: {
      type: Boolean,
      default: true,
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
    },
    data: {
      type: Array,
    },
    treeData: {
      type: Array,
    },
    rawData: {
      type: Object,
    },
    setting: {
      type: Object,
    },
    id: {
      type: String,
    },
    extraOptions: {
      type: Object,
    },
  },
  computed: {
    classNames() {
      return ['tree-chart-table'].concat(this.classes)
    },
  },
  created() {
    this.handleData()
  },
  beforeMount() {},
  mounted() {
    this.handleData()
    // setTimeout(() => {
    //   this.setTableWidth('100%')
    // }, 10)
  },
  methods: {
    // setTableWidth(width) {
    //   // 也可以动态设置handsontable的宽度
    //   this.$refs.tableRef.updateWidth(width)
    // },
    handleSelect(keys) {
      this.selectedKeys = keys
      this.$nextTick(() => {
        this.handleData()
      })
    },
    handleData() {
      this.newData = []
      if (
        this.selectedKeys.length === 0 ||
        this.selectedKeys[0] === this.rawData.riverReachId
      ) {
        this.newOption = Object.assign({}, this.chartOption, { grid: rGrid })
        this.columns = rCols
        rAxis.xAxis.forEach((el) => {
          el.data = this.rawData.sectionDataList.map((el) => el.sectionCode)
        })
        this.newAxis = Object.assign(rAxis, this.chartAxis)
        this.rawData.sectionDataList.forEach((el, index) => {
          this.newData.push({
            sectionCode: el.sectionCode,
            sectionDistanceArray: this.rawData.sectionDistanceArray[index],
            sectionQArray: this.rawData.sectionQArray[index],
            sectionZArray: this.rawData.sectionZArray[index],
            rough: el.rough,
          })
        })
        setTimeout(() => {
          this.$refs.chartRef.setDynamicOption()
        }, 10)
        if (this.selectedKeys[0] === this.rawData.riverReachId) {
          // this.$refs.tableRef.reset()
          // this.$refs.tableRef.updateShow()
          this.updateShow()
        }
      } else {
        // this.instance = echarts.getInstanceByDom(
        //   document.getElementsByClassName("chart tree-chart")[0]
        // );
        // 清除殘留的圖表數據
        this.$refs.chartRef.clear()

        this.newOption = Object.assign(
          {},
          this.chartOption,
          { grid: qGrid },
          this.extraOptions
        )
        setTimeout(() => {
          this.$refs.chartRef.setDynamicOption()
        }, 10)

        this.columns = qCols
        this.newAxis = Object.assign(qAxis, this.chartAxis)
        let item = this.rawData.sectionDataList.find(
          (el) => el.sectionCode === this.selectedKeys[0]
        )
        item.diArray.forEach((el, index) => {
          this.newData.push({
            diArray: el,
            zbArray: item.zbArray[index],
          })
        })
        // this.$refs.tableRef.reset()
        // this.$refs.tableRef.updateShow()
        this.updateShow()
      }
    },
    updateShow() {
      if (this.$refs.chartRef) {
        this.$refs.chartRef.resizeTheChart()
      }
      if (this.$refs.tableRef) {
        this.$refs.tableRef.reset()
      }
      if (this.$refs.tableRef) {
        this.$refs.tableRef.updateShow()
      }
    },
  },
  data() {
    return {
      newData: [],
      columns: [],
      newAxis: {},
      selectedKeys: [],
      instance: null,
      newOption: null,
    }
  },
}
</script>

<style lang="scss" scoped>
.tree-chart-table {
  height: 100%;
  .tree-container {
    text-align: left;
    overflow: auto;
    height: 100%;
  }
  .chart-container {
    margin-bottom: 20px;
  }
  .table-container {
    overflow: hidden;
    height: calc(100% - 320px);
    .simple-table {
      height: 100% !important;
    }
  }
}
</style>
<style lang="scss">
.tree-chart-table {
  .table-container {
    .simple-table {
      .tableStyle {
        height: 100% !important;
      }
    }
  }
}
</style>