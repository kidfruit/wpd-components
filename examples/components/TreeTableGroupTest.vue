<template>
  <div style="width: 100%">
    <div style="width: 100%; height:500px">
      <tree-table-group
        ref="treeTableGroup"
        :classes="classNames"
        :treeData="mock_Tree"
        :tableColumns="tableColumns"
        :setting="setting"
        :tableData="data"
        :isEdit="true"
        @checkedKeys="checkedKeys"
        @cellEditDone="cellEditDone"
      />
    </div>
    <button @click="getData">获取表格数据</button>
    <button @click="renderTable">刷新表格</button>
    <button @click="highlightRow('13')">高亮</button>
     <button @click="highlightRow('103039')">高亮2</button>
    <button @click="changeCheckedTreeData">changeCheckedTreeData</button>
    <!-- <button @click="fetchData">获取数据123</button> -->
  </div>
</template>
<script>
import TreeTableGroup from '../../packages/TreeTableGroup/src/TreeTableGroup.vue';
import mock_Tree from '../assets/mock/RD_SYNSIM_Tree.json';
import mock_Table from '../assets/mock/RD_SYNSIM_Table.json';

export default {
  name: 'TreeTableGroupTest',
  components: {TreeTableGroup},
  data() {
    return {
      setting: {
          rowHeaders:true
      },
      mock_Tree,
      classNames: ['testChart'],
      tableColumns: [
        {
          "title": "名称",
          "field": "nodeName",
          "readOnly": true
        },
        {
          "title": "流程1",
          "field": "flow1",
          "titleAlign": "center",
          "columnAlign": "center",
          "type": "customDropdown"
        },
        {
          "title": "流程2",
          "field": "flow2",
          "titleAlign": "center",
          "columnAlign": "center",
          "type": "customDropdown"
        },
        {
          "title": "流程3",
          "field": "flow3",
          "titleAlign": "center",
          "columnAlign": "center",
          "type": "customDropdown"
        },
        {
          "title": "流程4",
          "field": "flow4",
          "titleAlign": "center",
          "columnAlign": "center",
          "type": "customDropdown"
        },
        {
          "title": "流程5",
          "field": "flow5",
          "titleAlign": "center",
          "columnAlign": "center",
          "type": "customDropdown"
        }
      ],
      data: mock_Table,
      checkedTreeData: [
        "RCH301",
        "12",
        "13",
        "RCH303"
      ]
    }
  },
  methods: {
    checkedKeys(val) {
      console.log("选中的key", val)
    },
    cellEditDone(tableData) {
      console.log("更新后的table数据", tableData)
    },
    getData() {
      console.log(this.$refs['treeTableGroup'].getTableData());
    },
    highlightRow(value) {
      this.$refs['treeTableGroup'].highlightRow(value)
      // this.data.pop()
    },
    renderTable() {
      this.$refs['treeTableGroup'].render()
    },
    changeCheckedTreeData() {
      this.$refs.treeTableGroup.changeCheckedTreeData(this.checkedTreeData)
    }
  }
};
</script>
<style>
.chart {
  width: 100%;
  height: 50vh;
}
</style>
