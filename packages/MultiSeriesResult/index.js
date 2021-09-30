// 引入组件
import MultiSeriesResult from "./MultiSeriesResult/src";
MultiSeriesResult.install = Vue => Vue.component(MultiSeriesResult.name, MultiSeriesResult);

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(MultiSeriesResult);
}

export default MultiSeriesResult;
