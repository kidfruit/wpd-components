// 引入组件
import SectionInit from "./SectionInit/src";
SectionInit.install = Vue =>
  Vue.component(SectionInit.name, SectionInit);

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(SectionInit);
}

export default SectionInit;
