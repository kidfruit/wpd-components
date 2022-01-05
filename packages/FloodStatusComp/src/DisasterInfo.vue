<template>
  <div class="disaster-info">
    <div class="disaster-info-tree-container">
      <div class="disaster-info-title">
        预警区域
      </div>
      <a-tree
        class="disaster-info-tree"
        :key="treeRandomKey"
        :defaultExpandAll="true"
      >
        <a-tree-node
          v-for="item in treeData"
          :key="item.key"
        >
          <template slot="title">
            <div
              class="province-name"
              :style="provinceName(item)"
            >
              {{ item.title }}
            </div>
          </template>
          <a-tree-node
            v-for="val in item.children"
            :key="val.key"
          >
            <template slot="title">
              <div
                class="hydrological-station-name"
                style="display: flex"
              >
                <div
                  class="title"
                  :style="hydrologicalStationTitle(val)"
                >
                  {{ val.name }}
                </div>
                <div
                  class="alarm"
                  style="padding: 0 10px"
                >
                  超警{{ val.maxWaterLevel }}（m）
                </div>
                <div class="time">
                  [{{ val.maxWaterTime }}]
                </div>
              </div>
            </template>
          </a-tree-node>
        </a-tree-node>
      </a-tree>
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
      treeDefaultCheckedKeys: [],
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
      this.treeDefaultCheckedKeys = this.copyDisasterInfo.dangerArea
      this.treeRandomKey = uuidv4()
      this.treeData = []
      this.copyDisasterInfo.dangerArea.forEach(item => {
        let children = []
        this.copyDisasterInfo.dangerList.forEach(val => {
          if (item === val.area) {
            children.push({
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
      this.regions = []
      this.treeData.forEach(item => {
        item.children.forEach(val => {
          if (val.maxWaterLevel >= val.guaranteeLevel) {
            this.regions.push({
              name: item.title,
              label: {
                show: true
              },
              itemStyle: {
                areaColor: 'red'
              }
            })
          }
          if (val.maxWaterLevel < val.guaranteeLevel && val.maxWaterLevel >= val.alertLevel) {
            this.regions.push({
              name: item.title,
              label: {
                show: true
              },
              itemStyle: {
                areaColor: 'orange'
              }
            })
          }
        })
      })
      // console.log(this.regions)
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
            areaColor: 'lightblue',
            emphasis: {
              show: false,
              areaColor: 'lightgreen'
            }
          },
        },
      }
      mapChart.setOption(option)
    },
    provinceName(item) {
      let style = 'font-size: 18px; font-weight: bold; '
      let tempStyle = ''
      item.children.forEach(val => {
        if (val.maxWaterLevel >= val.guaranteeLevel) {
          tempStyle = 'color: red;'
        } else if (val.maxWaterLevel < val.guaranteeLevel && val.maxWaterLevel >= val.alertLevel) {
          tempStyle = 'color: orange;'
        } else {
          tempStyle = ''
        }
      })
      if (tempStyle.includes('red')) {
        return style + 'color: red;'
      } else {
        if (tempStyle.includes('orange')) {
          return style + 'color: orange;'
        } else {
          return style
        }
      }
    },
    hydrologicalStationTitle(val) {
      let style = 'font-size: 16px; font-weight: bold; '
      if (val.maxWaterLevel >= val.guaranteeLevel) {
        style =  style + 'color: red;'
      } else if (val.maxWaterLevel < val.guaranteeLevel && val.maxWaterLevel >= val.alertLevel) {
        style = style + 'color: orange;'
      } else {
        style = style + ''
      }
      return style
    }
  }
}
</script>

<style lang="less" scoped>
.disaster-info {
  width: 100%;
  height: 800px;
  display: flex;
  .disaster-info-tree-container {
    width: 400px;
    height: 100%;
    text-align: left;
    padding: 25px;
    background: #f1f1f1;
    .disaster-info-title {
      padding: 10px;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .disaster-info-tree {
      width: 100%;
      height: calc(100% - 50px);
      overflow: auto;
    }
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