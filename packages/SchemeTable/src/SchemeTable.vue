<template>
  <div>
    <hot-table
      v-if="isRefresh"
      :settings="hotSettings"
      :data="tableData_local"
      class="tableStyle"
      ref="TableChartRef"
    >
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
import { HotTable, HotColumn } from "@handsontable/vue";
// import Handsontable from "handsontable";
export default {
  name: "SchemeTable",
  props: {
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
  mounted() {
    window.showScheme = this.showScheme;
    window.openScheme = this.openScheme;
  },
  data: function() {
    return {
      isRefresh: true,
      hotSettings: {
        // language: "zh-CN",
        rowHeaders: false,
        colHeaders: true,
        autoColumnSize: true,
        colWidths: "100px",
        stretchH: "all",
        licenseKey: "non-commercial-and-evaluation",
        // contextMenu: true,
        // cells: function() {
        //   let cellProperties = {};
        //   cellProperties.renderer = "negativeValueRenderer";
        //   return cellProperties;
        // },
      },
      //   记录单元格修改记录，采用拼接方法:prop#row
      editCells: [],
      echart: null,
      //   tableColumns_local: null,
    };
  },
  computed: {
    tableData_local: {
      get() {
        let tmp = JSON.parse(JSON.stringify(this.tableData));
        tmp.forEach((element) => {
          element.action = `<button style="color: revert;" onClick="showScheme('${element.schemeId}')">查看</botton>
          <button style="color: revert;" onClick="openScheme('${element.schemeId}')">打开</botton>`;
        });
        return tmp;
      },
    },
    tableColumns_local: {
      get() {
        let tmp = JSON.parse(JSON.stringify(this.tableColumns));
        tmp.push({
          field: "action",
          renderer: "html",
          title: "操作",
          readOnly: true,
        });
        return tmp;
      },
    },
  },
  methods: {
    // 黑科技更新表格、图展示
    updateShow() {
      this.isRefresh = false;
      this.$nextTick(() => {
        this.isRefresh = true;
      });
    },
    showScheme(value) {
      this.$emit("showScheme", this.getTableRowBySchemeId(value));
    },
    openScheme(value) {
      this.$emit("openScheme", this.getTableRowBySchemeId(value));
    },
    getTableRowBySchemeId(schemeId) {
      return this.tableData_local.find((element) => {
        let a = schemeId.toString();
        let b = element.schemeId.toString();
        if (a === b) {
          return element;
        }
      });
    },
  },
  destroyed() {
    delete window.showScheme;
  },
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
