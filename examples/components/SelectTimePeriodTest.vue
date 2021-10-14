<template>
  <div class="select-time-period-test">
    <SelectTimePeriod
      :className="className"
      :timeRange="timeRange"
      @getPeriodRange="getPeriodRange"
    />
  </div>
</template>

<script>
import SelectTimePeriod from "../../packages/SelectTimePeriod/src/SelectTimePeriod";
export default {
  name: 'SelectTimePeriodTest',
  components: { SelectTimePeriod },
  data() {
    return {
      className: 'select-time-period-aaa',
      timeRange: [
        {name: '1小时', id: '1h'},
        {name: '3小时', id: '3h'},
        {name: '1日', id: '1d'},
        {name: '1月', id: '1m'},
        {name: '其他', id: 'other'},
      ],
    }
  },
  methods: {
    getPeriodRange(value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>

</style>