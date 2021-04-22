<template>
  <div>
    <series-q-z
      :classes="['testChart']"
      :chartAxis="chartAxis"
      :chartOption="chartOption"
      id="series-qz"
      :realtimeData="realtimeData"
      :resultData="resultData"
      :setting="{ rowHeaders: true }"
    />
  </div>
</template>

<script>
import SeriesQZ from "../../packages/SeriesQZ/src/SeriesQZ.vue";
import fakeData from "../assets/mock/SeriesQZ.json";
export default {
  components: {
    SeriesQZ,
  },
  created() {
    console.log("fakeData", fakeData);
    this.chartAxis = fakeData.chartAxis;
    this.chartAxis.series = [];
    this.realtimeData = fakeData.realtimeData;
    this.resultData = fakeData.resultData;
  },
  data() {
    return {
      chartOption: {
        title: {
          text: "断面流量图",
          left: "center",
        },
        grid: {
          bottom: 70,
        },
      },
      chartAxis: {},
      realtimeData: [],
      resultData: [],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>