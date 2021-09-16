// 引入组件
import TimePlayControl from "./TimePlayControl/src";
TimePlayControl.install = Vue => Vue.component(TimePlayControl.name, TimePlayControl);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(TimePlayControl);
}

export default TimePlayControl;
