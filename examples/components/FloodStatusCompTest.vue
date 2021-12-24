<template>
  <div class="test">
    <FloodStatusComp
      :className="className"
      :waterInfo="waterInfo"
      :engineeringInfo="engineeringInfo"
      :disasterInfo="disasterInfo"
    />
  </div>
</template>
<script>
import FloodStatusComp from "../../packages/FloodStatusComp/src/FLoodStatusComp";
import floodStatusData from '../assets/mock/FloodStatus.json'
export default {
  components: { FloodStatusComp },
  name: 'FloodStatusCompTest',
  data() {
    return {
      className: 'flood-status-comp-test',
      waterInfo: floodStatusData.waterInfo, // 水情
      engineeringInfo: floodStatusData.engineeringInfo, //工情
      rainfallInfo: {}, //雨情
      disasterInfo: floodStatusData.disasterInfo //灾情
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.test {
  width: 100%;
}
</style>
