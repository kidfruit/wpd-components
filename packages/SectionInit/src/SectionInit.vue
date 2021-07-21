<template>
  <div :class="classNames" :key="randomKey">
    <a-row
      type="flex"
      justify="space-around"
      style="margin-bottom: 5px;height: 100%;"
      align="middle"
    >
      <a-col :span="4" class="tree-container">
        <simple-tree
          ref="treeRef"
          :treeData="treeData"
          @select="handleSelect"
        ></simple-tree>
      </a-col>
      <a-col :span="20" style="height: 100%;">
        <a-row class="chart-container">
          <standard-chart
            ref="chartRef"
            :id="id"
            :chartOption="newOption"
            :isRefresh="isRefresh"
            :chartAxis="newAxis"
            :chartData="newData"
          />
        </a-row>
        <a-row class="table-container">
          <simple-table
            ref="tableRef"
            :tableData="newData"
            :setting="setting"
            :tableColumns="columns"
            @cellEditDone="cellEditDone"
          ></simple-table>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import StandardChart from '../../StandardChart/src/StandardChart.vue'
import SimpleTable from '../../SimpleTable/src/SimpleTable.vue'
import SimpleTree from '../../SimpleTree/src/SimpleTree.vue'
import * as echarts from 'echarts'
let rCols = [
  {
    field: 'sectionCode',
    title: '断面编码',
    readOnly: true,
  },
  {
    field: 'sectionDistanceArray',
    title: '断面间距',
    readOnly: true,
  },
  {
    field: 'rough',
    title: '断面糙率',
    readOnly: true,
  },
]
let qCols = [
  {
    field: 'diArray',
    title: '起点距',
    titleAlign: 'center',
    columnAlign: 'center',
    readOnly: true,
  },
  {
    field: 'zbArray',
    title: '高程',
    titleAlign: 'center',
    columnAlign: 'center',
    isResize: true,
    readOnly: true,
  },
]
let rAxis = {
  xAxis: [
    {
      // gridIndex: 0,
      type: 'category',
      show: true,
      data: [],
    },
    // {
    //   // gridIndex: 0,
    //   type: "category",
    //   data: [],
    // },
  ],
  timeSeries: true,
  yAxis: [
    {
      title: '初始水位(m)',
      yAxisIndex: 0,
      xAxisIndex: 0,
      gridIndex: 0,
    },
    {
      title: '初始流量(m³/s)',
      yAxisIndex: 1,
      xAxisIndex: 0,
      gridIndex: 0,
    },
  ],
  series: [],
}

