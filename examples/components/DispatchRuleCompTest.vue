<template>
  <div>
    <dispatch-rule
      ref="dispatchRuleRef"
      :classes="classNames"
      :ruleData="ruleData"
      :editable="true"
      :selectId="'60103165'"
      @getData="getData"
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
  methods: {
    getData(data){
      console.log(data)
    }
  }
};
</script>

<style lang="less" scoped>
.test-dispatch-rule {
}
</style>
