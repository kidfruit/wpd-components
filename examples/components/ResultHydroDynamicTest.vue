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

          // bottom: -50,
          // zlevel: 10,
          // currentIndex: 2,
          playInterval: 1000,
          // controlStyle: {
          //     position: 'left'
          // },
          data: [
            "2021-03-29T15:00:00",
            "2021-03-29T21:00:00",
            "2021-03-30T03:00:00",
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
          width: 100,
          isResize: true,
          titleAlign: "center",
          columnAlign: "center",
          readOnly: true,
        },
        {
          field: "time",
          title: "断面时间",
          width: 80,
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
          dim1: [374, 400, 450],
          dim2: [0, 52.3, 681.7],
          section: "JLJ36",
          time: "2021-03-29T15:00:00",
          index: 1,
        },
        {
          dim1: [333, 567, 789],
          dim2: [100, 300, 499],
          section: "JLJ35",
          time: "2021-03-29T21:00:00",
          index: 2,
        },
        {
          dim1: [1200, 1300, 1400],
          dim2: [777, 789, 900],
          section: "JLJ34",
          time: "2021-03-30T03:00:00",
          index: 3,
        },
      ],
    };
  },
};
</script>
<style>
.chart {
  width: 100%;
  height: 50vh;
}
</style>
