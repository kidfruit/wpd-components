<template>
  <div :class="classNames">
    <div class="chart-box">
      <div class="chart-switch-button">
        <a-select v-model="targetChartIndex">
          <a-select-option v-for="(title, i) in chartTitle" :value="i" :key="i"> {{ title }} </a-select-option>
        </a-select>
      </div>
      <div class="chart-content">
        <standard-chart
          :key="chartList[targetChartIndex].id"
          ref="chartRef"
          :chartOption="chartList[targetChartIndex].chartOption"
          :chartAxis="chartList[targetChartIndex].chartAxis"
          :id="chartList[targetChartIndex].id"
          :splitIndex="splitIndex"
          :classes="['series-result-chart']"
          :chartData="chartList[targetChartIndex].chartData"
        />
      </div>
    </div>
    <div class="table-box">
      <div class="show-hide" :title="isShow ? '关闭预热数据' : '展开预热数据'">
        <span class="ops" @click="handleShow">
          <a-icon v-if="isShow" type="up" />
          <a-icon v-else type="down" />
        </span>
      </div>
      <simple-table ref="tableRef" :tableData="newTableData" :setting="newSetting" :tableColumns="newTableColumns" @cellEditDone="cellEditDone"></simple-table>
    </div>
    <!-- <div class="reset">
        <a-button icon="undo" @click="handleReset" shape="circle"> </a-button>
      </div> -->
  </div>
</template>

