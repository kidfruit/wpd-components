<template>
  <div>
    <series-q-z
      :classes="['testChart']"
      :chartAxis="chartAxis"
      :chartOption="chartOption"
      id="series-qz"
      :realtimeData="realtimeData"
      :treeData="treeData"
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

    this.treeData = [
      {
        key: "rootA",
        title: "A流域",
        children: [
          { key: "a1", title: "水文站1" },
          { key: "a2", title: "水文站2" },
          { key: "a3", title: "水文站3" },
          { key: "a4", title: "水文站4" },
          { key: "a5", title: "水文站5" },
        ],
      },
      {
        key: "rootB",
        title: "b流域",
        children: [{ key: "b1", title: "水文站3" }],
      },
    ];
  },
  data() {
    return {
      chartOption: {
        title: {
          text: "断面流量图",
          left: "center",
        },
        grid: {
          bottom: 24,
        },
      },
      chartAxis: {},
      realtimeData: [],
      resultData: [],
      treeData: [],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>