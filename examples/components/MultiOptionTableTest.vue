<template>
  <div style="width: 100%">
    <div class="table">
      <multiOption-Table ref="tableChart"
                         :tableData="tableData"
                         :tableColumns="tableColumns"
                         @cellEditDone="cellEditDone"></multiOption-Table>
    </div>

    <button @click="selecData">点击选中</button>
    <button @click="getData">获取数据</button>
    <button @click="getChangedData">获取编辑数据</button>
    <button @click="reset">重置</button>
  </div>
</template>
<script>
import MultiOptionTable from '../../packages/MultiOptionTable/src/MultiOptionTable.vue'

export default {
  name: 'MultiOptionTableText',
  components: { MultiOptionTable },
  data() {
    return {
      visible: true,
      classNames: ['testTable'],
      setting: {},
      tableData: [
        {
          nodeId: '11',
          nodeName: '乌东德',
          nodeType: 'WPStationRR',
          nodeTypeName: '水库',
          key: '11',
          flow1: {
            key: 'RR-null-NORMAL',
            title: '——',
            order: 1,
            selectedId: 'FD_NULL',
            options: [
              {
                id: 'FD_NULL',
                name: '——',
                modelParamId: null,
              },
            ],
          },
          flow2: {
              group:true,
            key: 'RR-dsp-NORMAL',
            title: '防洪调度',
            order: 2,
            selectedId: 'RD_DISQCTRL',
            options: [
              {
                id: 'RD_DISQCTRL',
                name: '调洪演算模型1',
                modelParamId: null,
              },
              {
                id: 'FR_RHLAGTM',
                name: '滞时演算模型2',
                modelParamId: null,
              },
              {
                id: 'RD_CTRLDSP',
                name: '混合控制1',
                modelParamId: null,
              },
            ],
          },
          flow3: {
            key: 'RR-assess-NORMAL',
            title: '分析评估',
            order: 3,
            selectedId: 'FD_DSPASS',
            options: [
              {
                id: 'FD_DSPASS',
                name: '调度评估',
                modelParamId: null,
              },
            ],
          },
        },
        {
          nodeId: 'RCH301',
          nodeName: '乌东德-白鹤滩',
          nodeType: 'WPRiverReach',
          nodeTypeName: '河段',
          key: 'RCH301',
          flow1: {
            key: 'RCH-restore-NORMAL',
            title: '区间还原',
            order: 1,
            selectedId: 'FD_NULL',
            options: [
              {
                id: 'FD_NULL',
                name: '——',
                modelParamId: null,
              },
            ],
          },
          flow2: {
              group:true,
            key: 'RCH-flow-NORMAL',
            title: '河道演算',
            order: 2,
            selectedId: 'FR_RHLAGTM',
            options: [
              {
                id: 'FR_RHLAGTM',
                name: '滞时演算模型2',
                modelParamId: null,
              },
              {
                id: 'FR_RHMSK',
                name: '马斯京根模型2',
                modelParamId: null,
              },
            ],
          },
        },
        {
          nodeId: '12',
          nodeName: '白鹤滩',
          nodeType: 'WPStationRR',
          nodeTypeName: '水库',
          key: '12',
          flow1: {
            key: 'RR-null-NORMAL',
            title: '——',
            order: 1,
            selectedId: 'FD_NULL',
            options: [
              {
                id: 'FD_NULL',
                name: '——',
                modelParamId: null,
              },
            ],
          },
          flow2: {
              group:true,
            key: 'RR-dsp-NORMAL',
            title: '防洪调度',
            order: 2,
            selectedId: 'RD_DISQCTRL',
            options: [
              {
                id: 'RD_DISQCTRL',
                name: '调洪演算模型3',
                modelParamId: null,
              },
              {
                id: 'FR_RHLAGTM',
                name: '滞时演算模型2',
                modelParamId: null,
              },
              {
                id: 'RD_CTRLDSP',
                name: '混合控制',
                modelParamId: null,
              },
            ],
          },
          flow3: {
            key: 'RR-assess-NORMAL',
            title: '分析评估',
            order: 3,
            selectedId: 'FD_DSPASS',
            options: [
              {
                id: 'FD_DSPASS',
                name: '调度评估',
                modelParamId: null,
              },
            ],
          },
        },
      ],
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
    }
  },
  methods: {
    selecData() {
        this.$refs['tableChart'].highlightRow('RCH301')
    //   this.$refs['tableChart']._selectkey('RCH301')
    },
    getData() {
      console.log(this.$refs.tableChart.hotInstance.getData())
      //console.log(this.$refs.tableChart.getEditColumnField());
    },
    reset() {
      this.$refs.tableChart.reset()
    },
    getChangedData() {
      console.log(
        '按钮点击',
        this.$refs.tableChart.editCells,
        this.$refs.tableChart.editRows
      )
    },
    cellEditDone(value) {
      const { field, newValue, oldValue, rowIndex } = value
      if (
        this.tableData[rowIndex][field] instanceof Object &&
        this.tableData[rowIndex][field].selectedId
      ) {
        this.tableData[rowIndex][field].selectedId = this.tableData[rowIndex][
          field
        ].options.find((i) => i.name === newValue).id
      } else {
        this.tableData[rowIndex][field] = newValue
      }
    //   console.log(this.tableData)
    },
  },
}
</script>
<style scoped lang="scss">
.table {
  width: 100%;
  height: 300px;
}
</style>
