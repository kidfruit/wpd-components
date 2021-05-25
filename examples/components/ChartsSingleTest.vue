<template>
  <div style="width: 100%">
    <charts-single ref="chart"
                :chartDatas="many_chart"
                :classes="classNames"
                :isRefresh="isRefresh"
                />
  </div>
</template>
<script>
import ChartsSingle from '../../packages/ChartsSingle/src/ChartsSingle.vue'
import many_chart from '../assets/mock/manyChart.json'
export default {
  name: 'ChartsSingleTest',
  components: { ChartsSingle },
  data() {
    return {
      many_chart,
      classNames: ['testChart'],
      isRefresh: true,
    }
  },
  methods: {
    changeData() {
      this.chartInstance = this.$refs.chart.instance
      this.isRefresh = false
    },
    fetchData() {
      this.chartInstance = this.$refs.chart.instance
      console.log(this.chartInstance)
    },
  },
}
</script>
<style>
.testChart {
  width: 600px;
  height: 400px;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
