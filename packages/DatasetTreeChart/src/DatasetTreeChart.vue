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
const WPStationRR = 'data:image/png;base64,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'
const WPStationZQ = 'data:image/png;base64,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'
const WPFloodDetentionArea = 'data:image/png;base64,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'
const WPRiver = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABI1JREFUeF7tVmtMW2UYfk57elp6gdILZYpkgojZwjC6ICj+mItLdHGRzcgiUUOimZuaGIhashgw3tjCVIxZ4i06LQlkydimU+cSRY1m6giXRnQYBWcYQsulpxfanp7zmVPmBgwErZycpN/3rznf+77P+7zP835lkOaHSfP+QQmgCkhzBqgF0lwAdAlSC1ALpDkD1AJpLgD6ClALUAukOQPUAmkuAPoKUAtQC6Q5A9QCaS4A+gpQC1ALpMjARFBs+mYw3tgzLGDYL0KSCApdLOq2WkrNeqY/xfSrHp6SBcamxf4tzf6Svt4YoGcAAwNIAIISau4yo+1RW0r5V7174L8vQUKIY+v+Cd/HX0VQu82CHWUGFOawiAoE7nYeJ7sieLo2C/uqs1aFhFCMbDBx+IlhGCEVopYEJ0+Xj0olRbm6Re80Hw8S98GpRSc9FRabNj030dj7Ywxv1dnw8CbT/0YCIUT3dlc43nI8BL2Owc5bjLijVA+HReO/ys46/y0ZlwHrPBMhr5wIo/+PBKaDImoqjdhXk+nPs11KzhPiWPf4mE+IEwwccHXaLZrtCwsPjgqkfK8PegODsy3O7ZlGtnM5cKe8UdL6SQgxAXjkdhN2lGXMw3eyL0pePBrEl9/PwOxiwbEMJs8nkjq2OrR4Y5cV1eXGeTH+oHTknD9RNcaLEAVgXT6LgpxLQ714WZZUy0fBvqY2HmCByvV6SAT49ococvNYtNZmJZPLzT/fzvv2vx/AE/dl4tX7rUtO190RIM2HAmh/xoGdFfOBLSTjpWM8afDwQOLCFz0D991mrHVqk7Y60RPDqdMzAMvgwc1GNN5jgYnTeA9/N1PSPSzg8OkZhIISivJ1IHOST4YlTE6IQERK7ieDTYs3d1vxwK2zqrwI/tc/BVL85DjW2rT44LFsVBTJWw14/bMQcXt4hMIiam4zYWAkgZ6eKIqKOXzaYEeha3GLyLEDIwIprRtDSSGH7hec3FJ+rW8LkAOeAK4t5vDO7mzIHVS3TuL87wKgYZK/YWRQdXMG6u80o7J4Ftvc8/XPMeJuC2CEl6CRY+RDAFcWg/V5uuR+0rGAlgHuLc/wX3lB0fMSdQ1ESYGLFfLtLDc3+ZmhOKl5bRJnhwRwZg32bDGhYZvF67JqNywn6z3vTZODHTyaHrJi12aTd82CmDpPgLzsCaBsowFH6+3eK7Jncw75EqT7NyE5IvlpLchhsbGAW3aXyMt5LiaGYfz/hHHZhH8Hy+/94Gii0ZmpwTVLLMbFCo1NJ47csNdfNTIUh9HF4ro1LPLsWlzt1Cb/Nxz7PIKbrtfjw6ccnTmZl++S5QhO9fuKCUilUM9wnLz7RQS95wT8Mi5idEoEZiQgDlTcaEBnnc2buwI1pYJhqVhFCJhbfCqSqOLD6BjnRZ0vIKGimHs226RtWo3mVpJTcQJWAkrJO5QAJdlWYy2qADVORUlMVAFKsq3GWlQBapyKkpioApRkW421qALUOBUlMVEFKMm2GmtRBahxKkpiogpQkm011qIKUONUlMREFaAk22qsRRWgxqkoiekveRaFUETggAgAAAAASUVORK5CYII='
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
    this.nodeInfoCurveId = []
    return {
      nodeInfoCurveModal: false,
    }
  },
  computed: {
    leftRootNodeSymbol() {
      let imageDataURL = ''
      switch (this.treeChartData.nodeType) {
        case 'WPStationRR':
          imageDataURL = `image://${WPStationRR}`
          break
        case 'WPStationZQ':
          imageDataURL = `image://${WPStationZQ}`
          break
        case 'WPFloodDetentionArea':
          imageDataURL = `image://${WPFloodDetentionArea}`
          break
        case 'WPRiver':
          imageDataURL = `image://${WPRiver}`
          break
        default:
          imageDataURL = `rect`
          break
      }
      return imageDataURL
    }
  },
  watch: {
    treeChartData: {
      deep: true,
      handler: () => {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initData()
      this.initDatasetTreeData()
      this.initDatasetTreeChart()
    },
    initData() {
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
        symbol: this.leftRootNodeSymbol,
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
