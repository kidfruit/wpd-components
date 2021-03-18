<template>
  <div>
    <hot-table
      v-if="isVisible && isRefresh"
      :settings="hotSettings"
      :data="tableData"
      :class="classes"
      :after-change="afterChange"
      ref="hotTableRef"
    >
      <hot-column
        v-for="(item, index) in tableColumns"
        :key="index"
        :title="item.title"
        :data="item.field"
        :read-only="item.readOnly"
        :renderer="item.renderer"
      />
    </hot-table>
  </div>
</template>
<script>
import { HotTable, HotColumn } from '@handsontable/vue'
import Handsontable from 'handsontable'
import { registerLanguageDictionary, zhCN } from 'handsontable/i18n'
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
  cells: function() {
    let cellProperties = {}
    cellProperties.renderer = 'negativeValueRenderer'
    return cellProperties
  },
}

export default {
  name: 'SimpleTable',
  props: {
    isVisible: {
      type: Boolean,
      default: true,
      required: false,
    },
    classNames: {
      type: Array,
      required: false,
    },
    setting: {
      type: Object,
      required: false,
    },
    tableData: {
      type: Array,
    },
    tableColumns: {
      type: Array,
    },
  },
  components: {
    HotTable,
    HotColumn,
  },
  beforeMount() {
    // 单元格自定义渲染
    Handsontable.renderers.registerRenderer(
      'negativeValueRenderer',
      this.negativeValueRenderer
    )
  },
  mounted() {
    this.getHotInstance()
    //this.hotSettings.afterChange = this.afterChange
  },
  data: function() {
    return {
      editRows: [],
      editCells: [],
      hotInstance: null,
      isRefresh: true,
    }
  },
  computed: {
    classes() {
      return ['tableStyle'].concat(this.classNames)
    },
    hotSettings() {
      return Object.assign({}, defaultHotSettings, this.setting)
    },
  },
  methods: {
    getTableData() {
      return this.tableData_local
    },
    afterChange(changes, source) {
      if (changes == null) {
        return
      }
      if (source !== 'loadData') {
        // 添加修改触发
        if (changes && source) {
          for (let i = 0; i < changes.length; i++) {
            const element = changes[i]
            this.$emit('cellEditDone', {
              rowIndex: element[0],
              field: element[1],
              newValue: element[3],
              oldValue: element[2],
            })
            this.editCells.push(element[1] + '#' + element[0])
          }
        }
        // let changedRows = []
        // changes.forEach((change) => {
        //       this.getHotInstance()
        //       const [row, prop, oldV, newV] = change
        //       const changedRow = this.hotInstance.getDataAtRow(row)
        //       let rowObj = { row: row.toString() }
        //       this.tableColumns.forEach((cl, idx) => {
        //         rowObj[cl.field] = changedRow[idx]
        //       })
        //       changedRows.push(rowObj)
        // })
        // 将更新的数据推送到editCells
        // changedRows.forEach((r) => {
        //   const cr = Object.assign({}, r)
        //   let idx = this.editRows.findIndex((er) => er && er.row === r.row)
        //   if (this.editRows.length > 0 && this.editRows[idx]) {
        //     this.editRows[idx] = cr
        //   } else {
        //     this.editRows.push(cr)
        //   }
        // })
        this.updateShow()
      }
    },
    getHotInstance() {
      if (this.$refs.hotTableRef) {
        this.hotInstance = this.$refs.hotTableRef.hotInstance
      }
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
      // if (
      //   this.editCells[0] &&
      //   cellProperties.prop != this.editCells[0].split('#')[0]
      // ) {
      //   td.style.color = '#c00101'
      // }
    },

    // 黑科技更新表格、图展示
    updateShow() {
      const { row, col } = this.getvisibleLocal()
      this.isRefresh = false
      this.$nextTick(() => {
        this.isRefresh = true
        this.scrollViewportTo(row, col)
      })
    },
    getvisibleLocal() {
      const pluginRow = this.$refs.hotTableRef.hotInstance.getPlugin(
        'autoRowSize'
      )
      const pluginCol = this.$refs.hotTableRef.hotInstance.getPlugin(
        'autoColumnSize'
      )
      const col = pluginCol.getFirstVisibleColumn()
      const row = pluginRow.getFirstVisibleRow()
      return { row, col }
    },
    scrollViewportTo(row, col) {
      this.$nextTick(() => {
        this.$refs.hotTableRef.hotInstance.scrollViewportTo(row, col)
      })
    },
  },
}
</script>
