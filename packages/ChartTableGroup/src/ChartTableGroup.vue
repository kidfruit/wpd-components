<template>
  <div :class="classNames">
    <div class="chart-container">
      <standard-chart
        ref="chartRef"
        :id="id"
        :key="randomKey"
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
        :tableColumns="tableColumns"
        @cellEditDone="cellEditDone"
      ></simple-table>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'
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
      randomKey: uuidv4()
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
      this.randomKey = uuidv4()
    }
  }
};
</script>
