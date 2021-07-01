<template>
  <div :class="classNames">
    <div class="chart-box">
      <!-- checkAttribute.list -->
      <div class="chart-switch-button">
        <a-select v-model="checkAttribute.checked" :style="{ width: checkAttribute.width + 'px' }" @change="chartChange">
          <a-select-option v-for="item in checkAttribute.list" :value="item.key" :key="item.key"> {{ item.title }} </a-select-option>
        </a-select>
      </div>
      <div class="chart-content">
        <chart :key="chartParams.id" v-if="chartParams" ref="chartRef" :chartOption="chartParams.chartOption" :chartAxis="chartParams.chartAxis" :id="chartParams.id" :chartData="chartParams.chartData" />
      </div>
    </div>
    <div class="table-box">
      <!-- <div class="reset">
        <a-popover placement="left" trigger="click">
          <template slot="title">选择对比的属性</template>
          <template slot="content">
            <a-tree checkable :tree-data="checkAttribute.list" :checkedKeys="checkAttribute.checked" :selectable="false" @check="onCheck">
              <span slot="title0010" style="color: #1890ff">sss</span>
            </a-tree>
          </template>
          <a-button icon="fund" @click="handleReset" shape="circle"> </a-button>
        </a-popover>
      </div> -->
      <simple-table ref="tableRef" :splitIndex="splitIndex" :tableData="newTableData" :setting="newSetting" :tableColumns="newTableColumns"></simple-table>
    </div>
  </div>
</template>