let qAxis = {
  xAxis: 'diArray',
  timeSeries: true,
  yAxis: [
    {
      title: '高程(m)',
      yAxisIndex: 0,
    },
  ],
  series: [
    {
      field: 'zbArray',
      title: '高程(m)',
      selected: true,
      yAxisIndex: 0,
    },
  ],
}
let rGrid = [
  //0降雨
  { x: '9%', y: '9%', height: '84%', left: '5%', right: '5%' },
  //1水位流量
  // { x: "7%", y2: "7%", height: "35%", left: "10%", bottom: "7%" },
]
let qGrid = {
  bottom: 70,
}
export default {
  name: 'SectionInit',
  components: {
    StandardChart,
    SimpleTable,
    SimpleTree,
  },
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
    treeData: {
      type: Array,
    },
    rawData: {
      type: Object,
    },
    setting: {
      type: Object,
    },
    id: {
      type: String,
    },
    extraOptions: {
      type: Object,
    },
  },
  data() {
    return {
      randomKey: +new Date() + (Math.random() * 1000).toFixed(0),
      newData: [],
      columns: [],
      newAxis: {},
      selectedKeys: [],
      instance: null,
      newOption: null,
    }
  },
  computed: {
    classNames() {
      return ['section-init'].concat(this.classes)
    },
  },
  created() {
    this.handleData()
  },
  beforeMount() {},
  mounted() {
    // this.handleData()
    // setTimeout(() => {
    //   this.setTableWidth('100%')
    // }, 10)
  },
  methods: {
    // setTableWidth(width) {
    //   // 也可以动态设置handsontable的宽度
    //   this.$refs.tableRef.updateWidth(width)
    // },
    handleSelect(keys) {
      this.selectedKeys = keys
      this.$nextTick(() => {
        this.handleData()
      })
    },
    handleData() {
      this.newData = []
      if (
        this.selectedKeys.length === 0 ||
        this.selectedKeys[0] === this.rawData.riverReachId
      ) {
        this.newOption = Object.assign({}, this.chartOption, { grid: rGrid })
        this.columns = rCols
        const eidtDataCols = []
        this.rawData.eidtData.forEach(item => {
          eidtDataCols.push({
            field: item.key,
            title: item.title
          })
        })
        this.columns = this.columns.concat(eidtDataCols)
        rAxis.xAxis.forEach((el) => {
          el.data = this.rawData.sectionDataList.map((el) => el.sectionCode)
        })
        // console.log(eidtDataCols)
        rAxis.series = [
          {
            field: 'SECTION_BEG_Z_SET',
            title: '各断面期初水位(m)',
            selected: true,
            yAxisIndex: 0,
            xAxisIndex: 0,
          },
          {
            field: 'SECTION_BEG_Q_SET',
            title: '各断面期初流量(m³/s)',
            selected: true,
            yAxisIndex: 1,
            xAxisIndex: 0,
          },
        ]
        // console.log(rAxis.series)
        eidtDataCols.forEach(item => {
          if (item.field === 'SECTION_BEG_Z_SET' || item.field === 'SECTION_BEG_Q_SET') {
            return
          }
          rAxis.series.push({
            field: item.field,
            title: item.title,
            selected: false,
            yAxisIndex: 0,
            xAxisIndex: 0,
          })
        })
        // console.log(rAxis)

        this.newAxis = Object.assign(rAxis, this.chartAxis)
        this.rawData.sectionDataList.forEach((el, index) => {
          this.newData.push({
            sectionCode: el.sectionCode,
            sectionDistanceArray: this.rawData.sectionDistanceArray[index],
            // sectionQArray: this.rawData.sectionQArray[index],
            // sectionZArray: this.rawData.sectionZArray[index],
            rough: el.rough,
          })
        })

        this.newData.forEach((item, index) => {
          eidtDataCols.forEach(element => {
            this.rawData.eidtData.forEach(value => {
              if (value.key === element.field) {
                item[element.field] = value.value[index]
              }
            })
          })
        })


        setTimeout(() => {
          this.$refs.chartRef.setDynamicOption()
        }, 10)
        if (this.selectedKeys[0] === this.rawData.riverReachId) {
          this.updateShow()
        }
      } else {
        // this.instance = echarts.getInstanceByDom(
        //   document.getElementsByClassName("chart tree-chart")[0]
        // );
        // 清除殘留的圖表數據
        this.$refs.chartRef.clear()

        this.newOption = Object.assign(
          {},
          this.chartOption,
          { grid: qGrid },
          this.extraOptions
        )
        setTimeout(() => {
          this.$refs.chartRef.setDynamicOption()
        }, 10)

        this.columns = qCols
        this.newAxis = Object.assign(qAxis, this.chartAxis)
        let item = this.rawData.sectionDataList.find(
          (el) => el.sectionCode === this.selectedKeys[0]
        )
        item.diArray.forEach((el, index) => {
          this.newData.push({
            diArray: el,
            zbArray: item.zbArray[index],
          })
        })
        // this.$refs.tableRef.reset()
        // this.$refs.tableRef.updateShow()
        this.updateShow()
      }
    },
    updateShow() {
      this.randomKey = +new Date() + (Math.random() * 1000).toFixed(0)
    },
    cellEditDone(val) {
      this.$emit('cellEditDone', val)
    }
  },
}
</script>

<style lang="scss" scoped>
.section-init {
  height: 100%;
  .tree-container {
    text-align: left;
    overflow: auto;
    height: 100%;
  }
  .chart-container {
    margin-bottom: 20px;
  }
  .table-container {
    overflow: hidden;
    height: calc(100% - 320px);
    .simple-table {
      height: 100% !important;
    }
  }
}
</style>
<style lang="scss">
.section-init {
  .table-container {
    .simple-table {
      .tableStyle {
        height: 100% !important;
      }
    }
  }
}
</style>
