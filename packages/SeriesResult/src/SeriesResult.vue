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
    generateChartYaxis(showTypeList, current) {
      let yAxisList = showTypeList.filter(
        (el) => el.showType.indexOf(current) !== -1
      );
      let yAxis = [];
      for (let i = 0; i < yAxisList.length; i++) {
        yAxis.push({
          title: yAxisList[i].title,
          type: "value",
          name: "",
          axisLabel: {
            show: false,
          },
          position: positionMaps[yAxisList[i].showType.split("-")[1]],
        });
      }

      return yAxis;
    },
    generateChartSeries(showTypeList, current) {
      return showTypeList
        .filter((el) => el.showType.indexOf(current) !== -1)
        .map((el) => {
          return {
            field: el.field,
            title: el.title,
            selected: true,
            yAxisIndex: 0,
          };
        });
    },
    generateChartData(carouselCount, showTypeList) {
      for (let i = 0; i < carouselCount.length; i++) {
        let chartOption = {
          title: {
            text: "水位流量图",
            left: "center",
          },
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
  background: #364d79;
}
.ant-carousel >>> .slick-slide h3 {
  color: #364d79;
}
.chart-container {
  margin-bottom: 96px;
}
.table-container {
}
</style>