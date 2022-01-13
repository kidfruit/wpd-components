<template>
  <div :class="classNames" :key="randomKey">
    <a-row
      type="flex"
      justify="space-around"
      style="margin-bottom: 5px;height: 100%;"
      align="middle"
    >
      <a-col :span="4" class="tree-container">
        <a-tree
          defaultExpandAll
          :treeData="treeData"
          :selectedKeys="selectedKeys"
          @select="handleSelect"
        />
      </a-col>
      <a-col :span="20" style="height: 100%;">
        <a-row v-if="!isShowSection && isShowTab" class="radio-button" style="margin-bottom: 10px;display: flex">
          <a-radio-group
            default-value="a"
            button-style="solid"
            @change="handleChangeButton"
          >
            <a-radio-button value="a">
              断面信息
            </a-radio-button>
            <a-radio-button value="b">
              断面污染物
            </a-radio-button>
          </a-radio-group>
        </a-row>
        <a-row v-else style="height: 42px;"></a-row>
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
import { v4 as uuidv4 } from 'uuid'
import StandardChart from '../../StandardChart/src/StandardChart.vue'
import SimpleTable from '../../SimpleTable/src/SimpleTable.vue'
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
  { bottom: 50 },
  //1水位流量
  // { x: "7%", y2: "7%", height: "35%", left: "10%", bottom: "7%" },
]
let qGrid = {
  bottom: 50,
}
export default {
  name: 'SectionInit',
  components: {
    StandardChart,
    SimpleTable
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
      randomKey: uuidv4(),
      newData: [],
      columns: [],
      newAxis: {},
      selectedKeys: [this.treeData[0].key],
      instance: null,
      newOption: null,
      isShowSection: false,
      isShowTab: null
    }
  },
  computed: {
    classNames() {
      return ['section-init'].concat(this.classes)
    },
  },
  watch: {
    rawData: {
      immediate: true,
      deep: true,
      handler() {
        this.isShowTab = !!this.rawData.WPSectionGroup[0].data;
        this.handleData()
      }
    }
  },
  methods: {
    initqzChartTable() {
      this.newOption = Object.assign({}, this.chartOption, { grid: rGrid, legend: { bottom: 0} })
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
    },
    initSectionInfo() {
      // 清除殘留的圖表數據
      this.$refs.chartRef.clear()

      this.newOption = Object.assign(
          {},
          this.chartOption,
          { grid: qGrid, legend: { bottom: 0} },
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
      this.updateShow()
    },
    initSectionContaminants() {
      // console.log(this.selectedKeys)
      // 清除殘留的圖表數據
      this.$refs.chartRef.clear()
      this.newOption = Object.assign(
          {},
          this.chartOption,
          {
            grid: qGrid,
            title: {
              text: '断面污染物',
              left: 'center',
            },
            legend: { bottom: 0}
          }
      )
      setTimeout(() => {
        this.$refs.chartRef.setDynamicOption()
      }, 10)

      let sectionContaminantsInfo = null
      this.columns = [{
        field: 'time',
        title: '时间',
        titleAlign: 'center',
        columnAlign: 'center',
      }]
      this.rawData.WPSectionGroup.forEach(item => {
        if (this.treeData[0].children[item.id.split('_')[1] - 1].key === this.selectedKeys[0]) {
          sectionContaminantsInfo = item
          item.data.forEach(val => {
            this.columns.push({
              field: val.dataId,
              title: val.title,
              titleAlign: 'center',
              columnAlign: 'center',
            })
          })
        }
      })
      // console.log(this.columns)

      this.newAxis = Object.assign({
        xAxis: 'time',
        timeSeries: true,
        yAxis: [
          {
            title: '流量(m³/s)',
            yAxisIndex: 0,
          },
          {
            title: '含量(mg/L)',
            yAxisIndex: 1,
          },
        ]
      }, this.chartAxis)
      this.newAxis.series = []
      this.columns.forEach((item, index) => {
        if (index > 0) {
          if (item.field === 'FR_RCH_CONTAMINATEQ_P') {
            this.newAxis.series.push({
              field: item.field,
              title: item.title,
              selected: true,
              yAxisIndex: 0,
            })
          } else {
            this.newAxis.series.push({
              field: item.field,
              title: item.title,
              selected: true,
              yAxisIndex: 1,
            })
          }
        }
      })

      // console.log(sectionContaminantsInfo)
      this.rawData.time.forEach(item => {
        this.newData.push({
          time: item
        })
      })
      this.newData.forEach((item, index) => {
        sectionContaminantsInfo.data.forEach(val => {
          item[val.dataId] = val.data[index]
        })
      })
      // console.log(this.newData)
    },
    handleSelect(keys, e) {
      this.selectedKeys = keys
      this.$nextTick(() => {
        this.handleData()
      })
    },
    handleData() {
      this.isShowSection = this.selectedKeys.length === 0 || this.selectedKeys[0] === this.rawData.riverReachId
      if (this.isShowSection) {
        this.newData = []
        this.initqzChartTable()
      } else {
        this.newData = []
        this.initSectionInfo()
      }
    },
    handleChangeButton(e) {
      // console.log(e, e.target.value)
      if (e.target.value === 'a') {
        this.newData = []
        this.initSectionInfo()
      } else {
        this.newData = []
        this.initSectionContaminants()
      }
    },
    updateShow() {
      this.randomKey = uuidv4()
    },
    cellEditDone(val) {
      // console.log(this.selectedKeys[0])
      // console.log(val)
      // console.log(this.newData)
      this.newData[val.rowIndex][val.field] = +val.newValue
      this.$refs.chartRef.setDynamicOption()
      if (this.selectedKeys[0]) {
        let nodeId = null
        if (this.selectedKeys[0] !== this.rawData.riverReachId) {
          this.treeData[0].children.forEach((item, index) => {
            if (this.selectedKeys[0] === item.key) {
              nodeId = `${this.rawData.riverReachId}_${index + 1}`
            }
          })
        } else {
          nodeId = this.rawData.riverReachId
        }
        this.$emit('cellEditDone', {
          nodeId,
          ...val
        })
      } else {
        this.$emit('cellEditDone', {
          nodeId: this.rawData.riverReachId,
          ...val
        })
      }
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
    height: calc(100% - 362px);
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