<script>
import SimpleTable from '../../SimpleTable/src/SimpleTable.vue';
import StandardChart from '../../StandardChart/src/StandardChart.vue';
let positionMaps = {
  L: 'left',
  R: 'right'
};
function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return S4() + '-' + S4();
}
function unique(arr) {
  return Array.from(new Set(arr));
}
function uniqueObj(origin, key) {
  let temp = {};
  return origin.reverse().filter(item => (item[key] in temp ? false : (temp[item[key]] = true)));
}
export default {
  name: 'SeriesResult',
  props: {
    classes: {
      type: Array,
      required: false
    },
    tableData: {
      type: Array
    },
    tableColumns: {
      type: Array
    },
    setting: {
      type: Object
    },
    splitIndex: {
      type: Number
    },
    chartTitle: {
      type: Array
    }
  },
  components: {
    SimpleTable,
    StandardChart
  },
  computed: {
    classNames() {
      return ['series-result'].concat(this.classes);
    }
  },
  data() {
    return {
      chartList: [],
      seriesList: [],
      newTableData: [],
      newTableColumns: [],
      newSetting: {},
      isShow: false,
      activeField: '',
      //   记录单元格修改记录，采用拼接方法:prop#row
      editCells: [],
      targetChartIndex: 0
    };
  },
  created() {
    this.handleData();
  },
  methods: {
    getTableData() {
      return this.newTableData;
    },
    // 获取被编辑过的列名
    getEditColumnField() {
      return this.editCells;
      // if (this.editCells[0]) {
      //   return this.editCells[0].split("#")[0];
      // } else {
      //   return null;
      // }
    },
    cellEditDone(value) {
      // 表格到图表的单向数据联动
      const { field, newValue, oldValue, rowIndex } = value;
      // console.log("pp", field, newValue, oldValue, rowIndex);
      if (newValue !== oldValue.toString() && this.activeField === '') {
        // console.log("one has be edit", this.newTableColumns);
        this.editCells.push(field);
        this.activeField = field;
        this.newTableColumns.forEach((el, index) => {
          if (el.field !== field) {
            // el.readOnly = true;
            // el.isEdit = false;
            this.$set(this.newTableColumns, index, {
              ...this.newTableColumns[index],
              readOnly: true,
              isEdit: false
            });
          }
        });
        this.$refs.tableRef.reset();
        this.$refs.tableRef.updateShow();
      }
      this.newTableData[rowIndex][field] = newValue;
      this.chartList.forEach(el => {
        el.chartData = this.newTableData;
        el.id = guid();
      });
    },
    clearData() {
      this.chartList = [];
      this.seriesList = [];
      this.targetChartIndex = 0;
      const splitIndex = this.splitIndex;
      this.newSetting = {
        cells(row) {
          let cellProperties = {};
          if (row < splitIndex) {
            cellProperties = { className: 'preheat-rows', readOnly: true };
          }
          return cellProperties;
        }
      };
      this.isShow = false;
    },
    handleData() {
      // 备份表格数据
      this.newTableData = JSON.parse(JSON.stringify(this.tableData));
      this.newTableColumns = JSON.parse(JSON.stringify(this.tableColumns));
      this.clearData();
      this.hideRows();
      let showTypeList = this.tableColumns
        .map(el => {
          return { showType: el.showType, field: el.field, title: el.title };
        })
        .filter(el => el.showType);

      let filterList = showTypeList.map(el => el.showType.split('-')[0]);
      let carouselCount = unique(filterList);
      this.generateChartData(carouselCount, showTypeList);
    },
    handleShow() {
      this.isShow = !this.isShow;
      const splitIndex = this.splitIndex;
      if (this.isShow) {
        this.newSetting.hiddenRows = {};
        this.newSetting = Object.assign({}, this.setting, this.newSetting);
      } else {
        this.hideRows();
      }
    },
    handleReset() {
      this.activeField = '';
      this.newTableData = JSON.parse(JSON.stringify(this.tableData));
      this.newTableColumns = JSON.parse(JSON.stringify(this.tableColumns));
      this.chartList.forEach(el => {
        el.chartData = this.newTableData;
        el.id = guid();
      });
      this.editCells = [];
    },
    generateChartLegend(showTypeList, current) {
      let legendList = showTypeList.filter(el => el.showType.indexOf(current) !== -1);
      let legends = [];
      let flag = false; // 连续的控制标志位
      let lastOne = '';
      let base = 0,
        step = 7;
      legendList = legendList.sort((a, b) => {
        if (a.showType < b.showType) {
          return -1;
        }
        if (a.showType > b.showType) {
          return 1;
        }
        return 0;
      });
      for (let i = 0; i < legendList.length; i++) {
        let obj = {
          itemWidth: 27,
          itemHeight: 16,
          show: true,
          textStyle: { fontSize: 14 },
          data: [{ name: legendList[i].title, icon: 'line' }] //rect为矩形
        };
        let leftRight = positionMaps[legendList[i].showType.split('-')[1]];
        if (lastOne !== '' && lastOne === leftRight) {
          flag = true;
          base += step;
        }
        if (leftRight === 'left') {
          obj = Object.assign({}, obj, {
            top: !flag ? '15%' : `${15 + base}%`, //调整位置
            left: '5%'
          });
        } else {
          obj = Object.assign({}, obj, {
            top: !flag ? '15%' : `${15 + base}%`, //调整位置
            left: '85%'
          });
        }
        flag = false;
        legends.push(obj);
        lastOne = leftRight;
      }
      return legends;
    },
    generateChartYaxis(showTypeList, current) {
      let yAxisList = showTypeList.filter(el => el.showType.indexOf(current) !== -1);
      yAxisList = uniqueObj(yAxisList, 'showType');
      let yAxis = [];
      for (let i = 0; i < yAxisList.length; i++) {
        yAxis.push({
          title: '',
          // title: yAxisList[i].title,
          type: 'value',
          axisLabel: {
            show: true
          },
          axisTick: {
            //y轴刻度线
            show: true
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            show: true,
            lineStyle: {
              color: '#40a9ff  '
            }
          },
          position: positionMaps[yAxisList[i].showType.split('-')[1]],
          max: function (value) {
            // console.log("value.max", value);
            return ((value.max - value.min) * 1.15).toFixed(2);
          },
          min: function (value) {
            // console.log("value.min", value);
            let tempVal = ((value.max - value.min) * 0.15).toFixed(2);
            return value.min > tempVal ? (value.min - tempVal).toFixed(2) : 0;
          }
        });
      }

      return yAxis;
    },
    generateChartSeries(showTypeList, current) {
      let firstTime = '';
      if (this.splitIndex) {
        firstTime = this.newTableData[this.splitIndex].time;
      }
      if (firstTime !== '') {
        let list = showTypeList
          .filter(el => el.showType.indexOf(current) !== -1)
          .map((el, index) => {
            return {
              field: el.field,
              title: el.title,
              selected: true,
              yAxisIndex: positionMaps[el.showType.split('-')[1]] === 'left' ? 0 : 1,
              markLine: {
                symbol: 'none',
                data: [
                  {
                    name: '标记线',
                    xAxis: firstTime,
                    lineStyle: {
                      //警戒线的样式  ，虚实  颜色
                      type: 'solid',
                      color: '#000'
                    }
                  }
                ],
                label: { show: true, position: 'end' },
                silent: true
              }
            };
          });
        // 将3个series处理成一半实线一半虚线的series，一起应该6个series
        let allList = [];
        for (let i = 0; i < list.length; i++) {
          allList.push(list[i]);
          let obj = Object.assign({}, list[i], {
            smooth: false, //关键点，为true是不支持虚线，实线就用true
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'dotted' //'dotted'虚线 'solid'实线
                }
              }
            }
          });
          allList.push(obj);
        }
        allList = allList.sort((a, b) => {
          return a.name - b.name;
        });
        return allList;
      } else {
        return showTypeList
          .filter(el => el.showType.indexOf(current) !== -1)
          .map((el, index) => {
            return {
              field: el.field,
              title: el.title,
              selected: true,
              yAxisIndex: positionMaps[el.showType.split('-')[1]] === 'left' ? 0 : 1
            };
          });
      }
    },
    generateChartData(carouselCount, showTypeList) {
      for (let i = 0; i < carouselCount.length; i++) {
        let chartOption = {
          title: {
            text: '',
            left: 'center'
          },
          legend: [],
          grid: {
            bottom: 50,
            left: '16%',
            right: '16%'
          }
        };
        let chartAxis = {
          xAxis: 'time',
          yAxis: [],
          series: []
        };
        chartAxis.yAxis = this.generateChartYaxis(showTypeList, carouselCount[i]);
        chartAxis.series = this.generateChartSeries(showTypeList, carouselCount[i]);
        chartOption.legend = this.generateChartLegend(showTypeList, carouselCount[i]);
        let chartData = this.tableData;
        this.chartList.push({
          chartOption,
          chartAxis,
          chartData,
          id: guid()
        });
      }
    },
    hideRows() {
      let hideRows = [];
      for (let i = 0; i < this.splitIndex; i++) {
        hideRows.push(i);
      }
      this.newSetting.hiddenRows = {};
      this.newSetting.hiddenRows.rows = hideRows;
      this.newSetting.hiddenRows.indicators = false;
      this.newSetting = Object.assign({}, this.setting, this.newSetting);
    }
  }
};
</script>

<style lang="scss">
.series-result {
  padding: 40px 10px 10px;
  .chart-box,
  .table-box {
    height: 50%;
    position: relative;
    min-height: 250px;
  }
  .show-hide {
    position: absolute;
    top: 4px;
    left: 12px;
    z-index: 999;
    .ops {
      display: inline-block;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
}
</style>
