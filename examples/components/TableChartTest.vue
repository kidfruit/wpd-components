<template>
  <div style="width:100%;">
    <table-chart-interactive
      ref="tableChart"
      :tableData="tableData"
      :tableColumns="tableColumns"
    ></table-chart-interactive>
    <button @click="getData">获取数据</button>
    <button @click="reset">重置</button>
  </div>
</template>
<script>
import TableChartInteractive from '../../packages/TableChartInteractive/src/TableChartInteractive.vue'

export default {
  name: 'TableChartTest',
  components: { TableChartInteractive },
  data() {
    return {
      tableData: [
        {
          name: '赵伟',
          tel: '156*****1987',
          hobby: 110,
          address: 299,
        },
        {
          name: '李伟',
          tel: '182*****1538',
          hobby: 120,
          address: 288,
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: 130,
          address: 266,
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: 140,
          address: 244,
        },
        {
          name: '吴伟',
          tel: '183*****6678',
          hobby: 150,
          address: 222,
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: 130,
          address: 266,
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: 140,
          address: 244,
        },
        {
          name: '吴伟',
          tel: '183*****6678',
          hobby: 150,
          address: 222,
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: 130,
          address: 266,
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: 140,
          address: 244,
        },
        {
          name: '吴伟',
          tel: '183*****6678',
          hobby: 150,
          address: 222,
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: 130,
          address: 266,
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: 140,
          address: 244,
        },
        {
          name: '吴伟',
          tel: '183*****6678',
          hobby: 150,
          address: 222,
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: 130,
          address: 266,
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: 140,
          address: 244,
        },
        {
          name: '吴伟',
          tel: '183*****6678',
          hobby: 150,
          address: 222,
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: 130,
          address: 266,
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: 140,
          address: 244,
        },
        {
          name: '吴伟',
          tel: '183*****6678',
          hobby: 150,
          address: 222,
        },
      ],
      tableColumns: [
        {
          field: 'name',
          title: '姓名',
          readOnly: true,
        },
        {
          field: 'tel',
          title: '手机号码',
          readOnly: true,
        },
        {
          field: 'hobby',
          title: '爱好',
        },
        {
          field: 'address',
          title: '地址',
        },
      ],
      tmp: {
        xxx: 'nnn',
      },
    }
  },
  methods: {
    getData() {
      console.log(this.$refs.tableChart.getTableData())
      console.log(this.$refs.tableChart.getEditColumnField())
    },
    reset() {
      this.$refs.tableChart.reset()
    },
  },
  mounted() {
  },
}
</script>
<style scoped></style>
