// 引入组件
import TableChart from './TableChart/src'
TableChart.install = Vue => Vue.component(TableChart.name, TableChart);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(TableChart);
}

export default TableChart;