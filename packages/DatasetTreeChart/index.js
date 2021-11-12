// 引入组件
import DatasetTreeChart from './DatasetTreeChart/src'
DatasetTreeChart.install = Vue => Vue.Component(DatasetTreeChart.name, DatasetTreeChart)

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(DatasetTreeChart)
}

export default DatasetTreeChart
