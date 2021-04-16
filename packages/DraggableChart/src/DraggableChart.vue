<template>
  <div :class="classNames">
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
    // 根据传入的可拖拽线的选项，动态生成一条或者多条线的arr数组
    this.dragFields.forEach((item) => {
      this.arr.push(
        this.data.map((el) => {
          return el[item];
        })
      );
    });
    const that = this;
    // resize事件的回调，实时更新图表的显示数据
    function updatePosition() {
      that.instance.setOption({
        graphic: reduceDimension(
          that.arr.map((el, i) =>
            echarts.util.map(el, function (item, dataIndex) {
              return {
                position: that.instance.convertToPixel("grid", item),
              };
            })
          )
        ),
      });
    }
    setTimeout(() => {
      // 动态设置拖拽相关的options
      this.mergeOptions(this.instance);
    }, 0);

    window.addEventListener("resize", updatePosition);

    const _self = this;
    const myChart = this.instance;
    const itemEidt = null;
    let divContainer = document.querySelector(`.draggable-chart div`);

    function moveDownListener(e) {
      let controlIndex = _self.getGridIndex(e, myChart);
      if (controlIndex < 0) {
        if (myChart.editingSeriesIndex < 0) {
          myChart.editGirdIndex = -1;
        }
        return;
      }
      //是否可以拖动
      if (myChart.canDrag != null && myChart.canDrag) {
        let mousePos = _self.getEventPosition(e);
        let pointArr = [mousePos.x, mousePos.y];
        let dataPoint = myChart.convertFromPixel(
          {
            gridIndex: myChart.editGirdIndex,
          },
          pointArr
        );
        let tempXAxis = _self.getXAxis(myChart, myChart.editGirdIndex);
        if (tempXAxis != null && !tempXAxis.boundaryGap) {
          let viewPoint = myChart.convertToPixel(
            {
              gridIndex: myChart.editGirdIndex,
            },
            [dataPoint[0], "0"]
          );
          if (viewPoint[0] > mousePos.x) {
            dataPoint[0] = dataPoint[0] - 1;
          }
        }

        myChart.startEidtIndex = dataPoint[0];
        myChart.lastEditDataIndex = dataPoint[0];
        return;
      }
      myChart.editGirdIndex = controlIndex;
      let tempPlotOrder = myChart.plotOrder;
      let editSeriesIndex = _self.getEidtSeriesIndex(e, myChart, controlIndex);

      if (itemEidt == null) return;
      let tempItemEdit = _self.recombinedData(tempPlotOrder, itemEidt);
      if (
        editSeriesIndex < 0 ||
        tempItemEdit == null ||
        tempItemEdit[editSeriesIndex] == false
      ) {
        editSeriesIndex = -1;
      }

      let series = myChart._model.option.series;
      for (let i = 0; i < series.length; i++) {
        if (myChart._model.option.series[i].type == "bar") {
          if (i == editSeriesIndex) {
            myChart._model.option.series[i].itemStyle.borderWidth = 2;
          } else {
            myChart._model.option.series[i].itemStyle.borderWidth = 0;
          }
        } else {
          if (i == editSeriesIndex) {
            myChart._model.option.series[i].lineStyle.width = 3;
            myChart._model.option.series[i].showSymbol = true;
          } else {
            myChart._model.option.series[i].lineStyle.width = 2;
            myChart._model.option.series[i].showSymbol = false;
          }
        }
      }
      myChart.editingSeriesIndex = editSeriesIndex;
      let canvasContainer = document.querySelector(".draggable-chart canvas");
      if (editSeriesIndex < 0) {
        myChart.canDrag = false;
        canvasContainer.style.cursor = "default";
      } else {
        myChart.canDrag = true;
        canvasContainer.style.cursor = "n-resize";
      }
      myChart.setOption(myChart.getOption());
    }

    function moveMoveListener(e) {
      let canvasContainer = document.querySelector(".draggable-chart canvas");
      //设置全局鼠标移动坐标点
      const mousePosi = _self.getEventPosition(e);
      this.mousePosiArr = [mousePosi.x, mousePosi.y];
      const showDragFlag = _self._showDragLine;

      //设置拖动线start
      if (showDragFlag) {
        this._cacheNodeValCount = 0;
        _self.setDragLiner(
          this.mousePosiArr,
          myChart,
          divContainer.clientHeight,
          "merge"
        );
        _self.setShowNodeVal(this.mousePosiArr, myChart, "merge");
      } else {
        this._cacheNodeValCount++;
        if (this._cacheNodeValCount <= 1) {
          _self.setDragLiner(
            this.mousePosiArr,
            myChart,
            divContainer.clientHeight,
            "remove"
          );
          _self.setShowNodeVal(this.mousePosiArr, myChart, "remove");
        }
      }
      // end

      if (
        myChart.editGirdIndex == null ||
        myChart.editGirdIndex < 0 ||
        myChart.editingSeriesIndex == null ||
        myChart.editingSeriesIndex < 0
      ) {
        return;
      }
      if (
        e.buttons == 1 &&
        myChart.startEidtIndex != null &&
        myChart.startEidtIndex >= 0
      ) {
        let mousePos = _self.getEventPosition(e);
        let pointArr = [mousePos.x, mousePos.y];

        //判断点是否拖出当前plot
        let tempGrid = _self.getGrid(myChart, myChart.editGirdIndex);
        if (pointArr[1] < tempGrid.top) {
          pointArr[1] = tempGrid.top - 5;
        } else if (pointArr[1] > tempGrid.top + tempGrid.height) {
          pointArr[1] = tempGrid.top + tempGrid.height + 5;
        }
        let dataPoint = myChart.convertFromPixel(
          {
            gridIndex: myChart.editGirdIndex,
          },
          pointArr
        );
        let tempXAxis = _self.getXAxis(myChart, myChart.editGirdIndex);
        if (tempXAxis != null && !tempXAxis.boundaryGap) {
          let viewPoint = myChart.convertToPixel(
            {
              gridIndex: myChart.editGirdIndex,
            },
            [dataPoint[0], "0"]
          );
          if (Math.abs(viewPoint[0] - mousePos.x) > 10) {
            return;
            //	dataPoint[0] = dataPoint[0] - 1;
          }
        }

        let tempOption = myChart.getOption();
        let tempPlotOrder = myChart.plotOrder;
        //设置数据方法
        tempOption.setSeriesData = function (seriesIndex, index, value) {
          const mappingIndex = _self.getChangeSoftIndex(
            tempPlotOrder,
            seriesIndex
          );
          mappingIndex && (this.series[mappingIndex].data[index] = value);
          _self.gridEditDatas.push({
            seriesIndex: mappingIndex,
            index: index,
            value: value,
          });
        };

        let tempDataSeries = tempOption.series[myChart.editingSeriesIndex].data;
        if (myChart.editingSeriesIndex === 0) {
          dataPoint[1] = Math.max(0, dataPoint[1]);
        }
        tempDataSeries[dataPoint[0]] = dataPoint[1];
        _self.executeLinkListener(
          {
            seriesIndex: _self.transIndexToOut(
              tempPlotOrder,
              myChart.editingSeriesIndex
            ),
            index: dataPoint[0],
            value: dataPoint[1],
          },
          tempOption
        );
        _self.gridEditDatas.push({
          seriesIndex: _self.transIndexToOut(
            tempPlotOrder,
            myChart.editingSeriesIndex
          ),
          index: dataPoint[0],
          value: dataPoint[1],
        });
        //中间没有发生事件的点的处理
        let minLastDataIndex = Math.min(
          dataPoint[0],
          myChart.lastEditDataIndex
        );
        let maxLastDataIndex = Math.max(
          dataPoint[0],
          myChart.lastEditDataIndex
        );
        if (minLastDataIndex >= 0 && maxLastDataIndex - minLastDataIndex > 1) {
          for (let i = minLastDataIndex; i <= maxLastDataIndex; i++) {
            if (i == dataPoint[0]) continue;
            tempDataSeries[i] =
              tempDataSeries[minLastDataIndex] +
              ((i - minLastDataIndex) *
                (tempDataSeries[maxLastDataIndex] -
                  tempDataSeries[minLastDataIndex])) /
                (maxLastDataIndex - minLastDataIndex);
            _self.executeLinkListener(
              {
                seriesIndex: _self.transIndexToOut(
                  tempPlotOrder,
                  myChart.editingSeriesIndex
                ),
                index: i,
                value: tempDataSeries[i],
              },
              tempOption
            );
            _self.gridEditDatas.push({
              seriesIndex: this.transIndexToOut(
                tempPlotOrder,
                myChart.editingSeriesIndex
              ),
              index: i,
              value: tempDataSeries[i],
            });
          }
        }

        myChart.lastEditDataIndex = dataPoint[0];

        myChart.setOption(tempOption);
        return;
      } else {
        myChart.startEidtIndex = -1;
        myChart.lastEditDataIndex = -1;
        if (_self.gridEditDatas && _self.gridEditDatas.length > 0) {
          let tempGridEditDatas = _self.gridEditDatas;
          _self.gridEditDatas = [];
          _self.executeGridEditListener(tempGridEditDatas, myChart.getOption());
        }
      }
      let mousePos = _self.getEventPosition(e);
      let pointArr = [mousePos.x, mousePos.y];
      let dataPoint = myChart.convertFromPixel(
        {
          gridIndex: myChart.editGirdIndex,
        },
        pointArr
      );
      let tempXAxis = _self.getXAxis(myChart, myChart.editGirdIndex);
      if (tempXAxis != null && !tempXAxis.boundaryGap) {
        let viewPoint = myChart.convertToPixel(
          {
            gridIndex: myChart.editGirdIndex,
          },
          [dataPoint[0], "0"]
        );
        if (viewPoint[0] > mousePos.x) {
          dataPoint[0] = dataPoint[0] - 1;
        }
      }
      let option = myChart.getOption();
      let tempSeries = option.series;
      let dataSeries = tempSeries[myChart.editingSeriesIndex].data;
      //获取echarts的容器
      let seriesType = "BrokenLine";
      let tempYAxis = _self.getYAxis(myChart, myChart.editGirdIndex);
      if (tempSeries[myChart.editingSeriesIndex].step == "end")
        seriesType = "StepLine";
      else if (
        tempSeries[myChart.editingSeriesIndex].type == "bar" &&
        tempYAxis.inverse == true
      )
        seriesType = "RainBar";
      else if (
        tempSeries[myChart.editingSeriesIndex].type == "bar" &&
        tempYAxis.inverse == false
      )
        seriesType = "Bar";
      if (
        _self.isOnSeries(
          myChart,
          pointArr,
          dataPoint,
          myChart.editGirdIndex,
          dataSeries,
          seriesType
        )
      ) {
        myChart.canDrag = true;
        canvasContainer.style.cursor = "n-resize";
      } else {
        myChart.canDrag = false;
        canvasContainer.style.cursor = "default";
        myChart.startEidtIndex = -1;
        myChart.lastEditDataIndex = -1;
      }
      myChart.setOption(myChart.getOption());
    }
    function moveUpListener(e) {
      myChart.startEidtIndex = -1;
      myChart.lastEditDataIndex = -1;
      if (this.gridEditDatas && this.gridEditDatas.length > 0) {
        let tempGridEditDatas = this.gridEditDatas;
        this.gridEditDatas = [];
        this.executeGridEditListener(tempGridEditDatas, myChart.getOption());
      }
    }

    //设置拖动线
    function dblClickListener(e) {
      _self._showDragLine = !_self._showDragLine;
    }
    const moveDownFunc = moveDownListener.bind(this);
    const moveMoveFunc = moveMoveListener.bind(this);
    const moveUpFunc = moveUpListener.bind(this);
    const dblClickFunc = dblClickListener.bind(this);
    divContainer.addEventListener("mousedown", moveDownFunc, true);
    divContainer.addEventListener("mousemove", moveMoveFunc, true);
    divContainer.addEventListener("mouseup", moveUpFunc, true);
    divContainer.addEventListener("dblclick", dblClickFunc, true);
  },
  beforeDestroy() {
    this.timer = null;
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    //设置拖动的对齐线
    setDragLiner(posiArr = [0, 0], myChart, containerHeight, action = "merge") {
      const { lrRange, tbRange } = this.containerRange;
      const xPosi = posiArr[0];
      const yPosi = posiArr[1];
      if (lrRange[0] <= xPosi && xPosi <= lrRange[1]) {
        if (tbRange[0] <= yPosi && yPosi <= tbRange[1]) {
          myChart.setOption({
            graphic: {
              type: "line",
              id: "dragLine",
              z: 1000,
              $action: action,
              shape: {
                x1: posiArr[0],
                y1: 30,
                x2: posiArr[0],
                y2: containerHeight - 30,
              },
              style: {
                lineWidth: 1,
                fill: "#ccc",
              },
            },
          });
        }
      }
    },
    //设置拖动的当前节点数值显示
    setShowNodeVal(posiArr, myChart, action) {
      posiArr = posiArr || [0, 0];
      action = action || "merge";
      const { lrRange, tbRange } = this.containerRange;
      const xPosi = posiArr[0];
      const yPosi = posiArr[1];

      const chartInstance = myChart.getOption();
      const seriesArr = chartInstance.series;
      const colorList = chartInstance.color;
      const yAxisList = chartInstance.yAxis;
      const xAxisList = chartInstance.xAxis[0].data;
      const legendList = chartInstance.legend[0].data;

      const [xAxisVal = -1, yAxisVal = -1] = myChart.convertFromPixel(
        {
          seriesIndex: 0,
        },
        posiArr
      );

      if (xAxisVal < 0 && seriesArr.length - 1 < xAxisVal) return;
      if (
        lrRange[0] <= xPosi &&
        xPosi <= lrRange[1] &&
        tbRange[0] <= yPosi &&
        yPosi <= tbRange[1]
      ) {
        const textObjArr = [],
          cacheYaxisArr = [],
          cacheXaxisArr = [];
        seriesArr.forEach((item, i) => {
          const yVal = item.data[xAxisVal];

          const showVal = this.getPrecision(3, yVal);

          const pointArr = myChart.convertToPixel(
            {
              gridIndex: item.yAxisIndex,
            },
            [xAxisVal, yVal]
          );
          i === 0
            ? cacheYaxisArr.push(pointArr[1])
            : cacheYaxisArr.push(pointArr[1] - 15);
          cacheXaxisArr.push(pointArr[0]);
          textObjArr.push({
            type: "text",
            z: 1000,
            id: item.name,
            left: pointArr[0],
            top: pointArr[1],
            $action: action,
            bounding: "all",
            style: {
              text: [
                `${legendList[i]}: ${showVal} ${
                  yAxisList[item.yAxisIndex].name
                }`,
              ].join("\n"),
              textAlign: "center",
              textVerticalAlign: "middle",
              fill: i == 0 ? "blue" : colorList[i - 1], //面雨量有color有回调，通过获取getcolor获取
              font: 'bolder 12px "Microsoft YaHei", sans-serif',
              lineWidth: 1,
            },
          });
        });
        //处理y轴重合点坐标
        for (let i = 0, len = cacheYaxisArr.length; i < len; i++) {
          for (let j = i + 1; j < len - 1; j++) {
            const compireNum = Math.abs(cacheYaxisArr[i] - cacheYaxisArr[j]);
            if (compireNum <= 12) {
              cacheYaxisArr[j] = cacheYaxisArr[i] - 12;
            }
          }
        }

        //123是显示数据的宽度
        for (let i = 0, len = cacheXaxisArr.length; i < len; i++) {
          if (xPosi + 115 > lrRange[1]) {
            // cacheXaxisArr[i] = cacheXaxisArr[i] - (xPosi + 123 - lrRange[1]);
            cacheXaxisArr[i] = lrRange[1] - 115;
          }
        }

        textObjArr.forEach((item, index) => {
          item.top = cacheYaxisArr[index];
          item.left = cacheXaxisArr[index];
        });

        // if(xPosi + 115 > lrRange[1]) {
        // 	// cacheXaxisArr[i] = cacheXaxisArr[i] - (xPosi + 123 - lrRange[1]);
        // 	cacheXaxisArr[i] = lrRange[1] - 115;
        // }
        textObjArr.push({
          type: "text",
          z: 1000,
          id: "xAxisText",
          left: textObjArr[0].left - 72,
          top: (tbRange[1] - tbRange[0]) / 2 - 6,
          $action: action,
          bounding: "all",
          style: {
            text: [`${xAxisList[xAxisVal]}`].join("\n"),
            textAlign: "center",
            textVerticalAlign: "middle",
            fill: "black",
            font: 'bolder 12px "Microsoft YaHei", sans-serif',
            lineWidth: 1,
          },
        });

        myChart.setOption({
          graphic: textObjArr,
        });
      }
    },
    getXAxis(myChart, editGirdIndex) {
      let option = myChart.getOption();
      let tempXAxisArr = option.xAxis;
      for (let i = 0; i < tempXAxisArr.length; i++) {
        if (tempXAxisArr[i].gridIndex == editGirdIndex) {
          return tempXAxisArr[i];
        }
      }
      return null;
    },
    getYAxis(myChart, editGirdIndex) {
      let option = myChart.getOption();
      let tempYAxisArr = option.yAxis;
      for (let i = 0; i < tempYAxisArr.length; i++) {
        if (tempYAxisArr[i].gridIndex == editGirdIndex) {
          return tempYAxisArr[i];
        }
      }
      return null;
    },
    //获得排序后值等于原索引的索引
    getChangeSoftIndex(plotOrder, index) {
      let newPlotOrder = [...plotOrder];
      let tempArrOrder = [];
      let tempIndexArr = [];
      for (let i = 0; i < newPlotOrder.length; i++) {
        tempIndexArr[i] = i;
      }
      for (let i = 0; i < newPlotOrder.length; i++) {
        for (let j = 0; j < newPlotOrder.length - 1 - i; j++) {
          if (newPlotOrder[j] > newPlotOrder[j + 1]) {
            let tempOrder = newPlotOrder[j];
            let tempNewData = tempIndexArr[j];
            newPlotOrder[j] = newPlotOrder[j + 1];
            newPlotOrder[j + 1] = tempOrder;
            tempIndexArr[j] = tempIndexArr[j + 1];
            tempIndexArr[j + 1] = tempNewData;
          }
        }
      }

      if (index >= 0 && index < tempIndexArr.length) {
        for (let i = 0, len = tempIndexArr.length; i < len; i++) {
          if (tempIndexArr[i] == index) {
            return i;
          }
        }
      }
      return null;
    },
    //获取指定索引映射的数据源
    transIndexToOut(plotOrder, index) {
      let newPlotOrder = [...plotOrder];
      let tempArrOrder = [];
      let tempIndexArr = [];
      for (let i = 0; i < newPlotOrder.length; i++) {
        tempIndexArr[i] = i;
      }
      for (let i = 0; i < newPlotOrder.length; i++) {
        for (let j = 0; j < newPlotOrder.length - 1 - i; j++) {
          if (newPlotOrder[j] > newPlotOrder[j + 1]) {
            let tempOrder = newPlotOrder[j];
            let tempNewData = tempIndexArr[j];
            newPlotOrder[j] = newPlotOrder[j + 1];
            newPlotOrder[j + 1] = tempOrder;
            tempIndexArr[j] = tempIndexArr[j + 1];
            tempIndexArr[j + 1] = tempNewData;
          }
        }
      }

      if (index >= 0 && index < tempIndexArr.length) {
        return tempIndexArr[index];
      }

      return null;
    },
    executeLinkListener(editData, option) {
      if (this.gridLinkListener == null) return;
      for (let i = 0; i < this.gridLinkListener.length; i++) {
        this.gridLinkListener[i](editData, option);
      }
    },
    getGrid(myChart, editGirdIndex) {
      let option = myChart.getOption();
      let tempGrid = option.grid;
      let tempYAxisArr = option.yAxis;
      for (let i = 0; i < tempYAxisArr.length; i++) {
        if (tempYAxisArr[i].gridIndex == editGirdIndex) {
          return tempGrid[i];
        }
      }
      return null;
    },
    getGridIndex(ev, myChart) {
      let mousePos = this.getEventPosition(ev);
      let pointArr = [mousePos.x, mousePos.y];
      let option = myChart.getOption();
      let tempYAxisArr = option.yAxis;
      for (let i = 0; i < tempYAxisArr.length; i++) {
        let containPoint = myChart.containPixel(
          {
            gridIndex: tempYAxisArr[i].gridIndex,
          },
          pointArr
        );
        if (containPoint) {
          return tempYAxisArr[i].gridIndex;
        }
      }
      return -1;
    },
    //数据依据设置的顺序重新排序后返回
    recombinedData(plotOrder, tempData) {
      if (tempData == null) return null;
      let newPlotOrder = [...plotOrder];
      let newTempData = [...tempData];
      if (plotOrder != null) {
        for (let i = 0; i < newPlotOrder.length; i++) {
          for (let j = 0; j < newPlotOrder.length - 1 - i; j++) {
            if (newPlotOrder[j] > newPlotOrder[j + 1]) {
              let tempOrder = newPlotOrder[j];
              let tempNewData = newTempData[j];
              newPlotOrder[j] = newPlotOrder[j + 1];
              newPlotOrder[j + 1] = tempOrder;
              newTempData[j] = newTempData[j + 1];
              newTempData[j + 1] = tempNewData;
            }
          }
        }
      }
      return newTempData;
    },
    //获取当前鼠标点击的位置
    getEventPosition(ev) {
      let x, y;
      if (ev.layerX || ev.layerX == 0) {
        x = ev.layerX;
        y = ev.layerY;
      } else if (ev.offsetX || ev.offsetX == 0) {
        // Opera
        x = ev.offsetX;
        y = ev.offsetY;
      }
      return { x: x, y: y };
    },
    executeGridEditListener(editDatas, options) {
      if (this.gridEditListener == null) return;
      for (let i = 0; i < this.gridEditListener.length; i++) {
        this.gridEditListener[i](
          this.getSeriesChangeVal(editDatas),
          options.series
        );
      }
    },
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
                    // 这里做了一个事件的节流
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