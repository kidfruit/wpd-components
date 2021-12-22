<template>
  <div class="disaster-info">
    <div class="disaster-info-tree">
      <a-tree
        :key="treeRandomKey"
        :treeData="treeData"
        :checkable="true"
        :defaultExpandAll="true"
      />
    </div>
    <div class="disaster-info-map"></div>
  </div>
</template>

<script>
import lodash from 'lodash'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'DisasterInfo',
  props: {
    disasterInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    this.copyDisasterInfo = lodash.cloneDeep(this.disasterInfo)
    return {
      treeData: [],
      treeRandomKey: uuidv4()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initTree()
    },
    initTree() {
      this.treeRandomKey = uuidv4()
      this.treeData = []
      this.copyDisasterInfo.dangerArea.forEach(item => {
        let children = []
        this.copyDisasterInfo.dangerList.forEach(val => {
          if (item === val.area) {
            children.push({
              title: val.name,
              key: val.id,
              ...val
            })
          }
        })
        this.treeData.push({
          title: item,
          key: item,
          children
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.disaster-info {
  width: 100%;
  height: 800px;
  .disaster-info-tree {
    width: 200px;
    height: 100%;
    text-align: left;
    padding: 25px;
    background: #f1f1f1;
  }
}
</style>