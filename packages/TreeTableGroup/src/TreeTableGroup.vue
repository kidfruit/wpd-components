<template>
  <div :class="classNames">
    <div class="tree-container" :style="treeStyle">
      <a-tree
        v-model="checkedNode"
        :treeData="treeData"
        defaultExpandAll
        :checkable = "isEdit"
        @check="_onTreeCheck"
      />
    </div>
    <div class="table-container" :style="tableStyle">
      <MultiOptionTable
        ref="tableRef"
        :setting="setting"
        :tableData="m_tableData"
        :tableColumns="tableColumns"
        :isEdit = "isEdit"
        @cellEditDone="_cellEditDone"
      />
    </div>
  </div>
</template>
<script>
import MultiOptionTable from '../../MultiOptionTable/src/MultiOptionTable.vue'

const treeToList = (tree, list) => {
  if (tree instanceof Array) {
    for (let i = 0; i < tree.length; i++) {
      const element = tree[i]
      list.push(element)
      if (element.children instanceof Array && element.children.length > 0) {
        treeToList(element.children, list)
      }
    }
  } else {
    return []
  }
}
export default {
  components: {
    // StandardChart,
    MultiOptionTable,
  },
  name: 'TreeTableGroup',
  props: {
    setting: {
      type: Object,
      required: false,
    },
    classes: {
      type: Array,
    },
    treeData: {
      type: Array,
      required: true,
    },
    isRefresh: {
      type: Boolean,
      default() {
        return true
      },
    },
    tableColumns: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
    treeStyle: {
      type: Object || String,
      default() {
        return undefined
      },
    },
    tableStyle: {
      type: Object || String,
      default() {
        return undefined
      },
    },
    isEdit:{
      type:Boolean,
      default(){
        return true
      }
    }
  },
  data() {
    return {
      checkedNode: [],
      defaultTableData: []
    }
  },
  // created() {
  //   this.initDefaultData()
  // },
  computed: {
    classNames() {
      return ['tree-table-group'].concat(this.classes)
    },
    m_tableData() {
      return this.defaultTableData.filter((i) => i.selected)
    },
  },
  methods: {
    initDefaultData() {
      /**
       * 初始化进来先选中所有 treeNode
       */
      let list = []
      treeToList(this.treeData, list)
      // console.log(list)
      this.checkedNode = list.map((i) => i.key)
      /**
       * 讲数据备份一次并加入selected参数
       */
      this.defaultTableData = JSON.parse(JSON.stringify(this.tableData)).map(
          (i) => ({
            ...i,
            selected: true,
          })
      )
    },
    _cellEditDone(value) {
      // console.log(value)
      const { field, newValue, oldValue, rowIndex } = value
      const m_tableData = this.defaultTableData
      let group
      let selectedId = ''
      let options = m_tableData[value.rowIndex][value.field].options
      for (let i = 0; i < options.length; i++) {
        if (options[i].name == value.newValue) {
          group = options[i].group
          selectedId = options[i].id
        }
      }
      if (group) {
        for (let k = 0; k < m_tableData.length; k++) {
          let select = m_tableData[k][value.field].options
          for (let j = 0; j < select.length; j++) {
            if (select[j].id == selectedId) {
              m_tableData[k][value.field].selectedId = selectedId
            }
          }
        }
      } else {
        for (let k = 0; k < m_tableData.length; k++) {
          let oldSelectedID = m_tableData[k][value.field].selectedId
          let select = m_tableData[k][value.field].options
          let groupfalse = []
          let grouptrue = []
          let currentSelectedTrueOrFalse
          if (select.length > 0) {
            for (let j = 0; j < select.length; j++) {
              if (!select[j].group) {
                groupfalse.push(select[j])
              } else {
                grouptrue.push(select[j])
              }

              if (select[j].id === oldSelectedID) {
                currentSelectedTrueOrFalse = select[j].group
              }
            }

            // console.log(currentSelectedTrueOrFalse)
            // console.log(field, rowIndex, newValue, oldValue, k)
            if (currentSelectedTrueOrFalse) {
              if (rowIndex !== k) {
                m_tableData[k][value.field].selectedId = groupfalse[0].id
              } else {
                // console.log(m_tableData[k][value.field])
                // console.log('----------------')
                for (let i = 0; i < m_tableData[k][value.field].options.length; i++) {
                  if (m_tableData[k][value.field].options[i].name === newValue) {
                    m_tableData[k][value.field].selectedId = m_tableData[k][value.field].options[i].id
                  }
                }
              }
            } else {
              if (rowIndex === k) {
                // console.log('--------123123')
                for (let i = 0; i < m_tableData[k][value.field].options.length; i++) {
                  if (m_tableData[k][value.field].options[i].name === newValue) {
                    m_tableData[k][value.field].selectedId = m_tableData[k][value.field].options[i].id
                  }
                }
              }
            }


            // if (groupfalse.length > 0) {
            //   m_tableData[k][value.field].selectedId = groupfalse[0].id
            //   // for (let i = 0; i < groupfalse.length; i++) {
            //   //   if (selectedId ===  groupfalse[i].id) {
            //   //     m_tableData[k][value.field].selectedId = groupfalse[i].id
            //   //   }
            //   // }
            // } else {
            //   m_tableData[k][value.field].selectedId = grouptrue[0].id
            // }
          }
        }
      }
      this.$emit('cellEditDone', this.defaultTableData)
    },
    synchronization(originaldata, choice) {
      let selectedId = ''
      let options = originaldata[choice.rowIndex][choice.field].options
      for (let i = 0; i < options.length; i++) {
        if (options[i].name == choice.newValue) {
          selectedId = options[i].id
        }
      }
      for (let k = 0; k < originaldata.length; k++) {
        let select = originaldata[k][choice.field].options
        for (let j = 0; j < select.length; j++) {
          if (select[j].id == selectedId) {
            originaldata[k][choice.field].selectedId = selectedId
          }
        }
      }
      this.m_tableData = originaldata
    },
    _onTreeCheck(checkedKeys, { checked, checkedNodes, node, event }) {
      let keys = []
      for (let i = 0; i < checkedNodes.length; i++) {
        if (!checkedNodes[i].data.props.dataRef.children) {
          keys.push(checkedNodes[i].key)
        }
      }
      this.$emit('checkedKeys', keys)
      this.defaultTableData.map((i) => {
        i.selected = checkedKeys.includes(i.nodeId)
        return i
      })
    },
    /**
     * 暴露的方法
     */
    getTableData() {
      return this.m_tableData
    },
    highlightRow(value) {
      this.$refs['tableRef'].highlightRow(value)
    },
    refresh() {
      //适用于父节点宽度变化的情况
      this.$refs['tableRef'].refresh()
    },
    render() {
      //刷新table
      this.$refs['tableRef'].render()
    },
    changeCheckedTreeData(val) {
      this.checkedNode = val
    }
  },
  watch: {
    checkedNode: {
      immediate: true,
      deep: true,
      handler(val) {
        this.defaultTableData.map((i) => {
          i.selected = val.includes(i.nodeId)
          return i
        })
      },
    },
    tableData: {
      immediate: true,
      deep: true,
      handler() {
        this.initDefaultData()
      },
    }
  },
}
</script>
<style scoped lang="scss">
.tree-table-group {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  text-align: left;

  .tree-container {
    flex: 0 0 auto;
    width: 15%;
    overflow: auto;
  }

  .table-container {
    flex: 0 0 auto;
    width: 85%;
    overflow: hidden;
    height: 100%;
  }
}
</style>
