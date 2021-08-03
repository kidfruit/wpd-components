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
        @checkedKeys="checkedKeys"
        @cellEditDone="cellEditDone"
      />
    </div>
    <button @click="getData">获取表格数据</button>
    <button @click="renderTable">刷新表格</button>
    <button @click="highlightRow('13')">高亮</button>
     <button @click="highlightRow('103039')">高亮2</button>
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
      isRefresh: true,
      chartOption: {
        title: {
          text: '水位流量图',
          left: 'center',
        },
      },
      chartAxis: {
        xAxis: 'time',
        timeSeries: true,
        yAxis: [
          {
            title: '水位(m)',
            yAxisIndex: 0,
          },
          {
            title: '流量(m³/s)',
            yAxisIndex: 1,
          },
        ],
        series: [
          {
            field: 'dim1',
            title: '水位(m)',
            selected: true,
            yAxisIndex: 0,
          },
          {
            field: 'dim2',
            title: '入库流量(m³/s)',
            selected: true,
            yAxisIndex: 1,
          },
          {
            field: 'dim2',
            title: '出库流量(m³/s)',
            selected: false,
            yAxisIndex: 1,
          },
        ],
      },
      tableColumns: [
        {
          field: 'nodeName',
          title: '名称',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          readOnly: true,
        },
        {
          field: 'flow1',
          title: '流程1',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          type: 'customDropdown',
        },
        {
          field: 'flow2',
          title: '流程2',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          type: 'customDropdown',
        },
        {
          field: 'flow3',
          title: '流程3',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          type: 'customDropdown',
        },
      ],
      data: mock_Table,
      pickedModels: [],
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
    },
    renderTable() {
      this.$refs['treeTableGroup'].render()
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
