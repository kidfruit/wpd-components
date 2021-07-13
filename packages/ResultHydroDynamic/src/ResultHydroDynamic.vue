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
    <a-select
        style="width: 100%;margin-bottom: 20px;"
        show-search
        :defaultValue="sections[0]"
        @change="handleChangeSelected"
    >
      <a-select-option
          v-for="section in sections"
          :key="section"
      >
        {{section}}
      </a-select-option>
    </a-select>
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
      randomKey: +new Date() + (Math.random() * 1000).toFixed(0),
      currentSelectedValue: this.sections[0],
      count: null
    }
  },
  methods: {
    handleData() {

      this.chartOption.timeline.data = this.data.map((el) => el.time)
      // 将多个时间线的数据拆分
      this.count = (this.tableColumns.length - 1) / this.sections.length
      const defaultSelected = this.tableColumns[1].field.split('#')[0]

      // 处理columns
      this.columns.push(this.tableColumns[0])
      for (let i = 0; i < this.count; i++) {
        this.columns.push({
          field: this.tableColumns[i + 1].field.split('#')[1],
          title: this.tableColumns[i + 1].title
        })
      }

      // 处理data
      for (let i = 0; i < this.chartAxis.series.length; i++) {
        const field = this.chartAxis.series[i].field
        const temp = Object.keys(this.data[0])
        this.data.forEach((item) => {
          item[field] = []
          temp.forEach(el => {
            if (el.split('#').includes(field)) {
              item[field].push(item[el])
            }
          })
        })
      }

      // console.log(this.columns)
      this.columns.forEach((item, index) => {
        if (index > 2) {
          this.chartAxis.series.push({
            title: item.title,
            selected: false,
            yAxisIndex: 0,
            smooth: true
          })
        }
      })

      this.data.forEach(element => {
        let newDataItem = {}
        Object.keys(element).forEach(item => {
          if (item === 'time') {
            newDataItem.time = element[item]
          } else if (item.split('#')[0] === defaultSelected) {
            for (let i = 0; i < this.count; i++) {
              if (this.columns[i + 1].field === item.split('#')[1]) {
                newDataItem[this.columns[i + 1].field] = element[item]
              }
            }
          }
        })
        this.newData.push(newDataItem)
      })

      this.localSetting = Object.assign({}, this.setting)
    },
    handleChangeSelected(value) {
      console.log(value)
      this.newData = []
      this.data.forEach(element => {
        let newDataItem = {}
        Object.keys(element).forEach(item => {
          if (item === 'time') {
            newDataItem.time = element[item]
          } else if (item.split('#')[0] === value) {
            for (let i = 0; i < this.count; i++) {
              if (this.columns[i + 1].field === item.split('#')[1]) {
                newDataItem[this.columns[i + 1].field] = element[item]
              }
            }
          }
        })
        this.newData.push(newDataItem)
      })
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
