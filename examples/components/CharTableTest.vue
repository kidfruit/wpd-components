<template>
  <div>
    <chart-table
      ref="schemeTable"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :setting="setting"
      @cellEditDone="cellEditDone"
    ></chart-table>
  </div>
</template>
<script>
import ChartTable from '../../packages/ChartTable/src/ChartTable.vue'

export default {
  name: 'CharTableTest',
  components: { ChartTable },
  data() {
    return {
      tableData: [
        {
          id: '1',
          guid: '1561987',
          hobby: 110,
          schemeId: 299,
        },
        {
          id: '2',
          guid: '1821538',
          hobby: 120,
          schemeId: 288,
        },
        {
          id: '3',
          guid: '1610097',
          hobby: 130,
          schemeId: 266,
        },
        {
          id: '4',
          guid: '1971123',
          hobby: 140,
          schemeId: 244,
        },
        {
          id: '5',
          guid: '1836678',
          hobby: 150,
          schemeId: 222,
        },
        {
          id: '6',
          guid: '1610097',
          hobby: 130,
          schemeId: 266,
        },
        {
          id: '7',
          guid: '1971123',
          hobby: 140,
          schemeId: 244,
        },
        {
          id: '8',
          guid: '1836678',
          hobby: 150,
          schemeId: 222,
        },
      ],
      tableColumns: [
        {
          field: 'id',
          title: '序号',
          readOnly: true,
        },
        {
          field: 'guid',
          title: '编码',
          readOnly: true,
        },
        {
          field: 'hobby',
          title: '数据1',
          readOnly: false,
        },
        {
          field: 'schemeId',
          title: '方案编码',
          readOnly: true,
        },
      ],
      setting:{
        height:150
      }
    }
  },
  methods: {
    cellEditDone(value) {
      console.log(value)
    },
  },
}
</script>

<style scoped></style>
