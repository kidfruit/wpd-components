<template>
  <div>
    <DispatchRuleRelationshipMap
      ref="dispatchRuleRelationshipMapRef"
      :ruleData="ruleData"
    />
  </div>
</template>

<script>
import mockData from '../assets/mock/DispatchScheme.json';
export default {
  name: "DispatchRuleRelationshipMapTest",
  data() {
    return {
      ruleData: mockData
    }
  }
}
</script>

<style scoped>

</style>
