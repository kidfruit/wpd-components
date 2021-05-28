// 引入组件
import SeriesCompare from './SeriesCompare/src';
SeriesCompare.install = Vue => Vue.component(SeriesCompare.name, SeriesCompare);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SeriesCompare);
}

export default SeriesCompare;