<script>
import { MinMaxFunction } from '../../../utils/';
import SimpleTable from '../../SimpleTable/src/SimpleTable.vue';
import Chart from './chart';
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
    data: {
      type: Array,
      required: true
    },
    classes: {
      type: Array,
      required: false
    },
    attribute: {
      type: Array
    },
    // tableData: {
    //   type: Array
    // },
    // tableColumns: {
    //   type: Array
    // },
    splitIndex: {
      type: Number
    },
    setting: {
      type: Object
    }
  },
  components: {
    SimpleTable,
    Chart
  },
  computed: {
    classNames() {
      return ['series-compare'].concat(this.classes);
    }
  },
  data() {
    return {
      chartList: [],
      chartParams: null,
      seriesList: [],
      newTableData: [],
      newTableColumns: [],
      currentIndex: 0,
      newSetting: {},
      isShow: false,
      activeField: '',
      //   记录单元格修改记录，采用拼接方法:prop#row
      editCells: [],
      tableData: [],
      tableColumns: [],
      nestedHeaders: [],
      checkAttribute: {
        width: 0,
        list: [],
        checked: ''
      },
      schemeList: []
    };
  },
  methods: {
    getTableData() {
      return this.newTableData;
    },
    clearData() {
      // this.chartList = [];
      this.chartOption = null;
      this.seriesList = [];
      this.targetChartIndex = 0;
      const splitIndex = this.splitIndex;
      this.newSetting = {
        ...this.setting,
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
      let showTypeList = this.tableColumns
        .map(el => {
          return { showType: el.showType, field: el.field, title: el.title };
        })
        .filter(el => el.showType);

      // let filterList = showTypeList.map(el => el.showType.split('-')[0]);
      // let carouselCount = unique(filterList);
      this.generateChartData();
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
    generateChartData() {
      let firstTime = this.newTableData[this.splitIndex].time;
      let pickedColumn = this.checkAttribute.list.find(i => i.key === this.checkAttribute.checked);
      let chartOption = {
        title: {
          text: '',
          left: 'center'
        },
        legend: [],
        grid: {
          left: 50,
          right: 50,
          bottom: 50
        }
      };
      let minTop = 0;
      chartOption.legend = this.schemeList.map((title, i) => {
        const l = {
          itemWidth: 27,
          itemHeight: 16,
          show: true,
          textStyle: { fontSize: 14 },
          data: [{ name: title + '-' + pickedColumn.title, icon: 'line' }] //rect为矩形
        };
        const row = Math.floor(i / 2);
        l.top = row * 24;
        minTop = Math.max(row * 24, minTop);
        if (i % 2 === 0) {
          l.left = '1%';
        } else {
          l.right = '1%';
        }
        return l;
      });
      chartOption.grid.top = minTop + 34;
      let chartAxis = {
        xAxis: 'time',
        yAxis: [],
        series: []
      };
      chartAxis.yAxis = [
        {
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
          position: 'left',
          min: v => MinMaxFunction('min', v),
          max: v => MinMaxFunction('max', v)
        }
      ];
      chartAxis.series = this.schemeList.map((title, i) => ({
        field: pickedColumn.key + '_' + i,
        title: title + '-' + pickedColumn.title,
        selected: true,
        yAxisIndex: 0,
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
      }));

      let chartData = this.tableData;
      this.chartParams = {
        chartOption,
        chartAxis,
        chartData,
        id: guid()
      };
    },
    onChange(a, b, c) {
      this.currentIndex = a;
    },
    /**根据新格式的数据渲染 */
    transData() {
      let tableColumns = [];
      let tableData = [];
      let noShowType = [];
      let nestedHeaders = [];
      this.schemeList = [];
      this.data.forEach(({ title = '', tableColumns: columns = [], tableData: data = [], splitIndex: sIndex = 0 }, i) => {
        this.schemeList.push(title);
        columns.forEach(c => {
          if (!['index', 'id', 'Id'].includes(c.field) && !['index', 'id', 'Id'].includes(c.data)) {
            //(this.checkAttribute.checked.includes(c.field)) {
            const index = tableColumns.findIndex(k => k['originTitle'] === c.title && k['originField'] === c.field);
            if (c.showType) {
              if (index >= 0) {
                tableColumns.splice(index + 1, 0, {
                  ...c,
                  originTitle: c.title,
                  originField: c.field,
                  title: title + '-' + c.title,
                  field: `${c.field}_${i}`,
                  isEdit: false,
                  readOnly: true
                });
              } else {
                tableColumns.push({
                  ...c,
                  originTitle: c.title,
                  originField: c.field,
                  title: title + '-' + c.title,
                  field: `${c.field}_${i}`,
                  isEdit: false,
                  readOnly: true
                });
              }
            } else {
              const index = tableColumns.findIndex(k => k['title'] === c.title && k['field'] === c.field);
              if (index < 0) {
                tableColumns.push({
                  ...c
                });
                noShowType.push(c.field);
              }
            }
          }
        });
        data.forEach((d, j) => {
          if (!tableData[j]) {
            tableData[j] = {};
          }
          Object.keys(d).forEach(key => {
            if (noShowType.includes(key)) {
              if (!tableData[j][key]) {
                tableData[j][key] = d[key];
              }
            } else {
              tableData[j][key + '_' + i] = d[key];
            }
          });
        });
      });
      /**
       * 制作顶部nestedHeaders
       */
      for (let i = 0; i < tableColumns.length; i++) {
        const column = tableColumns[i];
        if (column['originField'] && column['originTitle']) {
          if (nestedHeaders[nestedHeaders.length - 1].label === column['originTitle']) {
            nestedHeaders[nestedHeaders.length - 1].colspan += 1;
          } else {
            nestedHeaders.push({
              label: column.originTitle,
              colspan: 1
            });
          }
        } else {
          nestedHeaders.push({
            label: '',
            colspan: 1
          });
        }
      }
      this.nestedHeaders = [nestedHeaders, tableColumns.map(i => i.title)];
      this.tableColumns = tableColumns;
      this.tableData = tableData;
      this.handleData();
    },
    onCheck(checkedKeys) {
      if (checkedKeys.length > 0) {
        this.checkAttribute.checked = checkedKeys;
        this.transData();
        // this.handleReset();
      } else {
        // ....
      }
    },
    chartChange() {
      this.generateChartData();
    }
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(nVal) {
        if (nVal[0].tableColumns && nVal[0].tableColumns instanceof Array) {
          nVal[0].tableColumns.forEach(column => {
            if (column.showType) {
              this.checkAttribute.list.push({
                title: column.title,
                key: column.field
              });
              this.checkAttribute.width = Math.max(this.checkAttribute.width, 14 * column.title.length);
            }
          });
          /**
           * 筛选显示的title
           */
          // if (this.checkAttribute.checked.length === 0) {
          //   this.checkAttribute.checked = [...this.checkAttribute.list.map(i => i.key)];
          // }
          if (this.checkAttribute.checked === '' && this.checkAttribute.list.length > 0) {
            this.checkAttribute.checked = this.checkAttribute.list[0].key;
          }
        } else {
          throw Error('数据格式错误,没有找到tableColumns,请检查.');
        }
        this.transData();
      }
    }
    // 'checkAttribute.checked': {
    //   deep: true,
    //   handler(val) {
    //     this.$emit('update:attribute', val);
    //   }
    // }
  }
};
</script>

<style>
.series-compare .ant-carousel .slick-slide {
  text-align: center;
  height: 400px;
  line-height: 400px;
  overflow: hidden;
}
.series-compare .ant-carousel .slick-dots {
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
.series-compare {
  padding: 40px 10px 10px;
  .chart-box,
  .table-box {
    height: 50%;
    position: relative;
    min-height: 250px;
  }
  .table-box {
    width: 100%;
    overflow: hidden;
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
