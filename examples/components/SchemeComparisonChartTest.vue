<template>
  <div style="width: 100%;">
    <SchemeComparisonChart
      ref="SchemeComparisonChart"
      :schemeComparisonData="schemeComparisonData"
    />
    <button @click="update">update</button>
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
      this.$refs.SchemeComparisonChart.update()
    }
  }
}
</script>

<style scoped>

</style>