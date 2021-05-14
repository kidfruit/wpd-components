<template>
  <div>
    <series-result
      ref="seriesResult"
      :classes="['testChart']"
      :splitIndex="splitIndex"
      :tableColumns="tableColumns"
      :tableData="tableData"
      :setting="{ rowHeaders: true }"
    />
  </div>
</template>

<script>
import SeriesResult from "../../packages/SeriesResult/src/SeriesResult.vue";
import fakeData from "../assets/mock/SeriesResult.json";
import fakeData2 from "../assets/mock/SeriesResult2.json";
export default {
  components: {
    SeriesResult,
  },
  data() {
    return {
      tableData: [],
      tableColumns: [],
      splitIndex: 0,
    };
  },
  created() {
    this.tableData = fakeData.tableData;
    this.tableColumns = fakeData.tableColumns;
    this.splitIndex = fakeData.splitIndex;
  },
  mounted() {
    setTimeout(() => {
      this.tableData = fakeData2.tableData;
      this.tableColumns = fakeData2.tableColumns;
      this.splitIndex = fakeData2.splitIndex;
      this.$nextTick(() => {
        this.$refs.seriesResult.handleData();
      });
    }, 3000);
  },
};
</script>

<style >
.series-result.testChart .ant-carousel .slick-slide {
  height: 50vh;
  line-height: 50vh;
}
</style>