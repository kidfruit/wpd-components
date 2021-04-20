<template>
  <div>
    <coherent-draggable-chart ref="chartTable" :classes="classNames" :chartOption="chartOption" :isRefresh="isRefresh" :data="data" :chartAxis="chartAxis" :dragFields="dragFields" :options="options" :tableColumns="tableColumns" @updateData="handleUpdateData" />
  </div>
</template>
 
<script>
import CoherentDraggableChart from "../../packages/CoherentDraggableChart/src/CoherentDraggableChart.vue";

let arr = [];
for (let i = 0; i < 2; i++) {
  arr.push([Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)]);
}
export default {
  name: "DraggableChartTest",
  components: {
    CoherentDraggableChart,
  },
  data() {
    return {
      classNames: ["testChart"],
      isRefresh: true,
      chartOption: {
        title: {
          text: "水位流量图",
          left: "center",
        },
        tooltip: {
          triggerOn: "none",
          formatter: function (params) {
            return "X: " + params.data[0].toFixed(2) + "<br>Y: " + params.data[1].toFixed(2);
          },
        },
      },
      chartAxis: {
        xAxis: "time",
        timeSeries: true,
        yAxis: [
          {
            title: "流量(m³/s)",
            yAxisIndex: 0,
          },
        ],
        series: [
          {
            id: "dim2",
            field: "dim2",
            title: "入库流量(m³/s)",
            selected: true,
            yAxisIndex: 0,
            smooth: true,
            symbolSize: 5,
          },
          {
            id: "dim1",
            field: "dim1",
            title: "水位(m)",
            selected: true,
            yAxisIndex: 0,
            smooth: true,
            symbolSize: 5,
          },
        ],
      },
      tableColumns: [],
      dragFields: ["dim1", "dim2"],
      options: {
        // dataList: [
        //   [-7000, -8100, -8000, -8500, -10900, -11700, -11000, -9300, -8300, -7000, -6100, -6700, -6300, -4900, -4900, -4800, -4300, -3700, -3200, -2500, -2000, -1400, -900, -200, 400],
        //   ["23300", "25300", "25900", "25300", "24900", "25000", "24800", "24700", "25100", "25700", "25100", "23700", "23700", "23900", "23000", "23100", "23200", "22900", "22600", "22400", "22200", "21900", "21700", "22100", "22900"],
        //   ["30300", "33400", "33900", "33800", "35800", "36700", "35800", "34000", "33400", "32700", "31200", "30400", "30000", "28800", "27900", "27900", "27500", "26600", "25800", "24900", "24200", "23300", "22600", "22300", "22500"],
        //   ["32000", "33500", "35000", "37000", "37000", "36000", "34000", "33000", "32000", "32000", "32500", "30000", "30000", null, null, null, null, null, null, null, null, null, null, null, null],
        //   ["0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00"],
        //   ["0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00"],
        //   ["11000", "11500", "11500", "11600", "12200", "13300", "13800", "13800", "14700", "16000", "17100", "18100", "19000", "19700", "20200", "20500", "20800", "21400", "22200", "23100", "24100", "24800", "25700", "27400", "29100"],
        //   ["11000", "11500", "11500", "11600", "12200", "13300", "13800", "13800", "14700", "16000", "17100", "18100", "19000", "19700", "20200", "20500", "20800", "21300", "22200", "23100", "24100", "24700", "25500", "27200", "28800"],
        //   ["30300", "33400", "33900", "33800", "35800", "36700", "35800", "34000", "33400", "32700", "31200", "30400", "30000", "28800", "27900", "28000", "27500", "26600", "25800", "24900", "24100", "23300", "22400", "22100", "22300"],
        // ],
        dataList: arr,
        itemTitle: ["预报误差", "模型流量"],
        itemUnit: ["水位", "流量"],
        plotOrder: [1, 1],
        itemEidt: [true, true],
        plotSize: [1, 1],
        plotType: ["BrokenLine", "BrokenLine"],
        setEndLine: false,
        // timeList: [
        //   "2020/07/12 08",
        //   "2020/07/12 14",
        //   "2020/07/12 20",
        //   "2020/07/13 02",
        //   "2020/07/13 08",
        //   "2020/07/13 14",
        //   "2020/07/13 20",
        //   "2020/07/14 02",
        //   "2020/07/14 08",
        //   "2020/07/14 14",
        //   "2020/07/14 20",
        //   "2020/07/15 02",
        //   "2020/07/15 08",
        //   "2020/07/15 14",
        //   "2020/07/15 20",
        //   "2020/07/16 02",
        //   "2020/07/16 08",
        //   "2020/07/16 14",
        //   "2020/07/16 20",
        //   "2020/07/17 02",
        //   "2020/07/17 08",
        //   "2020/07/17 14",
        //   "2020/07/17 20",
        //   "2020/07/18 02",
        //   "2020/07/18 08",
        // ],
        // itemTitle: ["预报误差", "模型流量", "预报流量", "实测流量", "预报水位", "面雨量", "上浮流量", "下浮流量", "退水流量"],
        // itemUnit: ["", "m³/s", "m³/s", "m³/s", "m³/s", "mm"],
        // plotOrder: [3, 2, 2, 2, 2, 1, 2, 2, 2],
        // itemEidt: [true, false, true, false, false, true, false, false, false],
        // plotSize: [1, 0.3, 2, 0.9, 3, 0.3],
        // plotType: ["BrokenLine", "BrokenLine", "BrokenLine", "BrokenLine", "BrokenLines", "RainBar", "BrokenLine", "BrokenLine", "BrokenLine"],
        // setEndLine: true,
      },
      data: [
        { dim1: [1, 3], dim2: [1, 0], time: "2021-03-29T15:00:00", index: 1 },
        {
          dim1: [2, 77],
          dim2: [2, 52.3],
          time: "2021-03-29T21:00:00",
          index: 2,
        },
        {
          dim1: [3, 125],
          dim2: [3, 681.7],
          time: "2021-03-30T03:00:00",
          index: 3,
        },
        {
          dim1: [4, 178],
          dim2: [4, 2483],
          time: "2021-03-30T09:00:00",
          index: 4,
        },
        {
          dim1: [5, 19212],
          dim2: [5, 4341.4],
          time: "2021-03-30T15:00:00",
          index: 5,
        },
        {
          dim1: [6, 231],
          dim2: [6, 5112.2],
          time: "2021-03-30T21:00:00",
          index: 6,
        },
        {
          dim1: [7, 2708],
          dim2: [7, 5973.9],
          time: "2021-03-31T03:00:00",
          index: 7,
        },
        {
          dim1: [8, 1620],
          dim2: [8, 6923],
          time: "2021-03-31T09:00:00",
          index: 8,
        },
        {
          dim1: [9, 1930],
          dim2: [9, 7953.3],
          time: "2021-03-31T15:00:00",
          index: 9,
        },
        {
          dim1: [10, 3330],
          dim2: [10, 9075.4],
          time: "2021-03-31T21:00:00",
          index: 10,
        },
        {
          dim1: [11, 12330],
          dim2: [11, 10281.4],
          time: "2021-04-01T03:00:00",
          index: 11,
        },
        {
          dim1: [12, 27890],
          dim2: [12, 11573.8],
          time: "2021-04-01T09:00:00",
          index: 12,
        },
        {
          dim1: [13, 12000],
          dim2: [13, 12955.3],
          time: "2021-04-01T15:00:00",
          index: 13,
        },
        {
          dim1: [14, 1122.8],
          dim2: [14, 14433.3],
          time: "2021-04-01T21:00:00",
          index: 14,
        },
        {
          dim1: [15, 3288],
          dim2: [15, 17699.7],
          time: "2021-04-02T03:00:00",
          index: 15,
        },
      ],
    };
  },
  methods: {
    handleUpdateData(field, data) {
      console.log("data", field, data);
    },
  },
};
</script>
 
<style >
.draggable-chart.chart {
  width: 100%;
  height: 50vh;
}
</style>