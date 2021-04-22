<template>
  <div style="width: 100%">
    <div iv
         style="width: 100%; height: 700px">
      <tree-simple-table-group ref="chartTable"
                               :classes="classNames"
                               :treeData="mock_Tree"
                               :tableColumns="tableColumns"
                               :tableData="data" @checkedKeys="checkedKeys" />
    </div>
    <button @click="getData">获取表格数据</button>
    <button @click="highlightRow('13')">高亮</button>
  </div>
</template>
<script>
import TreeSimpleTableGroup from '../../packages/TreeSimpleTableGroup/src/TreeSimpleTableGroup.vue'
import mock_Tree from '../assets/mock/RD_SYNSIM_Tree.json'
// import mock_Table from '../assets/mock/RD_SYNSIM_Table.json';
import mock_Table from '../assets/mock/RD_SIMPLE_Table.json'
export default {
  name: 'TreeSimpleTableGroupTest',
  components: { TreeSimpleTableGroup },
  data() {
    return {
      data: mock_Table,
      pickedModels: [],
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
          field: 'index',
          title: '序号',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          readOnly: true,
        },
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
          field: 'time',
          title: '时间',
          width: 150,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          readOnly: true,
        },
        {
          field: 'dim1',
          title: '水位(m)',
          width: 60,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          readOnly: true,
        },
        {
          field: 'dim2',
          title: '流量(m³/s)',
          width: 60,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          readOnly: true,
        },
        {
          field: 'funcType',
          title: '功能方案类型',
          width: 150,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          type: 'dropdown',
          source: [
            {
              name: '洪水预报功能',
              id: 'FHF_FUNC_CONF',
            },
            {
              name: '水库调度功能',
              id: 'DSP_FUNC_CONF',
            },
            {
              name: '河道演算功能',
              id: 'FR_FUNC_CONF',
            },
            {
              name: '水库回水功能',
              id: 'BW_FUNC_CONF',
            },
            {
              name: '水库溃坝功能',
              id: 'DB_FUNC_CONF',
            },
            {
              name: '洪水风险分析功能',
              id: 'FSA_FUNC_CONF',
            },
            {
              name: '决策综合模拟功能',
              id: 'SYN_FUNC_CONF',
            },
            {
              name: '联合调度功能',
              id: 'UNION_FUNC_CONF',
            },
            {
              name: '洪水摘录功能',
              id: 'FLDEXC_FUNC_CONF',
            },
            {
              name: '预报参数率定功能',
              id: 'FPC_FUNC_CONF',
            },
          ],
        },
        {
          field: 'checkbox',
          title: '是否选择',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          type: 'checkbox',
        },
      ],
    }
  },
  methods: {
      highlightRow(value) {
      this.$refs['chartTable'].$refs['tableRef'].highlightRow(value)
    },
      checkedKeys(val) {
      console.log("选中的key", val)
    },
    getData() {
      console.log(this.$refs['chartTable'].getTableData())
    },
  },
}
</script>
<style>
.chart {
  width: 100%;
  height: 50vh;
}
</style>
