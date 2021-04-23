// 引入组件
import DraggableChart from "./DraggableChart/src";
DraggableChart.install = Vue =>
  Vue.component(DraggableChart.name, DraggableChart);

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(DraggableChart);
}

export default DraggableChart;
