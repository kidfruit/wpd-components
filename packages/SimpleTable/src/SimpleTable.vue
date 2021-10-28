<template>
  <div
    class="simple-table"
    v-if="isVisible && isRefresh"
    :key="randomKey"
  >
    <div
      class="preheat-switch"
      v-if="splitIndex > 0"
      :title="preheat.show ? '关闭预热数据' : '展开预热数据'"
    >
      <span class="ops" @click="preheatSwitch">
        <a-icon v-if="preheat.show" type="up" />
        <a-icon v-else type="down" />
      </span>
    </div>
    <hot-table
      ref="hotTableRef"
      :class="classes"
      :settings="hotSettings"
      :data="hotData"
      :after-change="afterChange"
      :id="`hot-table-${hotTableRandomKey}`"
      :key="hotTableRandomKey"
    >
      <hot-column
        v-for="(item, index) in columns"
        :key="index"
        :title="item.title"
        :data="item.field"
        :source="item.source"
        :className="item.className"
        :renderer="item.renderer"
        :type="item.type"
        :dateFormat="item.dateFormat"
        :datePickerConfig="item.datePickerConfig"
        :timeFormat="item.timeFormat"
        :width="item.width"
        :readOnly="item.readOnly"
      />
    </hot-table>
    <a-modal
      title="保存文件名"
      okText="确定"
      cancelText="取消"
      v-model="saveFileModalVisible"
      :destroyOnClose="true"
      @ok="saveFile"
    >
      <a-input
        type="text"
        placeholder="请输入你想要保存的文件名"
        v-model="saveFileInput"
        @pressEnter="saveFile"
      />
    </a-modal>
    <a-modal
      title="倍比缩放"
      okText="确定"
      cancelText="取消"
      v-model="scaleModalVisible"
      :destroyOnClose="true"
      @ok="scale"
    >
      <a-input
        type="number"
        placeholder="请输入你想要缩放的倍数"
        v-model="scaleInput"
        @pressEnter="scale"
      />
    </a-modal>
    <a-modal
      title="同增同减"
      okText="确定"
      cancelText="取消"
      v-model="sameIncreaseDecreaseModalVisible"
      :destroyOnClose="true"
      @ok="sameIncreaseDecrease"
    >
      <a-input
        type="number"
        placeholder="请输入你想要增加的数目"
        v-model="sameIncreaseDecreaseInput"
        @pressEnter="sameIncreaseDecrease"
      />
    </a-modal>
  </div>
</template>
<script>
import { HotTable, HotColumn } from '@handsontable/vue'
import { registerLanguageDictionary, zhCN } from 'handsontable/i18n'
registerLanguageDictionary(zhCN)

