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
          console.log(222, dataItem, dataIndex);
          return {
            // 'circle' Express this graphic element The type of dot is dot.
            type: "circle",
            shape: {
              // The radius of a circle.
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
            // ondrag: echarts.util.curry(function (dataIndex) {
            //   // let origin = dom.convertToPixel("grid", that.data[dataIndex]);
            //   console.log(dataIndex);
            //   that.onPointDragging(dataIndex, [this.x, this.y]);
            // }),
            ondrag: echarts.util.curry(function (dataIndex, pos) {
              // console.log(dataIndex, pos, this.position, 33333);
              // that.newData[dataIndex] = that.instance.convertFromPixel(
              //   "grid",
              //   this.position
              // );
              // // Update data
              // that.instance.setOption({
              //   series: [
              //     {
              //       id: "dim2",
              //       data: that.newData,
              //     },
              //   ],
              // });
              let origin = that.instance.convertToPixel(
                "grid",
                that.newData[dataIndex]
              );
              console.log("pos", this.position[1], this.position[0]);
              // if (this.position[1] > 240) {
              //   this.position[1] = 240;
              // } else if (this.position[1] < 40) {
              //   this.position[1] = 40;
              // }
              if (this.position[1] > 340) {
                //控制上下拖动范围 跟ref高度有关
                this.position[1] = 340;
              } else if (this.position[1] < 60) {
                this.position[1] = 60;
              }

              this.position[0] = origin[0]; // Controlling each point can only be in y Axis movement

              that.newData[dataIndex] = that.instance.convertFromPixel(
                "grid",
                this.position
              );
              that.instance.setOption({
                series: [
                  {
                    id: "dim2",
                    data: that.newData,
                  },
                ],
              });
              that.$emit("updateData", that.newData);
            }, dataIndex),
          };
        }),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>