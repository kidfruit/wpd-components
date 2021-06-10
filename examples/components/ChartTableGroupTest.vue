<template>
  <div style="width: 100%">
    <chart-table-group
      ref="chartTable"
      :classes="classNames"
      :chartOption="chartOption"
      :isRefresh="isRefresh"
      :chartAxis="chartAxis"
      :tableColumns="tableColumns"
      :data="data"
    />
    <!-- <button @click="fetchData">获取数据123</button> -->
  </div>
</template>
<script>
import ChartTableGroup from "../../packages/ChartTableGroup/src/ChartTableGroup.vue";

export default {
  name: "ChartTableGroupTest",
  components: { ChartTableGroup },
  data() {
    return {
      classNames: ["testChartTableGroup"],
      isRefresh: true,
      chartOption: {
        title: {
          text: "水位流量图",
          left: "center",
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
            field: "dim2",
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
          columnAlign: "center"
        },
        {
          field: "dim2",
          title: "流量(m³/s)",
          width: 100,
          isResize: true,
          titleAlign: "center",
          columnAlign: "center"
        },
      ],
      data: [
        { dim2: 0, dim1: 374, time: "2021-03-29T15:00:00", index: 1 },
        { dim2: 52.3, dim1: 400, time: "2021-03-29T21:00:00", index: 2 },
        { dim2: 681.7, dim1: 450, time: "2021-03-30T03:00:00", index: 3 },
        { dim2: 2483, dim1: 500, time: "2021-03-30T09:00:00", index: 4 },
        { dim2: 4341.4, dim1: 530, time: "2021-03-30T15:00:00", index: 5 },
        { dim2: 5112.2, dim1: 540, time: "2021-03-30T21:00:00", index: 6 },
        { dim2: 5973.9, dim1: 550, time: "2021-03-31T03:00:00", index: 7 },
        { dim2: 6923, dim1: 560, time: "2021-03-31T09:00:00", index: 8 },
        { dim2: 7953.3, dim1: 570, time: "2021-03-31T15:00:00", index: 9 },
        { dim2: 9075.4, dim1: 580, time: "2021-03-31T21:00:00", index: 10 },
        { dim2: 10281.4, dim1: 590, time: "2021-04-01T03:00:00", index: 11 },
        { dim2: 11573.8, dim1: 600, time: "2021-04-01T09:00:00", index: 12 },
        { dim2: 12955.3, dim1: 610, time: "2021-04-01T15:00:00", index: 13 },
        { dim2: 14433.3, dim1: 620, time: "2021-04-01T21:00:00", index: 14 },
        { dim2: 17699.7, dim1: 640, time: "2021-04-02T03:00:00", index: 15 },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="less">
.testChartTableGroup{
  width:100%;
  height:800px;
  .chart {
    width: 100%;
    height: 300px;
  }
  .chart-container{
    margin:0;
  }
  .table-container{
    height:500px;
    width:100%;
    overflow:hidden;
  }
}
</style>
