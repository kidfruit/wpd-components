<template>
  <div class="simple-table"
       :key="randomKey"
       v-if="isVisible && isRefresh">
    <div class="preheat-switch"
         :title="preheat.show ? '关闭预热数据' : '展开预热数据'"
         v-if="splitIndex >= 0">
      <span class="ops"
            @click="preheatSwitch">
        <a-icon v-if="preheat.show"
                type="up" />
        <a-icon v-else
                type="down" />
      </span>
    </div>
    <hot-table :settings="hotSettings"
               :data="hotData"
               :class="classes"
               :after-change="afterChange"
               ref="hotTableRef"
               :key="hotTableRandomKey">
      <hot-column v-for="(item, index) in columns"
                  :key="index"
                  :title="item.title"
                  :data="item.field"
                  :source="item.source"
                  :className="item.className"
                  :renderer="item.renderer"
                  :type="item.type"
                  :width="item.width"
                  :readOnly="item.readOnly"> </hot-column>
    </hot-table>
    <a-modal v-model="saveFileModalVisible"
             title="保存文件名"
             okText="确定"
             cancelText="取消"
             @ok="saveFile">
      <a-input placeholder="请输入你想要保存的文件名"
               v-model="saveFileInput"
               @pressEnter="saveFile" />
    </a-modal>
    <a-modal v-model="scaleModalVisible"
             title="倍比缩放"
             okText="确定"
             cancelText="取消"
             @ok="scale">
      <a-input placeholder="请输入你想要缩放的倍数"
               v-model="scaleInput"
               @pressEnter="scale" />
    </a-modal>
    <a-modal v-model="sameIncreaseDecreaseModalVisible"
             title="同增同减"
             okText="确定"
             cancelText="取消"
             @ok="sameIncreaseDecrease">
      <a-input placeholder="请输入你想要增加的数目"
               v-model="sameIncreaseDecreaseInput"
               @pressEnter="sameIncreaseDecrease" />
    </a-modal>
  </div>
</template>
<script>
import { HotTable, HotColumn } from '@handsontable/vue'
import Handsontable from 'handsontable'
import { registerLanguageDictionary, zhCN } from 'handsontable/i18n'

