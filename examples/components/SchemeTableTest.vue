<template>
  <div>
    <scheme-table
      ref="schemeTable"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :setting="{height:200}"
      @openScheme="openScheme"
      @showScheme="showScheme"
      @deleteScheme="deleteScheme"
    ></scheme-table>
    <button @click="reset">重置</button>
  </div>
</template>
<script>
import SchemeTable from "../../packages/SchemeTable/src/SchemeTable.vue";
export default {
  name: "SchemeTableTest",
  components: {
    SchemeTable,
  },
  data() {
    return {
      tableData: [
        {
          id: "1",
          guid: "1561987",
          hobby: 110,
          schemeId: 299,
        },
        {
          id: "2",
          guid: "1821538",
          hobby: 120,
          schemeId: 288,
        },
        {
          id: "3",
          guid: "1610097",
          hobby: 130,
          schemeId: 266,
        },
        {
          id: "4",
          guid: "1971123",
          hobby: 140,
          schemeId: 244,
        },
        {
          id: "5",
          guid: "1836678",
          hobby: 150,
          schemeId: 222,
        },{
          id: "6",
          guid: "1610097",
          hobby: 130,
          schemeId: 266,
        },
        {
          id: "7",
          guid: "1971123",
          hobby: 140,
          schemeId: 244,
        },
        {
          id: "8",
          guid: "1836678",
          hobby: 150,
          schemeId: 222,
        },
      ],
      tableColumns: [
        {
          field: "id",
          title: "序号",
          readOnly: true,
        },
        {
          field: "guid",
          title: "编码",
          readOnly: true,
        },
        {
          field: "hobby",
          title: "数据1",
          readOnly: true,
        },
        {
          field: "schemeId",
          title: "方案编码",
          readOnly: true,
        },
      ],
    };
  },
  methods: {
    reset() {
      this.$refs.schemeTable.updateShow();
    },
    openScheme(scheme) {
      console.log(scheme);
    },
    showScheme(scheme) {
      console.log(scheme);
    },
    deleteScheme(scheme) {
      console.log(scheme);
    },
  },
};
</script>
<style scoped></style>
