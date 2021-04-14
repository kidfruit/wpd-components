<template>
  <div>
    <v-chart
      v-if="isVisible && isRefresh"
      :class="classNames"
      :option="option"
      :theme="theme"
      ref="chartRef"
    />
  </div>
</template>
<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
const defaultOption = {
  title: {
    text: "",
  },
  tooltip: {
    trigger: "axis",
  },
  grid: {
    bottom: 50,
  },
  legend: {
    data: [],
    selected: {},
    left: "center",
    top: "30",
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [],
  },
  yAxis: [],
  series: [],
};

const yAxisOption = {
  type: "value",
  splitNumber: 5,
  axisLine: { show: true },
  splitLine: {
    show: true,
    lineStyle: {
      color: ["#eee"],
    },
  },
  splitArea: {
    show: true,
    areaStyle: {
      color: ["#fafafa"],
    },
  },
  max: function (value) {
    return value.max + (value.max - value.min) * 0.15;
  },
  min: function (value) {
    let minV = value.min - (value.max - value.min) * 0.15;
    return minV >= 0 ? minV : 0;
  },
};

export default {
  name: "StandardChart",
  props: {
    isVisible: {
      type: Boolean,
      default: true,
      required: false,
    },
    isRefresh: {
      type: Boolean,
      default: true,
      required: false,
    },
    classes: {
      type: Array,
      required: false,
    },
    theme: {
      type: String,
      default: "macarons",
      required: false,
    },
    chartOption: {
      type: Object,
      required: false,
    },
    chartAxis: {
      type: Object,
    },
    chartData: {
      type: Array,
    },
  },
  components: {
    VChart,
  },
  beforeMount() {},
  mounted() {
    this.getChartInstance();
    window.addEventListener("resize", this.resizeTheChart);
  },
  data() {
    return {
      instance: null,
    };
  },
  computed: {
    classNames() {
      return ["chart"].concat(this.classes);
    },
    option() {
      return this.prepareSeries();
    },
  },
  methods: {
    getChartInstance() {
      if (this.$refs.chartRef) {
        this.instance = this.$refs.chartRef;
      }
    },
    resizeTheChart() {
      if (this.$refs && this.$refs.chartRef) {
        this.$refs.chartRef.resize();
      }
    },
    prepareSeries() {
      let option = Object.assign({}, defaultOption, this.chartOption);
      //x轴
      option.xAxis.data = this.chartData.map((cd) => cd[this.chartAxis.xAxis]);
      if (this.chartAxis.timeSeries) {
        option.xAxis.data = this.sortTime(option.xAxis.data);
      }

      //y轴
      //按照yAxisIndex排序
      if (
        Object.prototype.hasOwnProperty.call(
          this.chartAxis.yAxis[0],
          "yAxisIndex"
        )
      ) {
        this.chartAxis.yAxis = this.chartAxis.yAxis.sort((a, b) => {
          return a["yAxisIndex"] - b["yAxisIndex"];
        });
      }

      option.yAxis = this.chartAxis.yAxis.map((ax) => {
        return Object.assign({}, yAxisOption, { name: ax.title });
      });

      //legend
      this.chartAxis.series.forEach((yx) => {
        option.legend.data.push(yx.title);
        option.legend.selected[yx.title] = Object.prototype.hasOwnProperty.call(
          yx,
          "selected"
        )
          ? yx.selected
          : true;
      });

      //data
      this.chartData = this.chartData.sort((a, b) => {
        let timeField = this.chartAxis.xAxis;
        return (
          new Date(a[timeField]).getTime() - new Date(b[timeField]).getTime()
        );
      });
      this.chartAxis.series.forEach((yax) => {
        let seriesObj = {
          name: yax.title,
          type: "line",
          data: [],
          yAxisIndex: yax.yAxisIndex,
        };
        seriesObj.data = this.chartData.map((cd) => cd[yax.field]);
        option.series.push(seriesObj);
      });
      if (!option.timeline) {
        return {
          baseOption: option,
        };
      } else {
        // 带有时间线的chart
        let options = [];
        let fields = this.chartAxis.series.map((el) => el.field);
        this.chartData.forEach((cd) => {
          let series = [];
          fields.forEach((item) => {
            if (cd[item]) {
              series.push({ data: cd[item] });
            }
          });
          options.push({
            series,
          });
        });
        return {
          baseOption: option,
          options,
        };
      }
    },
    sortTime(timeList) {
      return timeList.sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
      });
    },
  },
};
</script>
