<template>
  <div class="draggable-chart-table">
    <div class="chart-container">
      <coherent-draggable-chart
        :data="newData"
        :dragFields="dragFields"
        :options="options"
        :key="randomKey"
        @updateData="handleUpdateData"
      />
    </div>
    <div class="table-container">
      <simple-table
        ref="tableRef"
        class="custom-tree-table"
        :tableData="newData"
        :setting="setting"
        @cellEditDone="cellEditDone"
        :tableColumns="tableColumns"
      ></simple-table>
    </div>
  </div>
</template>

<script>
import CoherentDraggableChart from "./CoherentDraggableChart.vue";
import SimpleTable from "../../SimpleTable/src/SimpleTable.vue";
export default {
  components: {
    CoherentDraggableChart,
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
    dragFields: {
      type: Array,
    },
    data: {
      type: Array,
    },
    options: {
      type: Object,
    },
    setting: {
      type: Object,
    },
  },
  data() {
    return {
      newData: [],
      randomKey: Math.random(),
    };
  },
  created() {
    this.newData = JSON.parse(JSON.stringify(this.data));
  },
  methods: {
    handleUpdateData(field, data) {
      // console.log("data", field, data);
      this.newData.forEach((el, index) => {
        el[field] = data[index];
      });
    },
    cellEditDone(value) {
      const { field, newValue, oldValue, rowIndex } = value;
      // console.log("pp", field, newValue, oldValue, rowIndex, this.newData);
      this.newData[rowIndex][field] = newValue;
      this.randomKey = Math.random();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>