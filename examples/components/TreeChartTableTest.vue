<template>
  <div style="width: 100%">
    <tree-chart-table></tree-chart-table>
  </div>
</template>

<script>
import TreeChartTable from "../../packages/TreeChartTable/src/TreeChartTable.vue";
import fakeData from "../assets/mock/treeChartTable.json";
export default {
  components: {
    TreeChartTable,
  },
  created() {
    console.log("fakeData", fakeData);
  },
};
</script>

<style lang="scss" scoped>
</style>