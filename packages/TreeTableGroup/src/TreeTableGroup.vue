<template>
  <div :class="classNames">
    <!-- <div class="chart-container">
      <standard-chart
        ref="chartRef"
        :chartOption="chartOption"
        :isRefresh="isRefresh"
        :chartAxis="chartAxis"
        :chartData="data"
      />
    </div> -->
    <div class="tree-container">444545</div>
    <div class="table-container">
      <simple-table
        ref="tableRef"
        :tableData="data"
        :tableColumns="tableColumns"
      ></simple-table>
    </div>
  </div>
</template>
<script>
import StandardChart from "../../StandardChart/src/StandardChart.vue";
import SimpleTable from "../../SimpleTable/src/SimpleTable.vue";

export default {
  name: "ChartTableGroup",
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
  components: {
    // StandardChart,
    SimpleTable,
  },
  beforeMount() {},
  mounted() {},
  data() {
    return {};
  },
  computed: {
    classNames() {
      return ["tree-table-group"].concat(this.classes);
    },
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.tree-container {
  width: 500px;
  float: left;
}
.table-container {
}
</style>
