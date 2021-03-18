<template>
  <div style="width:100%;">
    <simple-table
      ref="tableChart"
      :tableData="tableData"
      :tableColumns="tableColumns"
    ></simple-table>
    <button @click="getData">获取数据</button>
    <button @click="getChangedData">获取编辑数据</button>
    <button @click="reset">重置</button>
  </div>
</template>
<script>
import SimpleTable from "../../packages/SimpleTable/src/SimpleTable.vue";

export default {
  name: "SimpleTableTest",
  components: { SimpleTable },
  data() {
    return {
      visible:true,
      classNames:['testTable'],
      setting: {},
      tableData: [
        {
          name: "赵伟",
          tel: "156*****1987",
          hobby: 110,
          address: 299,
        },
        {
          name: "李伟",
          tel: "182*****1538",
          hobby: 120,
          address: 288,
        },
        {
          name: "孙伟",
          tel: "161*****0097",
          hobby: 130,
          address: 266,
        },
        {
          name: "周伟",
          tel: "197*****1123",
          hobby: 140,
          address: 244,
        },
        {
          name: "吴伟",
          tel: "183*****6678",
          hobby: 150,
          address: 222,
        },
        {
          name: "孙伟",
          tel: "161*****0097",
          hobby: 130,
          address: 266,
        },
        {
          name: "周伟",
          tel: "197*****1123",
          hobby: 140,
          address: 244,
        },
        {
          name: "吴伟",
          tel: "183*****6678",
          hobby: 150,
          address: 222,
        },
        {
          name: "孙伟",
          tel: "161*****0097",
          hobby: 130,
          address: 266,
        },
        {
          name: "周伟",
          tel: "197*****1123",
          hobby: 140,
          address: 244,
        },
        {
          name: "吴伟",
          tel: "183*****6678",
          hobby: 150,
          address: 222,
        }, {
          name: "孙伟",
          tel: "161*****0097",
          hobby: 130,
          address: 266,
        },
        {
          name: "周伟",
          tel: "197*****1123",
          hobby: 140,
          address: 244,
        },
        {
          name: "吴伟",
          tel: "183*****6678",
          hobby: 150,
          address: 222,
        },
        {
          name: "孙伟",
          tel: "161*****0097",
          hobby: 130,
          address: 266,
        },
        {
          name: "周伟",
          tel: "197*****1123",
          hobby: 140,
          address: 244,
        },
        {
          name: "吴伟",
          tel: "183*****6678",
          hobby: 150,
          address: 222,
        },
        {
          name: "孙伟",
          tel: "161*****0097",
          hobby: 130,
          address: 266,
        },
        {
          name: "周伟",
          tel: "197*****1123",
          hobby: 140,
          address: 244,
        },
        {
          name: "吴伟",
          tel: "183*****6678",
          hobby: 150,
          address: 222,
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
      ]
    };
  },
  methods: {
    getData() {
      console.log(this.$refs.tableChart.hotInstance.getData());
      //console.log(this.$refs.tableChart.getEditColumnField());
    },
    reset() {
      this.$refs.tableChart.reset();
    },
    getChangedData(){
      console.log('按钮点击',this.$refs.tableChart.editRows)
    }
  },
};
</script>
<style scoped></style>
