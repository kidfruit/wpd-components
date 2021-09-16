<template>
  <div class="time-play-control-test">
    <TimePlayControl/>
  </div>
</template>

<script>
import TimePlayControl from "~/TimePlayControl/src/TimePlayControl";
export default {
  name: 'TimePlayControlTest',
  components: { TimePlayControl }
}
</script>

<style lang="less" scoped>
.time-play-control-test {
  display: flex;
  justify-content: center;
}
</style>