registerLanguageDictionary(zhCN)
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
    targetChartIndex: {
      type: Number,
      required: false,
    },
    splitIndex: {
      type: Number,
      default: -1,
    },
  },
  components: {
    HotTable,
    HotColumn,
  },
  beforeMount() {
    // 单元格自定义渲染

    const data = JSON.parse(JSON.stringify(this.tableData))
    this.prepareData(data)
  },
  mounted() {
    this.getHotInstance()
  },
  updated() {
    this.getHotInstance()
  },
  data() {
    return {
      editRows: [],
      addRows: [],
      deletedRows: [],
      editCells: [],
      hotInstance: null,
      isRefresh: true,
      dropdownHash: {},
      hotData: [],
      randomKey: Math.random(),
      editCols: [],
      defaultHotSettings: {
        manualRowMove: false,
        rowHeaders: false,
        colHeaders: true,
        autoColumnSize: true,
        outsideClickDeselects: false,
        columnSorting: true,
        // colWidths: "100px",
        stretchH: 'all',
        licenseKey: 'non-commercial-and-evaluation',
        contextMenu: {
          items: {
            interpolation: {
              name: '内插',
              callback: () => {
                this.handleInterpolationCallback()
              },
            },
            scale: {
              name: '倍比缩放',
              callback: () => {
                this.handleScaleCallback()
              },
            },
            sameIncreaseDecrease: {
              name: '同增同减',
              callback: () => {
                this.handleSameIncreaseDecreaseCallback()
              },
            },
            separator: '---------',
            saveFile: {
              name: '数据下载',
              callback: () => {
                this.handleSaveFileCallback()
              },
            },
          },
        },
        language: zhCN.languageCode,
        cells: (row, col, prop) => {
          let cellProperties = {}
          if (this.splitIndex >= 0 && row < this.splitIndex) {
            cellProperties = { className: 'preheat-rows', readOnly: true }
          }
          return cellProperties
        },
        afterOnCellCornerDblClick: this.afterOnCellCornerDblClick,
      },
      preheat: {
        show: false,
      },
      selectedRange: null,
      saveFileModalVisible: false,
      saveFileInput: '',
      scaleModalVisible: false,
      scaleInput: '',
      sameIncreaseDecreaseModalVisible: false,
      sameIncreaseDecreaseInput: '',
      hotTableRandomKey: +new Date() + (Math.random() * 1000).toFixed(0),
    }
  },
  computed: {
    classes() {
      return ['tableStyle'].concat(this.classNames)
    },
    hotSettings() {
      let rowHeaders = false
      // console.log(this.setting.rowHeaders)
      if (this.setting && this.setting.rowHeaders) {
        rowHeaders = this.setting.rowHeaders
      } else {
        rowHeaders = false
      }
      //   let rowHeaders = this.splitIndex >= 0;
      let hiddenRows = undefined
      //   if (rowHeaders) {
      let hideRows = []
      for (let i = 0; i < this.splitIndex; i++) {
        hideRows.push(i)
      }
      this.splitIndex
      hiddenRows = this.preheat.show
        ? {}
        : {
            rows: hideRows,
            indicators: false,
          }
      //   }
      return Object.assign(
        {},
        this.defaultHotSettings,
        { rowHeaders, hiddenRows },
        this.setting
      )
    },
    columns() {
      return this.tableColumns.map((item, index) => {
        let itemNew = Object.assign({}, item)
        if (Object.prototype.hasOwnProperty.call(itemNew, 'type')) {
          switch (itemNew.type) {
            // case 'checkbox':
            //   //   this.checkbox[item.field] = item.checkbox;
            //   // itemNew.source = item.source.map((item) => item.name);
            //   this.checkboxHash[item.field] = true;
            //   break;
            case 'dropdown':
              // 将dropdown的属性名和列表保存到hash表中，方便对data值进行更改
              this.dropdownHash[item.field] = item.source.slice(0)
              itemNew.source = item.source.map((item) => item.name)
              break
          }
        }
        if (this.editCols.includes(itemNew.field)) {
          itemNew['className'] = 'edited-column'
        }
        return itemNew
      })
    },
  },
  methods: {
    preheatSwitch() {
      if (this.splitIndex >= 0) {
        this.preheat.show = !this.preheat.show
      }
    },
    highlightRow(item) {
      let list = this.$refs.hotTableRef.hotInstance.getSourceData()
      let rows = ''
      for (let i = 0; i < list.length; i++) {
        if (item === list[i].key) {
          rows = i
        }
      }
      // console.log(this.$refs.hotTableRef.hotInstance.selectRows(rows, rows));
    },
    _getSelectData(field) {
      if (typeof field == 'string' && field !== '') {
        let Selectdata = []
        for (let i = 0; i < this.hotData.length; i++) {
          if (this.hotData[i][field]) {
            Selectdata.push(this.hotData[i])
          }
        }
        return Selectdata
      } else {
        return Error('field为必填参数！')
      }
    },

    updateWidth(newWidth) {
      // console.log(this.hotInstance, newWidth);
      this.hotInstance.updateSettings({
        width: newWidth,
      })
    },
    prepareData(data) {
      this.hotData = data.map((item, index) => {
        for (let k in item) {
          const list = this.tableColumns.filter((cl) => cl.field === k)[0]
          if (list && list.type === 'dropdown') {
            let filterItem = list.source.find((s) => s.id === item[k])
            if (filterItem) item[k] = filterItem.name
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
            if (element[2] !== element[3]) {
              if (Object.keys(this.dropdownHash).includes(element[1])) {
                // 下拉框列
                this.$emit('cellEditDone', {
                  rowIndex: element[0],
                  field: element[1],
                  newValue: this.dropdownHash[element[1]].find((p) => {
                    return p.name === element[3]
                  }).id,
                  oldValue: this.dropdownHash[element[1]].find((p) => {
                    return p.name === element[2]
                  }).id,
                })
              } else {
                this.$emit('cellEditDone', {
                  rowIndex: element[0],
                  field: element[1],
                  newValue: element[3],
                  oldValue: element[2],
                })
              }
              this.editCols.push(element[1])
              this.editCells.push(element[1] + '#' + element[0])
            }
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
            let n = parseInt(cr.row)
            let index = this.addRows.findIndex((el) => el.tag === n)
            if (index === -1) {
              this.editRows.push(cr)
            } else {
              this.addRows[index] = cr
              this.addRows[index]['tag'] = n
            }
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
        if (this.selectedRange) {
          this.hotInstance.selectCells(this.selectedRange)
        }
      }
    },
    // 黑科技更新表格、图展示
    updateShow() {
      const { row, col } = this.getvisibleLocal()
      this.isRefresh = false
      this.$nextTick(() => {
        this.isRefresh = true
        this.randomKey = Math.random()
        this.scrollViewportTo(row, col)
      })
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
    getvisibleLocal() {
      const pluginRow =
        this.$refs.hotTableRef.hotInstance.getPlugin('autoRowSize')
      const pluginCol =
        this.$refs.hotTableRef.hotInstance.getPlugin('autoColumnSize')
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
      this.editCols = []
      setTimeout(() => {
        const data = JSON.parse(JSON.stringify(this.tableData))
        this.prepareData(data)
        this.isRefresh = true
        this.randomKey = Math.random()
      }, 0)
    },
    add() {
      let index = this.$refs.hotTableRef.hotInstance.countRows()
      this.$refs.hotTableRef.hotInstance.alter('insert_row', index)
      let row = this.hotInstance.getDataAtRow(index)
      // 更新新增行数组
      let obj = {}
      row.forEach((el, i) => {
        obj[this.columns[i].field] = el
      })
      obj['tag'] = index
      this.addRows.push(obj)
    },
    deleted() {
      let seleteds = this.$refs.hotTableRef.hotInstance.getSelected()
      if (seleteds && seleteds.length > 0) {
        seleteds.forEach((el) => {
          for (let i = 0; i < el[2] - el[0] + 1; i++) {
            let row = this.hotInstance.getDataAtRow(el[0] + i)
            let ret = row.every((item) => item)
            // 如果删除的每一行有数据，才保存这一行到deletedRows
            if (ret && row.length > 0) {
              let obj = {}
              row.forEach((el, i) => {
                obj[this.columns[i].field] = el
              })
              this.deletedRows.push(obj)
            }
          }
          this.$refs.hotTableRef.hotInstance.alter(
            'remove_row',
            el[0],
            el[2] - el[0] + 1
          )
        })
      }
    },
    moveUp() {
      let selectedRange = this.hotInstance.getSelectedRange()
      let selectedArray = []
      if (selectedRange && selectedRange[0].from.row === -1) {
        selectedRange[0].from.row = 0
      }
      if (selectedRange && selectedRange.length > 0) {
        // selected框
        if (selectedRange[0].from.row === 0) {
          return
        }
        selectedRange.forEach((item) => {
          selectedArray.push([item.from.row, item.to.row])
          item.from.row = item.from.row - 1
          item.to.row = item.to.row - 1
        })
        this.selectedRange = selectedRange
        selectedArray.forEach((item) => {
          const arr = this.hotData.splice(item[0], item[1] - item[0] + 1)
          this.hotData.splice(item[0] - 1, 0, ...arr)
        })
      }
      this.$emit('moveDone', this.hotData)
    },
    moveDown() {
      let selectedRange = this.hotInstance.getSelectedRange()
      const rowLength = this.hotInstance.getData().length
      let selectedArray = []
      if (selectedRange && selectedRange.length > 0) {
        if (selectedRange[selectedRange.length - 1].to.row === rowLength - 1) {
          return
        }
        selectedRange.forEach((item) => {
          selectedArray.push([item.from.row, item.to.row])
          item.from.row = item.from.row + 1
          item.to.row = item.to.row + 1
        })
        this.selectedRange = selectedRange
        selectedArray.forEach((item) => {
          const arr = this.hotData.splice(item[0], item[1] - item[0] + 1)
          this.hotData.splice(item[0] + 1, 0, ...arr)
        })
      }
      this.$emit('moveDone', this.hotData)
    },
    handleSaveFileCallback() {
      console.log('数据下载')
      this.saveFileModalVisible = true
      this.saveFileInput = ''
    },
    saveFile() {
      this.saveFileModalVisible = false
      const exportFile =
        this.$refs.hotTableRef.hotInstance.getPlugin('exportFile')
      exportFile.downloadFile('csv', {
        filename: this.saveFileInput === '' ? '我的表格' : this.saveFileInput,
        exportHiddenRows: true,
        exportHiddenColumns: true,
        columnHeaders: true,
        rowHeaders: true,
      })
    },
    handleInterpolationCallback() {
      let selectedRange = this.hotInstance.getSelectedRange()
      if (selectedRange[0].from.row === -1) {
        selectedRange[0].from.row = 0
      }
      const field = this.columns[selectedRange[0].from.col].field
      const firstData = +this.hotData[selectedRange[0].from.row][field]
      const endData = +this.hotData[selectedRange[0].to.row][field]
      const selectedMidRows =
        selectedRange[0].to.row - selectedRange[0].from.row
      const stepNumber = Math.abs((endData - firstData) / selectedMidRows)
      const currentCol = selectedRange[0].from.col
      const firstRow = selectedRange[0].from.row
      if (selectedRange && selectedRange.length > 0) {
        if (currentCol !== selectedRange[0].to.col) {
          return
        }
        if (this.tableColumns[currentCol].readOnly === true) {
          return
        }
        if (
          typeof this.hotData[selectedRange[0].from.row][field] === 'boolean'
        ) {
          return
        }
        if (firstRow < this.splitIndex) {
          return
        }
        if (typeof firstData === 'number' && !isNaN(firstData)) {
          console.log('内插')
          if (firstData < endData) {
            for (let i = 0; i < selectedMidRows - 1; i++) {
              const newValue = +(firstData + stepNumber * (i + 1)).toFixed(2)
              const oldValue =
                this.hotData[selectedRange[0].from.row + i + 1][field]
              const rowIndex = selectedRange[0].from.row + i + 1
              this.$emit('cellEditDone', {
                rowIndex,
                field,
                newValue,
                oldValue,
              })
              this.hotData[selectedRange[0].from.row + i + 1][field] = newValue
            }
          } else {
            for (let i = 0; i < selectedMidRows - 1; i++) {
              const newValue = +(firstData - stepNumber * (i + 1)).toFixed(2)
              const oldValue =
                this.hotData[selectedRange[0].from.row + i + 1][field]
              const rowIndex = selectedRange[0].from.row + i + 1
              this.$emit('cellEditDone', {
                rowIndex,
                field,
                newValue,
                oldValue,
              })
              this.hotData[selectedRange[0].from.row + i + 1][field] = newValue
            }
          }
          this.hotTableRandomKey =
            +new Date() + (Math.random() * 1000).toFixed(0)
        }
      }
    },
    handleScaleCallback() {
      let selectedRange = this.hotInstance.getSelectedRange()
      if (selectedRange[0].from.row === -1) {
        selectedRange[0].from.row = 0
      }
      const field = this.columns[selectedRange[0].from.col].field
      const firstData = +this.hotData[selectedRange[0].from.row][field]
      const currentCol = selectedRange[0].from.col
      const firstRow = selectedRange[0].from.row
      if (selectedRange && selectedRange.length > 0) {
        if (currentCol !== selectedRange[0].to.col) {
          return
        }
        if (this.tableColumns[currentCol].readOnly === true) {
          return
        }
        if (
          typeof this.hotData[selectedRange[0].from.row][field] === 'boolean'
        ) {
          return
        }
        if (firstRow < this.splitIndex) {
          return
        }
        if (typeof firstData === 'number' && !isNaN(firstData)) {
          console.log('倍比缩放')
          this.scaleModalVisible = true
          this.scaleInput = ''
        }
      }
    },
    scale() {
      this.scaleModalVisible = false
      let selectedRange = this.hotInstance.getSelectedRange()
      const field = this.columns[selectedRange[0].from.col].field
      const stepNumber = selectedRange[0].to.row - selectedRange[0].from.row + 1
      for (let i = 0; i < stepNumber; i++) {
        const newValue = +(
          +this.hotData[selectedRange[0].from.row + i][field] * +this.scaleInput
        ).toFixed(2)
        const oldValue = this.hotData[selectedRange[0].from.row + i][field]
        const rowIndex = selectedRange[0].from.row + i
        this.$emit('cellEditDone', {
          rowIndex,
          field,
          newValue,
          oldValue,
        })
        this.hotData[selectedRange[0].from.row + i][field] = newValue
      }
      this.hotTableRandomKey = +new Date() + (Math.random() * 1000).toFixed(0)
    },
    handleSameIncreaseDecreaseCallback() {
      let selectedRange = this.hotInstance.getSelectedRange()
      if (selectedRange[0].from.row === -1) {
        selectedRange[0].from.row = 0
      }
      const field = this.columns[selectedRange[0].from.col].field
      const firstData = +this.hotData[selectedRange[0].from.row][field]
      const currentCol = selectedRange[0].from.col
      const firstRow = selectedRange[0].from.row
      if (selectedRange && selectedRange.length > 0) {
        if (currentCol !== selectedRange[0].to.col) {
          return
        }
        if (this.tableColumns[currentCol].readOnly === true) {
          return
        }
        if (
          typeof this.hotData[selectedRange[0].from.row][field] === 'boolean'
        ) {
          return
        }
        if (firstRow < this.splitIndex) {
          return
        }
        if (typeof firstData === 'number' && !isNaN(firstData)) {
          console.log('同增同减')
          this.sameIncreaseDecreaseModalVisible = true
          this.sameIncreaseDecreaseInput = ''
        }
      }
    },
    sameIncreaseDecrease() {
      this.sameIncreaseDecreaseModalVisible = false
      let selectedRange = this.hotInstance.getSelectedRange()
      const field = this.columns[selectedRange[0].from.col].field
      const stepNumber = selectedRange[0].to.row - selectedRange[0].from.row + 1
      for (let i = 0; i < stepNumber; i++) {
        const newValue = +(
          +this.hotData[selectedRange[0].from.row + i][field] +
          +this.sameIncreaseDecreaseInput
        ).toFixed(2)
        const oldValue = this.hotData[selectedRange[0].from.row + i][field]
        const rowIndex = selectedRange[0].from.row + i
        this.$emit('cellEditDone', {
          rowIndex,
          field,
          newValue,
          oldValue,
        })
        this.hotData[selectedRange[0].from.row + i][field] = newValue
      }
      this.hotTableRandomKey = +new Date() + (Math.random() * 1000).toFixed(0)
    },
    afterOnCellCornerDblClick() {
      let selectedRange = this.hotInstance.getSelectedRange()
      if (selectedRange[0].from.row === -1) {
        selectedRange[0].from.row = 0
      }
      const currentCol = selectedRange[0].from.col
      const currentRow = selectedRange[0].from.row
      const field = this.columns[selectedRange[0].from.col].field
      const currentData = +this.hotData[selectedRange[0].from.row][field]
      const rowLength = this.hotInstance.getData().length
      if (selectedRange && selectedRange.length > 0) {
        if (currentCol !== selectedRange[0].to.col) {
          return
        }
        if (currentRow !== selectedRange[0].to.row) {
          return
        }
        if (this.tableColumns[currentCol].readOnly === true) {
          return
        }
        if (
          typeof this.hotData[selectedRange[0].from.row][field] === 'boolean'
        ) {
          return
        }
        if (currentRow < this.splitIndex) {
          return
        }
        if (typeof currentData === 'number' && !isNaN(currentData)) {
          console.log('afterOnCellCornerDblClick')
          for (let i = 0; i < rowLength - currentRow - 1; i++) {
            const oldValue =
              this.hotData[selectedRange[0].from.row + i + 1][field]
            const newValue = currentData
            const rowIndex = selectedRange[0].from.row + i + 1
            this.$emit('cellEditDone', {
              rowIndex,
              field,
              newValue,
              oldValue,
            })
            this.hotData[selectedRange[0].from.row + i + 1][field] = newValue
          }
        }
        this.hotTableRandomKey = +new Date() + (Math.random() * 1000).toFixed(0)
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
    columns: {
      immediate: true,
      deep: true,
      handler(val) {
        this.refresh()
      },
    },
    targetChartIndex: {
      immediate: true,
      deep: true,
      handler(val) {
          this.reset()
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
<style lang="scss">
.simple-table {
  position: relative;
  .preheat-switch {
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
  .handsontable td {
    &.edited-column {
      background-color: rgba(204, 255, 0, 0.2);
    }
    &.preheat-rows {
      background-color: rgba(204, 204, 204, 0.45);
    }
  }
}
</style>
