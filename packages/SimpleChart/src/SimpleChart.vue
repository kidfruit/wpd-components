<template>
  <div>
    <!-- <v-chart
      v-if="isVisible && isRefresh"
      :class="classNames"
      :option="option"
      :theme="theme"
      ref="chartRef"
    /> -->
  </div>
</template>
<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, BarChart, PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
// import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
const defaultOption = {
  title: {
    text: "折线图",
  },
  tooltip: {
    trigger: "axis",
  },
};

export default {
  name: "SimpleChart",
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
    },
  },
  components: {
    // VChart,
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
      return Object.assign({}, defaultOption, this.chartOption);
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
  },
};
</script>
