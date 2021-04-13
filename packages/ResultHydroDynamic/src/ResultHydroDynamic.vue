<template>
  <div :classes="classNames">
    <div class="chart-container">
      <standard-chart
        ref="chartRef"
        :chartOption="chartOption"
        :isRefresh="isRefresh"
        :chartAxis="chartAxis"
        :chartData="data"
      />
    </div>
    <div class="table-container">
      <simple-table
        ref="tableRef"
        :tableData="data"
        :setting="setting"
        :tableColumns="tableColumns"
      ></simple-table>
    </div>
  </div>
</template>

<script>
import StandardChart from "../../StandardChart/src/StandardChart.vue";
import SimpleTable from "../../SimpleTable/src/SimpleTable.vue";
export default {
  name: "ResultHydroDynamic",
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
      return ["chart-table-group"].concat(this.classes);
    },
  },
  created() {
    console.log(this.tableColumns);
    //  ["A", { label: "B", colspan: 8 }, "C"],
    //       ["D", { label: "E", colspan: 4 }, { label: "F", colspan: 4 }, "G"],
    //       ["H", "I", "J", "K", "L", "M", "N", "R", "S", "T"],
  },
  beforeMount() {},
  mounted() {},
  data() {
    return {
      setting: {
        nestedHeaders: [
          ["A", { label: "B", colspan: 2 }, "C"],
          ["D", { label: "E", colspan: 2 }, { label: "F", colspan: 2 }, "G"],
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>