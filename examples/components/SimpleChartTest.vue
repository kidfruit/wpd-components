<template>
  <div style="width: 100%">
    <simple-chart
      ref="chart"
      :classes="classNames"
      :chartOption="option"
      :isRefresh="isRefresh"
    />
    <button @click="changeData">获取数据123</button>
  </div>
</template>
<script>
import SimpleChart from "../../packages/SimpleChart/src/SimpleChart.vue";

export default {
  name: "SimpleChartTest",
  components: { SimpleChart },
  data() {
    return {
      classNames: ["testChart"],
      isRefresh: true,
      option: {
        title: {
          text: "折线图测试",
          left: "center",
          align: "right",
        },
        legend: {
          data: ["流量(m³/s)", "水位(m)"],
          left: 10,
        },
        grid: {
          bottom: 80,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "2009/6/12 2:00",
            "2009/6/12 3:00",
            "2009/6/12 4:00",
            "2009/6/12 5:00",
            "2009/6/12 6:00",
            "2009/6/12 7:00",
            "2009/6/12 8:00",
          ].map(function (str) {
            return str.replace(" ", "\n");
          }),
        },
        yAxis: [
          {
            name: "流量(m³/s)",
            type: "value",
          },
          {
            name: "水位(m)",
            type: "value",
          },
        ],
        series: [
          {
            name: "流量(m³/s)",
            type: "line",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "水位(m)",
            type: "line",
            yAxisIndex: 1,
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      },
    };
  },
  methods: {
    changeData() {
      this.chartInstance = this.$refs.chart.instance;
      this.isRefresh = false;
      this.refreshData();
    },
    async refreshData() {
      setTimeout(() => {
        this.option = {
          title: {
            text: "Traffic Sources",
            left: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: [
              "Direct",
              "Email",
              "Ad Networks",
              "Video Ads",
              "Search Engines",
            ],
          },
          series: [
            {
              name: "Traffic Sources",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: 335, name: "Direct" },
                { value: 310, name: "Email" },
                { value: 234, name: "Ad Networks" },
                { value: 135, name: "Video Ads" },
                { value: 1548, name: "Search Engines" },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        this.isRefresh = true;
      }, 2000);
    },
  },
};
</script>
<style>
.testChart {
  width: 100%;
  height: 50vh;
}
</style>
