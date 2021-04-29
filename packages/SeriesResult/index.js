// 引入组件
import SeriesResult from "./SeriesResult/src";
SeriesResult.install = Vue => Vue.component(SeriesResult.name, SeriesResult);

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(SeriesResult);
}

export default SeriesResult;
