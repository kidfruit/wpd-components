<template>
  <div>
    <series-result
      ref="seriesResult"
      :classes="['test-series-result']"
      :splitIndex="splitIndex"
      :showSplitIndex="false"
      :topmargin="topmargin"
      :tableColumns="tableColumns"
      :tableData="tableData"
      :setting="{ rowHeaders: true }"
      :editable="true"
    />
    <div style="display: flex; margin: 0 24px">
      <button @click="getData">获取数据</button>
    </div>
  </div>
</template>

<script>
import SeriesResult from '../../packages/SeriesResult/src/SeriesResult.vue';
// import fakeData from '../assets/mock/SeriesResult.json';
import fakeData from '../assets/mock/SeriesResult2.json';
export default {
  components: {
    SeriesResult
  },
  data() {
    return {
      tableData: [],
      tableColumns: [],
      splitIndex: 0,
      topmargin:40
    };
  },
  created() {
    this.tableData = fakeData.tableData;
    this.tableColumns = fakeData.tableColumns;
    this.splitIndex = fakeData.splitIndex;
  },
  mounted() {
    // setTimeout(() => {
    //   this.tableData = fakeData2.tableData;
    //   this.tableColumns = fakeData2.tableColumns;
    //   this.splitIndex = fakeData2.splitIndex;
    //   this.$nextTick(() => {
    //     this.$refs.seriesResult.handleData();
    //   });
    // }, 3000);
  },
  methods: {
    getData() {
      console.log(this.$refs.seriesResult.getTableData());
      console.log(this.$refs.seriesResult.getEditColumnField());
    }
  }
};
</script>

<style >
.test-series-result {
}
</style>
