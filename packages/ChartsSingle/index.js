// 引入组件
import ChartsSingle from './ChartsSingle/src'
ChartsSingle.install = Vue => Vue.component(ChartsSingle.name, ChartsSingle);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(ChartsSingle);
}

export default ChartsSingle;
