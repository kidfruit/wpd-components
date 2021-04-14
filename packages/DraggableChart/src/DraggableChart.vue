<template>
  <div :classes="classNames">
    <div class="chart-container">
      <standard-chart
        ref="chartRef"
        :chartOption="chartOption"
        :isRefresh="isRefresh"
        :chartAxis="chartAxis"
        :classes="['result-hydro-dynamic']"
        :chartData="data"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    classes: {
      type: Array,
      required: false,
    },
    isRefresh: {
      type: Boolean,
      default: true,
      required: false,
    },
    chartOption: {
      type: Object,
      required: false,
    },
    chartAxis: {
      type: Object,
    },
    tableColumns: {
      type: Array,
    },
    data: {
      type: Array,
    },
  },
  computed: {
    classNames() {
      return ["draggable-chart"].concat(this.classes).join(" ");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>