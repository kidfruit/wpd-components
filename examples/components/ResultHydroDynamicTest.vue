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
          data: ["2002-01-01", "2003-01-01", "2004-01-01"],
          label: {
            formatter: function (s) {
              return new Date(s).getFullYear();
            },
          },
        },
      },
      chartAxis: {
        xAxis: "time",
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
          title: "时间",
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
          dim2: [0, 52.3, 681.7],
          dim1: [374, 400, 450],
          time: "JLJ36",
          index: 1,
        },
        {
          dim2: [52.3, 681.7, 2483],
          dim1: [400, 450, 500],
          time: "JLJ35",
          index: 2,
        },
        {
          dim2: [681.7, 2483, 4341.4],
          dim1: [450, 500, 530],
          time: "JLJ34",
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
