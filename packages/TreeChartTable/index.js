// 引入组件
import TreeChartTable from "./TreeChartTable/src";
TreeChartTable.install = Vue =>
  Vue.component(TreeChartTable.name, TreeChartTable);

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(TreeChartTable);
}

export default TreeChartTable;
