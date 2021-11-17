<template>
  <div style="width: 100%;height: 800px">
    <DatasetTreeChart
      ref="datasetTreeChartRef"
      :treeChartData="treeChartData"
      :leftPosition="{
        left: '10%',
        right: '70%',
        top: 0,
        bottom: 0,
      }"
      :rightPosition="{
        left: '32%',
        right: '30%',
        top: 0,
        bottom: 0,
      }"
      @clickFlowId="clickFlowId"
      @clickDownId="clickDownId"
    />
  </div>
</template>

<script>
import DatasetTreeChart from "../../packages/DatasetTreeChart/src/DatasetTreeChart";
import mockData from '../assets/mock/DatasetTree.json';
export default {
  name: "DatasetTreeChartTest",
  components: { DatasetTreeChart },
  data() {
    return {
      treeChartData: mockData
    }
  },
  methods: {
    clickFlowId() {
      console.log('点击指向节点')
    },
    clickDownId() {
      console.log('点击下级节点')
    }
  }
}
</script>

<style scoped>

</style>
