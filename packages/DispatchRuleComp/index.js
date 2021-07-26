// 引入组件
import DispatchRuleComp from './DispatchRuleComp/src'
DispatchRuleComp.install = Vue => Vue.Component(DispatchRuleComp.name, DispatchRuleComp)

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(DispatchRuleComp)
}

export default DispatchRuleComp
