<template>
  <div :class="classNames">
    <div class="tree-container" :style="treeStyle">
      <a-tree v-model="checkedNode" :treeData="treeData" defaultExpandAll checkable @check="_onTreeCheck" />
    </div>
    <div class="table-container" :style="tableStyle">
        <SimpleTable ref="tableRef" :tableData="m_tableData" :tableColumns="tableColumns" @cellEditDone="_cellEditDone" />
      <!-- <MultiOptionTable ref="tableRef" :tableData="m_tableData" :tableColumns="tableColumns" @cellEditDone="_cellEditDone" /> -->
    </div>
  </div>
</template>
<script>
import lodash from 'lodash'
import SimpleTable from '../../SimpleTable/src/SimpleTable.vue';
const treeToList = (tree, list) => {
  if (tree instanceof Array) {
    for (let i = 0; i < tree.length; i++) {
      const element = tree[i];
      list.push(element);
      if (element.children instanceof Array && element.children.length > 0) {
        treeToList(element.children, list);
      }
    }
  } else {
    return [];
  }
};
export default {
  components: {
    // StandardChart,
    SimpleTable
  },
  name: 'TreeSimpleTableGroup',
  props: {
    classes: {
      type: Array
    },
    treeData: {
      type: Array,
      required: true
    },
    isRefresh: {
      type: Boolean,
      default() {
        return true;
      }
    },
    tableColumns: {
      type: Array
    },
    tableData: {
      type: Array
    },
    treeStyle: {
      type: Object || String,
      default() {
        return undefined;
      }
    },
    tableStyle: {
      type: Object || String,
      default() {
        return undefined;
      }
    }
  },
  data() {
    return { checkedNode: [], defaultTableData: [] };
  },

  created() {
    /**
     * 初始化进来先选中所有 treeNode
     */
    let list = [];
    treeToList(this.treeData, list);
    this.checkedNode = list.map(i => i.key);
    /**
     * 讲数据备份一次并加入selected参数
     */
    this.defaultTableData = lodash.cloneDeep(this.tableData).map(i => ({
      ...i,
      selected: true
    }));
  },
  computed: {
    classNames() {
      return ['tree-table-group'].concat(this.classes);
    },
    m_tableData() {
      return this.defaultTableData.filter(i => i.selected);
    }
  },
  methods: {
    _cellEditDone(value) {
      const { field, newValue, oldValue, rowIndex } = value;
      if (this.defaultTableData[rowIndex][field] instanceof Object && this.defaultTableData[rowIndex][field].selectedId) {
        this.defaultTableData[rowIndex][field].selectedId = this.defaultTableData[rowIndex][field].options.find(i => i.name === newValue).id;
      } else {
        this.defaultTableData[rowIndex][field] = newValue;
      }
    },
    _onTreeCheck(checkedKeys, { checked, checkedNodes, node, event }) {
        this.$emit("checkedKeys", checkedKeys)
      this.defaultTableData.map(i => {
        i.selected = checkedKeys.includes(i.nodeId);
        return i;
      });
      
    },
    /**
     * 暴露的方法
     */
    getTableData() {
      return this.m_tableData;
    }
  }
};
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
    width: 20%;
    overflow: auto;
  }
  .table-container {
    flex: 0 0 auto;
    width: 80%;
    overflow: auto;
    // overflow: hidden;
    height: 100%;
  }
}
</style>
