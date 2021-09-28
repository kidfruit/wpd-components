<template>
  <div style="width: 100%">
    <multi-series-result
        :classes="classNames"
        :timeLag="timeLag"
        :treeData="treeData"
        :seriesData="seriesData"
        @checkedNodeUpdate="checkedNodeUpdate"
    />
  </div>
</template>
<script>
import MultiSeriesResult from '../../packages/MultiSeriesResult/src/MultiSeriesResult.vue'
import mock_Tree from '../assets/mock/multiSeriesResult-treeData.json'

import fakeData from '../assets/mock/SeriesResult2.json';

export default {
  name: 'MultiSeriesResultText',
  components: {MultiSeriesResult},
  data() {
    return {
      visible: true,
      classNames: ['test-multi-series'],
      treeData: mock_Tree,
      timeLag:false,
      seriesData:[fakeData],//当前默认勾选，tree上勾选变多后，这里也变多，
    }
  },
  methods: {
    checkedNodeUpdate(){
      this.seriesData = [fakeData,fakeData,fakeData]
    }
  },
}
</script>
<style scoped lang="scss">
.table {
  width: 100%;
  height: 300px;
}
</style>
