<template>
  <div :class="classNames">
    <div class="chart-container">
      <standard-chart
        ref="chartRef"
        :chartOption="chartOption"
        :isRefresh="isRefresh"
        :chartAxis="chartAxis"
        :chartData="data"
        :key="randomKey"
        :id="id"
      />
    </div>
    <div class="table-container">
      <simple-table
        ref="tableRef"
        :tableData="data"
        :tableColumns="tableColumns"
        @cellEditDone="cellEditDone"
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
    StandardChart,
    SimpleTable,
  },
  beforeMount() {},
  mounted() {},
  data() {
    return {
      randomKey: +new Date() + (Math.random() * 1000).toFixed(0)
    };
  },
  computed: {
    classNames() {
      return ["chart-table-group"].concat(this.classes);
    },
    id() {
      return 'chart-table-group-' + this.randomKey
    }
  },
  methods: {
    cellEditDone(value) {
      const { field, newValue, oldValue, rowIndex } = value
      // this.$set(this.data[rowIndex], field, +newValue)
      this.data[rowIndex][field] = +newValue
      this.randomKey = +new Date() + ((Math.random() * 1000).toFixed(0) + '')
    }
  }
};
</script>
