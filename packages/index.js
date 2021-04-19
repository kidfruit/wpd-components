// 导入颜色选择器组件
import toast2 from "./toast2/src/toast2.vue";
import ChartTable from "./ChartTable/src/ChartTable.vue";
import CharacteristicCurve from "./CharacteristicCurve/src/CharacteristicCurve.vue";
import TableChartInteractive from "./TableChartInteractive/src/TableChartInteractive.vue";
import SchemeTable from "./SchemeTable/src/SchemeTable.vue";
import SimpleTable from "./SimpleTable/src/SimpleTable.vue";
import SimpleChart from "./SimpleChart/src/SimpleChart.vue";
import StandardChart from "./StandardChart/src/StandardChart.vue";
import ChartTableGroup from "./ChartTableGroup/src/ChartTableGroup.vue";
import TreeTableGroup from "./TreeTableGroup/src/TreeTableGroup.vue";
import ResultHydroDynamic from "./ResultHydroDynamic/src/ResultHydroDynamic.vue";
import TreeChartTable from "./TreeChartTable/src/TreeChartTable.vue";
import CurveChart from "./CurveChart/src/CurveChart.vue";


import testDirective from "./testDirective/src/testDirective";
import MultiOptionTable from "./MultiOptionTable/src/MultiOptionTable.vue";
import TreeSimpleTableGroup from "./TreeSimpleTableGroup/src/TreeSimpleTableGroup.vue";


// 存储组件列表
const components = [
  toast2,
  ChartTable,
  CharacteristicCurve,
  TableChartInteractive,
  SchemeTable,
  SimpleTable,
  SimpleChart,
  MultiOptionTable,
  StandardChart,
  ChartTableGroup,
  TreeTableGroup,
  ResultHydroDynamic,
  TreeSimpleTableGroup,
  TreeChartTable,
  CurveChart
];

// 存储指令映射
export const directives = {
  testDirective
};

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component));

  // 遍历注册指令
  Reflect.ownKeys(directives).map(name =>
    Vue.directive(name, directives[name])
  );
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  toast2,
  ChartTable,
  CharacteristicCurve,
  TableChartInteractive,
  SchemeTable,
  SimpleTable,
  MultiOptionTable,
  SimpleChart,
  StandardChart,
  ChartTableGroup,
  TreeTableGroup,
  ResultHydroDynamic,
  TreeSimpleTableGroup,
  TreeChartTable,
  CurveChart,

  ...directives
};
