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
              style="font-size: 18px; font-weight: bold;"
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
                >
                  {{ val.name }}
                </div>
                <div
                  class="alert"
                  style="padding: 0 10px;"
                  :style="`color: ${val.showLevel}`"
                >
                  {{ val.showAlert }}
                </div>
                <div class="time">
                  [{{ val.showTime }}]
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
            let showTime = ''
            let showAlert = ''
            let showLevel = ''
            // console.log(val)
            if (val.maxWaterLevel >= val.guaranteeLevel) {
              showTime = val.maxWaterTime
              showAlert = `${val.maxWaterLevel}(m)`
              showLevel = 'red'
            } else if (val.maxWaterLevel < val.guaranteeLevel && val.maxWaterLevel >= val.alertLevel) {
              showTime = val.maxWaterTime
              showAlert = `${val.maxWaterLevel}(m)`
              showLevel = 'orange'
            } else {
              if (val.maxQLevel >= val.guaranteeQLevel) {
                showTime = val.maxQTime
                showAlert = `${val.maxQLevel}(m³/s)`
                showLevel = 'red'
              } else if (val.maxQLevel < val.guaranteeQLevel && val.maxQLevel >= val.alertQLevel) {
                showTime = val.maxQTime
                showAlert = `${val.maxQLevel}(m³/s)`
                showLevel = 'orange'
              } else {
                showTime = val.maxWaterTime
                showAlert = `${val.maxWaterLevel}(m)`
                showLevel = ''
              }
            }
            children.push({
              showTime,
              showAlert,
              showLevel,
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
      // console.log(this.treeData)
      this.regions = []
      this.treeData.forEach(item => {
        let temColor = ''
        item.children.forEach(val => {
          // console.log(val)
         temColor = temColor + val.showLevel
        })
        if (temColor.includes('red')) {
          this.regions.push({
            name: item.title,
            label: {
              show: true
            },
            itemStyle: {
              areaColor: 'red',
            }
          })
        } else {
          if (temColor.includes('orange')) {
            this.regions.push({
              name: item.title,
              label: {
                show: true
              },
              itemStyle: {
                areaColor: 'orange',
              }
            })
          }
        }

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