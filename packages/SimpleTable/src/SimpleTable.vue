<template>
  <div v-if="isVisible && isRefresh">
    <hot-table
      :settings="hotSettings"
      :data="hotData"
      :class="classes"
      :after-change="afterChange"
      ref="hotTableRef"
    >
      <hot-column
        v-for="(item, index) in columns"
        :key="index"
        :title="item.title"
        :data="item.field"
        :source="item.source"
        :renderer="item.renderer"
        :type="item.type"
      >
      </hot-column>
    </hot-table>
  </div>
</template>
<script>
import { HotTable, HotColumn } from "@handsontable/vue";
import Handsontable from "handsontable";
import { registerLanguageDictionary, zhCN } from "handsontable/i18n";
registerLanguageDictionary(zhCN);

const defaultHotSettings = {
  rowHeaders: false,
  colHeaders: true,
  autoColumnSize: true,
  colWidths: "100px",
  stretchH: "all",
  licenseKey: "non-commercial-and-evaluation",
  contextMenu: false,
  language: zhCN.languageCode,
  cells: (row, col, prop) => {
    let cellProperties = {};
    cellProperties.renderer = "negativeValueRenderer";
    return cellProperties;
  },
};

export default {
  name: "SimpleTable",
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
      "negativeValueRenderer",
      this.negativeValueRenderer
    );
    const data = JSON.parse(JSON.stringify(this.tableData));
    this.prepareData(data);
  },
  mounted() {
    //console.log("mounted");
    this.getHotInstance();
  },
  updated() {
    //console.log("updated");
    this.getHotInstance();
  },
  data: function () {
    return {
      editRows: [],
      editCells: [],
      hotInstance: null,
      isRefresh: true,
      dropdownHash: {},
      hotData: [],
    };
  },
  computed: {
    classes() {
      return ["tableStyle"].concat(this.classNames);
    },
    hotSettings() {
      return Object.assign({}, defaultHotSettings, this.setting);
    },
    columns() {
      return this.tableColumns.map((item, index) => {
        let itemNew = Object.assign({}, item);
        if (Object.prototype.hasOwnProperty.call(itemNew, "type")) {
          switch (itemNew.type) {
            case "checkbox":
              break;
            case "dropdown":
              // 将dropdown的属性名和列表保存到hash表中，方便对data值进行更改
              this.dropdownHash[item.field] = item.source.slice(0);
              itemNew.source = item.source.map((item) => item.name);
              break;
          }
        }
        return itemNew;
      });
    },
  },
  methods: {
    prepareData(data) {
      this.hotData = data.map((item, index) => {
        for (let k in item) {
          const list = this.tableColumns.filter((cl) => cl.field === k)[0];
          if (list && list.type === "dropdown") {
            let filterItem = list.source.find((s) => s.id === item[k]);
            if (filterItem) item[k] = filterItem.name;
          }
        }
        return item;
      });
    },
    afterChange(changes, source) {
      if (changes == null) {
        return;
      }
      if (source !== "loadData") {
        // 添加修改触发
        if (changes && source) {
          for (let i = 0; i < changes.length; i++) {
            let element = changes[i];
            this.$emit("cellEditDone", {
              rowIndex: element[0],
              field: element[1],
              newValue: element[3],
              oldValue: element[2],
            });
            this.editCells.push(element[1] + "#" + element[0]);
          }
        }
        let changedRows = [];
        changes.forEach((change) => {
          this.getHotInstance();
          const [row, prop, oldV, newV] = change;
          const changedRow = this.hotInstance.getDataAtRow(row);
          let rowObj = { row: row.toString() };
          this.tableColumns.forEach((cl, idx) => {
            rowObj[cl.field] = changedRow[idx];
          });
          changedRows.push(rowObj);
        });
        //将更新的数据推送到editRows
        changedRows = this.processOptionColumn(changedRows, "name", "id");
        changedRows.forEach((r) => {
          const cr = Object.assign({}, r);
          let idx = this.editRows.findIndex((er) => er && er.row === r.row);
          if (this.editRows.length > 0 && this.editRows[idx]) {
            this.editRows[idx] = cr;
          } else {
            this.editRows.push(cr);
          }
        });
        this.updateShow();
      }
    },
    processOptionColumn(item, fromV, toV) {
      item.forEach((value) => {
        for (let k in this.dropdownHash) {
          if (Object.prototype.hasOwnProperty.call(value, k)) {
            const list = this.dropdownHash[k].filter(
              (item) => item[fromV] === value[k]
            )[0];
            list && (value[k] = list[toV]);
          }
        }
      });
      return item;
    },
    getHotInstance() {
      if (this.$refs.hotTableRef) {
        this.hotInstance = this.$refs.hotTableRef.hotInstance;
      }
    },
    // 单元格自定义渲染
    negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
      if (Object.prototype.hasOwnProperty.call(this.dropdownHash, prop)) {
        Handsontable.renderers.AutocompleteRenderer.apply(this, arguments);
      } else {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
      }
      // 样式：编辑
      if (this.editCells.includes(prop + "#" + row)) {
        //修改字体颜色
        td.style.color = "#004fff";
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
      const { row, col } = this.getvisibleLocal();
      this.isRefresh = false;
      this.$nextTick(() => {
        this.isRefresh = true;
        this.scrollViewportTo(row, col);
      });
    },
    getvisibleLocal() {
      const pluginRow = this.$refs.hotTableRef.hotInstance.getPlugin(
        "autoRowSize"
      );
      const pluginCol = this.$refs.hotTableRef.hotInstance.getPlugin(
        "autoColumnSize"
      );
      const col = pluginCol.getFirstVisibleColumn();
      const row = pluginRow.getFirstVisibleRow();
      return { row, col };
    },
    scrollViewportTo(row, col) {
      this.$nextTick(() => {
        this.$refs.hotTableRef.hotInstance.scrollViewportTo(row, col);
      });
    },
    reset() {
      this.isRefresh = false;
      this.editCells = [];
      this.editRows = [];
      setTimeout(() => {
        const data = JSON.parse(JSON.stringify(this.tableData));
        this.prepareData(data);
        this.isRefresh = true;
      }, 0);
    },
  },
};
</script>
