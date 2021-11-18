<template>
  <div class="about">
    <!-- <toast-2 :message="'yyy'" @clicked="clickedHello"></toast-2> -->
    <table-chart-test v-if="false"></table-chart-test>
    <scheme-table-test v-if="false"></scheme-table-test>
    <char-table-test v-if="false"></char-table-test>
    <div v-if="false">
      <h2>SimpleChart：数据格式为echarts标准格式（V-Chart封装，打包未成功！！）</h2>
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
    <div v-if="false">
      <h2>DraggableChart：可连贯拖拽，图表联动的echarts图组件</h2>
      <coherent-draggable-chart-test />
    </div>
    <div v-if="false">
      <h2>SectionInit：树表图组件(动态展示不同树节点的图表和表格数据)</h2>
      <SectionInitTest />
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
      <h2>TreeSimpleTableGroup：树表联动组件(SimpleTable基础表)</h2>
      <tree-simple-table-group-test />
    </div>
    <div v-if="false">
      <h2>SeriesQZTest：通用过程线表过程组件</h2>
      <series-q-z-test />
    </div>
    <div v-if="false">
      <h2>SeriesPPTNTest：通用柱状图表</h2>
      <seriesPPTNTest />
    </div>
    <div v-if="false">
      <h2>SeriesResultTest：通用过程线组合组件</h2>
      <series-result-test />
    </div>
    <div v-if="false">
      <h2>SeriesCompareTest：通用过程线多方案对比组件</h2>
      <series-compare-test />
    </div>
    <div v-if="false">
      <h2>SchemeComparison:方案对比-单值-过程</h2>
      <SchemeComparisonChartTest/>
    </div>
    <div v-if="false">
      <h2>ChartsProcessTest:多echarts过程图对比组件</h2>
      <charts-process-test />
    </div>
    <div v-if="false">
      <h2>ChartsSingleTest:多echarts单值图对比组件</h2>
      <charts-single-test />
    </div>
    <div v-if="false">
      <h2>WpdTimePickerTest:时间控件</h2>
      <wpd-time-picker-test />
    </div>
    <div v-if="false">
      <h2>StatusInfoCompTest：信息展示控件</h2>
      <StatusInfoCompTest/>
    </div>
    <div v-if="false">
      <h2>SelectAndSortCompTest: 选择与排序控件</h2>
      <SelectAndSortCompTest/>
    </div>
    <div v-if="false">
      <h2>DispatchRuleCompTest: 调度规则控件</h2>
      <h2>DispatchRuleRelationshipMapTest: 调度规则关系图谱</h2>
      <DispatchRuleCompTest/>
    </div>
    <div v-if="false">
      <h2>DispatchRuleRelationshipMapTest: 调度规则关系图谱</h2>
      <DispatchRuleRelationshipMapTest/>
    </div>
    <div v-if="false">
      <h2>DatasetTreeChartTest: 数据结构树控件</h2>
      <DatasetTreeChartTest/>
    </div>
    <div v-if="false">
      <h2>UsageSettingCompTest: 洲滩民垸使用设置控件</h2>
      <UsageSettingCompTest/>
    </div>
    <div v-if="false">
      <h2>TimePlayControl: 时间播放控制组件</h2>
      <TimePlayControlTest/>
    </div>
    <div v-if="false">
      <h2>SelectTimePeriodTest: 时段选择控件</h2>
      <SelectTimePeriodTest/>
    </div>
    <div v-if="false">
      <h2>MultiSeriesResult: 多站点时序值展示控件</h2>
      <MultiSeriesResultTest/>
    </div>
    <div v-if="true">
      <h2>SearchFilterComp: 筛选与查询组件</h2>
      <SearchFilterCompTest/>
    </div>
  </div>
</template>

<script>
import TableChartTest from './TableChartTest';
import SchemeTableTest from './SchemeTableTest';
import SimpleTableTest from './SimpleTableTest';
import CharTableTest from './CharTableTest.vue';
import SimpleChartTest from './SimpleChartTest.vue';
import StandardChartTest from './StandardChartTest.vue';
import MultiOptionTableTest from './MultiOptionTableTest.vue';
import ResultHydroDynamicTest from './ResultHydroDynamicTest.vue';
import ChartTableGroupTest from './ChartTableGroupTest.vue';
import DraggableChartTest from './DraggableChartTest.vue';
import CoherentDraggableChartTest from './CoherentDraggableChartTest.vue';
import SectionInitTest from './SectionInitTest.vue';
import TreeTableGroupTest from './TreeTableGroupTest.vue';
import TreeSimpleTableGroupTest from './TreeSimpleTableGroupTest.vue';
import CurveChartTest from './CurveChartTest.vue';
import SeriesQZTest from './SeriesQZTest.vue';
import SeriesPPTNTest from './SeriesPPTNTest.vue';
import SeriesResultTest from './SeriesResultTest.vue';
import SeriesCompareTest from './SeriesCompareTest.vue';
import ChartsProcessTest from './ChartsProcessTest.vue';
import ChartsSingleTest from './ChartsSingleTest.vue';
import WpdTimePickerTest from './WpdTimePickerTest.vue';
import SchemeComparisonChartTest from "./SchemeComparisonChartTest";
import StatusInfoCompTest from "@/components/StatusInfoCompTest";
import SelectAndSortCompTest from "@/components/SelectAndSortCompTest";
import DispatchRuleCompTest from "@/components/DispatchRuleCompTest";
import DispatchRuleRelationshipMapTest from "@/components/DispatchRuleRelationshipMapTest";
import UsageSettingCompTest from "./UsageSettingCompTest";
import TimePlayControlTest from "@/components/TimePlayControlTest";
import SelectTimePeriodTest from "./SelectTimePeriodTest";
import MultiSeriesResultTest from "./MultiSeriesResultTest";
import DatasetTreeChartTest from "./DatasetTreeChartTest";
import SearchFilterCompTest from "./SearchFilterCompTest";

export default {
  components: {
    MultiSeriesResultTest,
    DispatchRuleCompTest,
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
    SectionInitTest,
    TreeTableGroupTest,
    TreeSimpleTableGroupTest,
    CurveChartTest,
    SeriesQZTest,
    SeriesPPTNTest,
    SeriesResultTest,
    SeriesCompareTest,
    ChartsProcessTest,
    ChartsSingleTest,
    WpdTimePickerTest,
    SchemeComparisonChartTest,
    StatusInfoCompTest,
    SelectAndSortCompTest,
    DispatchRuleRelationshipMapTest,
    UsageSettingCompTest,
    TimePlayControlTest,
    SelectTimePeriodTest,
    DatasetTreeChartTest,
    SearchFilterCompTest
  },
  name: 'HelloWorld',
  methods: {
    clickedHello() {
      alert('iii');
    }
  }
};
</script>
<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>
<style scoped>
h2 {
  color: orange;
}
.about{
  min-height: 500px;
}
</style>
