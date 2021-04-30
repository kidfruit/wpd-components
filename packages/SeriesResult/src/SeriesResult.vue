<template>
  <div :class="classNames">
    <div class="chart-container">
      <a-carousel :after-change="onChange">
        <div v-for="(item, index) in chartList" :key="index">
          <standard-chart
            :key="item.id"
            v-if="currentIndex === index"
            ref="chartRef"
            :chartOption="item.chartOption"
            :chartAxis="item.chartAxis"
            :id="item.id"
            :classes="['series-result']"
            :chartData="item.chartData"
          />
        </div>
      </a-carousel>
    </div>
    <div class="table-container">
      <simple-table
        ref="tableRef"
        :tableData="tableData"
        :setting="setting"
        :tableColumns="tableColumns"
      ></simple-table>
    </div>
  </div>
</template>

<script>
import SimpleTable from "../../SimpleTable/src/SimpleTable.vue";
import StandardChart from "../../StandardChart/src/StandardChart.vue";
let positionMaps = {
  L: "left",
  R: "right",
};
function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return S4() + "-" + S4();
}
function unique(arr) {
  return Array.from(new Set(arr));
}
export default {
  props: {
    classes: {
      type: Array,
      required: false,
    },
    tableData: {
      type: Array,
    },
    tableColumns: {
      type: Array,
    },
    setting: {
      type: Object,
    },
    splitIndex: {
      type: Number,
    },
  },
  components: {
    SimpleTable,
    StandardChart,
  },
  computed: {
    classNames() {
      return ["series-result"].concat(this.classes);
    },
  },
  data() {
    return {
      chartList: [],
      seriesList: [],
      currentIndex: 0,
    };
  },
  created() {
    let showTypeList = this.tableColumns
      .map((el) => {
        return { showType: el.showType, field: el.field, title: el.title };
      })
      .filter((el) => el.showType);

    let filterList = showTypeList.map((el) => el.showType.split("-")[0]);
    let carouselCount = unique(filterList);
    this.generateChartData(carouselCount, showTypeList);
    this.hideRows();
  },
  methods: {
    generateChartLegend(showTypeList, current) {
      let legendList = showTypeList.filter(
        (el) => el.showType.indexOf(current) !== -1
      );
      let legends = [];
      let flag = false; // 连续的控制标志位
      let lastOne = "";
      let base = 0,
        step = 7;
      for (let i = 0; i < legendList.length; i++) {
        let obj = {
          itemWidth: 27,
          itemHeight: 16,
          show: true,
          textStyle: { fontSize: 14 },
          data: [{ name: legendList[i].title, icon: "line" }], //rect为矩形
        };
        let leftRight = positionMaps[legendList[i].showType.split("-")[1]];
        if (lastOne !== "" && lastOne === leftRight) {
          flag = true;
          base += step;
          console.log("flag", flag);
        }
        if (leftRight === "left") {
          obj = Object.assign({}, obj, {
            top: !flag ? "15%" : `${15 + base}%`, //调整位置
            left: "0%",
          });
        } else {
          obj = Object.assign({}, obj, {
            top: !flag ? "15%" : `${15 + base}%`, //调整位置
            right: "0%",
          });
        }
        flag = false;
        console.log(positionMaps[legendList[i].showType.split("-")[1]]);
        legends.push(obj);
        lastOne = leftRight;
      }
      console.log(legendList);
      return legends;
    },
    generateChartYaxis(showTypeList, current) {
      let yAxisList = showTypeList.filter(
        (el) => el.showType.indexOf(current) !== -1
      );
      let yAxis = [];
      for (let i = 0; i < yAxisList.length; i++) {
        yAxis.push({
          title: "",
          // title: yAxisList[i].title,
          type: "value",
          axisLabel: {
            show: false,
          },
          axisLine: {
            symbol: ["none", "arrow"],
            show: true,
            lineStyle: {
              color: "#40a9ff  ",
            },
          },
          position: positionMaps[yAxisList[i].showType.split("-")[1]],
          max: function (value) {
            // console.log("value.max", value);
            return (value.max + 0.01 * value.min).toFixed(2);
          },
          min: function (value) {
            // console.log("value.min", value);
            return (value.min - 0.01 * value.min).toFixed(2);
          },
        });
      }

      return yAxis;
    },
    generateChartSeries(showTypeList, current) {
      let firstTime = this.tableData[this.splitIndex].time;
      return showTypeList
        .filter((el) => el.showType.indexOf(current) !== -1)
        .map((el) => {
          return {
            field: el.field,
            title: el.title,
            selected: true,
            yAxisIndex: 0,
            markLine: {
              symbol: "none",
              data: [
                {
                  name: "标记线",
                  xAxis: firstTime,
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    type: "solid",
                    color: "#000",
                  },
                },
              ],
              label: { show: false, position: "middle" },
              silent: true,
            },
          };
        });
    },
    generateChartData(carouselCount, showTypeList) {
      for (let i = 0; i < carouselCount.length; i++) {
        let chartOption = {
          title: {
            text: "",
            left: "center",
          },
          legend: [],
        };
        let chartAxis = {
          xAxis: "time",
          yAxis: [],
          series: [],
        };
        chartAxis.yAxis = this.generateChartYaxis(
          showTypeList,
          carouselCount[i]
        );
        chartAxis.series = this.generateChartSeries(
          showTypeList,
          carouselCount[i]
        );
        chartOption.legend = this.generateChartLegend(
          showTypeList,
          carouselCount[i]
        );
        let chartData = this.tableData;
        this.chartList.push({
          chartOption,
          chartAxis,
          chartData,
          id: guid(),
        });
      }
    },
    hideRows() {
      let hideRows = [];
      for (let i = 0; i < this.splitIndex; i++) {
        hideRows.push(i);
      }
      this.setting.hiddenRows = {};
      this.setting.hiddenRows.rows = hideRows;
      this.setting.hiddenRows.indicators = true;
    },
    onChange(a, b, c) {
      this.currentIndex = a;
    },
  },
};
</script>

<style>
.series-result .ant-carousel .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  overflow: hidden;
}
.series-result .ant-carousel .slick-dots {
  width: 20%;
  height: 40px;
  position: absolute;
  left: 50%; /* 定位父级的50% */
  bottom: -50px;
  transform: translate(-50%, 0); /*自己的50% */
  display: flex !important;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: #40a9ff;
}
.ant-carousel >>> .slick-slide h3 {
  color: #40a9ff;
}
.chart-container {
  margin-bottom: 96px;
}
.table-container {
}
</style>