<template>
  <div :class="[classes, 'multi-series-result']">
    <div class="multi-series-result-left">
      <a-tree
        v-model="checkedNode"
        :treeData="treeData"
        :checkable="true"
        :defaultExpandAll="true"
        @check="handleCheckTree"
      />
    </div>
    <div class="multi-series-result-right">
      <div
        class="series-result-wrapper"
        v-for="(item, index) in seriesData"
        :key="index"
      >
        <SeriesResult
          :splitIndex="item.splitIndex"
          :tableColumns="item.tableColumns"
          :tableData="item.tableData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SeriesResult from "../../SeriesResult/src/SeriesResult";
export default {
  name: 'MultiSeriesResult',
  components: { SeriesResult },
  props: {
    classes: {
      type: Array,
      required: false
    },
    timeLag: {
      type: Boolean,
      required: false
    },
    treeData: {
      type: Array,
      required: true
    },
    seriesData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      checkedNode: []
    }
  },
  watch: {
    checkedNode: {
      deep: true,
      handler() {
        this.$emit('checkedNodeUpdate', this.checkedNode)
      }
    }
  },
  methods: {
    handleCheckTree(checkedKeys, e) {
      console.log(checkedKeys, e)
    }
  }
}
</script>

<style lang="less">
.multi-series-result {
  .multi-series-result-right {
    .chart-switch-button {
      display: none;
    }
    .chart-box {
      .collapse-table {
        display: none;
      }
    }
    .table-box {
      display: none;
    }
  }
}
</style>
<style lang="less" scoped>
.multi-series-result {
  width: 100%;
  height: 100%;
  display: flex;
  .multi-series-result-left {
    width: 200px;
    height: 100%;
    overflow: auto;
    //background: rosybrown;
  }
  .multi-series-result-right {
    width: calc(100% - 200px);
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    //background: yellowgreen;
    .series-result-wrapper {
      width: 50%;
    }
  }
}
</style>
