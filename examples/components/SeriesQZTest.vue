<template>
  <div>
    <series-q-z
      id="series-qz"
      ref="seriesQZ"
      :classes="['test-Chart']"
      :chartAxis="chartAxis"
      :chartOption="chartOption"
      :tableColumns="tableColumns"
      :tableData="tableData"
      :singleData="singleData"
      :splitIndex="splitIndex"
      :setting="{}"
    />
  </div>
</template>

<script>
import SeriesQZ from "../../packages/SeriesQZ/src/SeriesQZ.vue";
import fakeData2 from "../assets/mock/SeriesQZ2.json";
export default {
  components: {
    SeriesQZ,
  },
  created() {
    this.handleData();
  },
  data() {
    return {
      chartOption: {
        legend: {
          top: 0
        },
        dataZoom: [{
          show: true
        }],
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            var htmlStr =
              '<div style="height: auto;overflow-y: hidden;"><p style="color: #666;font-weight:700;font-size:14px;">' +
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
      chartAxis: {
        xAxis: "time",
        timeSeries: true,
        yAxis: [
          {
            title: "水位(m)",
            yAxisIndex: 0
          },
          {
            title: "流量(m³/s)",
            yAxisIndex: 1
          }
        ],
        series: []
      },
      tableColumns: [],
      tableData: [],
      singleData: [],
      splitIndex: 0
    };
  },
  methods: {
    handleData() {
      this.tableColumns = fakeData2.tableColumns
      this.tableData = fakeData2.tableData
      this.singleData = fakeData2.singleData
      this.splitIndex = fakeData2.splitIndex
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
