// 引入组件
import TableChartInteractive from './TableChartInteractive/src'
TableChartInteractive.install = Vue => Vue.component(TableChartInteractive.name, TableChartInteractive);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(TableChartInteractive);
}

export default TableChartInteractive;