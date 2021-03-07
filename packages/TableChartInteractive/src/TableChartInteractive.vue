<template>
  <div class="wrap">
    <div id="echart"></div>
    <div>
      <div style="overflow: hidden;">
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
    </div>
  </div>
</template>
<script>
import { HotTable, HotColumn } from "@handsontable/vue";
import Handsontable from "handsontable";
import utils from "./utils";
import * as echarts from "echarts";
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
        // manualColumnResize: true, //控制列的大小
        // manualRowResize: true, //控制行的大小
        // startCols: 5,//起始列数  数据data为null有效
        // startRows: 5,//起始行数

        rowHeaders: false,
        colHeaders: true,
        autoColumnSize: true,
        colWidths: 100,
        stretchH: "all",
        width: "100%",
        height: 300,
        licenseKey: "non-commercial-and-evaluation",
        cells: function() {
          let cellProperties = {};
          cellProperties.renderer = "negativeValueRenderer";
          return cellProperties;
        },
      },
      //   记录单元格修改记录，采用拼接方法:prop#row
      editCells: [],
      echart: null,
    };
  },
  mounted() {
    this.updataChart();
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
        return this.editCells[0].split("#")[0];
      } else {
        return null;
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
        this.updataChart();
        this.updateShow();
      }
    },
    // 重置数据
    reset() {
      this.tableData_local = JSON.parse(JSON.stringify(this.tableData));
      this.tableColumns_local = JSON.parse(JSON.stringify(this.tableColumns));
      this.editCells = [];
      this.updataChart();
      this.updateShow();
    },
    // 黑科技更新表格、图展示
    updateShow() {
      this.isRefresh = false;
      this.$nextTick(() => {
        this.isRefresh = true;
        if (this.echart) {
          this.echart.resize();
        }
      });
    },
    // 更新图数据
    getChartsOptions() {
      let data = utils.tableData2Charts(
        this.tableData_local,
        this.tableColumns_local
      );
      let options = {
        tooltip: {
          show: true,
          trigger: "axis",
          // confine: true,
          // transitionDuration: 0,
          // formatter(params) {
          //   		return params[0] && params[0].dataIndex
          //   			? `<span>
          //   	${unit[attr][0]}：${params[0].value[1]}${unit[attr][1]}<br />
          //   	${unit[attr][2]}：${params[0].value[0]}${unit[attr][3]}
          //   </span>`
          //   			: '';
          // },
        },
        legend: { data: data.legendData },
        xAxis: {
          type: "category",
          data: data.xAxisData,
          max: (value) => value.max,
          min: (value) => value.min,
        },
        yAxis: {
          type: "value",
          max: (value) => value.max,
          min: (value) => value.min,
        },
        series: data.seriesData,
      };
      return options;
    },
    updataChart() {
      this.echart = echarts.init(document.getElementById("echart"));
      this.echart.setOption(this.getChartsOptions());
      this.echart.resize();
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
.wrap {
  width: 100%;
  height: 100%;
}
.tableStyle {
  //   // height: 300px;
  overflow-y: scroll !important;
}
#echart {
  width: 100%;
  height: 300px;
}
</style>
