<template>
  <div :class="classNames">
    <div class="left-box">
      <div class="chart-container box-border">
        <standard-chart
          ref="chartRef"
          :chartOption="newOption"
          :isRefresh="isRefresh"
          :chartAxis="newAxis"
          :classes="['tree-chart']"
          :chartData="newData"
        />
      </div>
      <div class="table-container box-border">
        <simple-table
          ref="tableRef"
          class="custom-tree-table"
          :tableData="newData"
          :setting="setting"
          :tableColumns="columns"
        ></simple-table>
      </div>
    </div>
    <div class="right-box box-border">
      <simple-tree
        ref="treeRef"
        :treeData="treeData"
        @select="handleSelect"
      ></simple-tree>
    </div>
  </div>
</template>

<script>
import StandardChart from "../../StandardChart/src/StandardChart.vue";
import SimpleTable from "../../SimpleTable/src/SimpleTable.vue";
import SimpleTree from "../../SimpleTree/src/SimpleTree.vue";
import * as echarts from "echarts";
let rCols = [
  {
    field: "sectionCode",
    title: "断面编码",
    width: 20,
    titleAlign: "center",
    columnAlign: "center",
    readOnly: true,
  },
  {
    field: "sectionDistanceArray",
    title: "断面间距",
    titleAlign: "center",
    columnAlign: "center",
    isResize: true,
    readOnly: true,
  },
  {
    field: "sectionQArray",
    title: "初始流量(m³/s)",
    isResize: true,
    titleAlign: "center",
    columnAlign: "center",
    readOnly: true,
  },
  {
    field: "sectionZArray",
    title: "初始水位(m)",
    isResize: true,
    titleAlign: "center",
    columnAlign: "center",
    readOnly: true,
  },
  {
    field: "rough",
    title: "断面糙率",
    isResize: true,
    titleAlign: "center",
    columnAlign: "center",
    readOnly: true,
  },
];
let qCols = [
  {
    field: "diArray",
    title: "起点距",
    titleAlign: "center",
    columnAlign: "center",
    readOnly: true,
  },
  {
    field: "zbArray",
    title: "高程",
    titleAlign: "center",
    columnAlign: "center",
    isResize: true,
    readOnly: true,
  },
];
let rAxis = {
  xAxis: [
    {
      gridIndex: 0,
      type: "category",
      show: false,
      data: [],
    },
    {
      gridIndex: 1,
      type: "category",
      data: [],
    },
  ],
  timeSeries: true,
  yAxis: [
    {
      title: "初始水位(m)",
      yAxisIndex: 1,
      xAxisIndex: 1,
      gridIndex: 1,
    },
    {
      title: "初始流量(m³/s)",
      yAxisIndex: 0,
      xAxisIndex: 0,
      gridIndex: 0,
    },
  ],
  series: [
    {
      field: "sectionQArray",
      title: "初始水位(m)",
      selected: true,
      yAxisIndex: 1,
      xAxisIndex: 1,
    },
    {
      field: "sectionZArray",
      title: "初始流量(m³/s)",
      selected: true,
      yAxisIndex: 0,
      xAxisIndex: 0,
    },
  ],
};

let qAxis = {
  xAxis: "diArray",
  timeSeries: true,
  yAxis: [
    {
      title: "高程(m)",
      yAxisIndex: 0,
    },
  ],
  series: [
    {
      field: "zbArray",
      title: "高程(m)",
      selected: true,
      yAxisIndex: 0,
    },
  ],
};
let rGrid = [
  //0降雨
  { x: "7%", y: "7%", height: "35%", left: "10%" },
  //1水位流量
  { x: "7%", y2: "7%", height: "35%", left: "10%", bottom: "7%" },
];
let qGrid = {
  bottom: 70,
};
export default {
  name: "TreeChartTable",
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
  },
  computed: {
    classNames() {
      return ["tree-chart-table"].concat(this.classes).join(" ");
    },
  },
  created() {
    this.handleData();
  },
  beforeMount() {},
  mounted() {
    this.handleData();
    // 也可以动态设置handsontable的宽度
    // this.$refs.tableRef.updateWidth("70vw");
  },
  methods: {
    handleSelect(keys) {
      this.selectedKeys = keys;
      this.handleData();
    },
    handleData() {
      this.newData = [];
      if (
        this.selectedKeys.length === 0 ||
        this.selectedKeys[0] === this.rawData.riverReachId
      ) {
        this.newOption = Object.assign({}, this.chartOption, { grid: rGrid });
        this.columns = rCols;
        rAxis.xAxis.forEach((el) => {
          el.data = this.rawData.sectionDataList.map((el) => el.sectionCode);
        });
        this.newAxis = rAxis;
        this.rawData.sectionDataList.forEach((el, index) => {
          this.newData.push({
            sectionCode: el.sectionCode,
            sectionDistanceArray: this.rawData.sectionDistanceArray[index],
            sectionQArray: this.rawData.sectionQArray[index],
            sectionZArray: this.rawData.sectionZArray[index],
            rough: el.rough,
          });
        });
        if (this.selectedKeys[0] === this.rawData.riverReachId) {
          this.$refs.tableRef.reset();
          this.$refs.tableRef.updateShow();
        }
      } else {
        this.instance = echarts.getInstanceByDom(
          document.getElementsByClassName("chart tree-chart")[0]
        );
        // 清除殘留的圖表數據
        this.instance.clear();
        this.newOption = Object.assign({}, this.chartOption, { grid: qGrid });

        this.columns = qCols;
        this.newAxis = qAxis;
        let item = this.rawData.sectionDataList.find(
          (el) => el.sectionCode === this.selectedKeys[0]
        );
        item.diArray.forEach((el, index) => {
          this.newData.push({
            diArray: el,
            zbArray: item.zbArray[index],
          });
        });
        this.$refs.tableRef.reset();
        this.$refs.tableRef.updateShow();
      }
    },
  },
  data() {
    return {
      newData: [],
      columns: [],
      setting: {},
      newAxis: {},
      selectedKeys: [],
      instance: null,
      newOption: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.tree-chart-table {
  display: flex;
  .left-box {
    width: 80vw;
    margin-right: 24px;
    .chart-container,
    .table-container {
      width: 100%;
    }
  }
  .right-box {
    flex: 1;
    padding: 8px 10px;
    .ant-tree {
      height: 100%;
      max-height: 76vh;
      overflow: auto;
      ::v-deep > li {
        text-align: left;
      }
    }
  }
  .box-border {
    border: 1px solid #096dd9;
  }
}
</style>
<style>
.tree-chart-table
  .table-container
  .custom-tree-table
  .tableStyle.handsontable
  .wtHider {
  /* width: 70vw !important; */
}
</style>