<template>
  <div class="about">
    <!-- <toast-2 :message="'yyy'" @clicked="clickedHello"></toast-2> -->
    <table-chart-test v-if="false"></table-chart-test>
    <scheme-table-test v-if="false"></scheme-table-test>
    <char-table-test v-if="false"></char-table-test>
    <simple-chart-test v-if="false" />
    <standard-chart-test v-if="false" />
    <simple-table-test v-if="false" />
    <multi-option-table-test v-if="false" />
    <result-hydro-dynamic-test v-if="false" />
    <chart-table-group-test v-if="false" />
    <draggable-chart-test v-if="false" />
    <coherent-draggable-chart-test v-if="true" />
    <tree-chart-table-test v-if="false" />
    <curve-chart-test v-if="false" />
    <tree-table-group-test v-if="false" />
    <tree-simple-table-group-test v-if="false" />
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
<style scoped></style>
