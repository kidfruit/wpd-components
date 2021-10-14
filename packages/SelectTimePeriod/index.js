// 引入组件
import SelectTimePeriod from './SelectTimePeriod/src'
SelectTimePeriod.install = Vue => Vue.component(SelectTimePeriod.name, SelectTimePeriod)

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(SelectTimePeriod)
}

export default SelectTimePeriod
