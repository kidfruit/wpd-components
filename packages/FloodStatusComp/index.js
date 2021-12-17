// 引入组件
import FloodStatusComp from './FloodStatusComp/src'
FloodStatusComp.install = Vue => Vue.component(FloodStatusComp.name, FloodStatusComp)

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(FloodStatusComp)
}

export default FloodStatusComp
