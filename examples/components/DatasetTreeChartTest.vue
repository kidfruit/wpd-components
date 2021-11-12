<template>
  <div>
    <DatasetTreeChart
      ref="datasetTreeChartRef"
      :treeChartData="data"
    />
  </div>
</template>

<script>
import mockData from '../assets/mock/DatasetTree.json';
export default {
  name: "DatasetTreeChartTest",
  data() {
    return {
      data: mockData
    }
  }
}
</script>

<style scoped>

</style>
