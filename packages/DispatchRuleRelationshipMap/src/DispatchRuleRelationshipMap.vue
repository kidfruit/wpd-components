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
      type: Array,
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
      console.log(this.ruleData[0])
      const seriesData = []
      let allNames = []

      // push 调度规则对象
      const name = this.ruleData[0].name
      seriesData.push({
        name,
        symbolSize: 80,
        itemStyle: {
          normal: {
            color: '#C00000'
          }
        }
      })
      allNames = allNames.concat(name)

      const controlObjects = []
      const referNames = []
      const conditionsReferNames = []
      const methodNames = []
      this.ruleData[0].schemes.forEach((item, index) => {
        controlObjects.push(item.controlObject)
        // push 防洪对象
        if (!allNames.includes(item.controlObject)) {
          seriesData.push({
            name: item.controlObject,
            symbolSize: 65,
            itemStyle: {
              normal: {
                color: '#ED7D31'
              }
            }
          })
          allNames = allNames.concat(controlObjects)
        }

        referNames.push([])
        item.requirements.forEach(element => {
          element.forEach(val => {
            referNames[index].push(val.referName)
            // push 代表站
            if (!allNames.includes(val.referName)) {
              seriesData.push({
                name: val.referName,
                symbolSize: 50,
                itemStyle: {
                  normal: {
                    color: '#4472C4'
                  }
                }
              })
              allNames = lodash.union(allNames.concat(...referNames))
            }
          })
        })

        conditionsReferNames.push([])
        methodNames.push([])
        item.operations.forEach((element, key) => {
          conditionsReferNames[index].push([])
          methodNames[index].push([])
          element.conditions.forEach(val => {
            conditionsReferNames[index][key].push(val.referName)
            // push 代表站(conditions)
            if (!allNames.includes(val.referName)) {
              seriesData.push({
                name: val.referName,
                symbolSize: 50,
                itemStyle: {
                  normal: {
                    color: '#4472C4'
                  }
                }
              })
              allNames = lodash.union(allNames.concat(...lodash.flatten(conditionsReferNames)))
            }
          })

          element.methods.forEach(val => {
            const methodName = `${val.name}控制${val.targetName}${val.controlVariable}不超过${val.controlValue}${this.unitLib[val.controlVariable]}`
            methodNames[index][key].push(methodName)
            // push 调度方式
            if (!allNames.includes(methodName)) {
              seriesData.push({
                name: methodName,
                symbolSize: 30,
                itemStyle: {
                  normal: {
                    color: '#70AD47'
                  }
                }
              })
              allNames = lodash.union(allNames.concat(...lodash.flatten(methodNames)))
            }
          })
        })
      })

      const seriesLinks = []
      // console.log(seriesData)
      // console.log(name)
      // console.log(controlObjects)
      // console.log(referNames)
      // console.log(conditionsReferNames)
      // console.log(methodNames)
      // console.log(allNames)
      controlObjects.forEach(item => {
        seriesLinks.push({
          source: name,
          target: item,
          name: '防洪对象'
        })
      })

      controlObjects.forEach((item, index) => {
        referNames[index].forEach(val => {
          if (val !== name) {
            seriesLinks.push({
              source: item,
              target: val,
              name: '代表站'
            })
          }
        })
      })

      referNames.forEach((item, index) => {
        item.forEach(el => {
          conditionsReferNames[index].forEach((val, key) => {
            if (!val.includes(el)) {
              // console.log(item, index, el, val, key)
              // console.log(methodNames[index][key])
              const temp = this.ruleData[0].schemes[index].requirements
              let tempName = ''
              temp.forEach(j => {
                j.forEach(k => {
                  // console.log(k)
                  if (k.referName === el) {
                    tempName = this.tempName(k)
                  }
                })
              })

              const tempTargets = methodNames[index][key]
              tempTargets.forEach(element => {
                seriesLinks.push({
                  source: el,
                  target: element,
                  name: tempName
                })
              })
            }
          })
        })
      })


      methodNames.forEach((item, index) => {
        item.forEach((el, idx) => {
          // console.log(el)
          // console.log(conditionsReferNames[index][idx])
          // console.log(index, idx)
          conditionsReferNames[index][idx].forEach((val, key) => {
            // console.log(val)
            // console.log(this.ruleData[0].schemes[index].operations[idx].conditions[key])
            const temp = this.ruleData[0].schemes[index].operations[idx].conditions[key]

            seriesLinks.push({
              source: val,
              target: el,
              name: this.tempName(temp)
            })
          })
        })
      })


      let option = {
        title: {
          text: `${this.ruleData[0].name}调度规则关系图谱`,
          left: 'center'
        },
        series: [{
          type: 'graph',
          layout: 'force',
          roam: true,
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          force: {
            repulsion: 2500,
            edgeLength: [10, 500]
          },
          draggable: true,
          itemStyle: {
            normal: {
              color: '#4b565b'
            }
          },
          lineStyle: {
            normal: {
              width: 2,
              color: '#4b565b'

            }
          },
          edgeLabel: {
            normal: {
              show: true,
              formatter: (x) => x.data.name
            }
          },
          label: {
            normal: {
              show: true,
              // formatter: params => params.data.value
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
