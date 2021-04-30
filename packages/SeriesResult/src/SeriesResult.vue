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
      chartAxis: {
        xAxis: "time",
        yAxis: [],
        series: [],
      },
    };
  },
  created() {
    console.log(this.tableColumns);
    console.log(this.tableData);
    console.log(this.splitIndex);
    let showTypeList = this.tableColumns
      .map((el) => {
        return { showType: el.showType, field: el.field };
      })
      .filter((el) => el.showType);
    console.log(showTypeList);

    let filterList = showTypeList.map((el) => el.showType.split("-")[0]);
    let carouselCount = unique(filterList);
    console.log(carouselCount, filterList);
    this.generateChartSeries(showTypeList);
    this.generateChartData(carouselCount);
    this.hideRows();
    console.log(this.chartList, 1111);
  },
  methods: {
    generateChartSeries(showTypeList) {
      let fields = this.tableColumns
        .map((el) => {
          return { field: el.field, title: el.title };
        })
        .filter((el) => el.field !== "id" && el.field !== "time");
      for (let i = 0; i < fields.length; i++) {
        let obj = {
          field: fields[i].field,
          title: fields[i].title,
          selected: true,
          yAxisIndex: 0,
        };
        this.chartAxis.series.push(obj);
      }
      console.log(this.chartAxis.series, 88);
    },
    generateChartData(carouselCount) {
      for (let i = 0; i < carouselCount.length; i++) {
        let chartOption = {
          title: {
            text: "水位流量图",
            left: "center",
          },
        };
        this.chartAxis.yAxis = [
          {
            title: "流量(m³/s)",
            yAxisIndex: 0,
            type: "value",
            axisLine: {
              symbol: ["none", "arrow"], //箭头一端没效果,一端箭头
              symbolOffset: [0, 8], //箭头段移动8个像素
            },
          },
          {
            title: "流量2(m³/s)",
            yAxisIndex: 1,
            type: "value",
            axisLine: {
              symbol: ["none", "arrow"], //箭头一端没效果,一端箭头
              symbolOffset: [0, 8], //箭头段移动8个像素
            },
          },
        ];
        let chartData = this.tableData;
        this.chartList.push({
          chartOption,
          chartAxis: this.chartAxis,
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
      console.log(a, b, c);
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