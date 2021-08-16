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
      splitIndex:0,
      visible: true,
      classNames: ['testTable'],
      setting: { rowHeaders:true },
      tableData: [
        {
          "key": "RD_RR_UPZBEG",
          "title": "起调水位(m)",
          "showType": null,
          "dataUnit": {
            "viewShow": "m",
            "standardShow": "m",
            "name": "水位",
            "description": null,
            "formatPrecision": 2,
            "id": "LEVEL",
            "dbX": 1,
            "formatType": 2,
            "showX": 1
          },
          "d87ad132d3314a92a065a6b21096b7d3": 145
        },
        {
          "key": "RD_RR_UPQBEG",
          "title": "期初入库流量(m³/s)",
          "showType": null,
          "dataUnit": {
            "viewShow": "m³/s",
            "standardShow": "m³/s",
            "name": "流量",
            "description": null,
            "formatPrecision": 2,
            "id": "FLOW",
            "dbX": 1,
            "formatType": 2,
            "showX": 1
          },
          "d87ad132d3314a92a065a6b21096b7d3": 0
        },
        {
          "key": "RD_RR_DOWNQBEG",
          "title": "期初出库流量(m³/s)",
          "showType": null,
          "dataUnit": {
            "viewShow": "m³/s",
            "standardShow": "m³/s",
            "name": "流量",
            "description": null,
            "formatPrecision": 2,
            "id": "FLOW",
            "dbX": 1,
            "formatType": 2,
            "showX": 1
          },
          "d87ad132d3314a92a065a6b21096b7d3": 0
        },
        {
          "key": "RD_HP_NQCALCMODE",
          "title": "出力计算方式",
          "showType": null,
          "dataUnit": {
            "viewShow": null,
            "standardShow": null,
            "name": "无单位",
            "description": null,
            "formatPrecision": 1,
            "id": "NONE",
            "dbX": 1,
            "formatType": 2,
            "showX": 1
          },
          "dropdown": {
            "id": "d87ad132d3314a92a065a6b21096b7d3",
            "value": [
              {
                "name": "K值",
                "id": "K"
              },
              {
                "name": "NHQ曲线",
                "id": "NHQ"
              },
              {
                "name": "水量耗水率曲线",
                "id": "VHSL"
              },
              {
                "name": "K值曲线",
                "id": "KCurve"
              }
            ]
          },
          "d87ad132d3314a92a065a6b21096b7d3": "K"
        },
        {
          "key": "RD_HP_NQCALCMODE",
          "title": "出力计算方式-test",
          "showType": null,
          "dataUnit": {
            "viewShow": null,
            "standardShow": null,
            "name": "无单位",
            "description": null,
            "formatPrecision": 1,
            "id": "NONE",
            "dbX": 1,
            "formatType": 2,
            "showX": 1
          },
          "dropdown": {
            "id": "d87ad132d3314a92a065a6b21096b7d3",
            "value": [
              {
                "name": "K值",
                "id": "K"
              },
              {
                "name": "NHQ曲线",
                "id": "NHQ"
              },
              {
                "name": "水量耗水率曲线",
                "id": "VHSL"
              },
              {
                "name": "K值曲线",
                "id": "KCurve"
              }
            ]
          },
          "d87ad132d3314a92a065a6b21096b7d3": "NHQ"
        },
      ],
      tableColumns: [
        {
          "field": "title",
          "title": "约束项",
          "readOnly": true
        },
        {
          "field": "d87ad132d3314a92a065a6b21096b7d3",
          "title": "约束值"
        }
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
      console.log('cellEditDone', value)
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
