<template>
  <div :class="['dataset-tree-chart-container', className]">
    <div id="dataset-tree-chart"/>
    <canvas id="canvas111"></canvas>
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
import WPStationRR from './images/WPStationRR.png'
import WPStationZQ from './images/WPStationZQ.png'
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
          left: '32%',
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
  created() {
    /** 组织右边 nodeInfoCurveId */
    let nodeInfoCurveId_value = []
    Object.values(this.treeChartData.curveInfo).forEach(item => {
      nodeInfoCurveId_value.push(item[0].id)
    })
    this.nodeInfoCurveId = []
    let tempObj = {}
    let copyNodeInfoData = lodash.cloneDeep(this.treeChartData.nodeInfo.data)
    Object.keys(copyNodeInfoData).forEach(item => {
      tempObj[item] = { temp: copyNodeInfoData[item] }
    })
    nodeInfoCurveId_value.forEach(item => {
      this.nodeInfoCurveId.push(lodash.findKey(tempObj, { temp: item }))
    })
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
    async init() {
      if (this.treeChartData.nodeTopo.data.nodeType === 'WPStationRR') {
        this.imageDataURL = await this.urlToBase64(WPStationRR)
      } else {
        this.imageDataURL = await this.urlToBase64(WPStationZQ)
      }
      this.initDatasetTreeData()
      this.initDatasetTreeChart()
    },
    initDatasetTreeData() {
      let copyTreeChartData = lodash.cloneDeep(this.treeChartData)

      /** 组织右边数据 nodeInfo */
      // console.log(copyTreeChartData)
      let rightDatasetTreeChildren = []
      copyTreeChartData.nodeInfo.columns.forEach(item => {
        if (this.nodeInfoCurveId.includes(item.key)) {
          rightDatasetTreeChildren.push({
            name: item.title,
            value: copyTreeChartData.nodeInfo.data[item.key],
            key: item.key,
            symbol: 'diamond'
          })
        } else {
          rightDatasetTreeChildren.push({
            name: item.title,
            value: copyTreeChartData.nodeInfo.data[item.key],
            key: item.key
          })
        }
      })
      this.rightDatasetTree = {
        name: copyTreeChartData.nodeInfo.data.name,
        symbol: 'none',
        children: rightDatasetTreeChildren
      }

      /** 组织左边数据  */
      this.leftDatasetTree = {
        name: '',
        symbol: `image://${this.imageDataURL}`,
        children: [
          {
            name: '指向节点',
            key: 'flowId',
            symbol: 'diamond'
          },
          {
            name: '下级节点',
            key: 'downId',
            symbol: 'diamond'
          },
        ]
      }
      this.leftDatasetTree.children.forEach(item => {
        item.value = this.treeChartData.nodeTopo.data[item.key]
      })
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
                console.log('指向节点')
                this.$emit('clickFlowId')
                return ''
              } else if (params.data.key === 'downId') {
                console.log('下级节点')
                this.$emit('clickDownId')
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
              symbolSize: 12,
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
            edgeForkPosition: '30%',
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
