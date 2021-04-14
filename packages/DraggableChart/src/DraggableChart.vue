<template>
  <div :classes="classNames">
    <div class="chart-container">
      <standard-chart
        ref="chartRef"
        :chartOption="chartOption"
        :isRefresh="isRefresh"
        :chartAxis="chartAxis"
        :classes="['draggable-chart']"
        @mergeOptions="mergeOptions"
        :chartData="data"
      />
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import StandardChart from "../../StandardChart/src/StandardChart.vue";
export default {
  props: {
    classes: {
      type: Array,
      required: false,
    },
    isRefresh: {
      type: Boolean,
      default: true,
      required: false,
    },
    chartOption: {
      type: Object,
      required: false,
    },
    chartAxis: {
      type: Object,
    },
    tableColumns: {
      type: Array,
    },
    data: {
      type: Array,
    },
  },
  components: {
    StandardChart,
  },
  data() {
    return {
      instance: null,
      symbolSize: 10,
      dom: null,
      newData: [],
    };
  },
  computed: {
    classNames() {
      return ["draggable-chart"].concat(this.classes).join(" ");
    },
  },
  mounted() {
    this.instance = echarts.getInstanceByDom(
      document.getElementsByClassName("chart draggable-chart")[0]
    );
    this.mergeOptions(this.instance);

    window.addEventListener("resize", () => {
      this.instance.setOption({
        graphic: echarts.util.map(this.data, (item, dataIndex) => {
          return {
            position: this.instance.convertToPixel("grid", item),
          };
        }),
      });
    });
    console.log(this.instance.getOption());
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    resize() {
      this.instance.resize();
    },
    onPointDragging(dataIndex, pos) {
      this.newData[dataIndex] = this.instance.convertFromPixel("grid", pos);

      // Update data
      this.instance.setOption({
        series: [
          {
            id: "dim2",
            data: this.newData,
          },
        ],
      });
    },
    mergeOptions(dom) {
      console.log("dom", dom);
      this.newData = this.data.map((el) => {
        // return [el.index, el.dim2];
        return el.dim2;
      });
      console.log("data", this.newData);
      dom.setOption({
        graphic: echarts.util.map(this.newData, (dataItem, dataIndex) => {
          const that = this; // because ondrag Functions must be used within callbacks this.position Get real-time coordinates, which must be used here that replace this
          console.log(dataItem, dataIndex);
          return {
            // 'circle' Express this graphic element The type of dot is dot.
            type: "circle",
            shape: {
              // The radius of a circle.
              cx: 0,
              cy: 0,
              r: that.symbolSize / 2,
            },
            // use transform The method locates the dots. position: [x, y] Represents translating a dot to [x, y] Location.
            // Here we use convertToPixel this API To get the position of each dot
            position: dom.convertToPixel("grid", dataItem),
            // This property makes the dot invisible (but does not affect its response to mouse events).
            invisible: true,
            // This property allows the dot to be dragged.
            draggable: true,
            // hold z A larger value means that the circle is at the top and can cover the circle of the existing polyline graph.
            z: 100,
            ondrag: function (dx, dy) {
              console.log(dx, dy);
              that.onPointDragging(dataIndex, [this.x, this.y]);
            },
          };
        }),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>