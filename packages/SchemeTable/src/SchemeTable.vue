<template>
  <div>
    <hot-table v-if="isRefresh" :settings="hotSettings" :data="tableData_local">
      <hot-column
        v-for="(item, index) in tableColumns_local"
        :key="index"
        :title="item.title"
        :data="item.field"
        :read-only="item.readOnly"
        :renderer="item.renderer"
      >
      </hot-column>
    </hot-table>
  </div>
</template>
<script>
import lodash from 'lodash'
import { HotTable, HotColumn } from '@handsontable/vue'
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
}
export default {
  name: 'SchemeTable',
  props: {
    tableData: {
      type: Array,
    },
    tableColumns: {
      type: Array,
    },
    setting: {
      type: Object,
      required: false,
    },
  },
  components: {
    HotTable,
    HotColumn,
  },
  mounted() {
    window.showScheme = this.showScheme
    window.openScheme = this.openScheme
    window.deleteScheme = this.deleteScheme
  },
  data: function() {
    return {
      isRefresh: true,
    }
  },
  computed: {
    tableData_local: {
      get() {
        let tmp = lodash.cloneDeep(this.tableData)
        tmp.forEach((element) => {
          element.action = `<button style="color: revert;" onClick="showScheme('${element.schemeId}')">查看</botton>
          <button style="color: revert;" onClick="openScheme('${element.schemeId}')">打开</botton>
          <button style="color: revert;" onClick="deleteScheme('${element.schemeId}')">删除</botton>`
        })
        return tmp
      },
    },
    tableColumns_local: {
      get() {
        let tmp = lodash.cloneDeep(this.tableColumns)
        tmp.push({
          field: 'action',
          renderer: 'html',
          title: '操作',
          readOnly: true,
        })
        return tmp
      },
    },
    hotSettings() {
      return Object.assign({}, defaultHotSettings, this.setting)
    },
  },
  watch: {
    tableColumns_local: {
      handler(nValue) {
        if (this.hotSettings.colWidths) {
          this.hotSettings.colWidths = []
          for (let i = 0; i < nValue.length; i++) {
            const element = nValue[i]
            this.hotSettings.colWidths.push(150)
          }
          // 最后一列宽一点
          this.hotSettings.colWidths[
            this.hotSettings.colWidths.length - 1
          ] = 200
          this.updateShow()
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 黑科技更新表格、图展示
    updateShow() {
      this.isRefresh = false
      this.$nextTick(() => {
        this.isRefresh = true
      })
    },
    showScheme(value) {
      this.$emit('showScheme', this.getTableRowBySchemeId(value))
    },
    openScheme(value) {
      this.$emit('openScheme', this.getTableRowBySchemeId(value))
    },
    deleteScheme(value) {
      this.$emit('deleteScheme', this.getTableRowBySchemeId(value))
    },
    getTableRowBySchemeId(schemeId) {
      return this.tableData_local.find((element) => {
        let a = schemeId.toString()
        let b = element.schemeId.toString()
        if (a === b) {
          return element
        }
      })
    },
  },
  destroyed() {
    delete window.showScheme
    delete window.openScheme
    delete window.deleteScheme
  },
}
</script>
