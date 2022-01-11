<template>
  <div class="dispatch-rule-relationship-map-container">
    <div
      id="dispatch-rule-relationship-map"
      ref="DispatchRuleRelationshipMap"
    />
  </div>
</template>

<script>
import lodash from 'lodash'
import * as echarts from 'echarts'
import { v4 as uuidv4 } from 'uuid'
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
      let allNames = []

      // push 调度规则对象
      const name = this.ruleData.name
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
      const trigger = []
      const conditions = []
      const methods = []
      this.ruleData.schemes.forEach((item, index) => {
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

        trigger.push([])
        item.trigger.forEach(element => {
          element.forEach(val => {
            trigger[index].push(val.referName)
            // push 启动时机(trigger)
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
              allNames = lodash.union(allNames.concat(...trigger))
            }
          })
        })

        conditions.push([])
        methods.push([])
        item.operations.forEach((element, key) => {
          conditions[index].push([])
          methods[index].push([])
          element.conditions.forEach(val => {
            conditions[index][key].push(val.referName)
            // push 启动时机(conditions)
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
              allNames = lodash.union(allNames.concat(...lodash.flatten(conditions)))
            }
          })

          const methodName =
            `${element.methods.name}控制${element.methods.targetName}\n${element.methods.controlVariable}${element.methods.AmplyFactor !== undefined ? '等于' : '不超过'}${element.methods.controlValue}${this.unitLib[element.methods.controlVariable]}`
          methods[index][key].push(methodName)
          // push 调度方式(methods)
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
            allNames = lodash.union(allNames.concat(...lodash.flatten(methods)))
          }
        })
      })


      let seriesLinks = []
      // console.log(seriesData)
      // console.log(name)
      // console.log(controlObjects)
      // console.log(requirements)
      // console.log(conditions)
      // console.log(methods)
      // console.log(allNames)
      // push name -> controlObjects
      controlObjects.forEach(item => {
        seriesLinks.push({
          source: name,
          target: item,
          value: '防洪对象',
          id: uuidv4()
        })
      })

      // push controlObjects -> trigger
      controlObjects.forEach((item, index) => {
        trigger[index].forEach(val => {
          if (val !== name) {
            seriesLinks.push({
              source: item,
              target: val,
              value: '启动时机',
              id: uuidv4()
            })
          }
        })
      })

      // push trigger -> methods (需判断与conditions的关系)
      let tempTrigMethodArr = []
      trigger.forEach((item, index) => {
        item.forEach((el, idx) => {
          methods[index].forEach((val, key) => {
            val.forEach(m => {
              // console.log(el, idx, val, key, m)
              // index 第几个目标对象 idx 第几个启动时机
              const tempTrigger = lodash.flattenDeep(this.ruleData.schemes[index].trigger)[idx]
              tempTrigMethodArr.push({
                source: el,
                target: m,
                value: this.tempName(tempTrigger)
              })
            })
          })
        })
      })
      tempTrigMethodArr = lodash.uniqWith(tempTrigMethodArr, lodash.isEqual)
      tempTrigMethodArr.forEach(item => {
        seriesLinks.push({
          ...item,
          id: uuidv4()
        })
      })

      // push conditions -> methods
      conditions.forEach((item, index) => {
        item.forEach((el, idx) => {
          el.forEach((val, key) => {
            // index 第几个目标对象 idx 第几个调度方式 key 调度方式项
            methods[index][idx].forEach(m => {
              const temp = this.ruleData.schemes[index].operations[idx].conditions[key]
              // console.log(temp, '=========================')
              // console.log(methods[index][idx], key)
              seriesLinks.push({
                source: val,
                target: m,
                value: this.tempName(temp),
                id: uuidv4()
              })
            })
          })
        })
      })


      // 相同站点多根线增加弧度
      const tempSeriesLinks = []
      this.sortClass(seriesLinks, 'source').forEach(item => {
        tempSeriesLinks.push(this.sortClass(item, 'target'))
      })
      tempSeriesLinks.forEach(item => {
        item.forEach(el => {
          if (el.length > 1) {
            el.forEach((val, key) => {
              if (key > 0) {
                // console.log(val)
                val.lineStyle = {
                  curveness: 0.1 * key
                }
              }
            })
          }

        })
      })
      seriesLinks = lodash.flattenDeep(tempSeriesLinks)
      // console.log(seriesLinks)

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
          emphasis: {
            focus: 'adjacency'
          },
          edgeLabel: {
            normal: {
              show: true,
              formatter: (x) => x.data.value
            },
            emphasis: {
              color: 'red',
              opacity: 1,
              fontWeight: 700
            }
          },
          label: {
            normal: {
              show: true,
              // formatter: params => params.data.value
            }
          },
          legendHoverLink: true,//是否启用图例 hover(悬停) 时的联动高亮。
          hoverAnimation: true,//是否开启鼠标悬停节点的显示动画
          lineStyle: {
            emphasis: {
              color: 'red',
              opacity: 1,
              width: 2
            }
          },
          data: seriesData,
          links: seriesLinks
        }]
      }
      // console.log('option', option)
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
      // console.log(temp)
      let requirement = ''
      temp.requirements.forEach((item, index) => {
        if (item.referVariable === '流量') {
          if (item.threshold[1] === 999999) {
            requirement += `\n${index === 0 ? '' : '且'}预报${item.predictTime}小时后流量大于${item.threshold[0]}m³/s`
          } else {
            requirement += `\n${index === 0 ? '' : '且'}预报${item.predictTime}小时后流量大于${item.threshold[0]}且小于${item.threshold[1]}m³/s`
          }
        } else {
          if (item.threshold[1] === 999999) {
            requirement += `\n${index === 0 ? '' : '且'}预报${item.predictTime}小时后水位大于${item.threshold[0]}m`
          } else {
            requirement += `\n${index === 0 ? '' : '且'}预报${item.predictTime}小时后水位大于${item.threshold[0]}且小于${item.threshold[1]}m`
          }
        }

      })

      return requirement
    },
    sortClass(sortData, type){
      const groupBy = (array, f) => {
        let groups = {}
        array.forEach((o) => {
          let group = JSON.stringify(f(o))
          groups[group] = groups[group] || []
          groups[group].push(o)
        })
        return Object.keys(groups).map((group) => {
          return groups[group]
        })
      }
      return groupBy(sortData, (item) => {
        return item[type] // 返回需要分组的对象
      })
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
    height: 100%;
  }
}
</style>
