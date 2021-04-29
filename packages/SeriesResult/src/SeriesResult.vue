<template>
  <div :class="classNames">
    <div class="chart-container">
      <a-carousel :after-change="onChange">
        <div v-for="(item, index) in carouselCount" :key="index">
          <h3>{{ item }}</h3>
        </div>
      </a-carousel>
    </div>
    <div class="table-container">
      <simple-table
        ref="tableRef"
        :tableData="tableData"
        :setting="setting"
        :tableColumns="tableColumns"
      ></simple-table>
    </div>
  </div>
</template>

<script>
import SimpleTable from "../../SimpleTable/src/SimpleTable.vue";
function unique(arr) {
  return Array.from(new Set(arr));
}
export default {
  props: {
    classes: {
      type: Array,
      required: false,
    },
    tableData: {
      type: Array,
    },
    tableColumns: {
      type: Array,
    },
    setting: {
      type: Object,
    },
    splitIndex: {
      type: Number,
    },
  },
  components: {
    SimpleTable,
  },
  computed: {
    classNames() {
      return ["series-result"].concat(this.classes);
    },
  },
  data() {
    return {
      carouselCount: 0,
    };
  },
  created() {
    console.log(this.tableColumns);
    console.log(this.tableData);
    console.log(this.splitIndex);
    let showTypeList = this.tableColumns
      .map((el) => el.showType)
      .filter((el) => el)
      .map((el) => el.split("-")[0]);
    this.carouselCount = unique(showTypeList);
    console.log(this.carouselCount);
    this.hideRows();
  },
  methods: {
    hideRows() {
      let hideRows = [];
      for (let i = 0; i < this.splitIndex; i++) {
        hideRows.push(i);
      }
      this.setting.hiddenRows = {};
      this.setting.hiddenRows.rows = hideRows;
      this.setting.hiddenRows.indicators = true;
    },
    onChange(a, b, c) {
      console.log(a, b, c);
    },
  },
};
</script>

<style>
.series-result .ant-carousel .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  overflow: hidden;
}
.series-result .ant-carousel .slick-dots {
  width: 20%;
  height: 40px;
  position: absolute;
  left: 50%; /* 定位父级的50% */
  bottom: -50px;
  transform: translate(-50%, 0); /*自己的50% */
  display: flex !important;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: #364d79;
}
.ant-carousel >>> .slick-slide h3 {
  color: #364d79;
}
.chart-container {
  margin-bottom: 96px;
}
.table-container {
}
</style>