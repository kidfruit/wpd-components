<template>
  <div style="width: 100%">
    <simple-table
      ref="tableChart"
      :splitIndex="splitIndex"
      :tableData="tableData"
      :setting="setting"
      :tableColumns="tableColumns"
      @cellEditDone="cellEditDone"
      @moveDone="moveDone"
    ></simple-table>
    <button @click="getData">获取数据</button>
    <button @click="getChangedData">获取编辑数据</button>
    <button @click="getSelectData">获取选中数据</button>
    <button @click="reset">重置</button>
    <button @click="add">新增</button>
    <button @click="deleted">删除</button>
    <button @click="moveUp">上移</button>
    <button @click="moveDown">下移</button>
  </div>
</template>
<script>
import SimpleTable from '../../packages/SimpleTable/src/SimpleTable.vue'

export default {
  name: 'SimpleTableTest',
  components: { SimpleTable },
  data() {
    return {
    //   newSetting: {
    //       rowHeaders:true
    //   },
      splitIndex:4,
      visible: true,
      classNames: ['testTable'],
      setting: {
        rowHeaders: true,
        // mergeCells: [
        //   {
        //     "row": 7,
        //     "col": 4,
        //     "rowspan": 4,
        //     "colspan": 1,
        //     "removed": false
        //   },
        //   {
        //     "row": 7,
        //     "col": 2,
        //     "rowspan": 4,
        //     "colspan": 1,
        //     "removed": false
        //   },
        //   {
        //     "row": 7,
        //     "col": 3,
        //     "rowspan": 4,
        //     "colspan": 1,
        //     "removed": false
        //   }
        // ]
      },
      tableData: [
        {
          "dim2": 0,
          "dim1": 374,
          "time": "2021-03-29T15:00:00",
          "index": 1,
          "funcType": "SYN_FUNC_CONF",
          "checkbox": true
        },
        {
          "dim2": 52.3,
          "dim1": 400,
          "time": "2021-03-29T21:00:00",
          "index": 2,
          "funcType": "DSP_FUNC_CONF",
          "checkbox": true
        },
        {
          "dim2": 681.7,
          "dim1": 450,
          "time": "2021-03-30T03:00:00",
          "index": 3,
          "funcType": "FSA_FUNC_CONF",
          "checkbox": true
        },
        {
          "dim2": 2483,
          "dim1": 500,
          "time": "2021-03-30T09:00:00",
          "index": 4,
          "funcType": "FSA_FUNC_CONF",
          "checkbox": true
        },
        {
          "dim2": 4341.4,
          "dim1": 530,
          "time": "2021-03-30T15:00:00",
          "index": 5,
          "funcType": "BW_FUNC_CONF",
          "checkbox": true
        },
        {
          "dim2": 0,
          "dim1": 0,
          "time": "2021-03-30T21:00:00",
          "index": 6,
          "funcType": "BW_FUNC_CONF",
          "checkbox": true
        },
        {
          "dim2": 0,
          "dim1": 0,
          "time": "2021-03-31T03:00:00",
          "index": 7,
          "funcType": "BW_FUNC_CONF",
          "checkbox": true
        },
        {
          "dim2": 6923,
          "dim1": 560,
          "time": "2021-03-31T09:00:00",
          "index": 8,
          "funcType": "FSA_FUNC_CONF",
          "checkbox": true
        },
        {
          "dim2": 7953.3,
          "dim1": "5701",
          "time": "2021-03-31T15:00:00",
          "index": 9,
          "funcType": "DB_FUNC_CONF",
          "checkbox": true
        },
        {
          "dim2": 0,
          "dim1": 0,
          "time": "2021-03-31T21:00:00",
          "index": 10,
          "funcType": "DB_FUNC_CONF",
          "checkbox": true
        },
        {
          "dim2": 0,
          "dim1": 0,
          "time": "2021-04-01T03:00:00",
          "index": 11,
          "funcType": "DB_FUNC_CONF",
          "checkbox": true
        },
        {
          "dim2": 11573.8,
          "dim1": 600,
          "time": "2021-04-01T09:00:00",
          "index": 12,
          "funcType": "FSA_FUNC_CONF",
          "checkbox": true
        },
        {
          "dim2": 12955.3,
          "dim1": 610,
          "time": "2021-04-01T15:00:00",
          "index": 13,
          "funcType": "FR_FUNC_CONF",
          "checkbox": true
        },
        {
          "dim2": 0,
          "dim1": 0,
          "time": "2021-04-01T21:00:00",
          "index": 14,
          "funcType": "FR_FUNC_CONF",
          "checkbox": true
        },
        {
          "dim2": 0,
          "dim1": 0,
          "time": "2021-04-02T03:00:00",
          "index": 15,
          "funcType": "FR_FUNC_CONF",
          "checkbox": true
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
          readOnly: true,
        },
        {
          field: 'time',
          title: '时间',
          width: 80,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          readOnly: true,
        },
        {
          field: 'dim1',
          title: '水位(m)',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
        },
        {
          field: 'dim2',
          title: '流量(m³/s)',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
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
          sourceRight: [
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
          ],
          sourceRightLink:["dim1","dim2"]
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
    moveUp() {
      this.$refs.tableChart.moveUp()
    },
    moveDown() {
      this.$refs.tableChart.moveDown()
    },
    getData() {
      console.log(this.$refs.tableChart.hotInstance.getData())
      //console.log(this.$refs.tableChart.getEditColumnField());
    },
    reset() {
      this.$refs.tableChart.reset()
    },
    add() {
      this.$refs.tableChart.add()
    },
    deleted() {
      this.$refs.tableChart.deleted()
      console.log(this.$refs.tableChart.deletedRows)
    },
    getChangedData() {
      console.log(
        '按钮点击',
        this.$refs.tableChart.editCells,
        this.$refs.tableChart.editRows,
        this.$refs.tableChart.addRows,
        this.$refs.tableChart.deletedRows
      )
      console.log('增加行', this.$refs.tableChart.addRows)
      //document.getElementsByClassName("SimpleTable-Container2021")[0].style.width = "500px"
      //this.$refs.tableChart.refresh();
      //this.$refs.tableChart.render();
    },
    getSelectData() {
      console.log(this.$refs['tableChart']._getSelectData('checkbox'))
    },
    cellEditDone(value) {
      const { rowIndex, field, newValue, oldValue } = value
      console.log('cellEditDone', value)
      this.tableData[rowIndex][field] = newValue
      console.log(this.tableData)
    },
    moveDone(value) {
      console.log('moveDone', value)
    }
  },
//   watch: {
//     splitIndex: {
//       immediate: true,
//       deep: true,
//       handler(val) {
//           val=val+1
//         this.newSetting = {
//           cells(row) {
//             let cellProperties = {}
//             if (row < val) {
//               cellProperties = { className: 'preheat-rows', readOnly: true }
//             }
//             return cellProperties
//           },
//         }
//         let hideRows = []
//         for (let i = 0; i < val; i++) {
//           hideRows.push(i)
//         }
//         this.newSetting.hiddenRows = {}
//         //   this.newSetting.hiddenRows.rows = hideRows;
//         //   this.newSetting.hiddenRows.indicators = false;
//         this.newSetting = Object.assign({}, this.setting, this.newSetting)
//       },
//     },
//   },
}
</script>
<style scoped></style>