const dateI18n = {
  previousMonth : '上个月',
  nextMonth     : '下个月',
  months        : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
  weekdays      : ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
  weekdaysShort : ['日','一','二','三','四','五','六']
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
    targetChartIndex: {
      type: Number,
      required: false,
    },
    splitIndex: {
      type: Number,
      default: 0,
    },
    textAlignment: {
      type: Array,
      default() {
        return []
      }
    }
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
    this.$nextTick(() => {
      this.initSingleDropdownHtml()
      this.changeSingleDropdown()
    })
    window.addEventListener('resize', this.updateShow)
  },
  updated() {
    this.getHotInstance()
    this.$nextTick(() => {
      this.initSingleDropdownHtml()
      this.changeSingleDropdown()
    })
    window.addEventListener('resize', this.updateShow)
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
            saveFile: {
              name: '数据下载',
              callback: () => {
                this.selectedRange = null
                this.handleSaveFileCallback()
              },
            },
            separator1: '---------',
            interpolation: {
              name: '内插',
              hidden: () => this.handleInterpolationScaleSameIncreaseDecreaseHidden(),
              callback: () => {
                this.selectedRange = null
                this.handleInterpolationCallback()
              },
            },
            scale: {
              name: '倍比缩放',
              hidden: () => this.handleInterpolationScaleSameIncreaseDecreaseHidden(),
              callback: () => {
                this.selectedRange = null
                this.handleScaleCallback()
              },
            },
            sameIncreaseDecrease: {
              name: '同增同减',
              hidden: () => this.handleInterpolationScaleSameIncreaseDecreaseHidden(),
              callback: () => {
                this.selectedRange = null
                this.handleSameIncreaseDecreaseCallback()
              },
            },
            separator2: '---------',
            mergeCells: {
              name: '批量设置',
              hidden: () => this.handleMergeUnmergeCellsHidden(),
              submenu: {
                items: []
              }
            },
            unmergeCells: {
              name: '批量还原',
              hidden: () => this.handleMergeUnmergeCellsHidden(),
              callback: () => {
                this.selectedRange = null
                this.handleUnmergeCellsCallback()
              }
            }
          },
        },
        language: zhCN.languageCode,
        cells: (row, col, prop) => {
          let cellProperties = {}
          if (this.splitIndex >= 0 && row < this.splitIndex) {
            cellProperties = { className: 'preheat-rows'}
          }
          this.textAlignment.forEach(item => {
            cellProperties.className = cellProperties.className + ' ' + item
          })
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
        rowHeaders = (index) => {
          let newIndex = index - this.splitIndex
          if (newIndex < 0) {
            return null
          } else {
            return newIndex + 1
          }
        }
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
      // this.splitIndex
      hiddenRows = this.preheat.show ? {} : {rows: hideRows, indicators: false,}
      //   }
      this.initMergeCellSubItems()
      this.tableColumns.forEach(item => {
        if (item.sourceRight) {
          item.sourceRight.forEach(el => {
            this.defaultHotSettings.contextMenu.items.mergeCells.submenu.items.push({
              name: el.name,
              key: `mergeCells:${el.name}`,
              callback: (val) => {
                this.selectedRange = null
                this.handleMergeCellsCallback(val, item)
              }
            })
          })
        }
      })
      // console.log(this.defaultHotSettings)
      return Object.assign(
          {},
          this.defaultHotSettings,
          this.setting,
          { rowHeaders, hiddenRows }
      )
    },
    columns() {
      return this.tableColumns.map((item, index) => {
        let itemNew = Object.assign({}, item)
        if (Object.prototype.hasOwnProperty.call(itemNew, 'type')) {
          console.log(itemNew.type)
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
            case 'date':
              itemNew.datePickerConfig = {
                i18n:dateI18n
              }
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
    initMergeCellSubItems() {
      this.defaultHotSettings.contextMenu.items.mergeCells.submenu.items = []
    },
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
      // mergeCells
      this.tableColumns.forEach((item, index) => {
        if (item.sourceRightLink) {
          let sourceRightArr = []
          item.sourceRight.forEach(val => {
            sourceRightArr.push(val.id)
          })
          let field = item.field
          let row = null
          let col = null
          let rowspan = null
          let mergeCells = []
          let rowArr = []
          for (let i = 0; i < this.tableData.length; i++) {
            if (sourceRightArr.includes(this.tableData[i][field])) {
              // i 为行 index 为列
              row = i
              col = index
              // 起点 field row
              let startField = this.tableData[i][field]
              this.recursion({
                item,
                i,
                startField,
                field,
                row,
                col,
                rowspan,
                mergeCells,
                sourceRightArr,
              })
              rowArr.push(row)
            }
          }
          // 过滤
          let newRowArr = rowArr.reduce((newRowArr, value) => {
            if (newRowArr.length && (value - newRowArr[0][0]) === 1) {
              newRowArr[0].unshift(value)
            } else {
              newRowArr.unshift([value])
            }
            return newRowArr
          }, []).reverse().map(a => a.reverse())
          let mergeRowArr = []
          newRowArr.forEach(item => {
            mergeRowArr.push(item[0])
          })

          let newMergeCells = []
          mergeCells.forEach(item => {
            if (mergeRowArr.includes(item.row)) {
              newMergeCells.push(item)
            }
          })
          // console.log(newMergeCells)
          this.hotSettings.mergeCells = newMergeCells
        }
      })

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
    recursion(value) {
      let { sourceRightArr, item, i, startField, field, row, rowspan, col, mergeCells } = value
      let tempI = i + 1
      if (tempI >= this.tableData.length) {
        rowspan = tempI - row
        this.tableColumns.forEach((val, key) => {
          item.sourceRightLink.forEach(element => {
            if (element === val.field) {
              mergeCells.push({row, col: key, rowspan, colspan: 1, removed: false})
            }
          })
        })
        mergeCells.push({row, col, rowspan, colspan: 1, removed: false})
      } else {
        // 下一行 field
        let nextField = this.tableData[tempI][field]
        // 下一行 link值
        if (startField === nextField) {
          let nextValArr = []
          item.sourceRightLink.forEach(val => {
            let nextVal = this.tableData[tempI][val]
            if (nextVal === 0) {
              nextValArr.push(nextVal)
            }
          })

          if (item.sourceRightLink.length === nextValArr.length) {
            if (tempI < this.tableData.length) {
              this.recursion({
                item,
                i: tempI,
                startField,
                field,
                row,
                col,
                rowspan,
                mergeCells,
                sourceRightArr,
              })
            }
          }
        } else {
          rowspan = tempI - row
          this.tableColumns.forEach((val, key) => {
            item.sourceRightLink.forEach(element => {
              if (element === val.field) {
                mergeCells.push({row, col: key, rowspan, colspan: 1, removed: false})
              }
            })
          })
          mergeCells.push({row, col, rowspan, colspan: 1, removed: false})
        }
      }
    },
    initSingleDropdownHtml() {
      let singleDropdownArr = []
      this.hotData.forEach((item, index) => {
        if (item.dropdown) {
          this.tableColumns.forEach((value, key) => {
            if (item.dropdown.id === value.field) {
              singleDropdownArr.push([index, key])
            }
          })
        }
      })
      singleDropdownArr.forEach(item => {
        const simpleTableDom = document.querySelector(`#hot-table-${this.hotTableRandomKey} .htCore tbody`)
        if (simpleTableDom) {
          const singleDropdownDom = simpleTableDom.childNodes[item[0]].lastChild
          singleDropdownDom.removeAttribute('class')
          singleDropdownDom.innerHTML = null
          const select = document.createElement('select')
          select.classList.add('single-dropdown')
          singleDropdownDom.appendChild(select)
          const field = this.hotData[item[0]].dropdown.id
          // console.log(this.hotData[item[0]].dropdown.value)
          this.hotData[item[0]].dropdown.value.forEach(el => {
            const option = document.createElement('option')
            option.value = el.id
            option.innerHTML = el.name
            if (el.id === this.hotData[item[0]][field]) {
              option.selected = true
            }
            select.appendChild(option)
          })
        }
      })
    },
    changeSingleDropdown() {
      let singleDropdownDom = document.getElementsByClassName('single-dropdown')
      // console.log(singleDropdownDom)
      singleDropdownDom.forEach(item => {
        if (item) {
          item.addEventListener('change', (e) => {
            let selected = this.hotInstance.getSelected()[0]
            let field = this.tableColumns[selected[1]].field
            let oldValue = this.hotData[selected[0]][field]
            this.hotData[selected[0]][field] = e.target.value
            this.$emit('cellEditDone', {
              rowIndex: selected[0],
              field,
              newValue: e.target.value,
              oldValue
            })
            // console.log(this.hotData)
          })
        }
      })
    },
    afterChange(changes, source) {
      if (changes == null) {
        return
      }
      if (source === 'populateFromArray') {
        return
      }
      if (source === 'MergeCells') {
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
        // this.hotTableRandomKey = +new Date() + (Math.random() * 1000).toFixed(0)
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
            let ret = row.every((item) => item !== null)
            // 如果删除的每一行有数据，才保存这一行到deletedRows
            // console.log(row, ret)
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
      if (selectedRange && selectedRange.length > 0) {
        let selectedArray = []
        let firstRow = selectedRange[0].from.row
        let endRow = selectedRange[0].to.row
        if (selectedRange && firstRow === -1) {
          firstRow = 0
        }
        // selected框
        if (firstRow < endRow) {
          if (firstRow === 0) {
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
        } else {
          if (endRow === 0) {
            return
          }
          selectedRange.forEach((item) => {
            selectedArray.push([item.from.row, item.to.row])
            item.from.row = item.from.row - 1
            item.to.row = item.to.row - 1
          })
          this.selectedRange = selectedRange
          selectedArray.forEach((item) => {
            const arr = this.hotData.splice(item[1], item[0] - item[1] + 1)
            this.hotData.splice(item[1] - 1, 0, ...arr)
          })
        }
      }
      this.$emit('moveDone', this.hotData)
    },
    moveDown() {
      let selectedRange = this.hotInstance.getSelectedRange()
      if (selectedRange && selectedRange.length > 0) {
        let selectedArray = []
        let firstRow = selectedRange[0].from.row
        let endRow = selectedRange[0].to.row
        const rowLength = this.hotInstance.getData().length
        if (firstRow < endRow) {
          if (endRow === rowLength - 1) {
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
        } else {
          if (firstRow === rowLength - 1) {
            return
          }
          selectedRange.forEach((item) => {
            selectedArray.push([item.from.row, item.to.row])
            item.from.row = item.from.row + 1
            item.to.row = item.to.row + 1
          })
          this.selectedRange = selectedRange
          selectedArray.forEach((item) => {
            const arr = this.hotData.splice(item[1], item[0] - item[1] + 1)
            this.hotData.splice(item[1] + 1, 0, ...arr)
          })
        }
      }
      this.$emit('moveDone', this.hotData)
    },
    handleSaveFileCallback() {
      // console.log('数据下载')
      this.saveFileModalVisible = true
      this.saveFileInput = ''
    },
    saveFile() {
      this.saveFileModalVisible = false
      let exportFile = this.hotInstance.getPlugin('exportFile')
      exportFile.downloadFile('csv', {
        filename: this.saveFileInput === '' ? '我的表格' : this.saveFileInput,
        exportHiddenRows: false,
        exportHiddenColumns: false,
        columnHeaders: true,
        rowHeaders: true,
      })
    },
    handleInterpolationScaleSameIncreaseDecreaseHidden() {
      let isHidden
      let selected = this.hotInstance.getSelected()
      if (selected[0][1] === selected[0][3]){
        if (!this.tableColumns[selected[0][1]].type) {
          isHidden = this.tableColumns[selected[0][1]].readOnly;
        } else {
          isHidden = true
        }
      } else {
        isHidden = true
      }
      return isHidden
    },
    handleInterpolationCallback() {
      let selectedRange = this.hotInstance.getSelectedRange()
      let firstRow = selectedRange[0].from.row
      let endRow = selectedRange[0].to.row
      if (firstRow === -1) {
        firstRow = 0
      }
      const field = this.columns[selectedRange[0].from.col].field
      const firstData = +this.hotData[firstRow][field]
      const endData = +this.hotData[endRow][field]
      const selectedMidRows = Math.abs(endRow - firstRow)
      const stepNumber = Math.abs((endData - firstData) / selectedMidRows)
      if (selectedRange && selectedRange.length > 0) {
        if (typeof firstData === 'number' && !isNaN(firstData)) {
          // console.log('内插')
          if (firstRow < endRow) {
            if (firstData < endData) {
              for (let i = 0; i < selectedMidRows - 1; i++) {
                const newValue = +(firstData + stepNumber * (i + 1)).toFixed(2)
                const oldValue =
                    this.hotData[firstRow + i + 1][field]
                const rowIndex = firstRow + i + 1
                this.$emit('cellEditDone', {
                  rowIndex,
                  field,
                  newValue,
                  oldValue,
                })
                this.hotData[firstRow + i + 1][field] = newValue
              }
            } else {
              for (let i = 0; i < selectedMidRows - 1; i++) {
                const newValue = +(firstData - stepNumber * (i + 1)).toFixed(2)
                const oldValue =
                    this.hotData[firstRow + i + 1][field]
                const rowIndex = firstRow + i + 1
                this.$emit('cellEditDone', {
                  rowIndex,
                  field,
                  newValue,
                  oldValue,
                })
                this.hotData[firstRow + i + 1][field] = newValue
              }
            }
          } else {
            if (firstData < endData) {
              for (let i = 0; i < selectedMidRows - 1; i++) {
                const newValue = +(firstData + stepNumber * (i + 1)).toFixed(2)
                const oldValue =
                    this.hotData[firstRow - i - 1][field]
                const rowIndex = firstRow - i - 1
                this.$emit('cellEditDone', {
                  rowIndex,
                  field,
                  newValue,
                  oldValue,
                })
                this.hotData[firstRow - i - 1][field] = newValue
              }
            } else {
              for (let i = 0; i < selectedMidRows - 1; i++) {
                const newValue = +(firstData - stepNumber * (i + 1)).toFixed(2)
                const oldValue =
                    this.hotData[firstRow - i - 1][field]
                const rowIndex = firstRow - i - 1
                this.$emit('cellEditDone', {
                  rowIndex,
                  field,
                  newValue,
                  oldValue,
                })
                this.hotData[firstRow - i - 1][field] = newValue
              }
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
      if (selectedRange && selectedRange.length > 0) {
        if (typeof firstData === 'number' && !isNaN(firstData)) {
          // console.log('倍比缩放')
          this.scaleModalVisible = true
          this.scaleInput = ''
        }
      }
    },
    scale() {
      this.scaleModalVisible = false
      let selectedRange = this.hotInstance.getSelectedRange()
      const field = this.columns[selectedRange[0].from.col].field
      const firstRow = selectedRange[0].from.row
      const endRow = selectedRange[0].to.row
      const stepNumber = Math.abs(selectedRange[0].to.row - selectedRange[0].from.row) + 1
      if (firstRow < endRow) {
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
      } else {
        for (let i = 0; i < stepNumber; i++) {
          const newValue = +(
              +this.hotData[selectedRange[0].from.row - i][field] * +this.scaleInput
          ).toFixed(2)
          const oldValue = this.hotData[selectedRange[0].from.row - i][field]
          const rowIndex = selectedRange[0].from.row - i
          this.$emit('cellEditDone', {
            rowIndex,
            field,
            newValue,
            oldValue,
          })
          this.hotData[selectedRange[0].from.row - i][field] = newValue
        }
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
      if (selectedRange && selectedRange.length > 0) {
        if (typeof firstData === 'number' && !isNaN(firstData)) {
          // console.log('同增同减')
          this.sameIncreaseDecreaseModalVisible = true
          this.sameIncreaseDecreaseInput = ''
        }
      }
    },
    sameIncreaseDecrease() {
      this.sameIncreaseDecreaseModalVisible = false
      let selectedRange = this.hotInstance.getSelectedRange()
      const field = this.columns[selectedRange[0].from.col].field
      const firstRow = selectedRange[0].from.row
      const endRow = selectedRange[0].to.row
      const stepNumber = Math.abs(selectedRange[0].to.row - selectedRange[0].from.row) + 1
      if (firstRow < endRow) {
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
      } else {
        for (let i = 0; i < stepNumber; i++) {
          const newValue = +(
              +this.hotData[selectedRange[0].from.row - i][field] +
              +this.sameIncreaseDecreaseInput
          ).toFixed(2)
          const oldValue = this.hotData[selectedRange[0].from.row - i][field]
          const rowIndex = selectedRange[0].from.row - i
          this.$emit('cellEditDone', {
            rowIndex,
            field,
            newValue,
            oldValue,
          })
          this.hotData[selectedRange[0].from.row - i][field] = newValue
        }
      }
      this.hotTableRandomKey = +new Date() + (Math.random() * 1000).toFixed(0)
    },
    afterOnCellCornerDblClick() {
      // console.log('afterOnCellCornerDblClick')
      this.selectedRange = null
      let selectedRange = this.hotInstance.getSelectedRange()
      if (selectedRange[0].from.row === -1) {
        selectedRange[0].from.row = 0
      }
      const currentRow = selectedRange[0].from.row
      const field = this.columns[selectedRange[0].from.col].field
      const currentData = this.hotData[selectedRange[0].from.row][field]
      const rowLength = this.hotInstance.getData().length
      // console.log(field, this.columns)
      if (selectedRange && selectedRange.length > 0) {
        if (this.columns[selectedRange[0].from.col].source) {
          for (let i = 0; i < rowLength - currentRow - 1; i++) {
            const oldValue = this.hotData[selectedRange[0].from.row + i + 1][field]
            const newValue = currentData
            const rowIndex = selectedRange[0].from.row + i + 1
            this.$emit('cellEditDone', {
              rowIndex,
              field,
              newValue: this.dropdownHash[field].find(p => p.name === newValue).id,
              oldValue: this.dropdownHash[field].find(p => p.name === oldValue).id
            })
            this.hotData[selectedRange[0].from.row + i + 1][field] = newValue
          }
        } else {
          for (let i = 0; i < rowLength - currentRow - 1; i++) {
            const oldValue = this.hotData[selectedRange[0].from.row + i + 1][field]
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
    handleMergeUnmergeCellsHidden() {
      let isHidden
      let selected = this.hotInstance.getSelected()
      if (selected[0][1] === selected[0][3]){
        isHidden = !this.tableColumns[selected[0][1]].sourceRight;
      } else {
        isHidden = true
      }
      return isHidden
    },
    handleMergeCellsCallback(mergeVal, mergeItem) {
      // console.log('合并单元格', mergeVal, mergeItem)
      let selected = this.hotInstance.getSelected()
      if (selected[0][0] > selected[0][2]) {
        let temp = selected[0][0]
        selected[0][0] = selected[0][2]
        selected[0][2] = temp
      }
      // console.log(selected[0], this.hotSettings.mergeCells)
      // this.hotSettings.mergeCells && this.hotSettings.mergeCells.forEach(item => {
      //   if (item.row ===  selected[0][0] && item.col === selected[0][1]) {
      //     console.log(item)
      //   }
      // })

      let sourceRightLinkIndex = [selected[0][1]]
      this.tableColumns.forEach((el, idx) => {
        mergeItem.sourceRightLink.forEach(element => {
          if (element === el.field) {
            sourceRightLinkIndex.push(idx)
          }
        })
      })

      // 先触发cellEditDone -- （合并后oldValue都为空）
      sourceRightLinkIndex.forEach(item => {
        let field = this.tableColumns[item].field
        for (let i = selected[0][0]; i <= selected[0][2]; i++) {
          let oldValue = this.hotData[i][field]
          if (field === mergeItem.field) {
            this.hotData[i][field] = mergeVal.split(':')[1]
            // console.log(this.hotData[i][field])
            this.$emit('cellEditDone', {
              rowIndex: i,
              field,
              newValue: mergeItem.sourceRight.find(p => p.name === mergeVal.split(':')[1]).id,
              oldValue: oldValue == null ? null : this.dropdownHash[field].find(p => p.name === oldValue).id
            })
          } else {
            if (i === selected[0][0]) {
              this.$emit('cellEditDone', {
                rowIndex: i,
                field,
                newValue: this.hotData[i][field],
                oldValue
              })
            } else {
              this.$emit('cellEditDone', {
                rowIndex: i,
                field,
                newValue: 0,
                oldValue
              })
            }
          }
        }
      })

      let mergeCells = this.hotInstance.getPlugin('mergeCells')
      mergeCells.enablePlugin()
      sourceRightLinkIndex.forEach(item => {
        mergeCells.merge(selected[0][0], item, selected[0][2], item)
      })
      this.hotSettings.mergeCells = mergeCells.mergedCellsCollection.mergedCells
      this.hotTableRandomKey = +new Date() + (Math.random() * 1000).toFixed(0)
      // console.log(this.hotSettings.mergeCells)
      // console.log(this.hotData)
    },
    handleUnmergeCellsCallback() {
      // console.log('拆分单元格', this.hotData)
      let selected = this.hotInstance.getSelected()
      let mergeCells = this.hotInstance.getPlugin('mergeCells')
      let sourceRightLink = []
      let mergeField = this.tableColumns[selected[0][1]].field
      mergeCells.enablePlugin()
      mergeCells.mergedCellsCollection.mergedCells.forEach(item => {
        if (item.row === selected[0][0]) {
          let field = this.tableColumns[item.col].field
          // console.log(item, field, selected[0])
          for (let i = 0; i < item.rowspan; i++) {
            let oldValue = this.hotData[(item.row + i)][field]
            if (field === mergeField) {
              this.hotData[(item.row + i)][field] = this.dropdownHash[field][0].name
              this.$emit('cellEditDone', {
                rowIndex: item.row + i,
                field,
                newValue: this.dropdownHash[field].find(p => p.name === this.hotData[selected[0][0]][field]).id,
                oldValue: this.dropdownHash[field].find(p => p.name === oldValue) && this.dropdownHash[field].find(p => p.name === oldValue).id
              })
            } else {
              this.hotData[(item.row + i)][field] = 0
              if (selected[0][0] === item.row + i) {
                this.$emit('cellEditDone', {
                  rowIndex: item.row + i,
                  field,
                  newValue: 0,
                  oldValue
                })
              } else {
                this.$emit('cellEditDone', {
                  rowIndex: item.row + i,
                  field,
                  newValue: 0,
                  oldValue
                })
              }
            }
          }
          sourceRightLink.push([selected[0][0], item.col, selected[0][2], item.col])
        }
      })

      sourceRightLink.forEach(item => {
        mergeCells.unmerge(...item)
      })
      this.hotSettings.mergeCells = mergeCells.mergedCellsCollection.mergedCells
      this.hotTableRandomKey = +new Date() + (Math.random() * 1000).toFixed(0)
      // console.log(this.hotData)
    },
    getOriginRowData(row){
      return this.$refs.hotTableRef.hotInstance.getDataAtRow(row)
    },
    getOriginCellData(row,prop){
      return this.$refs.hotTableRef.hotInstance.getDataAtRowProp(row,prop)
    }
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
  .single-dropdown {
    width: 100%;
    border: none;
    text-align-last: center;
  }
  .single-dropdown:focus-visible {
    outline: none;
  }
}
</style>
