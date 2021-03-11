<template>
  <div>
    <hot-table
      v-if="isVisible"
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
import { HotTable, HotColumn } from "@handsontable/vue";
import { registerLanguageDictionary, zhCN } from 'handsontable/i18n';

registerLanguageDictionary(zhCN);

const defaultHotSettings = {
  rowHeaders: false,
  colHeaders: true,
  autoColumnSize: true,
  colWidths: "100px",
  stretchH: "all",
  licenseKey: "non-commercial-and-evaluation",
  contextMenu: false,
  language: zhCN.languageCode
}

export default {
  name: "SimpleTable",
  props: {
    isVisible:{
      type: Boolean,
      default: true,
      required: false
    },
    classNames:{
      type: Array,
      required: false
    },
    setting: {
      type: Object,
      required: false
    },
    tableData: {
      type: Array
    },
    tableColumns: {
      type: Array
    }
  },
  components: {
    HotTable,
    HotColumn,
  },
  mounted() {
    this.hotInstance = this.$refs.hotTableRef.hotInstance
    //this.hotSettings.afterChange = this.afterChange
  },
  data: function() {
    return {
      editRows: [],
      hotInstance: null
    };
  },
  computed: {
    classes () {
      return ['tableStyle'].concat(this.classNames)
    },
    hotSettings () {
      return Object.assign({}, defaultHotSettings, this.setting)
    }
  },
  methods: {
    getTableData() {
      return this.tableData_local;
    },
    afterChange(changes, source) {
      if (source !== 'loadData') {
        let changedRows = []
        changes.forEach(change => {
          const [row, prop, oldV, newV] = change;
          const changedRow = this.hotInstance.getDataAtRow(row);
          let rowObj = {row: row.toString()}
          this.tableColumns.forEach((cl,idx) => {
            rowObj[cl.field] = changedRow[idx]
          })
          changedRows.push(rowObj)
        });
        // 将更新的数据推送到editCells
        changedRows.forEach(r => {
          const cr = Object.assign({},r)
          let idx = this.editRows.findIndex(er => er && er.row === r.row);
          if(this.editRows.length > 0 && this.editRows[idx]){
            this.editRows[idx] = cr
          }else{
            this.editRows.push(cr)
          }
        })
      }
    }

  }
};
</script>
<style lang="scss">
.tableStyle .handsontable .htDimmed {
  text-align: center !important;
}
</style>
<style>
.ht_master .wtHolder {
    height: 100% !important;
}
</style>
