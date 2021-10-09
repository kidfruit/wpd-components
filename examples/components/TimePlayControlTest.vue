<template>
  <div class="time-play-control-test">
    <TimePlayControl
      :time="time"
      @getTime="getTime"
    />
  </div>
</template>

<script>
import TimePlayControl from "~/TimePlayControl/src/TimePlayControl";
export default {
  name: 'TimePlayControlTest',
  components: { TimePlayControl },
  data() {
    return {
      time: [
        '2021-01-01',
        '2021-02-01',
        '2021-03-01',
        '2021-04-01',
        '2021-05-01',
        '2021-06-01',
        '2021-07-01',
        '2021-08-01',
        '2021-09-01',
        '2021-10-01',
        '2021-11-01',
        '2021-12-01',
      ]
    }
  },
  methods: {
    getTime(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="less" scoped>
.time-play-control-test {
  display: flex;
  justify-content: center;
}
</style>
