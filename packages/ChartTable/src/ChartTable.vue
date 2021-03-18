<template>
  <div v-if="tableData && isRefresh">
    <!-- <v-chart
      ref="vChart"
      theme="ovilia-green"
      :options="options"
      style="width:100%;"
    ></v-chart> -->
    <simple-table
      ref="simpleTable"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :setting="hotSettings"
      :isVisible="isVisible"
      @cellEditDone="cellEditDone"
    ></simple-table>
  </div>
</template>
<script>
import SimpleTable from '../../SimpleTable/src/SimpleTable.vue'
import utils from './utils'
export default {
  components: { SimpleTable },
  name: 'ChartTable',
  props: {
    isVisible: {
      type: Boolean,
      default: true,
      required: false,
    },
    classNames: {
      type: Array,
      required: false,
    },
    setting: {
      type: Object,
      required: false,
    },
    tableData: {
      type: Array,
    },
    tableColumns: {
      type: Array,
    },
  },
  data() {
    return {
      options: {},
      isRefresh: true,
    }
  },
  watch: {
    tableData: {
      handler(nValue) {
        if (nValue) {
          this.updateCharts()
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    hotSettings() {
      return Object.assign({}, this.setting)
    },
  },
  mounted() {},
  methods: {
    // 单元格编辑回调
    cellEditDone(value) {
      this.$emit('cellEditDone', value)
    },
    // 更新图
    updateCharts() {
      let data = utils.tableData2Charts(this.tableData, this.tableColumns)
      this.options = {
        tooltip: {
          show: true,
          trigger: 'axis',
          // confine: true,
          // transitionDuration: 0,
          // formatter(params) {
          //   		return params[0] && params[0].dataIndex
          //   			? `<span>
          //   	${unit[attr][0]}：${params[0].value[1]}${unit[attr][1]}<br />
          //   	${unit[attr][2]}：${params[0].value[0]}${unit[attr][3]}
          //   </span>`
          //   			: '';
          // },
        },
        legend: { data: data.legendData },
        xAxis: {
          type: 'category',
          data: data.xAxisData,
          max: (value) => value.max,
          min: (value) => value.min,
        },
        yAxis: {
          type: 'value',
          max: (value) => value.max,
          min: (value) => value.min,
        },
        series: data.seriesData,
      }
      this.resize()
    },
    resize() {
      if (this.$refs.vChart) {
        this.$refs.vChart.resize()
      }
      if (this.$refs.vTable) {
        this.$refs.vTable.resize()
      }
    },

    //
  },
}
</script>
<style scoped lang="scss">
.v-table-rightview {
  width: 100%;
}
// .echarts{
//   width: 100%;
// }
</style>
