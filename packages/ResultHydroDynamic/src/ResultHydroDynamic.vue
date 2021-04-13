<template>
  <div :classes="classNames">
    <div class="chart-container">
      <standard-chart
        ref="chartRef"
        :chartOption="chartOption"
        :isRefresh="isRefresh"
        :chartAxis="chartAxis"
        :chartData="data"
      />
    </div>
    <div class="table-container">
      <simple-table
        ref="tableRef"
        :tableData="newData"
        :setting="setting"
        :tableColumns="columns"
      ></simple-table>
    </div>
  </div>
</template>

<script>
import StandardChart from "../../StandardChart/src/StandardChart.vue";
import SimpleTable from "../../SimpleTable/src/SimpleTable.vue";
export default {
  name: "ResultHydroDynamic",
  components: {
    StandardChart,
    SimpleTable,
  },
  props: {
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
  },
  computed: {
    classNames() {
      return ["chart-table-group"].concat(this.classes);
    },
  },
  created() {
    // 将多个时间线的数据拆分
    let sections = this.data.map((el) => el.section);
    let fields = this.chartAxis.series.map((el) => el.field);
    let deltaFields = [];
    let regstrs = [];
    this.newData = JSON.parse(JSON.stringify(this.data));
    sections.forEach((element) => {
      fields.forEach((item) => {
        this.newData.forEach((el) => {
          if (el[item]) {
            if (deltaFields.indexOf(`${element}.${item}`) === -1) {
              deltaFields.push(`${element}.${item}`);
            }
          }
        });
      });
    });
    this.newData.forEach((el) => {
      fields.forEach((item) => {
        if (el[item]) {
          if (regstrs.indexOf(item) === -1) {
            regstrs.push(item);
          }
          el[item].forEach((ele, index) => {
            el[`${sections[index]}.${item}`] = ele;
          });
          delete el[item];
        }
      });
    });

    // 处理columns
    this.columns = JSON.parse(JSON.stringify(this.tableColumns));
    deltaFields.forEach((el) => {
      let n = regstrs.find((item) => el.indexOf(item) != -1);
      let m = this.columns.find((el) => el.field === n);
      this.columns.push({
        field: el,
        title: m.title,
        width: 100,
        isResize: true,
        titleAlign: "center",
        columnAlign: "center",
        readOnly: true,
      });
    });
    regstrs.forEach((el) => {
      let index = this.columns.findIndex((item) => item.field === el);
      this.columns.splice(index, 1);
    });
    console.log(this.columns, regstrs, sections);
    // 自定义表头
    //  ["A", { label: "B", colspan: 8 }, "C"],
    //       ["D", { label: "E", colspan: 4 }, { label: "F", colspan: 4 }, "G"],
    //       ["H", "I", "J", "K", "L", "M", "N", "R", "S", "T"],
    let nestedHeaders = [];
    let notFields = this.columns
      .filter((el) => {
        return (
          regstrs.findIndex((item) => el.field.indexOf(item) !== -1) === -1
        );
      })
      .map((el) => el.title);
    let sectionFields = sections.map((el) => {
      return { label: el, colspan: 2 };
    });
    this.setting.nestedHeaders.push(notFields.concat(sectionFields));
    this.setting.nestedHeaders.push(
      this.columns.map((el) => {
        return { label: el.title, colspan: 1 };
      })
    );
    console.log(nestedHeaders, this.setting.nestedHeaders);
  },
  beforeMount() {},
  mounted() {},
  data() {
    return {
      newData: [],
      columns: [],
      setting: {
        nestedHeaders: [
          // [
          //   "A",
          //   "C",
          //   { label: "B", colspan: 2 },
          //   { label: "B", colspan: 2 },
          //   { label: "B", colspan: 2 },
          // ],
          // [
          //   { label: "中国", colspan: 1 },
          //   { label: "应该", colspan: 1 },
          //   { label: "密码", colspan: 1 },
          //   { label: "F", colspan: 1 },
          //   { label: "H", colspan: 1 },
          //   { label: "E", colspan: 1 },
          //   { label: "F", colspan: 1 },
          //   { label: "H", colspan: 1 },
          // ],
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>