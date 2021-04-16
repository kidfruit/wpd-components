<template>
  <div :class="classNames">
    <div class="left-box">
      <div class="chart-container box-border">
        <!-- <standard-chart
          ref="chartRef"
          :chartOption="chartOption"
          :isRefresh="isRefresh"
          :chartAxis="chartAxis"
          :classes="['result-hydro-dynamic']"
          :chartData="data"
        /> -->
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

var rCols = [
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
var qCols = [
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
export default {
  name: "TreeChartTable",
  components: {
    // StandardChart,
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
    // this.chartOption.timeline.data = this.data.map((el) => el.time);
    // // 将多个时间线的数据拆分
    // let sections = this.data.map((el) => el.section);
    // let fields = this.chartAxis.series.map((el) => el.field);
    // let deltaFields = [];
    // let regstrs = [];
    // this.newData = JSON.parse(JSON.stringify(this.data));
    // sections.forEach((element) => {
    //   fields.forEach((item) => {
    //     this.newData.forEach((el) => {
    //       if (el[item]) {
    //         if (deltaFields.indexOf(`${element}.${item}`) === -1) {
    //           deltaFields.push(`${element}.${item}`);
    //         }
    //       }
    //     });
    //   });
    // });
    // this.newData.forEach((el) => {
    //   fields.forEach((item) => {
    //     if (el[item]) {
    //       if (regstrs.indexOf(item) === -1) {
    //         regstrs.push(item);
    //       }
    //       el[item].forEach((ele, index) => {
    //         el[`${sections[index]}.${item}`] = ele;
    //       });
    //       delete el[item];
    //     }
    //   });
    // });
    // // 处理columns
    // this.columns = JSON.parse(JSON.stringify(this.tableColumns));
    // deltaFields.forEach((el) => {
    //   let n = regstrs.find((item) => el.indexOf(item) != -1);
    //   let m = this.columns.find((el) => el.field === n);
    //   this.columns.push({
    //     field: el,
    //     title: m.title,
    //     // width: 100,
    //     isResize: true,
    //     titleAlign: "center",
    //     columnAlign: "center",
    //     readOnly: true,
    //   });
    // });
    // regstrs.forEach((el) => {
    //   let index = this.columns.findIndex((item) => item.field === el);
    //   this.columns.splice(index, 1);
    // });
    // // 自定义表头
    // // let nestedHeaders = [];
    // let notFields = this.columns
    //   .filter((el) => {
    //     return (
    //       regstrs.findIndex((item) => el.field.indexOf(item) !== -1) === -1
    //     );
    //   })
    //   .map((el) => el.title)
    //   .map((el) => {
    //     return { label: "", colspan: 1 };
    //   });
    // let sectionFields = sections.map((el) => {
    //   return { label: el, colspan: 2 };
    // });
    // this.setting.nestedHeaders.push(notFields.concat(sectionFields));
    // this.setting.nestedHeaders.push(
    //   this.columns.map((el) => {
    //     return { label: el.title, colspan: 1 };
    //   })
    // );
    // console.log(this.columns, this.newData);
  },
  beforeMount() {
    console.log(this.selectedKeys);
  },
  mounted() {
    // 也可以动态设置handsontable的宽度
    // this.$refs.tableRef.updateWidth("70vw");
    console.log(this.selectedKeys);
  },
  methods: {
    handleSelect(keys) {
      this.selectedKeys = keys;
      this.handleData();
    },
    handleData() {
      this.newData = [];
      console.log(this.selectedKeys, 333);
      if (
        this.selectedKeys.length === 0 ||
        this.selectedKeys[0] === this.rawData.riverReachId
      ) {
        this.columns = rCols;
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
        this.columns = qCols;
        let item = this.rawData.sectionDataList.find(
          (el) => el.sectionCode === this.selectedKeys[0]
        );
        console.log(item);
        item.diArray.forEach((el, index) => {
          this.newData.push({
            diArray: el,
            zbArray: item.zbArray[index],
          });
        });
        this.$refs.tableRef.reset();
        this.$refs.tableRef.updateShow();
      }
      console.log(this.newData, this.columns, "newData");
    },
  },
  data() {
    return {
      newData: [],
      columns: [],
      setting: {},
      selectedKeys: [],
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