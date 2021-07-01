<template>
  <div style="width: 100%;">
    <SchemeComparisonChart
      ref="schemeComparison"
      :schemeComparisonData="schemeComparisonData"
    />
    <button @click="update">刷新</button>
  </div>
</template>

<script>
import SchemeComparisonChart from "~/SchemeComparisonChart/src/SchemeComparisonChart"
import schemeComparisonData from '../assets/mock/SchemeComparison.json'
export default {
  name: "SchemeComparisonChartTest",
  components: { SchemeComparisonChart },
  data() {
    return {
      schemeComparisonData,
      isRefresh: true,
    }
  },
  methods: {
    update() {
      this.$refs.schemeComparison.updateChart()
    }
  }
}
</script>

<style scoped>

</style>