// 引入组件
import CoherentDraggableChart from "./CoherentDraggableChart/src";
CoherentDraggableChart.install = Vue =>
  Vue.component(CoherentDraggableChart.name, CoherentDraggableChart);

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(CoherentDraggableChart);
}

export default CoherentDraggableChart;
