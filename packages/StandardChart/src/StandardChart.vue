<template>
  <div>
    <div ref="chartRef" :class="classNames" :id="id"></div>
  </div>
</template>
<script>
export const MinMaxFunction = (model, value) => {
  let differ, result;
  switch (model) {
    case 'min':
      if (value.min == -Infinity) return value.min;
      differ = value.max - value.min;
      if (differ === 0) differ = value.min;
      differ = differ * 0.15;
      result = Math.floor(value.min - differ);
      if (value.min < 0) return result;
      else return Math.max(0, result);
    case 'max':
      if (value.max == Infinity) return value.max;
      differ = value.max - value.min;
      if (differ === 0) differ = value.max;
      differ = differ * 0.15;
      result = Math.ceil(value.max + differ);
      if (result < 0) return 0;
      else return result;
  }
};
import * as echarts from 'echarts';
const defaultOption = {
  title: {
    text: ''
  },
  tooltip: {
    trigger: 'axis',
    formatter(params) {
      let list = [];
      params.map(i => {
        if (!list.find(j => i.value === j.value && i.seriesName === j.seriesName)) {
          list.push(i);
        }
      });
      return list
        .map(item => {
          if (item.value === null || item.value === '-') return '';
          else return item.marker + item.seriesName + `<b style="margin-left:5px;">${item.value}</b>`;
        })
        .filter(i => i)
        .join('<br />');
    }
  },
  grid: {
    bottom: 50
  },
  legend: {
    data: [],
    selected: {},
    left: 'center',
    top: '30'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: [],
  series: []
};

const yAxisOption = {
  type: 'value',
  splitNumber: 5,
  axisLine: { show: true },
  splitLine: {
    show: true,
    lineStyle: {
      color: ['#eee']
    }
  },
  splitArea: {
    show: true,
    areaStyle: {
      color: ['#fafafa']
    }
  },
  max: value => MinMaxFunction('max', value),
  min: value => MinMaxFunction('min', value)
};
let echartsInstance = null;
export default {
  name: 'StandardChart',
  props: {
    isVisible: {
      type: Boolean,
      default: true,
      required: false
    },
    isRefresh: {
      type: Boolean,
      default: true,
      required: false
    },
    classes: {
      type: Array,
      required: false
    },
    theme: {
      type: String,
      default: 'macarons',
      required: false
    },
    chartOption: {
      type: Object,
      required: false
    },
    chartAxis: {
      type: Object
    },
    chartData: {
      type: Array
    },
    sections: {
      type: Array
    },
    id: {
      type: String,
      default: 'standard-chart'
    },
    splitIndex: {
      type: Number,
      default: -1
    }
  },
  components: {
    // VChart,
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.drawChart();
    this.getChartInstance();
    window.addEventListener('resize', this.resizeTheChart);
  },
  data() {
    return {
      instance: null
    };
  },
  computed: {
    classNames() {
      return ['chart'].concat(this.classes);
    }
    // option() {
    //   return this.prepareSeries();
    // },
  },
  methods: {
    drawChart() {
      let myChart = echarts.getInstanceByDom(document.getElementById(this.id));
      if (myChart == null) {
        // 如果不存在，就进行初始化
        echartsInstance = echarts.init(document.getElementById(this.id));
        this.setDynamicOption();
      }
    },
    getChartInstance() {
      if (this.$refs.chartRef) {
        this.instance = this.$refs.chartRef;
      }
    },
    clear() {
      echartsInstance.clear();
    },
    setDynamicOption() {
      let option = this.prepareSeries();
      console.log(option, 'option');
      echartsInstance.setOption(option);
    },
    resizeTheChart() {
      if (this.$refs && this.$refs.chartRef) {
        echartsInstance.resize();
      }
    },
    prepareSeries() {
      let option = Object.assign({}, defaultOption, this.chartOption);
      //x轴
      option.xAxis.data = this.chartData.map(cd => cd[this.chartAxis.xAxis]);
      // console.log(option.xAxis.data);
      if (this.chartAxis.timeSeries) {
        option.xAxis.data = this.sortTime(option.xAxis.data);
      }
      if (option.timeline) {
        option.xAxis.data = this.sections;
      }
      if (Array.isArray(option.grid) && option.grid.length > 0) {
        option.xAxis = this.chartAxis.xAxis;
      }

      //y轴
      //按照yAxisIndex排序
      if (Object.prototype.hasOwnProperty.call(this.chartAxis.yAxis[0], 'yAxisIndex')) {
        this.chartAxis.yAxis = this.chartAxis.yAxis.sort((a, b) => {
          return a['yAxisIndex'] - b['yAxisIndex'];
        });
      }

      option.yAxis = this.chartAxis.yAxis.map(ax => {
        return Object.assign({}, yAxisOption, {
          name: ax.title,
          gridIndex: ax.gridIndex,
          position: ax.position,
          axisLabel: ax.axisLabel,
          axisTick: ax.axisTick,
          axisLine: ax.axisLine,
          max: ax.max,
          min: ax.min
        });
      });
      // 如果legend存在并且是个数组，就不会走这个逻辑
      if (!this.chartOption.legend) {
        //legend
        this.chartAxis.series.forEach(yx => {
          option.legend.data.push(yx.title);
          option.legend.selected[yx.title] = Object.prototype.hasOwnProperty.call(yx, 'selected') ? yx.selected : true;
        });
      }

      //data
      this.chartData = this.chartData.sort((a, b) => {
        let timeField = this.chartAxis.xAxis;
        return new Date(a[timeField]).getTime() - new Date(b[timeField]).getTime();
      });
      option.series = [];
      this.chartAxis.series.forEach(yax => {
        let seriesObj = {
          name: yax.title,
          type: 'line',
          data: [],
          yAxisIndex: yax.yAxisIndex,
          xAxisIndex: yax.xAxisIndex,
          smooth: yax.smooth,
          id: yax.id,
          symbolSize: yax.symbolSize,
          lineStyle: yax.lineStyle,
          markLine: yax.markLine,
          color: yax.color,
          itemStyle: yax.itemStyle
        };
        seriesObj.data = this.chartData.map(cd => cd[yax.field]);
        option.series.push(seriesObj);
      });
      if (this.splitIndex && this.splitIndex !== -1) {
        for (let i = 0; i < option.series.length; i++, i++) {
          // 实线的数据
          option.series[i].data = option.series[i].data.map((el, index) => {
            return index <= this.splitIndex ? el : '-';
          });
          // 虚线的数据
          option.series[i + 1].data = option.series[i + 1].data.map((el, index) => {
            return index >= this.splitIndex ? el : '-';
          });
        }
      }
      if (!option.timeline) {
        return {
          baseOption: option
        };
      } else {
        // 带有时间线的chart
        let options = [];
        let fields = this.chartAxis.series.map(el => el.field);
        this.chartData.forEach((cd, index) => {
          let series = [];
          fields.forEach(item => {
            if (cd[item]) {
              series.push({ data: cd[item] });
            }
          });
          options.push({
            series,
            title: {
              text: `${this.chartOption.title.text}    ${this.chartOption.timeline.data[index]}`
            }
          });
        });
        return {
          baseOption: option,
          options
        };
      }
    },
    sortTime(timeList) {
      return timeList.sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
      });
    }
  },
  beforeDestroy() {
    echarts.dispose(echartsInstance);
    window.removeEventListener('resize', this.resizeTheChart);
  }
};
</script>
<style>
.chart {
  width: 100%;
  height: 300px;
}
</style>
