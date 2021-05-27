<template>
  <div class="multi-option-table"
       v-if="isVisible && isRefresh">
    <hot-table class="hot-table"
               :settings="hotSettings"
               :data="hotData"
               :class="classes"
               :after-change="afterChange"
               ref="hotTableRef">
      <hot-column v-for="(item, index) in columns"
                  ref="hotcolumn"
                  :readOnly="item.readOnly"
                  :key="index"
                  :title="item.title"
                  :data="item.field"
                  :source="item.source"
                  :renderer="item.renderer"
                  :type="item.type"></hot-column>
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
  outsideClickDeselects: false,
  // colWidths: "100px",
  stretchH: 'all',
  licenseKey: 'non-commercial-and-evaluation',
  contextMenu: false,
  language: zhCN.languageCode,
  cells: (row, col, prop) => {
    let cellProperties = {}
    cellProperties.renderer = 'negativeValueRenderers'
    return cellProperties
  },
}

export default {
  name: 'MultiOptionTable',
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
      'negativeValueRenderers',
      this.negativeValueRenderers
    )
    // console.log(this.hotData, 'this.hotData');
  },
  mounted() {
    //console.log("mounted");
    this.getHotInstance()
  },
  updated() {
    //console.log("updated");
    this.getHotInstance()
  },
  data: function () {
    return {
      editRows: [],
      editCells: [],
      hotInstance: null,
      isRefresh: true,
      dropdownHash: {},
      dropdownHeaders: {},
      selectionColumns: [],
      checkbox: {},
      hotData: [],
    }
  },
  computed: {
    classes() {
      return ['tableStyle'].concat(this.classNames)
    },
    hotSettings() {
      const _this = this
      return Object.assign({}, defaultHotSettings, this.setting, {
        cells: (row, col, prop) => {
          let cellProperties = {}
          if (_this.dropdownHash[prop + '-row' + row]) {
            cellProperties.source = _this.dropdownHash[prop + '-row' + row].map(
              (i) => i.name
            )
          }
          cellProperties.renderer = 'negativeValueRenderers'
          return cellProperties
        },
        afterSelection: (
          rowIndex,
          columnIndex,
          row2,
          column2,
          preventScrolling,
          selectionLayerLevel
        ) => {
          if (rowIndex >= 0) {
            const taregtData = _this.tableData[rowIndex]
            let tempColumns = []
            _this.columns.forEach((item) => {
              if (
                taregtData[item.field] instanceof Object &&
                taregtData[item.field].options &&
                taregtData[item.field].title
              ) {
                tempColumns.push(taregtData[item.field].title)
              } else {
                tempColumns.push(null)
              }
            })
            _this.selectionColumns = tempColumns
            _this.$nextTick(() => {
              _this.refreshColumn()
            })
          }
          preventScrolling.value = true
        },
        afterDeselect() {
          _this.selectionColumns = []
          _this.$nextTick(() => {
            _this.refreshColumn()
          })
        },
      })
    },
    columns() {
      let result = this.tableColumns.map((item, index) => {
        let itemNew = Object.assign(
          {},
          {
            ...item,
            data: item.field,
          }
        )
        if (Object.prototype.hasOwnProperty.call(itemNew, 'type')) {
          switch (itemNew.type) {
            case 'checkbox':
              this.checkbox[item.field] = item.checkbox
              // itemNew.source = item.source.map((item) => item.name);
              break
            case 'dropdown':
              // 将dropdown的属性名和列表保存到hash表中，方便对data值进行更改
              this.dropdownHash[item.field] = item.source.slice(0)
              itemNew.source = item.source.map((item) => item.name)
              break
            case 'customDropdown':
              // 将dropdown的属性名和列表保存到hash表中，方便对data值进行更改
              this.tableData.forEach((d, i) => {
                if (
                  d[item.field] &&
                  d[item.field].selectedId &&
                  d[item.field].options
                ) {
                  this.dropdownHash[item.field + '-row' + i] =
                    d[item.field].options
                  this.dropdownHeaders[item.field + '-row' + i] = {
                    title: d[item.field].title,
                    key: d[item.field].key,
                  }
                }
                itemNew.source = []
              })
              itemNew.type = 'dropdown'
              break
          }
        }
        return itemNew
      })
      if (this.selectionColumns.length > 0) {
        result.forEach((item, i) => {
          if (this.selectionColumns[i]) {
            item.title = this.selectionColumns[i]
          }
        })
      }
      return result
    },
  },
  methods: {
    highlightRow(item) {
      this.$nextTick(() => {
        let list = this.$refs.hotTableRef.hotInstance.getSourceData()
        let rows = ''
        for (let i = 0; i < list.length; i++) {
          if (item === list[i].key) {
            rows = i
          }
        }

        let table = this.$refs['hotTableRef']
        table = table ? (table instanceof Array ? table : [table]) : []
        table.forEach((item) => {
          try {
            const Selectrow = this.$refs.hotTableRef.hotInstance.getCell(
              rows,
              0
            )
            const elem = item.$el ? item.$el : item
            const dom = elem.querySelector(`.wtHolder`)
            let titletop = this.$refs.hotTableRef.hotInstance.getCell(0, 0)
              .offsetTop
            let top = dom.scrollTop //滚动条高度
            let rewheight =
              this.$refs.hotTableRef.hotInstance.getCell(1, 0).offsetTop -
              titletop
            const height = elem.scrollHeight
            this.$refs.hotTableRef.hotInstance.selectRows(rows)
            if (
              top > Selectrow.parentNode.offsetTop - titletop ||
              Selectrow.parentNode.offsetTop > height + top-rewheight
            ) {
              this.$refs.hotTableRef.hotInstance.scrollViewportTo(rows)
            }
          } catch (error) {
            console.warn('滚动到指定位置!')
          }
        })
      })
      //   let list = this.$refs.hotTableRef.hotInstance.getSourceData()
      //   let rows = ''
      //   for (let i = 0; i < list.length; i++) {
      //     if (item === list[i].key) {
      //       rows = i
      //     }
      //   }
      //   console.log(this.$refs.hotTableRef.hotInstance.getCellMeta(rows,0))
      //   this.$refs.hotTableRef.hotInstance.selectRows(rows)
      //   this.$refs.hotTableRef.hotInstance.scrollViewportTo(rows)
    },
    refreshColumn() {
      if (this.$refs.hotTableRef) {
        this.$refs.hotTableRef.hotInstance.updateSettings({
          columns: this.columns,
        })
      }
    },
    prepareData(data) {
      this.hotData = data.map((item, index) => {
        for (let k in item) {
          const list = this.tableColumns.filter((cl) => cl.field === k)[0]
          if (list && list.type === 'dropdown') {
            if (list.source instanceof Array) {
              let filterItem = list.source.find((s) => s.id === item[k])
              if (filterItem) item[k] = filterItem.name
            }
          } else if (list && list.type === 'customDropdown') {
            if (item[k].options instanceof Array) {
              if (item[k].options.length === 0) {
                item[k].options.push({
                  id: '',
                  name: '',
                  modelParamId: null,
                })
                item[k].selectedId = ''
              }
              let filterItem = item[k].options.find(
                (s) => s.id === item[k]['selectedId']
              )
              if (filterItem) item[k] = filterItem.name
            }
          }
        }
        return item
      })
    },
    afterChange(changes, source) {
      if (changes == null) {
        return
      }
      if (source !== 'loadData') {
        // 添加修改触发
        if (changes && source) {
          for (let i = 0; i < changes.length; i++) {
            let element = changes[i]
            this.$emit('cellEditDone', {
              rowIndex: element[0],
              field: element[1],
              newValue: element[3],
              oldValue: element[2],
            })
            this.editCells.push(element[1] + '#' + element[0])
          }
        }
        let changedRows = []
        changes.forEach((change) => {
          this.getHotInstance()
          const [row, prop, oldV, newV] = change
          const changedRow = this.hotInstance.getDataAtRow(row)
          let rowObj = { row: row.toString() }
          this.tableColumns.forEach((cl, idx) => {
            rowObj[cl.field] = changedRow[idx]
          })
          changedRows.push(rowObj)
        })
        //将更新的数据推送到editRows
        changedRows = this.processOptionColumn(changedRows, 'name', 'id')
        changedRows.forEach((r) => {
          const cr = Object.assign({}, r)
          let idx = this.editRows.findIndex((er) => er && er.row === r.row)
          if (this.editRows.length > 0 && this.editRows[idx]) {
            this.editRows[idx] = cr
          } else {
            this.editRows.push(cr)
          }
        })
        this.updateShow()
      }
    },
    processOptionColumn(item, fromV, toV) {
      item.forEach((value) => {
        for (let k in this.dropdownHash) {
          if (Object.prototype.hasOwnProperty.call(value, k)) {
            const list = this.dropdownHash[k].filter(
              (item) => item[fromV] === value[k]
            )[0]
            list && (value[k] = list[toV])
          }
        }
      })
      return item
    },
    getHotInstance() {
      if (this.$refs.hotTableRef) {
        this.hotInstance = this.$refs.hotTableRef.hotInstance
      }
    },
    // 单元格自定义渲染
    negativeValueRenderers(instance, td, row, col, prop, value, cellProperties) {
      if (Object.prototype.hasOwnProperty.call(this.dropdownHash, prop)) {
        Handsontable.renderers.AutocompleteRenderer.apply(this, arguments)
      } else if (Object.prototype.hasOwnProperty.call(this.checkbox, prop)) {
        //判断是否是checkbox类型
        Handsontable.renderers.CheckboxRenderer.apply(this, arguments)
      } else if (
        Object.prototype.hasOwnProperty.call(
          this.dropdownHash,
          prop + '-row' + row
        )
      ) {
        //判断是否是customDropdown类型
        Handsontable.renderers.AutocompleteRenderer.apply(this, arguments)
      } else {
        Handsontable.renderers.TextRenderer.apply(this, arguments)
      }
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
    reset() {
      this.isRefresh = false
      this.editCells = []
      this.editRows = []
      setTimeout(() => {
        const data = JSON.parse(JSON.stringify(this.tableData))
        this.prepareData(data)
        this.isRefresh = true
      }, 0)
    },
    refresh() {
      //适用于父节点宽度变化的情况
      if (this.hotInstance) {
        this.hotInstance.updateSettings({
          width: '100%',
        })
        this.hotInstance.render()
      }
    },
    render() {
      //刷新table
      if (this.hotInstance) {
        this.hotInstance.render()
      }
    },
  },
  watch: {
    tableData: {
      immediate: true,
      deep: true,
      handler(val) {
        this.isRefresh = false
        const data = JSON.parse(JSON.stringify(val))
        this.prepareData(data)
        this.$nextTick(() => {
          this.isRefresh = true
        })
      },
    },
  },
}
</script>
<style lang="scss" scoped>
.multi-option-table {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .hot-table {
    width: 100%;
    height: 100%;
  }
}
</style>
