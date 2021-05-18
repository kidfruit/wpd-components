// 引入组件
import ManyChart from './ManyChart/src'
ManyChart.install = Vue => Vue.component(ManyChart.name, ManyChart);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(ManyChart);
}

export default ManyChart;
