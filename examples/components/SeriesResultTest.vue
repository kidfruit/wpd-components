<template>
  <div>
    <series-result
      :classes="['testChart']"
      :splitIndex="splitIndex"
      :tableColumns="tableColumns"
      :tableData="tableData"
    />
  </div>
</template>

<script>
import SeriesResult from "../../packages/SeriesResult/src/SeriesResult.vue";
import fakeData from "../assets/mock/SeriesResult.json";
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
};
</script>

<style >
.series-result.testChart .ant-carousel .slick-slide {
  height: 50vh;
  line-height: 50vh;
}
</style>