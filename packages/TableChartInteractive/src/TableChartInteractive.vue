<template>
  <div style="width:100%;">
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
      >
      </hot-column>
    </hot-table>
  </div>
</template>
<script>
import { HotTable, HotColumn } from "@handsontable/vue";
import Handsontable from "handsontable";
export default {
  name: "TableChartInteractive",
  props: {
    tableData: {
      type: Array,
    },
    tableColumns: {
      type: Array,
    },
  },
  beforeMount() {
    Handsontable.hooks.add("afterChange", this.afterChange);
    // 单元格自定义渲染
    Handsontable.renderers.registerRenderer(
      "negativeValueRenderer",
      this.negativeValueRenderer
    );
  },
  data: function() {
    return {
      isRefresh: true,
      tableData_local: JSON.parse(JSON.stringify(this.tableData)),
      tableColumns_local: JSON.parse(JSON.stringify(this.tableColumns)),
      hotSettings: {
        // language: "zh-CN",
        rowHeaders: false,
        colHeaders: true,
        autoColumnSize: true,
        colWidths: "100px",
        stretchH: "all",
        licenseKey: "non-commercial-and-evaluation",
        // contextMenu: true,
        cells: function() {
          let cellProperties = {};
          cellProperties.renderer = "negativeValueRenderer";
          return cellProperties;
        },
      },
      //   记录单元格修改记录，采用拼接方法:prop#row
      editCells: [],
    };
  },
  components: {
    HotTable,
    HotColumn,
  },
  methods: {
    getTableData() {
      return this.tableData_local;
    },
    // 获取被编辑过的列名
    getEditColumnField() {
      if (this.editCells[0]) {
        return this.editCells[0].split('#')[0];
      }else{
        return null
      }
    },
    // 单元格修改触发器，
    // 以第一个编辑的单元格为准
    afterChange(changes, source) {
      if (["edit", "CopyPaste.paste", "Autofill.fill"].includes(source)) {
        // const row = changes[0]
        const field = changes[0][1];
        // const newValue = changes[2]
        for (let i = 0; i < this.tableColumns_local.length; i++) {
          if (this.tableColumns_local[i].field != field) {
            this.$set(this.tableColumns_local, i, {
              ...this.tableColumns_local[i],
              readOnly: true,
            });
          }
        }
        // 记录被的编辑单元格
        for (let i = 0; i < changes.length; i++) {
          const element = changes[i];
          this.editCells.push(element[1] + "#" + element[0]);
        }
        this.updateTableShow();
      }
    },
    // 重置数据
    reset() {
      this.tableData_local = JSON.parse(JSON.stringify(this.tableData));
      this.tableColumns_local = JSON.parse(JSON.stringify(this.tableColumns));
      this.editCells = [];
      this.updateTableShow();
    },
    // 黑科技更新表格展示
    updateTableShow() {
      this.isRefresh = false;
      this.$nextTick(() => {
        this.isRefresh = true;
      });
    },
    // 单元格自定义渲染
    negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
      // console.log(cellProperties, value);
      Handsontable.renderers.TextRenderer.apply(this, arguments);
      // 样式：编辑
      if (this.editCells.includes(prop + "#" + row)) {
        //修改字体颜色
        td.style.backgroundColor = "#d37d3f";
      }
      // 样式：只读
      // for (let i = 0; i < this.tableColumns_local.length; i++) {
      //   const element = this.tableColumns_local[i];
      //   if (element.readOnly) {
      //     td.style.color = "#f4c001";
      //   } else {
      //     td.style.color = "#000000";
      //   }
      // }
      //   else if (prop == "price") {
      //     //格式化价格数据
      //     td.innerText = value != null ? numbro(value).format("0.00") : "";
      //   } else if (prop == "sales") {
      //     //右对齐
      //     td.style.textAlign = "right";
      //     td.innerText = value != null ? numbro(value).format("0,0.00") : "";
      //   } else if (prop == "del") {
      //     //添加自定义的图片，并给图片的chick添加事件
      //     var escaped = Handsontable.helper.stringify(value),
      //       imgdel;

      //     imgdel = document.createElement("IMG");
      //     imgdel.src = "handsontable/remove.png";
      //     imgdel.width = 20;
      //     imgdel.name = escaped;
      //     imgdel.style = "cursor:pointer;"; //鼠标移上去变手型
      //     Handsontable.dom.addEvent(imgdel, "click", function(event) {
      //       hot.alter("remove_row", row); //删除当前行
      //     });

      //     Handsontable.dom.empty(td);
      //     td.appendChild(imgdel);
      //     td.style.textAlign = "center"; //图片居中对齐
      //     return td;
      //   }
    },
  },
};
</script>
<style
  src="../../../node_modules/handsontable/dist/handsontable.full.css"
></style>
<style scoped lang="scss">
.tableStyle {
  width: 100%;
  height: 300px;
  overflow: hidden;
}
</style>
