<template>
  <div class="drag-chart-container">
    <div ref="drag-wrapper" :class="`${containerDom} drag-wrapper`"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
// 引入柱状图
import "echarts/lib/chart/line";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/legendScroll";
// import { MinMaxFunction } from "@/libs/utils";
import "echarts/theme/macarons.js";
export default {
  name: "Chart",
  props: ["options", "ogridLinkListener", "ogridEditListener", "data"],
  data() {
    return {
      initOnceEvent: true,
      containerDom: `drag-wrapper${String(new Date().getTime()).substring(6)}`,
      gridLinkListener: [],
      gridEditListener: [],
      gridEditDatas: [],
    };
  },
  mounted() {
    this.showChart(this.options);
    this.gridLinkListener = this.ogridLinkListener;
    this.gridEditListener = this.ogridEditListener;
  },
  watch: {
    options: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.showChart(newValue);
        }
      },
      deep: true,
    },
  },
  methods: {
    //传换类型
    transPlotType(singlePlotType) {
      switch (singlePlotType) {
        case "BrokenLine":
          return "line";
        case "DashedLine":
          return "line";
        case "RainBar":
          return "bar";
        case "Bar":
          return "bar";
        case "StepLine":
          return "line";
        default:
          return "line";
      }
    },
    rainItemStyle() {
      return {
        normal: {
          borderWidth: 0,
          borderType: "solid",
          borderColor: "#A5F28C",
          color: function (params) {
            const { value } = params;
            const nowVal = value * 1;
            let color = "";
            let colorList = ["#FEFEFE", "#D0FDB9", "#A5F28C", "#38A20F", "#5FBAFO", "#0002FB", "#0E6A49", "#FE00F7", "#DC4E01", "#710200"];
            if (nowVal == 0) {
              color = colorList[0];
            } else if (0 < nowVal && nowVal <= 1) {
              color = colorList[1];
            } else if (1 < nowVal && nowVal <= 2) {
              color = colorList[2];
            } else if (2 < nowVal && nowVal <= 4) {
              color = colorList[3];
            } else if (4 < nowVal && nowVal <= 6) {
              color = colorList[4];
            } else if (6 < nowVal && nowVal <= 8) {
              color = colorList[5];
            } else if (8 < nowVal && nowVal <= 10) {
              color = colorList[6];
            } else if (10 < nowVal && nowVal <= 20) {
              color = colorList[7];
            } else if (20 < nowVal && nowVal <= 50) {
              color = colorList[8];
            } else if (nowVal > 50) {
              color = colorList[9];
            }
            return color;
          },
        },
      };
    },
    barItemStyle() {
      return {
        normal: {
          borderWidth: 0,
          borderType: "solid",
          borderColor: "#A5F28C",
        },
      };
    },
    DashedLineItemStyle() {
      return {
        normal: {
          lineStyle: {
            width: 2,
            type: "dashed",
          },
        },
      };
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

    organizeGrid(chartHeight, myChart, plotOrder, plotSize) {
      let tempGrid = [];
      let tempArrOrder = [];
      let tempArrSize = [];
      let totalHeight = 0.0;
      for (let i = 0; i < plotOrder.length; i++) {
        if (!tempArrOrder.includes(plotOrder[i])) {
          let tempIndex = tempArrOrder.length;
          tempArrOrder[tempIndex] = plotOrder[i];
          if (plotSize == null || plotSize.length == 0) {
            tempArrSize[tempIndex] = 0.1;
          } else {
            for (let j = 0; j < plotSize.length; j += 2) {
              if (plotSize[j] == plotOrder[i]) {
                tempArrSize[tempIndex] = plotSize[j + 1];
                break;
              }
              tempArrSize[tempIndex] = 1.0 / plotSize[j];
            }
          }
          totalHeight += tempArrSize[tempIndex];
        }
      }
      let tempTop = 60;
      let canUseHeight = chartHeight - 30 * (tempArrOrder.length + 1) - 30 * 1;
      let canUseWidth = myChart.getWidth();
      for (let i = 0; i < tempArrOrder.length; i++) {
        let tempH = (canUseHeight * tempArrSize[i]) / totalHeight;
        tempGrid.push({
          left: 50,
          right: 50,
          height: tempH,
          top: tempTop,
        });
        tempTop += 30 + tempH;
      }
      //设置组件实例的容器可用范围
      this.containerRange = {
        lrRange: [50, canUseWidth - 50],
        tbRange: [30, chartHeight - 30],
      };

      return tempGrid;
    },

    organizeXAxis(plotOrder, plotType, timeList) {
      let tempArrOrder = [];
      let tempPlotType = [];
      for (let i = 0; i < plotOrder.length; i++) {
        if (!tempArrOrder.includes(plotOrder[i])) {
          let tempIndex = tempArrOrder.length;
          tempArrOrder[tempIndex] = plotOrder[i];
          tempPlotType[tempIndex] = plotType[i];
        }
      }
      let tempXAxisArr = [];
      for (let i = 0; i < tempArrOrder.length; i++) {
        if (tempPlotType[i] == "RainBar") {
          if (tempArrOrder.length != 1) {
            tempXAxisArr.push({
              type: "category",
              gridIndex: i,
              boundaryGap: true,
              axisLine: {
                onZero: true,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: i == tempArrOrder.length - 1 ? true : false,
              },
              data: timeList,
              position: "top",
            });
          } else {
            tempXAxisArr.push({
              type: "category",
              gridIndex: i,
              boundaryGap: true,
              axisLine: {
                onZero: true,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: i == tempArrOrder.length - 1 ? true : false,
              },
              data: timeList,
              position: "bottom",
            });
          }
        }
        if (tempPlotType[i] == "Bar") {
          tempXAxisArr.push({
            type: "category",
            gridIndex: i,
            boundaryGap: true,
            axisLine: {
              onZero: true,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: i == tempArrOrder.length - 1 ? true : false,
            },
            data: timeList,
            position: "bottom",
          });
        } else if (tempPlotType[i] == "BrokenLine" || tempPlotType[i] == "DashedLine" || tempPlotType[i] == "StepLine") {
          tempXAxisArr.push({
            type: "category",
            gridIndex: i,
            boundaryGap: false,
            axisLine: {
              onZero: true,
            },
            axisTick: {
              show: i == tempArrOrder.length - 1 ? true : false,
            },
            axisLabel: {
              show: i == tempArrOrder.length - 1 ? true : false,
            },
            data: timeList,
            position: "bottom",
          });
        }
      }
      return tempXAxisArr;
    },

    organizeYAxis(plotOrder, plotType, itemUnit) {
      let tempArrOrder = [];
      let tempPlotType = [];
      let tempItemUnit = [];
      let tempYAxisArr = [];
      for (let i = 0; i < plotOrder.length; i++) {
        if (!tempArrOrder.includes(plotOrder[i])) {
          let tempIndex = tempArrOrder.length;
          tempArrOrder[tempIndex] = plotOrder[i];
          tempPlotType[tempIndex] = plotType[i];
          if (itemUnit == null || itemUnit.length == 0) {
            tempItemUnit[tempIndex] = "";
          } else {
            tempItemUnit[tempIndex] = itemUnit[i];
          }
        }
      }
      for (let i = 0; i < tempArrOrder.length; i++) {
        if (tempPlotType[i] == "RainBar") {
          tempYAxisArr.push({
            gridIndex: i,
            name: tempItemUnit[i],
            nameLocation: "start",
            nameGap: 5,
            type: "value",
            inverse: true,
            max: function (value) {
              return value.max + 10;
            },
          });
        }
        if (tempPlotType[i] == "Bar") {
          tempYAxisArr.push({
            gridIndex: i,
            name: tempItemUnit[i],
            nameLocation: "end",
            nameGap: 5,
            type: "value",
            inverse: false,
            max: function (value) {
              return value.max + 10;
            },
          });
        } else if (tempPlotType[i] == "BrokenLine" || tempPlotType[i] == "DashedLine" || tempPlotType[i] == "StepLine") {
          tempYAxisArr.push({
            gridIndex: i,
            name: tempItemUnit[i],
            nameLocation: "end",
            nameGap: 5,
            type: "value",
            max: (value) => Math.ceil(value.max + 1),
            min: (value) => Math.floor(value.min - 1),
          });
        }
      }
      return tempYAxisArr;
    },
    getTimeData(timeList, tempData) {
      let tempDataList = [];
      for (let i = 0; i < timeList.length; i++) {
        let singleData = {
          name: timeList[i],
          value: [timeList[i], tempData[i]],
        };
        tempDataList.push(singleData);
      }
      return tempDataList;
    },
    organizeSeries(plotOrder, itemTitle, plotType, dataList, itemEdit) {
      let tempMap = new Map();
      let tempArrOrder = [];
      let tempSeriesArr = [];
      for (let i = 0; i < plotOrder.length; i++) {
        let tempIndex = tempArrOrder.indexOf(plotOrder[i]);
        if (tempIndex < 0) {
          tempIndex = tempArrOrder.length;
          tempArrOrder[tempIndex] = plotOrder[i];
          tempMap.set(itemTitle[i], tempIndex);
        } else {
          tempMap.set(itemTitle[i], tempIndex);
        }
        tempSeriesArr.push({
          name: itemTitle[i],
          type: this.transPlotType(plotType[i]),
          step: plotType[i] == "StepLine" ? "end" : null,
          animation: false,
          offset: 100,
          xAxisIndex: tempMap.get(itemTitle[i]),
          yAxisIndex: tempMap.get(itemTitle[i]),
          showSymbol: false,
          hoverAnimation: false,
          symbolSize: 5,
          data: dataList[i],
          edit: itemEdit == null ? true : itemEdit[i],
          itemStyle: plotType[i] == "RainBar" ? this.rainItemStyle() : plotType[i] == "Bar" ? this.barItemStyle() : plotType[i] == "DashedLine" ? this.DashedLineItemStyle() : null,
        });
      }
      return tempSeriesArr;
    },

    addGidLinkListener(gridLinkListener) {
      this.gridLinkListener.push(gridLinkListener);
    },
    addGidEditListener(gridEditListener) {
      this.gridEditListener.push(gridEditListener);
    },
    removeGidLinkListener() {
      this.gridLinkListener = [];
    },
    removeGidEditListener() {
      this.gridEditListener = [];
    },
    getSeriesChangeVal(editData) {
      let cacheSeriesData = {};
      editData.length > 0 &&
        editData.map((item) => {
          if (!cacheSeriesData[item.index]) {
            cacheSeriesData[item.index] = item;
          } else {
            cacheSeriesData[item.index] = item;
          }
        });

      return cacheSeriesData;
    },
    executeLinkListener(editData, option) {
      if (this.gridLinkListener == null) return;
      for (let i = 0; i < this.gridLinkListener.length; i++) {
        this.gridLinkListener[i](editData, option);
      }
    },
    executeGridEditListener(editDatas, options) {
      if (this.gridEditListener == null) return;
      for (let i = 0; i < this.gridEditListener.length; i++) {
        this.gridEditListener[i](this.getSeriesChangeVal(editDatas), options.series);
      }
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
    getElementLeft(element) {
      var actualLeft = element.offsetLeft;
      var current = element.offsetParent;

      while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }

      return actualLeft;
    },
    getElementTop(element) {
      var actualTop = element.offsetTop;
      var current = element.offsetParent;

      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }

      return actualTop;
    },
    getTransform(el) {
      var st = window.getComputedStyle(el, null);
      var tr = st.getPropertyValue("-webkit-transform") || st.getPropertyValue("-moz-transform") || st.getPropertyValue("-ms-transform") || st.getPropertyValue("-o-transform") || st.getPropertyValue("transform") || "FAIL";
      // var values = tr.split('(')[1].split(')')[0].split(', ')
      // var a = values[0]
      // var b = values[1]
      // var x = parseInt(values[4])
      // var y = parseInt(values[5])

      // var scale = Math.sqrt(a * a + b * b)
      // //console.log('Scale: ' + scale)

      // var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI))
      // //console.log('Rotate: ' + angle + 'deg')
      // return {
      // 	x,
      // 	y
      // }
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
    isOnSeries(myChart, pointArr, dataPoint, editGirdIndex, dataSeries, seriesType) {
      let viewBPoint = myChart.convertToPixel({ gridIndex: editGirdIndex }, [dataPoint[0], dataSeries[dataPoint[0]]]);
      let viewYValue = null;
      if (seriesType == "BrokenLine") {
        let viewEPoint = myChart.convertToPixel({ gridIndex: editGirdIndex }, [dataPoint[0] + 1, dataSeries[dataPoint[0] + 1]]);
        viewYValue = viewBPoint[1] + ((pointArr[0] - viewBPoint[0]) * (viewEPoint[1] - viewBPoint[1])) / (viewEPoint[0] - viewBPoint[0]);
      } else if (seriesType == "StepLine" || seriesType == "Bar" || seriesType == "RainBar") {
        viewYValue = viewBPoint[1];
      }
      if (Math.abs(viewYValue - pointArr[1]) < 6) {
        return true;
      }
    },
    getEidtSeriesIndex(ev, myChart, editGirdIndex) {
      myChart.editingSeriesIndex = -1;
      let yAxis = this.getYAxis(myChart, editGirdIndex);

      if (yAxis == null) return -1;

      let option = myChart.getOption();
      let mousePos = this.getEventPosition(ev);
      let pointArr = [mousePos.x, mousePos.y];

      let dataPoint = myChart.convertFromPixel(
        {
          gridIndex: editGirdIndex,
        },
        pointArr
      );

      let tempXAxis = this.getXAxis(myChart, editGirdIndex);

      if (tempXAxis != null && !tempXAxis.boundaryGap) {
        let viewPoint = myChart.convertToPixel(
          {
            gridIndex: editGirdIndex,
          },
          [dataPoint[0], "0"]
        );
        if (viewPoint[0] > mousePos.x) {
          dataPoint[0] = dataPoint[0] - 1;
        }
      }
      let tempSeries = option.series;
      for (let i = 0; i < tempSeries.length; i++) {
        if (tempSeries[i].yAxisIndex != editGirdIndex || (tempSeries[i].edit != null && !tempSeries[i].edit)) {
          continue;
        }
        let dataSeries = tempSeries[i].data;
        let tempYAxis = this.getYAxis(myChart, editGirdIndex);
        let seriesType = "BrokenLine";
        if (tempSeries[i].step != null && tempSeries[i].step == "end") seriesType = "StepLine";
        else if (tempSeries[i].type == "bar" && tempYAxis.inverse == true) seriesType = "RainBar";
        else if (tempSeries[i].type == "bar" && tempYAxis.inverse == false) seriesType = "Bar";

        if (this.isOnSeries(myChart, pointArr, dataPoint, editGirdIndex, dataSeries, seriesType)) {
          return i;
        }
      }
      return -1;
    },

    arrStrToNum(data) {
      return data.map((item) => {
        return item * 1;
      });
    },
    //预报数据与校正流量的差值
    compireData(now, corr) {
      return now.map((item, i) => {
        return (item * 1 - corr[i] * 1).toPrecision(3);
      });
    },
    //预报流量和误差的差值
    compireErroeData(now, corr) {
      return now.map((item, i) => {
        return (item * 1 - corr[i] * 1).toPrecision(3);
      });
    },
    //设置历史数据的截止线
    setEndLine(dataList, myChart, containerHeight) {
      const rainIndex = dataList[3].indexOf(null) - 1;
      const rainPosi = myChart.convertToPixel(
        {
          gridIndex: 1,
        },
        [rainIndex, 0]
      );
      if (rainPosi && rainPosi.length > 0) {
        myChart.setOption({
          graphic: {
            type: "line",
            id: "endLine",
            z: 999,
            shape: {
              x1: rainPosi[0],
              y1: 60,
              x2: rainPosi[0],
              y2: containerHeight - 30,
            },
          },
          style: {
            lineWidth: 2,
          },
        });
      }
    },

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
    //有效数字方法
    getPrecision(num, val) {
      const showValStr = (val * 1).toPrecision(num);
      let showVal = "";
      if (/e[+0-9]*/g.test(showValStr)) {
        const scale = showValStr.substring(showValStr.indexOf("+") + 1) * 1;
        showVal = showValStr.substring(0, showValStr.indexOf("+") - 1) * Math.pow(10, scale);
      } else {
        showVal = showValStr;
      }
      return showVal;
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
      if (lrRange[0] <= xPosi && xPosi <= lrRange[1] && tbRange[0] <= yPosi && yPosi <= tbRange[1]) {
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
          i === 0 ? cacheYaxisArr.push(pointArr[1]) : cacheYaxisArr.push(pointArr[1] - 15);
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
              text: [`${legendList[i]}: ${showVal} ${yAxisList[item.yAxisIndex].name}`].join("\n"),
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
    showChart(options) {
      let { itemTitle, itemUnit, plotType, itemEidt, plotOrder, plotSize, dataList, setEndLine } = options;
      let timeList = this.data.map((el) => el.time);
      const _self = this;
      // 基于准备好的dom，初始化echarts实例
      let boxContainer = document.querySelector(`.${this.containerDom}`);
      let myChart = echarts.init(boxContainer, "macarons");
      let divContainer = document.querySelector(`.${this.containerDom} div`);

      //初始化自定义变量
      myChart.plotOrder = plotOrder;
      this._showDragLine = false;
      this._cacheNodeValCount = 0;
      let symbolSize = 5;

      let option = {
        tooltip: {
          //triggerOn: 'none',   //打开拖动的触发x轴事件的竖线
          // formatter: function (params) {
          // 	// dataIndex = params[0].dataIndex;
          // 	let tipsTemp = `X: ${params[0].axisValueLabel}`;
          // 	params.forEach(item => {
          // 		tipsTemp += `<br>${item.seriesName} : ${Number(item.value).toPrecision(3)}`;
          // 	})
          // 	return tipsTemp;
          // },
          // trigger: 'axis'
        },
        style: {
          height: 800,
        },
        legend: {
          data: this.recombinedData(plotOrder, itemTitle),
          y: 0,
          x: 30,
          selected: {
            模型流量: false,
            退水流量: false,
          },
        },
        axisPointer: {
          link: {
            xAxisIndex: "all",
          },
        },
        dataZoom: [
          {
            type: "inside",
            show: true,
            realtime: true,
            start: 0,
            end: 100,
          },
        ],
        grid: this.organizeGrid(divContainer.clientHeight, myChart, this.recombinedData(plotOrder, plotOrder), plotSize),
        xAxis: this.organizeXAxis(this.recombinedData(plotOrder, plotOrder), this.recombinedData(plotOrder, plotType), timeList),
        yAxis: this.organizeYAxis(this.recombinedData(plotOrder, plotOrder), this.recombinedData(plotOrder, plotType), this.recombinedData(plotOrder, itemUnit)),
        series: this.organizeSeries(this.recombinedData(plotOrder, plotOrder), this.recombinedData(plotOrder, itemTitle), this.recombinedData(plotOrder, plotType), this.recombinedData(plotOrder, dataList), this.recombinedData(plotOrder, itemEidt)),
      };

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
        if (editSeriesIndex < 0 || tempItemEdit == null || tempItemEdit[editSeriesIndex] == false) {
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
        let canvasContainer = document.querySelector(".drag-wrapper canvas");
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
        let canvasContainer = document.querySelector(".drag-wrapper canvas");
        //设置全局鼠标移动坐标点
        const mousePosi = _self.getEventPosition(e);
        this.mousePosiArr = [mousePosi.x, mousePosi.y];
        const showDragFlag = _self._showDragLine;

        //设置拖动线start
        if (showDragFlag) {
          this._cacheNodeValCount = 0;
          _self.setDragLiner(this.mousePosiArr, myChart, divContainer.clientHeight, "merge");
          _self.setShowNodeVal(this.mousePosiArr, myChart, "merge");
        } else {
          this._cacheNodeValCount++;
          if (this._cacheNodeValCount <= 1) {
            _self.setDragLiner(this.mousePosiArr, myChart, divContainer.clientHeight, "remove");
            _self.setShowNodeVal(this.mousePosiArr, myChart, "remove");
          }
        }
        // end

        if (myChart.editGirdIndex == null || myChart.editGirdIndex < 0 || myChart.editingSeriesIndex == null || myChart.editingSeriesIndex < 0) {
          return;
        }
        if (e.buttons == 1 && myChart.startEidtIndex != null && myChart.startEidtIndex >= 0) {
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
            const mappingIndex = _self.getChangeSoftIndex(tempPlotOrder, seriesIndex);
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
              seriesIndex: _self.transIndexToOut(tempPlotOrder, myChart.editingSeriesIndex),
              index: dataPoint[0],
              value: dataPoint[1],
            },
            tempOption
          );
          _self.gridEditDatas.push({
            seriesIndex: _self.transIndexToOut(tempPlotOrder, myChart.editingSeriesIndex),
            index: dataPoint[0],
            value: dataPoint[1],
          });
          //中间没有发生事件的点的处理
          let minLastDataIndex = Math.min(dataPoint[0], myChart.lastEditDataIndex);
          let maxLastDataIndex = Math.max(dataPoint[0], myChart.lastEditDataIndex);
          if (minLastDataIndex >= 0 && maxLastDataIndex - minLastDataIndex > 1) {
            for (let i = minLastDataIndex; i <= maxLastDataIndex; i++) {
              if (i == dataPoint[0]) continue;
              tempDataSeries[i] = tempDataSeries[minLastDataIndex] + ((i - minLastDataIndex) * (tempDataSeries[maxLastDataIndex] - tempDataSeries[minLastDataIndex])) / (maxLastDataIndex - minLastDataIndex);
              _self.executeLinkListener(
                {
                  seriesIndex: _self.transIndexToOut(tempPlotOrder, myChart.editingSeriesIndex),
                  index: i,
                  value: tempDataSeries[i],
                },
                tempOption
              );
              _self.gridEditDatas.push({
                seriesIndex: this.transIndexToOut(tempPlotOrder, myChart.editingSeriesIndex),
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
        if (tempSeries[myChart.editingSeriesIndex].step == "end") seriesType = "StepLine";
        else if (tempSeries[myChart.editingSeriesIndex].type == "bar" && tempYAxis.inverse == true) seriesType = "RainBar";
        else if (tempSeries[myChart.editingSeriesIndex].type == "bar" && tempYAxis.inverse == false) seriesType = "Bar";
        if (_self.isOnSeries(myChart, pointArr, dataPoint, myChart.editGirdIndex, dataSeries, seriesType)) {
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

      const initEvent = this.initOnceEvent;
      if (initEvent) {
        const moveDownFunc = moveDownListener.bind(this);
        const moveMoveFunc = moveMoveListener.bind(this);
        const moveUpFunc = moveUpListener.bind(this);
        const dblClickFunc = dblClickListener.bind(this);

        divContainer.addEventListener("mousedown", moveDownFunc, true);
        divContainer.addEventListener("mousemove", moveMoveFunc, true);
        divContainer.addEventListener("mouseup", moveUpFunc, true);
        divContainer.addEventListener("dblclick", dblClickFunc, true);
      }
      myChart.setOption(option, true);
      console.log(myChart.getOption());
      setEndLine && this.setEndLine(dataList, myChart, boxContainer.clientHeight);
    },
  },
};
</script>
<style lang="scss" scoped>
.drag-chart-container {
  height: 50vh;
  width: 100%;

  .drag-wrapper {
    width: 100%;
    height: 50vh;
  }
}
</style>
