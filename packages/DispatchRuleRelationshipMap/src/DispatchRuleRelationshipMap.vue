<template>
  <div class="dispatch-rule-relationship-map-container">
    <div id="dispatch-rule-relationship-map" ref="DispatchRuleRelationshipMap"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import lodash from 'lodash'
let echartsInstance = null
export default {
  name: "DispatchRuleRelationshipMap",
  props: {
    ruleData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      instance: null,
      unitLib: {
        "流量": "m³/s",
        "水位": "m"
      },
    }
  },
  mounted() {
    this.drawRelationshipMap()
    this.getRelationshipMapInstance()
    window.addEventListener('resize', this.resizeRelationshipMap)
  },
  methods: {
    drawRelationshipMap() {
      let myRelationshipMap = echarts.getInstanceByDom(document.getElementById('dispatch-rule-relationship-map'))
      if (myRelationshipMap == null) {
        echartsInstance = echarts.init(document.getElementById('dispatch-rule-relationship-map'))
        this.setRelationshipMapOption()
      }
    },
    setRelationshipMapOption() {
      let option = this.initRelationshipMapOption()
      echartsInstance.setOption(option)
    },
    initRelationshipMapOption() {
      // console.log(this.ruleData)
      const seriesData = []

      // push 调度规则对象
      seriesData.push({
        value: this.ruleData.name,
        id: this.randomKey(),
        symbolSize: 80,
        itemStyle: {
          normal: {
            color: '#C00000'
          }
        }
      })

      const controlObjects = []
      const requirements = []
      const conditions = []
      const methods = []
      this.ruleData.schemes.forEach((item, index) => {
        // push 防洪对象
        seriesData.push({
          value: item.controlObject,
          id: `controlObject-${index}-${this.randomKey()}`,
          symbolSize: 65,
          itemStyle: {
            normal: {
              color: '#ED7D31'
            }
          }
        })
        controlObjects.push(lodash.cloneDeep(seriesData).pop())

        // push requirement代表站
        item.requirements.forEach((element, idx) => {
          element.forEach((val, key) => {
            seriesData.push({
              value: val.referName,
              id: `requirement-${index}-${idx}-${key}-${this.randomKey()}`,
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: '#4472C4'
                }
              }
            })
            requirements.push(lodash.cloneDeep(seriesData).pop())
          })
        })

        // push conditions代表站
        item.operations.forEach((element, idx) => {
          element.conditions.forEach((val, key) => {
            seriesData.push({
              value: val.referName,
              id: `condition-${index}-${idx}-${key}-${this.randomKey()}`,
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: '#4472C4'
                }
              }
            })
            conditions.push(lodash.cloneDeep(seriesData).pop())
          })

          // push 调度方式
          element.methods.forEach((val, key) => {
            const methodName =
                `${val.name}控制${val.targetName}${val.controlVariable}不超过${val.controlValue}${this.unitLib[val.controlVariable]}`
            seriesData.push({
              value: methodName,
              id: `method-${index}-${idx}-${key}-${this.randomKey()}`,
              symbolSize: 30,
              itemStyle: {
                normal: {
                  color: '#70AD47'
                }
              }
            })
            methods.push(lodash.cloneDeep(seriesData).pop())
          })
        })
      })

      // console.log(seriesData)
      // console.log(controlObjects)
      // console.log(requirements)
      // console.log(conditions)
      // console.log(methods)

      const seriesLinks = []

      // push 防洪对象
      controlObjects.forEach(item => {
        seriesLinks.push({
          source: seriesData[0].id,
          target: item.id,
          name: '防洪对象'
        })
      })

      // push 代表站
      controlObjects.forEach(item => {
        requirements.forEach(el => {
          if (item.id.split('-')[1] === el.id.split('-')[1]) {
            seriesLinks.push({
              source: item.id,
              target: el.id,
              name: '代表站'
            })
          }
        })
      })

      // push requirements -> methods
      requirements.forEach(item => {
        methods.forEach(el => {
          if (item.id.split('-')[1] === el.id.split('-')[1]) {
            // console.log(item, el)
            const item1 = +item.id.split('-')[1]
            const item2 = +item.id.split('-')[2]
            const item3 = +item.id.split('-')[3]
            const temp = this.ruleData.schemes[item1].requirements[item2][item3]
            // console.log(temp)
            seriesLinks.push({
              source: item.id,
              target: el.id,
              name: this.tempName(temp)
            })
          }
        })
      })

      // push conditions -> methods
      conditions.forEach(item => {
        methods.forEach(el => {
          if (item.id.split('-')[1] === el.id.split('-')[1]) {
            if (item.id.split('-')[2] === el.id.split('-')[2]) {
              // console.log(item, el)
              const item1 = +item.id.split('-')[1]
              const item2 = +item.id.split('-')[2]
              const item3 = +item.id.split('-')[3]
              const temp = this.ruleData.schemes[item1].operations[item2].conditions[item3]
              // console.log(temp)
              seriesLinks.push({
                source: item.id,
                target: el.id,
                name: this.tempName(temp)
              })
            }
          }
        })
      })

      let option = {
        title: {
          text: `${this.ruleData.name}调度规则关系图谱`,
          left: 'center'
        },
        series: [{
          type: 'graph',
          layout: 'circular',
          roam: true,
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            normal: {
              show: true,
              formatter: (x) => x.data.name
            }
          },
          label: {
            normal: {
              show: true,
              formatter: params => params.data.value
            }
          },
          data: seriesData,
          links: seriesLinks
        }]
      }
      console.log(option)
      return option
    },
    getRelationshipMapInstance() {
      if (this.$refs.DispatchRuleRelationshipMap) {
        this.instance = this.$refs.DispatchRuleRelationshipMap
      }
    },
    resizeRelationshipMap() {
      if (this.$refs.DispatchRuleRelationshipMap) {
        echartsInstance.resize()
      }
    },
    randomKey() {
      return  +new Date() + (Math.random() * 1000).toFixed(0)
    },
    tempName(temp) {
      if (temp.referVariable === '流量') {
        if (temp.threshold[1] === 999999) {
          return `预报${temp.predictTime}小时后流量大于${temp.threshold[0]}m³/s`
        } else {
          return `预报${temp.predictTime}小时后流量大于${temp.threshold[0]}且小于${temp.threshold[1]}m³/s`
        }
      } else {
        if (temp.threshold[1] === 999999) {
          return `预报${temp.predictTime}小时后水位大于${temp.threshold[0]}m`
        } else {
          return `预报${temp.predictTime}小时后水位大于${temp.threshold[0]}且小于${temp.threshold[1]}m`
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dispatch-rule-relationship-map-container {
  width: 100%;
  height: 100%;
  #dispatch-rule-relationship-map {
    width: 100%;
    height: 500px;
  }
}
</style>
