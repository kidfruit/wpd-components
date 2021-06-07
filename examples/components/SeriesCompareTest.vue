<template>
  <div>
    <series-compare ref="seriesCompare" :classes="['test-series-result']" :data="SeriesCompareData" :splitIndex="splitIndex" :setting="{ rowHeaders: true }" />
    <div style="display: flex; margin: 0 24px">
      <button @click="getData">获取数据</button>
    </div>
  </div>
</template>

<script>
import SeriesCompare from '../../packages/SeriesCompare/src/SeriesCompare.vue';
import SeriesCompareData from '../assets/mock/SeriesCompare.json';
export default {
  components: {
    SeriesCompare
  },
  data() {
    return {
      tableData: [],
      tableColumns: [],
      splitIndex: 0,
      SeriesCompareData
      // attribute: ['id', 'time', 'RD_RR_AVGINQ_P', 'RD_RR_UPZ_P']
    };
  },
  created() {
    // setTimeout(() => {
    //   this.tableData = SeriesCompareData2.tableData;
    //   this.tableColumns = SeriesCompareData2.tableColumns;
    this.splitIndex = SeriesCompareData[0].splitIndex;
    //   this.$nextTick(() => {
    //     this.$refs.seriesResult.handleData();
    //   });
    // }, 3000);
  },
  methods: {
    getData() {
      console.log(this.$refs.seriesCompare.getTableData());
      console.log(this.$refs.seriesCompare.getEditColumnField());
    }
  }
};
</script>

<style >
.series-result.testChart .ant-carousel .slick-slide {
  height: 50vh;
  line-height: 50vh;
}
</style>
<style lang="scss" scoped>
.testChart {
  width: 100%;
}
</style>