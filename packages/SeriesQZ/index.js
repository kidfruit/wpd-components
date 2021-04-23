// 引入组件
import SeriesQZ from "./SeriesQZ/src";
SeriesQZ.install = Vue => Vue.component(SeriesQZ.name, SeriesQZ);

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(SeriesQZ);
}

export default SeriesQZ;
