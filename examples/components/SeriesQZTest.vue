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
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            console.log("params", params);
            var htmlStr =
              '<div style="height: auto;max-height: 240px;overflow-y: auto;"><p style="color: #666;font-weight:700;font-size:14px;">' +
              params[0].axisValue +
              "</p>";
            let arr = params.filter((el) => el.value);
            arr = arr.sort((a, b) => b.value - a.value);
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].value) {
                htmlStr +=
                  '<div style="display:flex;justify-content:space-between;"><p style="color: #000;textAlign:left;">' +
                  arr[i].marker +
                  arr[i].seriesName +
                  ":&nbsp;&nbsp;" +
                  "<span>" +
                  arr[i].value +
                  "</span>" +
                  "</p></div>";
              }
            }
            htmlStr += "</div>";
            return htmlStr;
          },
          extraCssText: "box-shadow: 0 0 3px rgba(150,150,150, 0.7);",
          textStyle: {
            fontSize: 14,
            color: "#000",
          },
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