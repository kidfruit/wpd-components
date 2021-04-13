<template>
  <div style="width: 100%">
    <result-hydro-dynamic
      ref="resultHydroDynamicTable"
      :classes="classNames"
      :chartOption="chartOption"
      :isRefresh="isRefresh"
      :chartAxis="chartAxis"
      :tableColumns="tableColumns"
      :data="data"
    />
  </div>
</template>

<script>
import ResultHydroDynamic from "../../packages/ResultHydroDynamic/src/ResultHydroDynamic.vue";
export default {
  name: "ResultHydroDynamicTest",
  components: {
    ResultHydroDynamic,
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
        timeline: {
          axisType: "category",
          realtime: false,
          // loop: false,
          autoPlay: true,
          // height: 200,
          // padding: 100,
          // top: 30,

          bottom: -20,
          // zlevel: 10,
          // currentIndex: 2,
          playInterval: 1000,
          // controlStyle: {
          //     position: 'left'
          // },
          data: [
            // "2021-03-29T15:00:00",
            // "2021-03-29T21:00:00",
            // "2021-03-30T03:00:00",
          ],
          label: {
            formatter: function (s) {
              return new Date(s).getFullYear();
            },
          },
        },
      },
      chartAxis: {
        xAxis: "section",
        timeSeries: true,
        yAxis: [
          {
            title: "水位(m)",
            yAxisIndex: 0,
          },
          {
            title: "流量(m³/s)",
            yAxisIndex: 1,
          },
        ],
        series: [
          {
            field: "dim1",
            title: "水位(m)",
            selected: true,
            yAxisIndex: 0,
          },
          {
            field: "dim2",
            title: "入库流量(m³/s)",
            selected: true,
            yAxisIndex: 1,
          },
          {
            field: "dim3",
            title: "出库流量(m³/s)",
            selected: false,
            yAxisIndex: 1,
          },
        ],
      },
      tableColumns: [
        {
          field: "index",
          title: "序号",
          width: 10,
          isResize: true,
          titleAlign: "center",
          columnAlign: "center",
          readOnly: true,
        },
        {
          field: "time",
          title: "断面时间",
          width: 150,
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
          readOnly: true,
        },
        {
          field: "dim2",
          title: "流量(m³/s)",
          width: 100,
          isResize: true,
          titleAlign: "center",
          columnAlign: "center",
          readOnly: true,
        },
      ],
      data: [
        {
          dim1: [374, 400, 450, 600, 700, 900],
          dim2: [0, 52.3, 681.7, 781, 903, 1120],
          section: "JLJ36",
          time: "2021-03-29T15:00:00",
          index: 1,
        },
        {
          dim1: [333, 567, 789, 1002, 1334, 1788],
          dim2: [100, 300, 499, 676, 892, 976],
          section: "JLJ35",
          time: "2021-03-29T21:00:00",
          index: 2,
        },
        {
          dim1: [1200, 1300, 1400, 1678, 1890, 1999],
          dim2: [777, 789, 900, 1111, 1230, 1450],
          section: "JLJ34",
          time: "2021-03-30T03:00:00",
          index: 3,
        },
        {
          dim1: [374, 400, 450, 600, 700, 900],
          dim2: [0, 52.3, 681.7, 781, 903, 1120],
          section: "JLJ33",
          time: "2021-03-30T12:00:00",
          index: 4,
        },
        {
          dim1: [333, 567, 789, 1002, 1334, 1788],
          dim2: [100, 300, 499, 676, 892, 976],
          section: "JLJ32",
          time: "2021-03-30T21:00:00",
          index: 5,
        },
        {
          dim1: [1200, 1300, 1400, 1678, 1890, 1999],
          dim2: [777, 789, 900, 1111, 1230, 1450],
          section: "JLJ31",
          time: "2021-03-31T03:00:00",
          index: 6,
        },
      ],
    };
  },
};
</script>
<style>
.result-hydro-dynamic.testChart >>> .chart-container {
  color: #f00;
}
.result-hydro-dynamic.testChart >>> .chart {
  width: 100%;
  height: 60vh;
}
</style>
