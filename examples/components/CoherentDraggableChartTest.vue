<template>
  <div>
    <coherent-draggable-chart
      ref="chartTable"
      :classes="classNames"
      :chartOption="chartOption"
      :isRefresh="isRefresh"
      :setting="{ rowHeaders: true }"
      :data="data"
      :chartAxis="chartAxis"
      :dragFields="dragFields"
      :layout="layout"
      :tableColumns="tableColumns"
      :options="options"
    />
  </div>
</template>
 
<script>
import CoherentDraggableChart from "../../packages/CoherentDraggableChart/src/index.vue";
export default {
  name: "DraggableChartTest",
  components: {
    CoherentDraggableChart,
  },
  data() {
    return {
      classNames: ["testChart"],
      layout: "horizontal", // vertical | horizontal
      isRefresh: true,
      chartOption: {
        title: {
          text: "水位流量图",
          left: "center",
        },
        tooltip: {
          triggerOn: "none",
          formatter: function (params) {
            return (
              "X: " +
              params.data[0].toFixed(2) +
              "<br>Y: " +
              params.data[1].toFixed(2)
            );
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
            id: "dim1",
            field: "dim1",
            title: "水位(m)",
            selected: true,
            yAxisIndex: 0,
            smooth: true,
            symbolSize: 5,
          },
          {
            id: "dim2",
            field: "dim2",
            title: "流量(m³/s)",
            selected: true,
            yAxisIndex: 0,
            smooth: true,
            symbolSize: 5,
          },
        ],
      },
      tableColumns: [
        {
          field: "time",
          title: "断面时间",
          width: 140,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          readOnly: true,
        },
        {
          field: "dim1",
          title: "水位(m)",
          width: 100,
          isResize: true,
          titleAlign: "center",
          columnAlign: "center",
          readOnly: false,
        },
        {
          field: "dim2",
          title: "流量(m³/s)",
          width: 100,
          isResize: true,
          titleAlign: "center",
          columnAlign: "center",
          readOnly: false,
        },
        {
          field: "dim3",
          title: "入库流量(m³/s)",
          width: 100,
          isResize: true,
          titleAlign: "center",
          columnAlign: "center",
          readOnly: false,
        },
      ],
      dragFields: ["dim1", "dim2", "dim3"],
      options: {
        itemTitle: ["水位", "流量", "入库流量"],
        itemUnit: ["mm", "m³/s", "m³/s"],
        plotOrder: [1, 2, 3],
        itemEidt: [true],
        plotSize: [5, 5, 5],
        plotType: ["BrokenLine", "BrokenLine", "RainBar"],
        sendEndLine: false,
        thresholds: [200, 500, 1000, 1500, 1700, 2000, 2500, 3000],
      },
      data: [
        {
          dim3: 120,
          dim2: 0,
          dim1: 300,
          time: "2021-03-29T15:00:00",
          index: 1,
        },
        {
          dim3: 220,
          dim2: 50,
          dim1: 400,
          time: "2021-03-29T21:00:00",
          index: 2,
        },
        {
          dim3: 320,
          dim2: 200,
          dim1: 500,
          time: "2021-03-30T03:00:00",
          index: 3,
        },
        {
          dim3: 20,
          dim2: 400,
          dim1: 700,
          time: "2021-03-31T13:00:00",
          index: 4,
        },
        {
          dim3: 620,
          dim2: 2483,
          dim1: 500,
          time: "2021-03-30T09:00:00",
          index: 4,
        },
        {
          dim3: 720,
          dim2: 4341.4,
          dim1: 530,
          time: "2021-03-30T15:00:00",
          index: 5,
        },
        {
          dim3: 820,
          dim2: 5112.2,
          dim1: 540,
          time: "2021-03-30T21:00:00",
          index: 6,
        },
        {
          dim3: 420,
          dim2: 5973.9,
          dim1: 550,
          time: "2021-03-31T03:00:00",
          index: 7,
        },
        {
          dim3: 320,
          dim2: 6923,
          dim1: 560,
          time: "2021-03-31T09:00:00",
          index: 8,
        },
        {
          dim3: 220,
          dim2: 7953.3,
          dim1: 570,
          time: "2021-03-31T15:00:00",
          index: 9,
        },
        {
          dim3: 920,
          dim2: 9075.4,
          dim1: 580,
          time: "2021-03-31T21:00:00",
          index: 10,
        },
        {
          dim3: 1120,
          dim2: 10281.4,
          dim1: 590,
          time: "2021-04-01T03:00:00",
          index: 11,
        },
        {
          dim3: 1320,
          dim2: 11573.8,
          dim1: 600,
          time: "2021-04-01T09:00:00",
          index: 12,
        },
        {
          dim3: 1520,
          dim2: 12955.3,
          dim1: 610,
          time: "2021-04-01T15:00:00",
          index: 13,
        },
        {
          dim3: 1720,
          dim2: 14433.3,
          dim1: 620,
          time: "2021-04-01T21:00:00",
          index: 14,
        },
        {
          dim3: 1820,
          dim2: 17699.7,
          dim1: 640,
          time: "2021-04-02T03:00:00",
          index: 15,
        },
      ],
    };
  },
};
</script>
 
<style >
.draggable-chart.chart {
  width: 100%;
  height: 50vh;
}
</style>