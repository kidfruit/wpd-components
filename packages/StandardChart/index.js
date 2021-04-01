// 引入组件
import StandardChart from './StandardChart/src'
StandardChart.install = Vue => Vue.component(StandardChart.name, StandardChart);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(StandardChart);
}

export default StandardChart;
