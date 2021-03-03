<template>
  <div v-if="data.tableData">
    <v-chart
      ref="vChart"
      theme="ovilia-green"
      :options="options"
      style="width:100%;"
    ></v-chart>
    <v-table
      ref="vTable"
      is-horizontal-resize
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      :row-height="tableRowHeight"
      :height="tableHeight"
      style="width:100%"
      column-width-drag
      :columns="tableColumns"
      :table-data="tableData"
      :cell-edit-done="cellEditDone"
      :is-vertical-resize="true"
      :vertical-resize-offset="5"
    ></v-table>
  </div>
</template>
<script>
import utils from "./utils";
export default {
  name: "ChartTable",
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      required: true,
    },
    tableHeight: {
      type: Number,
      default: 300,
    },
    tableRowHeight: {
      type: Number,
      default: 34,
    },
  },
  data() {
    return {
      options: {},
    };
  },
  computed: {
    tableData: {
      get() {
        return this.data.tableData;
      },
    },
    tableColumns: {
      get() {
        if (!this.editable) {
          this.data.tableColumns.forEach((element) => {
            element.isEdit = false;
          });
        }
        return this.data.tableColumns;
      },
    },
  },
  watch: {
    tableData: {
      handler(nValue) {
        if (nValue) {
          this.updateCharts();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    console.log("--", this.data);
  },
  methods: {
    // 单元格编辑回调
    cellEditDone(newValue, oldValue, rowIndex, rowData, field) {
      // 将编辑指令返回到父页面，再被动更新自身
      this.$emit("cellEditDone", {
        rowIndex: rowIndex,
        field: field,
        newValue: newValue,
        oldValue: oldValue,
        rowData: rowData,
      });
    },
    // 更新图
    updateCharts() {
      let data = utils.tableData2Charts(this.tableData, this.tableColumns);
      this.options = {
        tooltip: {
          show: true,
          trigger: "axis",
          // confine: true,
          // transitionDuration: 0,
          // formatter(params) {
          //   		return params[0] && params[0].dataIndex
          //   			? `<span>
          //   	${unit[attr][0]}：${params[0].value[1]}${unit[attr][1]}<br />
          //   	${unit[attr][2]}：${params[0].value[0]}${unit[attr][3]}
          //   </span>`
          //   			: '';
          // },
        },
        legend: { data: data.legendData },
        xAxis: {
          type: "category",
          data: data.xAxisData,
          max: (value) => value.max,
          min: (value) => value.min,
        },
        yAxis: {
          type: "value",
          max: (value) => value.max,
          min: (value) => value.min,
        },
        series: data.seriesData,
      };
      this.resize();
    },
    resize() {
      if (this.$refs.vChart) {
        this.$refs.vChart.resize();
      }
      if (this.$refs.vTable) {
        this.$refs.vTable.resize();
      }
    },

    //
  },
};
</script>
<style scoped lang="scss">
.v-table-rightview {
  width: 100%;
}
// .echarts{
//   width: 100%;
// }
</style>
