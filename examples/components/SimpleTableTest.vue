<template>
  <div class="simple-table-container">
    <simple-table
      ref="tableChart"
      :splitIndex="splitIndex"
      :tableData="tableData"
      :setting="setting"
      :tableColumns="tableColumns"
      :textAlignment="textAlignment"
      :mouseRightContextMenu="mouseRightContextMenu"
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
      splitIndex:3,
      visible: true,
      classNames: ['testTable'],
      textAlignment: ['htCenter', 'htMiddle'],
      // 配置鼠标右键操作
      // saveFile数据下载
      // interpolation内插 scale倍比缩放 sameIncreaseDecrease同增同减
      // mergeCells批量设置 unmergeCells批量还原
      mouseRightContextMenu: ['saveFile', 'interpolation', 'scale', 'sameIncreaseDecrease', 'mergeCells', 'unmergeCells'],
      setting: {
        rowHeaders: true,
      },
      tableData:[{"time":"2022-01-12 08","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":0,"RD_RR_MINZ_P":0,"RD_RR_MAXZ_P":0,"RD_RR_MINOUTQ_P":0,"RD_RR_MAXOUTQ_P":0,"RD_RR_MINOUTPUT_P":0,"RD_RR_MAXOUTPUT_P":0},{"time":"2022-01-12 20","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":0,"RD_RR_MINZ_P":0,"RD_RR_MAXZ_P":0,"RD_RR_MINOUTQ_P":0,"RD_RR_MAXOUTQ_P":0,"RD_RR_MINOUTPUT_P":0,"RD_RR_MAXOUTPUT_P":0},{"time":"2022-01-13 08","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":0,"RD_RR_MINZ_P":0,"RD_RR_MAXZ_P":0,"RD_RR_MINOUTQ_P":0,"RD_RR_MAXOUTQ_P":0,"RD_RR_MINOUTPUT_P":0,"RD_RR_MAXOUTPUT_P":0},{"time":"2022-01-13 20","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":8.54,"RD_RR_MINZ_P":145,"RD_RR_MAXZ_P":175,"RD_RR_MINOUTQ_P":6000,"RD_RR_MAXOUTQ_P":56700,"RD_RR_MINOUTPUT_P":499,"RD_RR_MAXOUTPUT_P":2250},{"time":"2022-01-14 08","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":8.54,"RD_RR_MINZ_P":145,"RD_RR_MAXZ_P":175,"RD_RR_MINOUTQ_P":6000,"RD_RR_MAXOUTQ_P":56700,"RD_RR_MINOUTPUT_P":499,"RD_RR_MAXOUTPUT_P":2250},{"time":"2022-01-14 20","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":8.54,"RD_RR_MINZ_P":145,"RD_RR_MAXZ_P":175,"RD_RR_MINOUTQ_P":6000,"RD_RR_MAXOUTQ_P":56700,"RD_RR_MINOUTPUT_P":499,"RD_RR_MAXOUTPUT_P":2250},{"time":"2022-01-15 08","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":8.54,"RD_RR_MINZ_P":145,"RD_RR_MAXZ_P":175,"RD_RR_MINOUTQ_P":6000,"RD_RR_MAXOUTQ_P":56700,"RD_RR_MINOUTPUT_P":499,"RD_RR_MAXOUTPUT_P":2250},{"time":"2022-01-15 20","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":8.54,"RD_RR_MINZ_P":145,"RD_RR_MAXZ_P":175,"RD_RR_MINOUTQ_P":6000,"RD_RR_MAXOUTQ_P":56700,"RD_RR_MINOUTPUT_P":499,"RD_RR_MAXOUTPUT_P":2250},{"time":"2022-01-16 08","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":8.54,"RD_RR_MINZ_P":145,"RD_RR_MAXZ_P":175,"RD_RR_MINOUTQ_P":6000,"RD_RR_MAXOUTQ_P":56700,"RD_RR_MINOUTPUT_P":499,"RD_RR_MAXOUTPUT_P":2250},{"time":"2022-01-16 20","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":8.54,"RD_RR_MINZ_P":145,"RD_RR_MAXZ_P":175,"RD_RR_MINOUTQ_P":6000,"RD_RR_MAXOUTQ_P":56700,"RD_RR_MINOUTPUT_P":499,"RD_RR_MAXOUTPUT_P":2250},{"time":"2022-01-17 08","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":8.54,"RD_RR_MINZ_P":145,"RD_RR_MAXZ_P":175,"RD_RR_MINOUTQ_P":6000,"RD_RR_MAXOUTQ_P":56700,"RD_RR_MINOUTPUT_P":499,"RD_RR_MAXOUTPUT_P":2250},{"time":"2022-01-17 20","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":8.54,"RD_RR_MINZ_P":145,"RD_RR_MAXZ_P":175,"RD_RR_MINOUTQ_P":6000,"RD_RR_MAXOUTQ_P":56700,"RD_RR_MINOUTPUT_P":499,"RD_RR_MAXOUTPUT_P":2250},{"time":"2022-01-18 08","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":8.54,"RD_RR_MINZ_P":145,"RD_RR_MAXZ_P":175,"RD_RR_MINOUTQ_P":6000,"RD_RR_MAXOUTQ_P":56700,"RD_RR_MINOUTPUT_P":499,"RD_RR_MAXOUTPUT_P":2250},{"time":"2022-01-18 20","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":8.54,"RD_RR_MINZ_P":145,"RD_RR_MAXZ_P":175,"RD_RR_MINOUTQ_P":6000,"RD_RR_MAXOUTQ_P":56700,"RD_RR_MINOUTPUT_P":499,"RD_RR_MAXOUTPUT_P":2250},{"time":"2022-01-19 08","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":8.54,"RD_RR_MINZ_P":145,"RD_RR_MAXZ_P":175,"RD_RR_MINOUTQ_P":6000,"RD_RR_MAXOUTQ_P":56700,"RD_RR_MINOUTPUT_P":499,"RD_RR_MAXOUTPUT_P":2250},{"time":"2022-01-19 20","RD_HP_CTRLM_P":"QiAndQoBalance","RD_RR_CTRLV_P":0,"RD_RR_CTRLV1_P":0,"RD_RR_INQ_P":0,"RD_HP_K_P":8.54,"RD_RR_MINZ_P":145,"RD_RR_MAXZ_P":175,"RD_RR_MINOUTQ_P":6000,"RD_RR_MAXOUTQ_P":56700,"RD_RR_MINOUTPUT_P":499,"RD_RR_MAXOUTPUT_P":2250}],
      tableColumns:[{"field":"time","title":"时间","readOnly":true},{"dataType":"Enum","dataUnit":{"viewShow":null,"standardShow":null,"name":"无单位","description":null,"formatPrecision":1,"id":"NONE","dbX":1,"formatType":2,"showX":1},"field":"RD_HP_CTRLM_P","title":"控制模式","showType":null,"type":"dropdown","source":[{"name":"出入库平衡","id":"QiAndQoBalance"},{"name":"末水位","id":"EndZuCtrl"},{"name":"出库流量","id":"QoCtrl"},{"name":"时段出力","id":"NCtrl"},{"name":"末水位+出力","id":"EndZuAndNCtrl"},{"name":"出库+出力","id":"QoAndNCtrl"},{"name":"等流量","id":"EqualQoCtrl"},{"name":"等拦蓄流量","id":"EqualQtCtrl"},{"name":"等水位变幅","id":"EqualDeltaZuCtrl"}],"sourceRight":[{"id":"EqualQoCtrl","name":"等流量"},{"id":"EqualQtCtrl","name":"等拦蓄流量"},{"id":"EqualDeltaZuCtrl","name":"等水位变幅"}],"sourceRightLink":["RD_RR_CTRLV_P","RD_RR_CTRLV1_P"]},{"dataType":"Number","dataUnit":{"viewShow":null,"standardShow":null,"name":"无单位","description":null,"formatPrecision":1,"id":"NONE","dbX":1,"formatType":2,"showX":1},"field":"RD_RR_CTRLV_P","title":"控制值","showType":null},{"dataType":"Number","dataUnit":{"viewShow":null,"standardShow":null,"name":"无单位","description":null,"formatPrecision":1,"id":"NONE","dbX":1,"formatType":2,"showX":1},"field":"RD_RR_CTRLV1_P","title":"附加值","showType":null},{"dataType":"Number","dataUnit":{"viewShow":"m³/s","standardShow":"m³/s","name":"流量","description":null,"formatPrecision":2,"id":"FLOW","dbX":1,"formatType":2,"showX":1},"field":"RD_RR_INQ_P","title":"入库流量(m³/s)","showType":null},{"dataType":"Number","dataUnit":{"viewShow":null,"standardShow":null,"name":"无单位","description":null,"formatPrecision":1,"id":"NONE","dbX":1,"formatType":2,"showX":1},"field":"RD_HP_K_P","title":"K值","showType":null},{"dataType":"Number","dataUnit":{"viewShow":"m","standardShow":"m","name":"水位","description":null,"formatPrecision":2,"id":"LEVEL","dbX":1,"formatType":2,"showX":1},"field":"RD_RR_MINZ_P","title":"最低水位(m)","showType":null},{"dataType":"Number","dataUnit":{"viewShow":"m","standardShow":"m","name":"水位","description":null,"formatPrecision":2,"id":"LEVEL","dbX":1,"formatType":2,"showX":1},"field":"RD_RR_MAXZ_P","title":"最高水位(m)","showType":null},{"dataType":"Number","dataUnit":{"viewShow":"m³/s","standardShow":"m³/s","name":"流量","description":null,"formatPrecision":2,"id":"FLOW","dbX":1,"formatType":2,"showX":1},"field":"RD_RR_MINOUTQ_P","title":"最小出库(m³/s)","showType":null},{"dataType":"Number","dataUnit":{"viewShow":"m³/s","standardShow":"m³/s","name":"流量","description":null,"formatPrecision":2,"id":"FLOW","dbX":1,"formatType":2,"showX":1},"field":"RD_RR_MAXOUTQ_P","title":"最大出库(m³/s)","showType":null},{"dataType":"Number","dataUnit":{"viewShow":"万kW","standardShow":"MW","name":"出力","description":null,"formatPrecision":2,"id":"POWER","dbX":1,"formatType":2,"showX":0.1},"field":"RD_RR_MINOUTPUT_P","title":"最小出力(万kW)","showType":null},{"dataType":"Number","dataUnit":{"viewShow":"万kW","standardShow":"MW","name":"出力","description":null,"formatPrecision":2,"id":"POWER","dbX":1,"formatType":2,"showX":0.1},"field":"RD_RR_MAXOUTPUT_P","title":"最大出力(万kW)","showType":null}]
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
<style lang="less" scoped>
.simple-table-container {
  width: 100%;
  height: 800px;
  overflow: auto;
}
</style>
