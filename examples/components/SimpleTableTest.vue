<template>
  <div class="simple-table-container">
    <simple-table
      ref="tableChart"
      :splitIndex="splitIndex"
      :tableData="tableData"
      :setting="setting"
      :tableColumns="tableColumns"
      :textAlignment="textAlignment"
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
      textAlignment: ['htCenter', 'htMiddle'],
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
      tableData: [{"section":"三斗坪坝址","waterLevel":null},{"section":"太平溪","waterLevel":null},{"section":"柳林溪","waterLevel":null},{"section":"九湾溪","waterLevel":null},{"section":"新滩","waterLevel":null},{"section":"香溪","waterLevel":null},{"section":"秭归站","waterLevel":null},{"section":"沙镇溪","waterLevel":null},{"section":"泄滩镇","waterLevel":null},{"section":"谢家河","waterLevel":null},{"section":"骆驼河","waterLevel":null},{"section":"巴东二站","waterLevel":null},{"section":"巴东县","waterLevel":null},{"section":"官渡口","waterLevel":null},{"section":"杨家棚","waterLevel":null},{"section":"黄花口","waterLevel":null},{"section":"冷水碛","waterLevel":null},{"section":"培石","waterLevel":null},{"section":"青岩子","waterLevel":null},{"section":"青石","waterLevel":null},{"section":"向家湾","waterLevel":null},{"section":"大青溪","waterLevel":null},{"section":"巫山县","waterLevel":null},{"section":"上安坪","waterLevel":null},{"section":"关上","waterLevel":null},{"section":"曲尺盘","waterLevel":null},{"section":"大溪镇","waterLevel":null},{"section":"风箱峡","waterLevel":null},{"section":"关苗沱","waterLevel":null},{"section":"奉节县","waterLevel":null},{"section":"口前","waterLevel":null},{"section":"三沱","waterLevel":null},{"section":"安坪","waterLevel":null},{"section":"庙坪","waterLevel":null},{"section":"拖板","waterLevel":null},{"section":"罐子口","waterLevel":null},{"section":"故陵镇","waterLevel":null},{"section":"东洋子","waterLevel":null},{"section":"新津口","waterLevel":null},{"section":"云阳镇","waterLevel":null},{"section":"山坝溪","waterLevel":null},{"section":"复兴场","waterLevel":null},{"section":"盘石","waterLevel":null},{"section":"双江镇","waterLevel":null},{"section":"白水滩","waterLevel":null},{"section":"糟房院子","waterLevel":null},{"section":"大周溪","waterLevel":null},{"section":"拖路口","waterLevel":null},{"section":"晒网坝","waterLevel":null},{"section":"万县市","waterLevel":null},{"section":"沱口水尺","waterLevel":null},{"section":"潭绍溪","waterLevel":null},{"section":"新开田","waterLevel":null},{"section":"冯家码头","waterLevel":null},{"section":"杨河溪","waterLevel":null},{"section":"壤渡场","waterLevel":null},{"section":"复兴场","waterLevel":null},{"section":"武陵镇","waterLevel":null},{"section":"毛磊滩","waterLevel":null},{"section":"石槽溪","waterLevel":null},{"section":"石宝寨","waterLevel":null},{"section":"坪山坝","waterLevel":null},{"section":"内院嘴","waterLevel":null},{"section":"顺溪场","waterLevel":null},{"section":"复兴场","waterLevel":null},{"section":"陈家院子","waterLevel":null},{"section":"忠县站","waterLevel":null},{"section":"曹溪河","waterLevel":null},{"section":"邓家沱","waterLevel":null},{"section":"新生","waterLevel":null},{"section":"野猫溪","waterLevel":null},{"section":"洋渡","waterLevel":null},{"section":"浊溪口","waterLevel":null},{"section":"鲤鱼沱","waterLevel":null},{"section":"高家镇","waterLevel":null},{"section":"白板溪","waterLevel":null},{"section":"弥陀湾","waterLevel":null},{"section":"郎溪","waterLevel":null},{"section":"丰都县","waterLevel":null},{"section":"丰都站","waterLevel":null},{"section":"黄桶碑","waterLevel":null},{"section":"毡帽石","waterLevel":null},{"section":"白银坪","waterLevel":null},{"section":"南沱场","waterLevel":null},{"section":"盐汉溪","waterLevel":null},{"section":"珍溪","waterLevel":null},{"section":"羊西坝","waterLevel":null},{"section":"大沱铺","waterLevel":null},{"section":"清溪场","waterLevel":null},{"section":"韩家沱","waterLevel":null},{"section":"郭家嘴","waterLevel":null},{"section":"涪陵站","waterLevel":null},{"section":"鸣羊嘴","waterLevel":null},{"section":"碧小溪","waterLevel":null},{"section":"李渡镇","waterLevel":null},{"section":"北拱","waterLevel":null},{"section":"盐井沟","waterLevel":null},{"section":"令牌丘","waterLevel":null},{"section":"石沱","waterLevel":null},{"section":"周家院子","waterLevel":null},{"section":"瓦罐","waterLevel":null},{"section":"长寿县","waterLevel":null},{"section":"长寿站","waterLevel":null},{"section":"唐家湾","waterLevel":null},{"section":"芝麻坪","waterLevel":null},{"section":"杨家湾","waterLevel":null},{"section":"婿家湾","waterLevel":null},{"section":"下刘家坪","waterLevel":null},{"section":"中湾","waterLevel":null},{"section":"木洞","waterLevel":null},{"section":"温家沱","waterLevel":null},{"section":"大塘坝","waterLevel":null},{"section":"弹子田","waterLevel":null},{"section":"广场坝","waterLevel":null},{"section":"郭家沱","waterLevel":null},{"section":"唐家沱","waterLevel":null},{"section":"生基塘","waterLevel":null},{"section":"寸滩站","waterLevel":null},{"section":"嘉陵江口下","waterLevel":null},{"section":"重庆站","waterLevel":null},{"section":"风水寺","waterLevel":null},{"section":"黄桶堡","waterLevel":null},{"section":"葛家岩","waterLevel":null},{"section":"郭家坪","waterLevel":null},{"section":"大渡口站","waterLevel":null},{"section":"茄子溪","waterLevel":null},{"section":"贾家湾","waterLevel":null},{"section":"滩河湾","waterLevel":null},{"section":"学塘堡","waterLevel":null},{"section":"白沙沱站","waterLevel":null},{"section":"猫儿峡站","waterLevel":null},{"section":"铜罐驿","waterLevel":null},{"section":"中山坝","waterLevel":null},{"section":"羊角滩","waterLevel":null},{"section":"花红堡","waterLevel":null}],
      tableColumns: [{"title":"断面","field":"section"},{"title":"水位","field":"waterLevel"}]
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
  width: 400px;
  height: 800px;
  overflow: auto;
}
</style>
