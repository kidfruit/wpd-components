<template>
  <div :class="[classes, 'multi-series-result']">
    <div
      class="series-result-wrapper"
      v-for="(item, index) in seriesData"
      :key="index"
    >
      <div class="series-result-title">{{item.stName}}</div>
      <SeriesResult
        :splitIndex="item.splitIndex"
        :tableColumns="item.tableColumns"
        :tableData="item.tableData"
        :singleData="item.singleData"
        :isShowMaximum="true"
        :isMultiSeriesResult="true"
      />
    </div>
  </div>
</template>

<script>
import SeriesResult from "../../SeriesResult/src/SeriesResult";
export default {
  name: 'MultiSeriesResult',
  components: { SeriesResult },
  props: {
    classes: {
      type: Array,
      required: false
    },
    timeLag: {
      type: Boolean,
      required: false
    },
    seriesData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

    }
  },
  watch: {

  }
}
</script>

<style lang="less">
.multi-series-result {
  .chart-box {
    height: 300px;
    .chart-switch-button {
      display: none;
    }
    .chart-content {
      height: 300px;
    }
    .chart-des {
      display: none;
    }
  }
  .table-box {
    display: none;
  }
}
</style>
<style lang="less" scoped>
.multi-series-result {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  .series-result-wrapper {
    width: 49%;
    margin-top: 20px;
    position: relative;
    .series-result-title {
      font-size: 25px;
      font-weight: bold;
      color: #3C9FC3;
      position: absolute;
      left: 5%;
      top: 0;
    }
  }
}
</style>
