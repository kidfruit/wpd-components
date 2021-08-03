import DispatchRuleRelationshipMap from "./DispatchRuleRelationshipMap/src";
DispatchRuleRelationshipMap.install = Vue => Vue.component(DispatchRuleRelationshipMap.name, DispatchRuleRelationshipMap)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(DispatchRuleRelationshipMap)
}

export default DispatchRuleRelationshipMap
