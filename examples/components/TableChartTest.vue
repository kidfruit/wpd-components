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
import TableChartInteractive from "../../packages/TableChartInteractive/src/TableChartInteractive.vue";

export default {
  name: "TableChartTest",
  components: { TableChartInteractive },
  data() {
    return {
      tableData: [
        {
          name: "赵伟",
          tel: "156*****1987",
          hobby: "钢琴、书法、唱歌",
          address: "上海市黄浦区金陵东路569号17楼",
        },
        {
          name: "李伟",
          tel: "182*****1538",
          hobby: "钢琴、书法、唱歌",
          address: "上海市奉贤区南桥镇立新路12号2楼",
        },
        {
          name: "孙伟",
          tel: "161*****0097",
          hobby: "钢琴、书法、唱歌",
          address: "上海市崇明县城桥镇八一路739号",
        },
        {
          name: "周伟",
          tel: "197*****1123",
          hobby: "钢琴、书法、唱歌",
          address: "上海市青浦区青浦镇章浜路24号",
        },
        {
          name: "吴伟",
          tel: "183*****6678",
          hobby: "钢琴、书法、唱歌",
          address: "上海市松江区乐都西路867-871号",
        },
      ],
      tableColumns: [
        {
          field: "name",
          title: "姓名",
          readOnly: true,
        },
        {
          field: "tel",
          title: "手机号码",
          readOnly: true,
        },
        {
          field: "hobby",
          title: "爱好",
        },
        {
          field: "address",
          title: "地址",
        },
      ],
    };
  },
  methods: {
    getData() {
      console.log(this.$refs.tableChart.getTableData());
      console.log(this.$refs.tableChart.getEditColumnField())
    },
    reset(){
        this.$refs.tableChart.reset()
    }
  },
};
</script>
<style scoped></style>
