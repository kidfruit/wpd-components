<template>
  <div class="time-play-control">
    <div class="control-left">
      <a-icon class="control-left-global" type="control"/>
    </div>
    <div class="control-right">
      <a-icon type="play-circle"/>
      <a-icon type="pause-circle"/>
      <a-icon type="fast-backward"/>
      <a-icon type="step-backward"/>
      <a-icon type="step-forward"/>
      <a-icon type="fast-forward"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimePlayControl'
}
</script>

<style lang="less" scoped>
.time-play-control {
  width: 500px;
  height: 100px;
  font-size: 30px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  .control-left {
    float: left;
    width: 50px;
    height: 100px;
    border-right: 1px solid #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
    .control-left-global {
      display: block;
    }
  }
  .content-right {
    width: 450px;
    height: 100px;
  }
}
</style>
