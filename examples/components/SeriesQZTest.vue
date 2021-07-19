<template>
  <div>
    <series-q-z
      id="series-qz"
      ref="seriesQZ"
      :classes="['test-Chart']"
      :chartAxis="chartAxis"
      :chartOption="chartOption"
      :tableColumns="tableColumns"
      :tableData="tableData"
      :singleData="singleData"
      :splitIndex="splitIndex"
      :setting="{}"
    />
  </div>
</template>

<script>
import SeriesQZ from "../../packages/SeriesQZ/src/SeriesQZ.vue";
import fakeData2 from "../assets/mock/SeriesQZ2.json";
export default {
  components: {
    SeriesQZ,
  },
  created() {
    this.handleData();
  },
  data() {
    return {
      chartOption: {},
      chartAxis: {},
      tableColumns: [],
      tableData: [],
      singleData: [],
      splitIndex: 0
    };
  },
  methods: {
    handleData() {
      this.tableColumns = fakeData2.tableColumns
      this.tableData = fakeData2.tableData
      this.singleData = fakeData2.singleData
      this.splitIndex = fakeData2.splitIndex
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
