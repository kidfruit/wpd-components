<template>
  <div
    class="SimpleTable-Container2021"
    :key="randomKey"
    v-if="isVisible && isRefresh"
  >
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
        :width="item.width"
        :readOnly="item.readOnly"
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
  outsideClickDeselects: false,
  columnSorting: true,
  // colWidths: "100px",
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
      addRows: [],
      deletedRows: [],
      editCells: [],
      hotInstance: null,
      isRefresh: true,
      dropdownHash: {},
      checkbox: {},
      hotData: [],
      randomKey: Math.random(),
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
              this.checkbox[item.field] = item.checkbox;
              // itemNew.source = item.source.map((item) => item.name);
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
    highlightRow(item) {
      let list = this.$refs.hotTableRef.hotInstance.getSourceData();
      let rows = "";
      for (let i = 0; i < list.length; i++) {
        if (item === list[i].key) {
          rows = i;
        }
      }
      // console.log(this.$refs.hotTableRef.hotInstance.selectRows(rows, rows));
    },
    _getSelectData(field) {
      if (typeof field == "string" && field != "") {
        let Selectdata = [];
        for (let i = 0; i < this.hotData.length; i++) {
          if (this.hotData[i][field]) {
            Selectdata.push(this.hotData[i]);
          }
        }
        return Selectdata;
      } else {
        return Error("field为必填参数！");
      }
    },

    updateWidth(newWidth) {
      // console.log(this.hotInstance, newWidth);
      this.hotInstance.updateSettings({
        width: newWidth,
      });
    },
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
            if (Object.keys(this.dropdownHash).includes(element[1])) {
              // 下拉框列
              this.$emit("cellEditDone", {
                rowIndex: element[0],
                field: element[1],
                newValue: this.dropdownHash[element[1]].find((p) => {
                  return p.name === element[3];
                }).id,
                oldValue: this.dropdownHash[element[1]].find((p) => {
                  return p.name === element[2];
                }).id,
              });
            } else {
              this.$emit("cellEditDone", {
                rowIndex: element[0],
                field: element[1],
                newValue: element[3],
                oldValue: element[2],
              });
            }

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
            let n = parseInt(cr.row);
            let index = this.addRows.findIndex((el) => el.tag === n);
            if (index === -1) {
              this.editRows.push(cr);
            } else {
              this.addRows[index] = cr;
              this.addRows[index]["tag"] = n;
            }
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
      } else if (Object.prototype.hasOwnProperty.call(this.checkbox, prop)) {
        //判断是否是checkbox类型
        Handsontable.renderers.CheckboxRenderer.apply(this, arguments);
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
        this.randomKey = Math.random();
        this.scrollViewportTo(row, col);
      });
    },
    refresh() {
      //适用于父节点宽度变化的情况
      if (this.hotInstance) {
        this.hotInstance.updateSettings({
          width: "100%",
        });
        this.hotInstance.render();
      }
    },
    render() {
      //刷新table
      if (this.hotInstance) {
        this.hotInstance.render();
      }
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
        this.randomKey = Math.random();
      }, 0);
    },
    add() {
      let index = this.$refs.hotTableRef.hotInstance.countRows();
      this.$refs.hotTableRef.hotInstance.alter("insert_row", index);
      let row = this.hotInstance.getDataAtRow(index);
      // 更新新增行数组
      let obj = {};
      row.forEach((el, i) => {
        obj[this.columns[i].field] = el;
      });
      obj["tag"] = index;
      this.addRows.push(obj);
    },
    deleted() {
      let seleteds = this.$refs.hotTableRef.hotInstance.getSelected();
      if (seleteds && seleteds.length > 0) {
        seleteds.forEach((el) => {
          for (let i = 0; i < el[2] - el[0] + 1; i++) {
            let row = this.hotInstance.getDataAtRow(el[0] + i);
            let ret = row.every((item) => item);
            // 如果删除的每一行有数据，才保存这一行到deletedRows
            if (ret && row.length > 0) {
              let obj = {};
              row.forEach((el, i) => {
                obj[this.columns[i].field] = el;
              });
              this.deletedRows.push(obj);
            }
          }
          this.$refs.hotTableRef.hotInstance.alter(
            "remove_row",
            el[0],
            el[2] - el[0] + 1
          );
        });
      }
    },
  },
  watch: {
    tableData: {
      immediate: true,
      deep: true,
      handler(val) {
        this.isRefresh = false;
        const data = JSON.parse(JSON.stringify(val));
        this.prepareData(data);
        this.$nextTick(() => {
          this.isRefresh = true;
        });
      },
    },
  },
};
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
