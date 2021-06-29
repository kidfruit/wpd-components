// 引入组件
import StatusInfoComp from './StatusInfoComp'
StatusInfoComp.install = Vue => Vue.component(StatusInfoComp.name, StatusInfoComp)

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(StatusInfoComp)
}

export default StatusInfoComp
