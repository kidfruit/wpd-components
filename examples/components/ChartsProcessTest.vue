<template>
  <div style="width: 100%">
    <charts-process ref="charts"
                :chartDatas="many_chart"
                :classes="classNames"
                :isRefresh="isRefresh"
                />
  </div>
</template>
<script>
import ChartsProcess from '../../packages/ChartsProcess/src/ChartsProcess.vue'
import many_chart from '../assets/mock/manyChart.json'
export default {
  name: 'ChartsProcessTest',
  components: { ChartsProcess },
  data() {
    return {
      many_chart,
      classNames: ['testChart'],
      isRefresh: true,
    }
  },
  methods: {
    changeData() {
      this.chartInstance = this.$refs.charts.instance
      this.isRefresh = false
    },
    fetchData() {
      this.chartInstance = this.$refs.charts.instance
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
