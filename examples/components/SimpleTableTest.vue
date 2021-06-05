<template>
  <div style="width: 100%">
    <simple-table ref="tableChart" :tableData="tableData" :tableColumns="tableColumns" @cellEditDone="cellEditDone" :splitIndex="5"></simple-table>
    <button @click="getData">获取数据</button>
    <button @click="getChangedData">获取编辑数据</button>
    <button @click="getSelectData">获取选中数据</button>
    <button @click="reset">重置</button>
    <button @click="add">新增</button>
    <button @click="deleted">删除</button>
  </div>
</template>
<script>
import SimpleTable from '../../packages/SimpleTable/src/SimpleTable.vue';

export default {
  name: 'SimpleTableTest',
  components: { SimpleTable },
  data() {
    return {
      visible: true,
      classNames: ['testTable'],
      setting: {},
      tableData: [
        {
          dim2: 0,
          dim1: 374,
          time: '2021-03-29T15:00:00',
          index: 1,
          funcType: 'SYN_FUNC_CONF',
          checkbox: true
        },
        {
          dim2: 52.3,
          dim1: 400,
          time: '2021-03-29T21:00:00',
          index: 2,
          funcType: 'DSP_FUNC_CONF',
          checkbox: true
        },
        {
          dim2: 681.7,
          dim1: 450,
          time: '2021-03-30T03:00:00',
          index: 3,
          funcType: 'FSA_FUNC_CONF',
          checkbox: true
        },
        {
          dim2: 2483,
          dim1: 500,
          time: '2021-03-30T09:00:00',
          index: 4,
          funcType: 'FSA_FUNC_CONF',
          checkbox: true
        },
        {
          dim2: 4341.4,
          dim1: 530,
          time: '2021-03-30T15:00:00',
          index: 5,
          funcType: 'FSA_FUNC_CONF',
          checkbox: true
        },
        {
          dim2: 5112.2,
          dim1: 540,
          time: '2021-03-30T21:00:00',
          index: 6,
          funcType: 'FSA_FUNC_CONF',
          checkbox: true
        },
        {
          dim2: 5973.9,
          dim1: 550,
          time: '2021-03-31T03:00:00',
          index: 7,
          funcType: 'FSA_FUNC_CONF',
          checkbox: true
        },
        {
          dim2: 6923,
          dim1: 560,
          time: '2021-03-31T09:00:00',
          index: 8,
          funcType: 'FSA_FUNC_CONF',
          checkbox: true
        },
        {
          dim2: 7953.3,
          dim1: 570,
          time: '2021-03-31T15:00:00',
          index: 9,
          funcType: 'FSA_FUNC_CONF',
          checkbox: true
        },
        {
          dim2: 9075.4,
          dim1: 580,
          time: '2021-03-31T21:00:00',
          index: 10,
          funcType: 'FSA_FUNC_CONF',
          checkbox: true
        },
        {
          dim2: 10281.4,
          dim1: 590,
          time: '2021-04-01T03:00:00',
          index: 11,
          funcType: 'FSA_FUNC_CONF',
          checkbox: true
        },
        {
          dim2: 11573.8,
          dim1: 600,
          time: '2021-04-01T09:00:00',
          index: 12,
          funcType: 'FSA_FUNC_CONF',
          checkbox: true
        },
        {
          dim2: 12955.3,
          dim1: 610,
          time: '2021-04-01T15:00:00',
          index: 13,
          funcType: 'FSA_FUNC_CONF',
          checkbox: true
        },
        {
          dim2: 14433.3,
          dim1: 620,
          time: '2021-04-01T21:00:00',
          index: 14,
          funcType: 'FSA_FUNC_CONF',
          checkbox: true
        },
        {
          dim2: 17699.7,
          dim1: 640,
          time: '2021-04-02T03:00:00',
          index: 15,
          funcType: 'FSA_FUNC_CONF',
          checkbox: true
        }
      ],
      tableColumns: [
        {
          field: 'index',
          title: '序号',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          readOnly: true
        },
        {
          field: 'time',
          title: '时间',
          width: 80,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true
        },
        {
          field: 'dim1',
          title: '水位(m)',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'dim2',
          title: '流量(m³/s)',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'funcType',
          title: '功能方案类型',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          type: 'dropdown',
          source: [
            {
              name: '洪水预报功能',
              id: 'FHF_FUNC_CONF'
            },
            {
              name: '水库调度功能',
              id: 'DSP_FUNC_CONF'
            },
            {
              name: '河道演算功能',
              id: 'FR_FUNC_CONF'
            },
            {
              name: '水库回水功能',
              id: 'BW_FUNC_CONF'
            },
            {
              name: '水库溃坝功能',
              id: 'DB_FUNC_CONF'
            },
            {
              name: '洪水风险分析功能',
              id: 'FSA_FUNC_CONF'
            },
            {
              name: '决策综合模拟功能',
              id: 'SYN_FUNC_CONF'
            },
            {
              name: '联合调度功能',
              id: 'UNION_FUNC_CONF'
            },
            {
              name: '洪水摘录功能',
              id: 'FLDEXC_FUNC_CONF'
            },
            {
              name: '预报参数率定功能',
              id: 'FPC_FUNC_CONF'
            }
          ]
        },
        {
          field: 'checkbox',
          title: '是否选择',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          type: 'checkbox'
        }
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
    add() {
      this.$refs.tableChart.add();
    },
    deleted() {
      this.$refs.tableChart.deleted();
    },
    getChangedData() {
      console.log('按钮点击', this.$refs.tableChart.editCells, this.$refs.tableChart.editRows, this.$refs.tableChart.addRows, this.$refs.tableChart.deletedRows);
      console.log('增加行', this.$refs.tableChart.addRows);
      //document.getElementsByClassName("SimpleTable-Container2021")[0].style.width = "500px"
      //this.$refs.tableChart.refresh();
      //this.$refs.tableChart.render();
    },
    getSelectData() {
      console.log(this.$refs['tableChart']._getSelectData('checkbox'));
    },
    cellEditDone(value) {
      console.log('cellEditDone', value);
    }
  }
};
</script>
<style scoped></style>
