// 引入组件
import SchemeComparisonChart from './SchemeComparisonChart'
SchemeComparisonChart.install = Vue => Vue.component(SchemeComparisonChart.name, SchemeComparisonChart)

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(SchemeComparisonChart)
}

export default SchemeComparisonChart
