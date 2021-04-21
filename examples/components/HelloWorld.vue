<template>
  <div class="about">
    <!-- <toast-2 :message="'yyy'" @clicked="clickedHello"></toast-2> -->
    <table-chart-test v-if="false"></table-chart-test>
    <scheme-table-test v-if="false"></scheme-table-test>
    <char-table-test v-if="false"></char-table-test>
    <div v-if="false">
      <h2>
        SimpleChart：数据格式为echarts标准格式（V-Chart封装，打包未成功！！）
      </h2>
      <simple-chart-test />
    </div>
    <div v-if="false">
      <h2>StandardChart：数据格式与SimpleTable通用</h2>
      <standard-chart-test />
    </div>
    <div v-if="false">
      <h2>SimpleTable：handsontable基础表格组件</h2>
      <simple-table-test />
    </div>
    <div v-if="false">
      <h2>MultiOptionTable：流程模型选择专用表组件</h2>
      <multi-option-table-test />
    </div>
    <div v-if="false">
      <h2>ResultHydroDynamic：水动力成果展示组件</h2>
      <result-hydro-dynamic-test />
    </div>
    <div v-if="false">
      <h2>ChartTableGroup：图表联动组件</h2>
      <chart-table-group-test />
    </div>
    <div v-if="false">
      <h2>DraggableChart：可拖拽的echarts图组件(不支持连贯拖拽)</h2>
      <draggable-chart-test />
    </div>
    <div v-if="true">
      <h2>DraggableChart：可连贯拖拽，图表联动的echarts图组件</h2>
      <coherent-draggable-chart-test />
    </div>
    <div v-if="false">
      <h2>TreeChartTable：树表图组件(动态展示不同树节点的图表和表格数据)</h2>
      <tree-chart-table-test />
    </div>
    <div v-if="false">
      <h2>CurveChart：通用二维曲线</h2>
      <curve-chart-test />
    </div>
    <div v-if="false">
      <h2>TreeTableGroup：树表联动组件</h2>
      <tree-table-group-test />
    </div>
    <div v-if="false">
      <h2>TreeSimpleTableGroup：树表联动组件</h2>
      <tree-simple-table-group-test />
    </div>
  </div>
</template>

<script>
import TableChartTest from "./TableChartTest";
import SchemeTableTest from "./SchemeTableTest";
import SimpleTableTest from "./SimpleTableTest";

import CharTableTest from "./CharTableTest.vue";
import SimpleChartTest from "./SimpleChartTest.vue";
import StandardChartTest from "./StandardChartTest.vue";
import MultiOptionTableTest from "./MultiOptionTableTest.vue";
import ResultHydroDynamicTest from "./ResultHydroDynamicTest.vue";
import ChartTableGroupTest from "./ChartTableGroupTest.vue";
import DraggableChartTest from "./DraggableChartTest.vue";
import CoherentDraggableChartTest from "./CoherentDraggableChartTest.vue";
import TreeChartTableTest from "./TreeChartTableTest.vue";
import TreeTableGroupTest from "./TreeTableGroupTest.vue";
import TreeSimpleTableGroupTest from "./TreeSimpleTableGroupTest.vue";
import CurveChartTest from "./CurveChartTest.vue";

export default {
  components: {
    TableChartTest,
    SchemeTableTest,
    SimpleTableTest,
    CharTableTest,
    SimpleChartTest,
    StandardChartTest,
    ResultHydroDynamicTest,
    ChartTableGroupTest,
    MultiOptionTableTest,
    DraggableChartTest,
    CoherentDraggableChartTest,
    TreeChartTableTest,
    TreeTableGroupTest,
    TreeSimpleTableGroupTest,
    CurveChartTest,
  },
  name: "HelloWorld",
  methods: {
    clickedHello() {
      alert("iii");
    },
  },
};
</script>
<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>
<style scoped>
h2 {
  color: orange;
}
</style>
