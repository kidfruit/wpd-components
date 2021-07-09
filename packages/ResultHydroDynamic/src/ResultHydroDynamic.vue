<template>
  <div :class="classNames" :key="randomKey">
    <div class="chart-container">
      <standard-chart
        ref="chartRef"
        :chartOption="chartOption"
        :isRefresh="isRefresh"
        :chartAxis="chartAxis"
        :id="id"
        :sections="sections"
        :classes="['result-hydro-dynamic']"
        :chartData="data"
      />
    </div>
    <div class="table-container">
      <simple-table
        ref="tableRef"
        :tableData="newData"
        :setting="localSetting"
        :tableColumns="columns"
        :splitIndex="splitIndex"
      ></simple-table>
    </div>
  </div>
</template>

<script>
import StandardChart from '../../StandardChart/src/StandardChart.vue'
import SimpleTable from '../../SimpleTable/src/SimpleTable.vue'
export default {
  name: 'ResultHydroDynamic',
  components: {
    StandardChart,
    SimpleTable,
  },
  props: {
    setting: {
      type: Object,
      required: false,
    },
    classes: {
      type: Array,
      required: false,
    },
    isRefresh: {
      type: Boolean,
      default: true,
      required: false,
    },
    chartOption: {
      type: Object,
      required: false,
    },
    chartAxis: {
      type: Object,
    },
    tableColumns: {
      type: Array,
    },
    data: {
      type: Array,
    },
    sections: {
      type: Array,
    },
    id: {
      type: String,
    },
    splitIndex: {
      type: Number,
      default: -1,
    },
  },
  computed: {
    classNames() {
      return ['result-hydro-dynamic'].concat(this.classes)
    },
  },
  created() {
    this.handleData()
  },
  beforeMount() {},
  mounted() {},
  data() {
    return {
      newData: [],
      columns: [],
      localSetting: {
        nestedHeaders: [],
      },
      randomKey: +new Date() + (Math.random() * 1000).toFixed(0)
    }
  },
  methods: {
    handleData() {
      this.chartAxis.series[0].field = this.tableColumns[1].field.split('#')[1]
      this.chartAxis.series[1].field = this.tableColumns[2].field.split('#')[1]

      this.chartOption.timeline.data = this.data.map((el) => el.time)
      // 将多个时间线的数据拆分
      this.newData = JSON.parse(JSON.stringify(this.data))

      // 处理columns
      this.columns = JSON.parse(JSON.stringify(this.tableColumns))

      // 处理data
      const field1 = this.chartAxis.series[0].field
      const field2 = this.chartAxis.series[1].field
      const temp = Object.keys(this.data[0])
      this.data.forEach((item) => {
        item[field1] = []
        item[field2] = []
        temp.forEach(el => {
          if (el.split('#').includes(field1)) {
            item[field1].push(item[el])
          } else if (el.split('#').includes(field2)) {
            item[field2].push(item[el])
          }
        })
      })

      // 自定义表头
      // let nestedHeaders = [];
      let notFields = [{ label: '', colspan: 1 }]
      let sectionFields = this.sections.map((el) => {
        return { label: el, colspan: 2 }
      })
      let nestedHeaders = []
      nestedHeaders.push(notFields.concat(sectionFields))
      nestedHeaders.push(
          this.columns.map((el) => {
            return { label: el.title, colspan: 1 }
          })
      )
      this.localSetting = Object.assign({ nestedHeaders }, this.setting)
      // console.log(this.columns, this.newData)
    },
    updateShow() {
      this.randomKey = +new Date() + (Math.random() * 1000).toFixed(0)
    }
  }
}
</script>
<style lang="scss">
.chart-container {
  margin-bottom: 24px;
}
</style>
