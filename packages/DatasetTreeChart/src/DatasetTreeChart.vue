<template>
  <div :class="['dataset-tree-chart-container', className]">
    <div id="dataset-tree-chart"/>
    <a-modal
      v-model="nodeInfoCurveModal"
      :footer="null"
      :width="650"
    >
      <div id="nodeInfoCurve" style="width: 600px;height: 300px;margin: 0 auto"/>
    </a-modal>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import lodash from 'lodash'
// import WPStationRR from './images/WPStationRR.png'
// import WPStationZQ from './images/WPStationZQ.png'
const WPStationRR = 'data:image/png;base64,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'
const WPStationZQ = 'data:image/png;base64,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'
export default {
  name: 'DatasetTreeChart',
  props: {
    className: {
      type: String,
      required: false
    },
    treeChartData: {
      type: Object,
      required: true
    },
    leftPosition: {
      type: Object,
      default: () => {
        return {
          left: '10%',
          right: '70%',
          top: 0,
          bottom: 0,
        }
      }
    },
    rightPosition: {
      type: Object,
      default: () => {
        return {
          left: '31%',
          right: '30%',
          top: 0,
          bottom: 0,
        }
      }
    }
  },
  data() {
    this.leftDatasetTree = {}
    this.rightDatasetTree = {}
    this.imageDataURL = null
    this.nodeInfoCurveId = []
    return {
      nodeInfoCurveModal: false,
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    treeChartData: {
      deep: true,
      handler: () => {
        this.init()
      }
    }
  },
  methods: {
    init() {
      this.initData()
      this.initDatasetTreeData()
      this.initDatasetTreeChart()
    },
    initData() {
      /** 组织 imageDataURL */
      if (this.treeChartData.nodeType === 'WPStationRR') {
        this.imageDataURL = WPStationRR
      } else {
        this.imageDataURL = WPStationZQ
      }

      /** 组织右边 nodeInfoCurveId */
      this.nodeInfoCurveId = []
      let nodeInfoCurveId_value = []
      if (this.treeChartData.curveInfo) {
        Object.values(this.treeChartData.curveInfo).forEach(item => {
          nodeInfoCurveId_value.push(item[0].id)
        })
      }
      if (this.treeChartData.nodeInfo) {
        let tempObj = {}
        let copyNodeInfoData = lodash.cloneDeep(this.treeChartData.nodeInfo.data)
        Object.keys(copyNodeInfoData).forEach(item => {
          tempObj[item] = { temp: copyNodeInfoData[item] }
        })
        nodeInfoCurveId_value.forEach(item => {
          this.nodeInfoCurveId.push(lodash.findKey(tempObj, { temp: item }))
        })
      }
    },
    initDatasetTreeData() {
      let copyTreeChartData = lodash.cloneDeep(this.treeChartData)

      /** 组织右边数据 nodeInfo */
      // console.log(copyTreeChartData)
      let rightDatasetTreeChildren = []
      if (this.treeChartData.nodeInfo) {
        copyTreeChartData.nodeInfo.columns.forEach(item => {
          let value = copyTreeChartData.nodeInfo.data[item.key]
          if (this.nodeInfoCurveId.includes(item.key)) {
            rightDatasetTreeChildren.push({
              name: item.title,
              value,
              key: item.key,
              symbol: 'diamond'
            })
          } else {
            if (value === '') {
              rightDatasetTreeChildren.push({
                name: item.title,
                value,
                key: item.key,
                symbol: 'emptyCircle'
              })
            } else {
              rightDatasetTreeChildren.push({
                name: item.title,
                value,
                key: item.key,
                symbol: 'circle'
              })
            }
          }
        })
        this.rightDatasetTree = {
          name: copyTreeChartData.nodeInfo.data.name,
          symbol: 'none',
          children: rightDatasetTreeChildren
        }
      } else {
        this.rightDatasetTree = {
          name: copyTreeChartData.nodeTopo.data.nodeName,
          symbol: 'none',
          children: rightDatasetTreeChildren
        }
      }

      /** 组织左边数据  */
      this.leftDatasetTree = {
        name: '',
        symbol: `image://${this.imageDataURL}`,
        children: []
      }
      if (this.treeChartData.nodeTopo) {
        this.leftDatasetTree.children = [
          {
            name: '指向节点',
            key: 'flowId',
            symbol: 'diamond'
          },
          {
            name: '下级节点',
            key: 'downId',
            symbol: 'diamond'
          }
        ]
        this.leftDatasetTree.children.forEach(item => {
          item.value = this.treeChartData.nodeTopo.data[item.key]
        })
      }
    },
    initDatasetTreeChart() {
      const datasetTreeChartDom = document.getElementById('dataset-tree-chart')
      const datasetTreeChart = echarts.init(datasetTreeChartDom)
      datasetTreeChart.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'click',
          formatter: (params) => {
            // console.log(params)
            if (!params.data.key) {
              return ''
            } else {
              if (this.nodeInfoCurveId.includes(params.data.key)) {
                this.nodeInfoCurveModal = true
                this.$nextTick(() => {
                  this.initNodeInfoCurve(params.data)
                })
                return ''
              } else if (params.data.key === 'flowId') {
                // console.log('指向节点', params)
                this.$emit('clickFlowId', {
                  flowId: this.treeChartData.nodeTopo.data.flowId,
                  nodeType: this.treeChartData.nodeTopo.data.nodeType
                })
                return ''
              } else if (params.data.key === 'downId') {
                // console.log('下级节点')
                this.$emit('clickDownId', {
                  downId: this.treeChartData.nodeTopo.data.downId,
                  nodeType: this.treeChartData.nodeTopo.data.nodeType
                })
                return ''
              } else {
                return ''
              }
            }
          }
        },
        series: [
          {
            type: 'tree',
            name: 'leftDatasetTree',
            data: [this.leftDatasetTree],
            symbolSize: 32,
            orient: 'RL',
            edgeShape: 'polyline',
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
              fontSize: 18,
            },
            leaves: {
              label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right'
              }
            },
            emphasis: {
              focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750,
            ...this.leftPosition,
          },
          {
            type: 'tree',
            name: 'rightDatasetTree',
            data: [this.rightDatasetTree],
            symbolSize: 20,
            orient: 'LR',
            edgeShape: 'polyline',
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
              fontSize: 20,
              formatter: (params) => {
                if (params.data.value === '') {
                  return `${params.data.name}:    暂无数据`
                } else if (this.nodeInfoCurveId.includes(params.data.key)) {
                  return params.data.name
                } else if (!params.data.key) {
                  return params.data.name
                } else {
                  return `${params.data.name}:    ${params.data.value}`
                }
              }
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            expandAndCollapse: true,
            emphasis: {
              focus: 'descendant'
            },
            animationDuration: 550,
            animationDurationUpdate: 750,
            ...this.rightPosition
          }
        ]
      })
    },
    initNodeInfoCurve(tooltip) {
      let copyCurveInfo = lodash.cloneDeep(this.treeChartData.curveInfo)
      let currentCurveInfoData = null
      Object.values(copyCurveInfo).forEach(item => {
        if (tooltip.value === item[0].id) {
          currentCurveInfoData = item[0]
        }
      })
      let nodeInfoCurveChartLegend = []
      let nodeInfoCurveChartYAxis = []
      let nodeInfoCurveChartXAxis = []
      let nodeInfoCurveChartSeries= []
      currentCurveInfoData.field.forEach((item, index) => {
        nodeInfoCurveChartLegend.push(currentCurveInfoData.title[0][item])
        nodeInfoCurveChartYAxis.push({
          type: 'value',
          name: currentCurveInfoData.title[0][item],
          yAxisIndex: index
        })
        let seriesData = []
        currentCurveInfoData.data.forEach((val, key) => {
          seriesData.push(val[item])
          nodeInfoCurveChartXAxis.push(key)
        })
        nodeInfoCurveChartSeries.push({
          type: 'line',
          name: currentCurveInfoData.title[0][item],
          yAxisIndex: index,
          data: seriesData
        })
      })
      const nodeInfoCurveDom = document.getElementById('nodeInfoCurve')
      const nodeInfoCurveChart = echarts.init(nodeInfoCurveDom)
      // console.log(nodeInfoCurveChartLegend)
      nodeInfoCurveChart.setOption({
        title: {
          text: currentCurveInfoData.name
        },
        legend: {
          data: nodeInfoCurveChartLegend,
          left: '40%'
        },
        tooltip: {
          trigger: 'axis',
          triggerOn: 'mousemove'
        },
        grid: {
          bottom: 10,
          containLabel: true
        },
        data: currentCurveInfoData.data,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: lodash.uniq(nodeInfoCurveChartXAxis),
        },
        yAxis: nodeInfoCurveChartYAxis,
        series: nodeInfoCurveChartSeries
      })
    },
    /**
     * url转base64
     * @param {String} url - url地址
     */
    urlToBase64(url) {
      return new Promise ((resolve,reject) => {
        let image = new Image()
        image.onload = function() {
          let canvas = document.createElement('canvas')
          canvas.width = this.naturalWidth
          canvas.height = this.naturalHeight
          // 将图片插入画布并开始绘制
          canvas.getContext('2d').drawImage(image, 0, 0)
          // result
          let result = canvas.toDataURL('image/png')
          resolve(result)
        };
        // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
        image.setAttribute("crossOrigin",'Anonymous')
        image.src = url
        // 图片加载失败的错误处理
        image.onerror = () => {
          reject(new Error('转换失败'))
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.dataset-tree-chart-container {
  width: 100%;
  height: 100%;
  #dataset-tree-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
