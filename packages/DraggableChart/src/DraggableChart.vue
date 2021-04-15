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

function reduceDimension(arr) {
  return Array.prototype.concat.apply([], arr); //数据降维
}
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
    dragFields: {
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
      arr: [],
      timer: null,
    };
  },
  computed: {
    classNames() {
      return ["draggable-chart"].concat(this.classes).join(" ");
    },
  },
  mounted() {
    //获取echart实例对象
    this.instance = echarts.getInstanceByDom(
      document.getElementsByClassName("chart draggable-chart")[0]
    );
    this.dragFields.forEach((item) => {
      this.arr.push(
        this.data.map((el) => {
          return el[item];
        })
      );
    });
    function updatePosition() {
      this.instance.setOption({
        graphic: reduceDimension(
          this.arr.map((el, i) =>
            echarts.util.map(el, function (item, dataIndex) {
              return {
                position: this.instance.convertToPixel("grid", item),
              };
            })
          )
        ),
      });
    }
    // 合并拖拽相关的option
    this.mergeOptions(this.instance);

    window.addEventListener("resize", updatePosition);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    useTimer(cb, time) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        cb && cb();
        this.timer = null;
      }, time);
    },
    resize() {
      this.instance.resize();
    },
    mergeOptions(dom) {
      dom.setOption({
        graphic: reduceDimension(
          this.arr.map((el, i) => {
            if (i > 10) {
              //筛选拖动线的条件，可自行配置
              return;
            }
            return echarts.util.map(el, (dataItem, dataIndex) => {
              const that = this; // because ondrag Functions must be used within callbacks this.position Get real-time coordinates, which must be used here that replace this
              return {
                // 'circle' Express this graphic element The type of dot is dot.
                type: "circle",
                shape: {
                  cx: 0,
                  cy: 0,
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
                ondragend: echarts.util.curry(
                  function (dataIndex, i) {
                    that.arr[i][dataIndex] = that.instance.convertFromPixel(
                      "grid",
                      this.position
                    );
                    //执行保存数据相关操作
                  },
                  dataIndex,
                  i
                ),
                ondrag: echarts.util.curry(
                  function (dataIndex, dx) {
                    let origin = that.instance.convertToPixel(
                      "grid",
                      that.arr[dx][dataIndex]
                    );
                    if (this.position[1] > 340) {
                      //控制上下拖动范围 跟ref高度有关
                      this.position[1] = 340;
                    } else if (this.position[1] < 60) {
                      this.position[1] = 60;
                    }
                    this.position[0] = origin[0];
                    that.arr[dx][dataIndex] = that.instance.convertFromPixel(
                      "grid",
                      this.position
                    );
                    that.instance.setOption({
                      series: [
                        {
                          id: that.dragFields[dx],
                          data: that.arr[dx],
                        },
                      ],
                    });
                    that.useTimer(() => {
                      that.$emit(
                        "updateData",
                        that.dragFields[dx],
                        that.arr[dx]
                      );
                    }, 300);
                  },
                  dataIndex,
                  i
                ),
              };
            });
          })
        ),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>