<template>
  <div :classes="classNames">
    <div class="left-box">
      <div class="chart-container">
        <standard-chart
          ref="chartRef"
          :chartOption="chartOption"
          :isRefresh="isRefresh"
          :chartAxis="chartAxis"
          :classes="['result-hydro-dynamic']"
          :chartData="data"
        />
      </div>
      <div class="table-container">
        <simple-table
          ref="tableRef"
          :tableData="newData"
          :setting="setting"
          :tableColumns="columns"
        ></simple-table>
      </div>
    </div>
    <div class="right-box"></div>
  </div>
</template>

<script>
import StandardChart from "../../StandardChart/src/StandardChart.vue";
import SimpleTable from "../../SimpleTable/src/SimpleTable.vue";
export default {
  name: "TreeChartTable",
  components: {
    StandardChart,
    SimpleTable,
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
  },
  computed: {
    classNames() {
      return ["tree-chart-table"].concat(this.classes).join(" ");
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>