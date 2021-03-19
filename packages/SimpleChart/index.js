// 引入组件
import SimpleChart from './SimpleChart/src'
SimpleChart.install = Vue => Vue.component(SimpleChart.name, SimpleChart);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(SimpleChart);
}

export default SimpleChart;
