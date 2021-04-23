<template>
  <div>
    <draggable-chart
      ref="chartTable"
      :classes="classNames"
      :chartOption="chartOption"
      :isRefresh="isRefresh"
      :chartAxis="chartAxis"
      :dragFields="dragFields"
      :tableColumns="tableColumns"
      :data="data"
      @updateData="handleUpdateData"
    />
  </div>
</template>
 
<script>
import DraggableChart from "../../packages/DraggableChart/src/DraggableChart.vue";
export default {
  name: "DraggableChartTest",
  components: {
    DraggableChart,
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