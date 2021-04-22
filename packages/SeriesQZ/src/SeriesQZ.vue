<template>
  <div :class="classNames">
    <div class="chart-container">
      <standard-chart
        ref="chartRef"
        :chartOption="chartOption"
        :chartAxis="chartAxis"
        :id="id"
        :classes="['result-hydro-dynamic']"
        :chartData="newData"
      />
    </div>
    <div class="table-container">
      <simple-table
        ref="tableRef"
        :tableData="newData"
        :setting="setting"
        :tableColumns="columns"
      ></simple-table>
    </div>
  </div>
</template>

<script>
import StandardChart from "../../StandardChart/src/StandardChart.vue";
import SimpleTable from "../../SimpleTable/src/SimpleTable.vue";
export default {
  components: {
    StandardChart,
    SimpleTable,
  },
  props: {
    classes: {
      type: Array,
      required: false,
    },
    id: {
      type: String,
    },
    chartAxis: {
      type: Object,
    },
    realtimeData: {
      type: Object,
    },
    resultData: {
      type: Object,
    },
    setting: {
      type: Object,
    },
    chartOption: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      newData: [],
      columns: [],
      newResultData: [],
      newRealtimeData: [],
      resultFields: [],
      realtimeFields: [],
    };
  },
  created() {
    console.log(this.chartAxis, 11);
    this.handleData();
  },
  computed: {
    classNames() {
      return ["series-qz"].concat(this.classes);
    },
  },
  methods: {
    dynamicCols(columns) {
      columns.forEach((el) => {
        if (
          this.columns.findIndex((item) => item.field === el.field) === -1 &&
          el.field !== "id"
        ) {
          this.columns.push(el);
        }
      });
    },
    handleData() {
      this.newRealtimeData = JSON.parse(JSON.stringify(this.realtimeData));
      this.newResultData = JSON.parse(JSON.stringify(this.resultData));
      this.newRealtimeData.tableData = this.newRealtimeData.tableData.sort(
        (a, b) => {
          return new Date(a.time).getTime() - new Date(b.time).getTime();
        }
      );
      this.newResultData.tableData = this.newResultData.tableData.sort(
        (a, b) => {
          return new Date(a.time).getTime() - new Date(b.time).getTime();
        }
      );
      let firstTime = this.newResultData.tableData[0].time;
      let resultFields = Object.keys(this.newResultData.tableData[0]);
      resultFields = resultFields.filter((el) => {
        return el !== "id" && el != "time";
      });
      this.columns = [];
      this.dynamicCols(this.newResultData.tableColumns);
      this.dynamicCols(this.newRealtimeData.tableColumns);
      console.log("this.cols", this.columns);
      this.columns.forEach((el) => {
        if (el.field != "time") {
          let obj = {
            field: el.field,
            title: el.title,
            selected: true,
            yAxisIndex: 0,
          };
          if (resultFields.indexOf(el.field) !== -1) {
            obj = Object.assign({}, obj, {
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 2,
                    type: "dotted", //'dotted'虚线 'solid'实线
                  },
                },
              },
            });
          }
          this.chartAxis.series.push(obj);
        }
      });

      this.newData = this.newRealtimeData.tableData.concat(
        this.newResultData.tableData
      );
      // this.chartAxis.series.forEach((el) => {
      //   console.log(el, 111);
      // });
      console.log(firstTime, resultFields);

      // this.chartAxis.xAxis.axisLabel = {
      //   interval: 0,
      //   show: true,
      //   textStyle: {
      //     // color: "#a9a9a9", //更改坐标轴文字颜色
      //     fontSize: 10, //更改坐标轴文字大小
      //   },
      //   // rotate: 20,
      //   formatter: function (v) {
      //     let half = v.split(" ");
      //     var date = new Date(v);
      //     return `\n${half[0]}\n${half[1]}`;
      //     // return `${date.getDate()}\n${("0" + date.getHours()).slice(-2)}:${(
      //     //   "0" + date.getMinutes()
      //     // ).slice(-2)}`;
      //     // return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
      //   },
      //   showMinLabel: true, //显示最小值
      //   showMaxLabel: true, //显示最大值
      // };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>