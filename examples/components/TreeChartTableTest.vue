<template>
  <div style="width: 100%">
    <tree-chart-table
      ref="TreeChartTable"
      :classes="classNames"
      :isRefresh="isRefresh"
      :treeData="treeData"
      :chartOption="chartOption"
      :rawData="rawData"
    />
  </div>
</template>

<script>
import TreeChartTable from "../../packages/TreeChartTable/src/TreeChartTable.vue";
import fakeData from "../assets/mock/treeChartTable.json";
export default {
  components: {
    TreeChartTable,
  },
  data() {
    return {
      classNames: [],
      isRefresh: true,
      chartOption: {
        title: {
          text: "水位流量图",
          left: "center",
        },
      },
      treeData: [],
      rawData: [],
    };
  },
  created() {
    if (fakeData.state === 0) {
      let rawData = fakeData.data;
      rawData.sectionQArray = [];
      rawData.sectionZArray = [];
      for (let i = 0; i < rawData.sectionDataList.length; i++) {
        // 初始流量
        rawData.sectionQArray.push(0.0);
        // 初始水位
        rawData.sectionZArray.push(213.5 + i + parseInt(Math.random() * 10));

        rawData.sectionDistanceArray.push(123);
      }

      this.treeData = [
        { title: "罗渡溪-渠嘉", key: rawData.riverReachId, children: [] },
      ];
      this.treeData[0].children = rawData.sectionDataList.map((el) => {
        return {
          key: el.sectionCode,
          title: `${el.sectionCode} ${el.sectionName}`,
        };
      });
      this.rawData = rawData;
    }
  },
};
</script>