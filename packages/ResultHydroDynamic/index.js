// 引入组件
import ResultHydroDynamic from './ResultHydroDynamic/src'
ResultHydroDynamic.install = Vue => Vue.component(ResultHydroDynamic.name, ResultHydroDynamic);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(ResultHydroDynamic);
}

export default ResultHydroDynamic;
