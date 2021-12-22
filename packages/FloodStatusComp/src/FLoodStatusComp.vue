<template>
  <div :class="[className, 'flood-status-comp']">
    <a-tabs>
      <a-tab-pane tab="水情" key="waterInfo" v-if="waterInfo">
        <WaterInfo :waterInfo="waterInfo"/>
      </a-tab-pane>
      <a-tab-pane tab="工情" key="engineeringInfo" v-if="engineeringInfo">
        <EngineeringInfo :engineeringInfo="engineeringInfo"/>
      </a-tab-pane>
      <a-tab-pane tab="雨情" key="rainfallInfo" v-if="rainfallInfo">
        <RainfallInfo :ranifallInfo="rainfallInfo"/>
      </a-tab-pane>
      <a-tab-pane tab="灾情" key="disasterInfo" v-if="disasterInfo">
        <DisasterInfo :disasterInfo="disasterInfo"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import WaterInfo from "./WaterInfo";
import EngineeringInfo from "./EngineeringInfo";
import RainfallInfo from "./RainfallInfo";
import DisasterInfo from "./DisasterInfo";
export default {
  name: 'FloodStatusComp',
  components: {
    WaterInfo,
    EngineeringInfo,
    RainfallInfo,
    DisasterInfo
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    waterInfo:{
      type:Object,
      required:false
    },
    engineeringInfo: {
      type: Object,
      required: false
    },
    rainfallInfo: {
      type: Object,
      required: false
    },
    disasterInfo: {
      type: Object,
      required: false
    }
  }
}
</script>

<style lang="less" scoped>
.flood-status-comp {
  width: 100%;
  height: 100%;
}
</style>