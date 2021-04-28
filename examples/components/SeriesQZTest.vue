<template>
  <div>
    <series-q-z
      :classes="['testChart']"
      :chartAxis="chartAxis"
      :chartOption="chartOption"
      ref="seriesQZ"
      id="series-qz"
      :realtimeData="realtimeData"
      :treeData="treeData"
      :resultData="resultData"
      :setting="{ rowHeaders: true }"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import SeriesQZ from "../../packages/SeriesQZ/src/SeriesQZ.vue";
import fakeData from "../assets/mock/SeriesQZ.json";
import fakeData2 from "../assets/mock/SeriesQZ2.json";
export default {
  components: {
    SeriesQZ,
  },
  created() {
    this.handleData(1);
    this.treeData = [
      {
        key: "rootA",
        title: "A流域",
        parent: null,
        children: [
          { key: "a1", parent: "rootA", title: "水文站1" },
          { key: "a2", parent: "rootA", title: "水文站2" },
          { key: "a3", parent: "rootA", title: "水文站3" },
          { key: "a4", parent: "rootA", title: "水文站4" },
          { key: "a5", parent: "rootA", title: "水文站5" },
        ],
      },
      {
        key: "rootB",
        title: "b流域",
        parent: null,
        children: [{ key: "b1", parent: "rootB", title: "水文站3" }],
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
  methods: {
    handleData(type) {
      if (type === 1) {
        console.log("fakeData11", fakeData);
        this.chartAxis = fakeData.chartAxis;
        this.chartAxis.series = [];
        this.realtimeData = fakeData.realtimeData;
        this.resultData = fakeData.resultData;
      } else {
        console.log("fakeData22", fakeData2);
        this.chartAxis = fakeData2.chartAxis;
        this.chartAxis.series = [];
        this.realtimeData = fakeData2.realtimeData;
        this.resultData = fakeData2.resultData;
      }
    },
    handleSelect(key) {
      if (["a1", "a2", "a3", "a4", "a5", "b1"].indexOf(key[0]) === -1) {
        this.handleData(1);
      } else {
        this.handleData(2);
      }
      this.$nextTick(() => {
        this.$refs.seriesQZ.handleData();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>