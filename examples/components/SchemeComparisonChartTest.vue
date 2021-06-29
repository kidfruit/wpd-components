<template>
  <div style="width: 100%;">
    <SchemeComparisonChart
      :schemeComparisonData="schemeComparisonData"
      :isRefresh="isRefresh"
    />
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
  }
}
</script>

<style scoped>

</style>