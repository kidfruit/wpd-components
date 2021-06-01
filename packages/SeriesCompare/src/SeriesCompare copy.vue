<template>
  <div :class="classNames">
    <div class="chart-container">
      <a-carousel :after-change="onChange" arrows>
        <div v-for="(item, index) in chartList" :key="index">
          <standard-chart :key="item.id" v-if="currentIndex === index" ref="chartRef" :chartOption="item.chartOption" :chartAxis="item.chartAxis" :id="item.id" :classes="['series-result']" :chartData="item.chartData" />
        </div>
        <div slot="prevArrow" class="custom-slick-arrow">
          <a-icon type="left-circle" />
        </div>
        <div slot="nextArrow" class="custom-slick-arrow">
          <a-icon type="right-circle" />
        </div>
      </a-carousel>
    </div>
    <div class="table-container">
      <div class="show-hide">
        <span class="ops" @click="handleShow">
          <a-icon v-if="isShow" type="up" />
          <a-icon v-else type="down" />
        </span>
      </div>
      <div class="reset">
        <a-button icon="undo" @click="handleReset" shape="circle"> </a-button>
      </div>
      <simple-table ref="tableRef" :tableData="newTableData" :setting="newSetting" :tableColumns="newTableColumns" @cellEditDone="cellEditDone"></simple-table>
    </div>
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
  name: 'SeriesCompare',
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
      currentIndex: 0,
      newSetting: {},
      isShow: false,
      activeField: '',
      //   记录单元格修改记录，采用拼接方法:prop#row
      editCells: []
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
        this.newTableColumns.forEach(el => {
          if (el.field !== field) {
            el.readOnly = true;
            el.isEdit = false;
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
      this.currentIndex = 0;
      this.newSetting = {};
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
      let firstTime = this.newTableData[this.splitIndex].time;
      return showTypeList
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
    },
    onChange(a, b, c) {
      this.currentIndex = a;
    }
  }
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
  /* background: #40a9ff; */
}
.ant-carousel >>> .slick-slide h3 {
  color: #40a9ff;
}
.chart-container {
  margin-bottom: 96px;
}
#app .ant-carousel .slick-dots li button {
  background: #40a9ff;
}
#app .ant-carousel .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #40a9ff;
  z-index: 100;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
#app .ant-carousel .custom-slick-arrow:before {
  display: none;
}
#app .ant-carousel .custom-slick-arrow:hover {
  opacity: 0.5;
}
#app .ant-carousel .custom-slick-arrow.slick-arrow.slick-prev {
  left: 64px !important;
}
#app .ant-carousel .custom-slick-arrow.slick-arrow.slick-next {
  right: 64px !important;
}
</style>
<style lang="scss">
.table-container {
  position: relative;
  .show-hide {
    position: absolute;
    top: 4px;
    left: 10px;
    z-index: 999;
    .ops {
      display: inline-block;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
  .reset {
    position: absolute;
    top: -40px;
    right: 12px;
  }
}
</style>
