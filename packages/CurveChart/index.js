// 引入组件
import CurveChart from './CurveChart/src'
CurveChart.install = Vue => Vue.component(CurveChart.name, CurveChart);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(CurveChart);
}

export default CurveChart;