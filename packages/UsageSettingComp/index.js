// 引入组件
import UsageSettingComp from './UsageSettingComp/src'
UsageSettingComp.install = Vue => Vue.Component(UsageSettingComp.name, UsageSettingComp)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(UsageSettingComp)
}

export default UsageSettingComp
