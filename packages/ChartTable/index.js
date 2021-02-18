// 引入组件
import ChartTable from './ChartTable/src'
ChartTable.install = Vue => Vue.component(ChartTable.name, ChartTable);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(ChartTable);
}

export default ChartTable;