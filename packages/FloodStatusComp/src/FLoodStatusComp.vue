<template>
  <div :class="[className,'flood-status-comp']">
    1234
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: 'FloodStatusComp',
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
  },
  data() {
    return {
      moment
    }
  },
  mounted(){
    console.log(this.waterInfo)
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.flood-status-comp {
  width: 500px;
}
</style>