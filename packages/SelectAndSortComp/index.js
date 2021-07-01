// 引入组件
import SelectAndSortComp from './SelectAndSortComp/src'
SelectAndSortComp.install = Vue => Vue.Component(SelectAndSortComp.name, SelectAndSortComp)

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(SelectAndSortComp)
}

export default SelectAndSortComp
