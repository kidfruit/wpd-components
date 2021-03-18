<template>
  <div class="wrap">
    <div id="echart"></div>
    <div>
      <hot-table
        v-if="isRefresh"
        :settings="hotSettings"
        :data="tableData_local"
        ref="TableChartRef"
      >
        <hot-column
          v-for="(item, index) in tableColumns_local"
          :key="index"
          :title="item.title"
          :data="item.field"
          :read-only="item.readOnly"
        >
        </hot-column>
      </hot-table>
    </div>
  </div>
</template>
<script>
import { HotTable, HotColumn } from '@handsontable/vue'
import Handsontable from 'handsontable'
import { registerLanguageDictionary, zhCN } from 'handsontable/i18n'
import utils from './utils'
import * as echarts from 'echarts'
registerLanguageDictionary(zhCN)
const defaultHotSettings = {
  rowHeaders: false,
  colHeaders: true,
  autoColumnSize: true,
  colWidths: '100px',
  stretchH: 'all',
  licenseKey: 'non-commercial-and-evaluation',
  contextMenu: false,
  language: zhCN.languageCode,
  width: '100%',
  height: 320,
  cells: function() {
    let cellProperties = {}
    cellProperties.renderer = 'negativeValueRenderer'
    return cellProperties
  },
}

export default {
  name: 'TableChartInteractive',
  props: {
    tableData: {
      type: Array,
    },
    tableColumns: {
      type: Array,
    },
    setting: {
      type: Object,
    },
  },
  data: function() {
    return {
      isRefresh: true,
      tableData_local: JSON.parse(JSON.stringify(this.tableData)),
      tableColumns_local: JSON.parse(JSON.stringify(this.tableColumns)),
      //   记录单元格修改记录，采用拼接方法:prop#row
      editCells: [],
      echart: null,
    }
  },
  beforeMount() {
    // 单元格自定义渲染
    Handsontable.renderers.registerRenderer(
      'negativeValueRenderer',
      this.negativeValueRenderer
    )
  },
  mounted() {
    this.addHandsonTableHooks()
  },
  computed: {
    hotSettings() {
      return Object.assign({}, defaultHotSettings, this.setting)
    },
  },
  components: {
    HotTable,
    HotColumn,
  },
  methods: {
    getTableData() {
      return this.tableData_local
    },
    // 获取被编辑过的列名
    getEditColumnField() {
      if (this.editCells[0]) {
        return this.editCells[0].split('#')[0]
      } else {
        return null
      }
    },
    // 单元格修改触发器，
    afterChange(changes, source) {
      if (changes == null) {
        return
      }
      if (['edit', 'CopyPaste.paste', 'Autofill.fill'].includes(source)) {
        const field = changes[0][1]
        for (let i = 0; i < this.tableColumns_local.length; i++) {
          if (this.tableColumns_local[i].field != field) {
            this.$set(this.tableColumns_local, i, {
              ...this.tableColumns_local[i],
              readOnly: true,
            })
          }
        }
        // 记录被编辑的元格
        for (let i = 0; i < changes.length; i++) {
          const element = changes[i]
          this.editCells.push(element[1] + '#' + element[0])
        }
        this.updataChart()
        this.updateShow()
      }
    },
    // 重置数据
    reset() {
      this.tableData_local = JSON.parse(JSON.stringify(this.tableData))
      this.tableColumns_local = JSON.parse(JSON.stringify(this.tableColumns))
      this.editCells = []
      this.tmpReadOnlyField = []
      this.updataChart()
      this.updateShow()
    },
    // 黑科技更新表格、图展示
    updateShow() {
      const { row, col } = this.getvisibleLocal()
      this.isRefresh = false
      this.$nextTick(() => {
        this.isRefresh = true
        this.addHandsonTableHooks()
        this.scrollViewportTo(row, col)
        if (this.echart) {
          this.echart.resize()
        }
      })
    },
    addHandsonTableHooks() {
      this.$nextTick(() => {
        Handsontable.hooks.add(
          'afterChange',
          this.afterChange,
          this.$refs.TableChartRef.hotInstance
        )
      })
    },
    getvisibleLocal() {
      const pluginRow = this.$refs.TableChartRef.hotInstance.getPlugin(
        'autoRowSize'
      )
      const pluginCol = this.$refs.TableChartRef.hotInstance.getPlugin(
        'autoColumnSize'
      )
      const col = pluginCol.getFirstVisibleColumn()
      const row = pluginRow.getFirstVisibleRow()
      return { row, col }
    },
    scrollViewportTo(row, col) {
      this.$nextTick(() => {
        this.$refs.TableChartRef.hotInstance.scrollViewportTo(row, col)
      })
    },
    // 更新图数据
    getChartsOptions() {
      let data = utils.tableData2Charts(
        this.tableData_local,
        this.tableColumns_local
      )
      let options = {
        tooltip: {
          show: true,
          trigger: 'axis',
          // confine: true,
          // transitionDuration: 0,
          // formatter(params) {
          //   		return params[0] && params[0].dataIndex
          //   			? `<span>
          //   	${unit[attr][0]}：${params[0].value[1]}${unit[attr][1]}<br />
          //   	${unit[attr][2]}：${params[0].value[0]}${unit[attr][3]}
          //   </span>`
          //   			: '';
          // },
        },
        legend: { data: data.legendData },
        xAxis: {
          type: 'category',
          data: data.xAxisData,
          max: (value) => value.max,
          min: (value) => value.min,
        },
        yAxis: {
          type: 'value',
          max: (value) => value.max,
          min: (value) => value.min,
        },
        series: data.seriesData,
      }
      return options
    },
    updataChart() {
      this.echart = echarts.init(document.getElementById('echart'))
      this.echart.setOption(this.getChartsOptions())
      this.echart.resize()
    },
    // 单元格自定义渲染
    negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
      Handsontable.renderers.TextRenderer.apply(this, arguments)
      // 样式：编辑
      if (this.editCells.includes(prop + '#' + row)) {
        //修改字体颜色
        td.style.color = '#004fff'
      }
      // 样式:不可编辑
      if (this.editCells[0] && cellProperties.prop != this.editCells[0].split('#')[0]) {
        td.style.color = '#c00101'
      }
    },
  },
}
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  height: 100%;
}
#echart {
  width: 100%;
  height: 300px;
}
</style>
<style lang="scss">
.handsontable td {
  text-align: center;
}
.ht_master.handsontable {
  height: 100% !important;
}
</style>
