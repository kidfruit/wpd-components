<template>
  <div class="disaster-info">
    <div class="disaster-info-tree">
      <a-tree
        :key="treeRandomKey"
        :treeData="treeData"
        :checkable="true"
        :defaultExpandAll="true"
        @check="handleCheckTreeNode"
      />
    </div>
    <div class="disaster-info-map">
      <div class="map" id="map" :key="mapRandomKey"/>
    </div>
  </div>
</template>

<script>
import lodash from 'lodash'
import * as echarts from 'echarts'
import { v4 as uuidv4 } from 'uuid'
import china from './china.json'
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
    this.checkedProvince = []
    this.regions = []
    return {
      treeData: [],
      treeRandomKey: uuidv4(),
      mapRandomKey: uuidv4()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initTree()
      this.initMap()
    },
    initTree() {
      this.treeRandomKey = uuidv4()
      this.treeData = []
      this.copyDisasterInfo.dangerArea.forEach(item => {
        let children = []
        this.copyDisasterInfo.dangerList.forEach(val => {
          if (item === val.area) {
            children.push({
              title: `${val.name} ${val.maxWaterLevel} [${val.maxWaterTime}]`,
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
    },
    initMap() {
      echarts.registerMap('china', china)
      let mapChartDom = document.getElementById('map')
      let mapChart = echarts.init(mapChartDom)
      let option = {
        geo: {
          regions: this.regions,
          map: 'china',
          aspectScale: 1,
          zoom: 1.25,
          itemStyle: {
            emphasis: {
              show: false,
              areaColor: '#87cefa'
            }
          },
        },
      }
      mapChart.setOption(option)
    },
    handleCheckTreeNode(checkedKeys, e) {
      // console.log(checkedKeys, e)
      this.checkedProvince = []
      this.copyDisasterInfo.dangerArea.forEach(item => {
        for (let i = 0; i < checkedKeys.length; i++) {
          if (item === checkedKeys[i]) {
            this.checkedProvince.push(item)
          }
        }
      })
      console.log(this.checkedProvince)
      this.regions = []
      this.checkedProvince.forEach(item => {
        this.regions.push({
          name: item,
          itemStyle: {
            areaColor: 'orange'
          }
        })
      })
      this.mapRandomKey = uuidv4()
      this.$nextTick(() => {
        this.initMap()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.disaster-info {
  width: 100%;
  height: 800px;
  display: flex;
  .disaster-info-tree {
    width: 400px;
    height: 100%;
    text-align: left;
    padding: 25px;
    background: #f1f1f1;
  }
  .disaster-info-map {
    width: calc(100% - 400px);
    height: 100%;
    padding: 25px;
    .map {
      width: 100%;
      height: 100%;
    }
  }
}
</style>