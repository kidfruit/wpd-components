<template>
  <div>
    <dispatch-rule
      ref="dispatchRuleRef"
      :classes="classNames"
      :ruleData="ruleData"
      :currentId="'60106980'"
    />
  </div>
</template>

<script>
import DispatchRule from '../../packages/DispatchRuleComp/src/DispatchRuleComp.vue';
import mockData from '../assets/mock/DispatchScheme.json';

export default {
  components: {
    DispatchRule
  },
  data() {
    return {
      classNames: ['test-dispatch-rule'],
      ruleData:mockData
    };
  },
  mounted() {

  },
  methods: {}
};
</script>

<style lang="less" scoped>
.test-dispatch-rule {
}
</style>
