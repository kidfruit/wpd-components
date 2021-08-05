<template>
  <div :class="classes">
    <a-button @click="resetData" v-if="editable">重置</a-button>
    <a-button @click="getData">获取数据</a-button>
    <a-button @click="addSchemes" v-if="editable">增加目标对象</a-button>
    <a-button @click="updateRelationshipMap" v-if="editable">更新</a-button>
    <div
      class="scheme-card"
      v-for="(schemeInfo,i) in schemeData"
      :key="schemeInfo.controlObject + i"
    >
      <div class="scheme-card-title">
        对
        <a-popover trigger="click" v-if="editable">
          <a-tag color="blue" @click="showInputPopoverCallback(schemeInfo.controlObject)">{{ schemeInfo.controlObject }}</a-tag>
          <a-input slot="content" v-model="updateValue" />
          <a slot="content" @click="updateData('controlObject', '', '', i)">确认</a>
        </a-popover>
        <a-tag color="blue" v-else>{{ schemeInfo.controlObject }}</a-tag>
        防洪
      </div>
      <div class="scheme-requirement">
        <div>启动时机</div>
        <div
          class="and-div"
          v-for="(rqmt,j) in schemeInfo.requirements"
          :key="schemeInfo.controlObject + '-require-' + j"
        >
          <div class="or-tag-div" v-if="!editable">
            <a-tag v-if="(j > 0 )" class="or-tag" color="cyan">或</a-tag>
          </div>
          <div
            v-for="(r,idx) in rqmt"
            :key="schemeInfo.controlObject + '-require-r' + idx"
          >
            <div class="item-div">
              <a-tag v-if="(idx > 0 )" color="pink" class="and-tag">且</a-tag>
              <a-space class="control-row">
                当
                <a-popover trigger="click" v-if="editable">
                  <a-tag color="blue" @click="showInputPopoverCallback(r.referName)">{{ r.referName }}</a-tag>
                  <a-input slot="content" v-model="updateValue" />
                  <a slot="content" @click="updateData('requirements', '', 'referName',i,j,idx)">确认</a>
                </a-popover>
                <a-tag color="blue" v-else>{{ r.referName }}</a-tag>
                预报
                <a-popover trigger="click" v-if="editable">
                  <a-tag color="blue" @click="showInputPopoverCallback(r.predictTime)">{{ r.predictTime }}</a-tag>
                  <a-input slot="content" v-model="updateValue" />
                  <a slot="content" @click="updateData('requirements', '', 'predictTime',i,j,idx)">确认</a>
                </a-popover>
                <a-tag color="blue" v-else>{{ r.predictTime }}</a-tag>
                小时后
                <a-popover trigger="click" v-if="editable">
                  <a-tag color="blue" @click="showSelectPopoverCallback(r.referVariable)">{{ r.referVariable }}</a-tag>
                  <a-select slot="content" v-model="selectedValue" :options="selectOptions" style="width: 100px;margin-right: 10px;" />
                  <a slot="content" @click="updateData('requirements', '', 'referVariable',i,j,idx)">确认</a>
                </a-popover>
                <a-tag color="blue" v-else>{{ r.referVariable }}</a-tag>
                <a-popover trigger="click" :getPopupContainer="() => $el" v-if="editable">
                  <a-tag color="blue" v-if="r.threshold[1] !== 999999" @click="showFirstSliderPopoverCallback(r.threshold)">
                    大于 {{r.threshold[0]}} 且小于 {{r.threshold[1]}}
                  </a-tag>
                  <a-tag color="blue" v-else @click="showFirstSliderPopoverCallback(r.threshold)">大于 {{r.threshold[0]}}</a-tag>
                  <div slot="content" class="slot-content">
                    <div class="content-left">
                      <a-input-number v-model="firstSliderLeftInput" :min="0" :max="999999" @change="handleChangeLeftInput"/>
                    </div>
                    <div class="content-center">
                      <a-slider range :min="0" :max="999999" v-model="firstSliderCenter" @change="handleChangeCenterSlider"/>
                    </div>
                    <div class="content-right">
                      <a-input-number v-model="firstSliderRightInput" :min="0" :max="999999" @change="handleChangeRightInput"/>
                    </div>
                  </div>
                  <a slot="content" @click="updateData('requirements', '', 'threshold',i,j,idx)">确认</a>
                </a-popover>
                <span v-else>
                  <a-tag color="blue" v-if="r.threshold[1] !== 999999">大于{{r.threshold[0]}}且小于{{r.threshold[1]}}</a-tag>
                  <a-tag color="blue" v-else>大于 {{r.threshold[0]}}</a-tag>
                </span>
                {{ unitLib[r.referVariable] }}
                <a-button
                  v-if="editable"
                  type="link"
                  icon="minus-circle"
                  class="del-btn"
                  @click="deleteRow('and', 'requirements','',i,j,idx)"
                />
                <a-button
                  v-if="editable"
                  type="link"
                  icon="plus-circle"
                  class="add-btn"
                  @click="addRow('and', 'requirements', '', i,j,idx)"
                />
              </a-space>
            </div>
          </div>
          <div class="or-tag-div"  v-if="editable">
            <a-tag class="or-tag" color="cyan">或</a-tag>
            <a-button
              type="link"
              icon="minus-circle"
              class="del-btn"
              @click="deleteRow('or', 'requirements', '',i,j)"
            />
            <a-button
              type="link"
              icon="plus-circle"
              class="add-btn"
              @click="addRow('or', 'requirements', '', i,j)"
            />
          </div>
        </div>
      </div>
      <div class="scheme-operations">
        <div>调度方式</div>
        <div
          class="and-div"
          v-for="(opt,j) in schemeInfo.operations"
          :key="schemeInfo.controlObject + '-operation-' + j"
        >
          <div class="or-tag-div" v-if="!editable">
            <a-tag v-if="(j > 0 )" class="or-tag" color="cyan">或</a-tag>
          </div>
          <div
            v-for="(cd,idx) in opt.conditions"
            :key="schemeInfo.controlObject + '-operation-cd' + idx"
          >
            <div class="item-div">
              <a-tag v-if="(idx > 0 )" color="pink" class="and-tag">且</a-tag>
              当
              <a-popover trigger="click" v-if="editable">
                <a-tag color="blue" @click="showInputPopoverCallback(cd.referName)">{{ cd.referName }}</a-tag>
                <a-input slot="content" v-model="updateValue" />
                <a slot="content" @click="updateData('operations', 'conditions','referName',i,j,idx)">确认</a>
              </a-popover>
              <a-tag color="blue" v-else>{{ cd.referName }}</a-tag>
              预报
              <a-popover trigger="click" v-if="editable">
                <a-tag color="blue" @click="showInputPopoverCallback(cd.predictTime)">{{ cd.predictTime }}</a-tag>
                <a-input slot="content" v-model="updateValue" />
                <a slot="content" @click="updateData('operations', 'conditions','predictTime',i,j,idx)">确认</a>
              </a-popover>
              <a-tag color="blue" v-else>{{ cd.predictTime }}</a-tag>
              小时后
              <a-popover trigger="click" v-if="editable">
                <a-tag color="blue" @click="showSelectPopoverCallback(cd.referVariable)">{{ cd.referVariable }}</a-tag>
                <a-select slot="content" v-model="selectedValue" :options="selectOptions" style="width: 100px;margin-right: 10px;" />
                <a slot="content" @click="updateData('operations', 'conditions','referVariable',i,j,idx)">确认</a>
              </a-popover>
              <a-tag color="blue" v-else>{{ cd.referVariable }}</a-tag>
              <a-popover trigger="click" :getPopupContainer="() => $el" v-if="editable">
                <a-tag color="blue" v-if="cd.threshold[1] !== 999999" @click="showFirstSliderPopoverCallback(cd.threshold)">
                  大于 {{cd.threshold[0]}} 且小于 {{cd.threshold[1]}}
                </a-tag>
                <a-tag color="blue" v-else @click="showFirstSliderPopoverCallback(cd.threshold)">大于 {{cd.threshold[0]}}</a-tag>
                <div slot="content" class="slot-content">
                  <div class="content-left">
                    <a-input-number v-model="firstSliderLeftInput" :min="0" :max="999999" @change="handleChangeLeftInput"/>
                  </div>
                  <div class="content-center">
                    <a-slider range :min="0" :max="999999" v-model="firstSliderCenter" @change="handleChangeCenterSlider"/>
                  </div>
                  <div class="content-right">
                    <a-input-number v-model="firstSliderRightInput" :min="0" :max="999999" @change="handleChangeRightInput"/>
                  </div>
                </div>
                <a slot="content" @click="updateData('operations', 'conditions', 'threshold',i,j,idx)">确认</a>
              </a-popover>
              <span v-else>
                <a-tag color="blue" v-if="cd.threshold[1] !== 999999">大于{{cd.threshold[0]}}且小于{{cd.threshold[1]}}</a-tag>
                <a-tag color="blue" v-else>大于 {{cd.threshold[0]}}</a-tag>
              </span>
              {{ unitLib[cd.referVariable] }}
              <a-button
                v-if="editable"
                type="link"
                icon="minus-circle"
                class="del-btn"
                @click="deleteRow('and', 'operations', 'conditions',i,j,idx)"
              />
              <a-button
                v-if="editable"
                type="link"
                icon="plus-circle"
                class="add-btn"
                @click="addRow('and', 'operations', 'conditions', i,j,idx)"
              />
            </div>
          </div>
          <div
            v-for="(mt,idx) in opt.methods"
            :key="schemeInfo.controlObject + '-operation-mt' + idx"
          >
            <div class="item-div">
              <a-tag v-if="(idx > 0 )" color="pink" class="and-tag">且</a-tag>
              采用
              <a-popover trigger="click" v-if="editable">
                <a-tag color="blue" @click="showInputPopoverCallback(mt.name)">{{ mt.name }}</a-tag>
                <a-input slot="content" v-model="updateValue" />
                <a slot="content" @click="updateData('operations', 'methods','name',i,j,idx)">确认</a>
              </a-popover>
              <a-tag color="blue" v-else>{{ mt.name }}</a-tag>
              调度，控制
              <a-popover trigger="click" v-if="editable">
                <a-tag color="blue" @click="showInputPopoverCallback(mt.targetName)">{{ mt.targetName }}</a-tag>
                <a-input slot="content" v-model="updateValue" />
                <a slot="content" @click="updateData('operations', 'methods','targetName',i,j,idx)">确认</a>
              </a-popover>
              <a-tag color="blue" v-else>{{ mt.targetName }}</a-tag>
              <a-popover trigger="click" v-if="editable">
                <a-tag color="blue" @click="showSelectPopoverCallback(mt.controlVariable)">{{ mt.controlVariable }}</a-tag>
                <a-select slot="content" v-model="selectedValue" :options="selectOptions" style="width: 100px;margin-right: 10px;" />
                <a slot="content" @click="updateData('operations', 'methods','controlVariable',i,j,idx)">确认</a>
              </a-popover>
              <a-tag color="blue" v-else>{{ mt.controlVariable }}</a-tag>
              <a-popover trigger="click" :getPopupContainer="() => $el" v-if="editable">
                <a-tag color="blue" @click="showSecondSliderPopoverCallback(mt.controlValue)">小于等于 {{mt.controlValue}}</a-tag>
                <div slot="content" class="slot-content">
                  <div class="content-center" style="width: 300px;">
                    <a-slider :min="0" :max="999999" v-model="secondSlider"/>
                  </div>
                  <div class="content-right">
                    <a-input-number v-model="secondSlider" :min="0" :max="999999" @change="handleChangeInput"/>
                  </div>
                </div>
                <a slot="content" @click="updateData('operations', 'methods', 'controlValue',i,j,idx)">确认</a>
              </a-popover>
              <a-tag color="blue" v-else>小于等于 {{ mt.controlValue }}</a-tag>
              {{ unitLib[mt.controlVariable] }}
              <a-button
                v-if="editable"
                type="link"
                icon="minus-circle"
                class="del-btn"
                @click="deleteRow('and', 'operations', 'methods',i,j,idx)"
              />
              <a-button
                v-if="editable"
                type="link"
                icon="plus-circle"
                class="add-btn"
                @click="addRow('and', 'operations', 'methods', i,j,idx)"
              />
            </div>
          </div>
          <div class="or-tag-div" v-if="editable">
            <a-tag class="or-tag" color="cyan">或</a-tag>
            <a-button
              type="link"
              icon="minus-circle"
              class="del-btn"
              @click="deleteRow('or', 'operations', '',i,j)"
            />
            <a-button
              type="link"
              icon="plus-circle"
              class="add-btn"
              @click="addRow('or', 'operations', '', i,j)"
            />
          </div>
        </div>
      </div>
    </div>
    <DispatchRuleRelationshipMap
      ref="DispatchRuleRelationshipMap"
      :ruleData="currentRuleData"
    />
  </div>
</template>

<script>
import DispatchRuleRelationshipMap from "~/DispatchRuleRelationshipMap/src/DispatchRuleRelationshipMap";
import lodash from 'lodash'
const defaultScheme = {
  controlObject: '城陵矶',
  requirements: [
    [
      {
        referName: '三峡',
        referId: '60106980',
        predictTime: 0,
        referVariable: '水位',
        threshold: [145, 158]
      }
    ]
  ],
  operations: [
    {
      conditions: [
        {
          referName: '三峡',
          referId: '60106980',
          predictTime: 0,
          referVariable: '水位',
          threshold: [145, 158]
        }
      ],
      methods: [
        {
          name: '补偿',
          targetName: '三峡',
          targetId: '60106980',
          controlVariable: '流量',
          controlValue: 60000
        }
      ]
    }
  ]
}
const defaultRequirement = {
  referName: '三峡',
  referId: '60106980',
  predictTime: 0,
  referVariable: '水位',
  threshold: [145, 158]
}
const defaultOperationCondition = {
  referName: '三峡',
  referId: '60106980',
  predictTime: 0,
  referVariable: '水位',
  threshold: [145, 158]
}
const defaultOperationMethod = {
  name: '补偿',
  targetName: '三峡',
  targetId: '60106980',
  controlVariable: '流量',
  controlValue: 60000
}
export default {
  name: 'DispatchRuleComp',
  components: { DispatchRuleRelationshipMap },
  props: {
    className: {
      type: String,
      required: false
    },
    ruleData: {
      type: Array,
      required: true
    },
    selectId: {
      type: String,
      required: false
    },
    editable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      currentRuleData: {},
      schemeData: [],//操作数据
      schemeDataCopy: [],//备份数据
      updateValue: "",
      unitLib: {
        "流量": "m³/s",
        "水位": "m"
      },
      firstSliderLeftInput: 0,
      firstSliderRightInput: 999999,
      firstSliderCenter: [],
      secondSlider: 2000,
      selectOptions: [
        {value: '流量', label: '流量'},
        {value: '水位', label: '水位'}
      ],
      selectedValue: ''
    }
  },
  computed: {
    classes() {
      return ['dispatch-rule-comp'].concat(this.classNames)
    },
    currentId() {
      return this.selectId ? this.selectId : this.ruleData[0].stcd
    }
  },
  watch: {
    currentId: {
      handler(value) {
        this.filterData(value)
        // console.log(this.currentRuleData)
        this.$nextTick(() => {
          this.$refs.DispatchRuleRelationshipMap
          && this.$refs.DispatchRuleRelationshipMap.setRelationshipMapOption()
        })
      },
      immediate: true
    }
  },
  mounted() {
    //console.log(this.ruleData)
  },
  methods: {
    showFirstSliderPopoverCallback(val) {
      this.firstSliderLeftInput = val[0]
      this.firstSliderRightInput = val[1]
      this.firstSliderCenter = val
    },
    handleChangeLeftInput(val) {
      this.firstSliderCenter = [+val, this.firstSliderRightInput]
    },
    handleChangeRightInput(val) {
      this.firstSliderCenter = [this.firstSliderLeftInput, +val]
    },
    handleChangeCenterSlider(val) {
      this.firstSliderLeftInput = val[0]
      this.firstSliderRightInput = val[1]
      this.firstSliderCenter = val
    },
    handleChangeInput(val) {
      this.secondSlider = +val
    },
    showSecondSliderPopoverCallback(val) {
      this.secondSlider = val
    },
    showInputPopoverCallback(val) {
      this.updateValue = val
    },
    showSelectPopoverCallback(val) {
      this.selectedValue = val
    },
    filterData(id) {
      this.currentRuleData = this.ruleData.find(rd => rd.stcd === id)
      if (this.currentRuleData) {
        this.schemeData = this.currentRuleData.schemes
        this.schemeDataCopy = JSON.parse(JSON.stringify(this.schemeData))
      }
    },
    resetData() {
      //console.log(this.schemeDataCopy)
      this.schemeData = JSON.parse(JSON.stringify(this.schemeDataCopy))
      this.currentRuleData.schemes = this.schemeData
      // console.log(this.currentRuleData)
    },
    getData() {
      this.$emit('getData', this.schemeData)
    },
    addSchemes() {
      this.schemeData.push(lodash.cloneDeep(defaultScheme))
    },
    updateRelationshipMap() {
      this.$refs.DispatchRuleRelationshipMap.setRelationshipMapOption()
    },
    deleteRow(method, type, dispatch, i, j, idx) {
      // console.log("方案idx", i, "第一层", j, "第二层", idx)
      if (method === 'and') {
        switch (type) {
          case 'requirements':
            this.schemeData[i][type][j].splice(idx, 1)
            break
          case 'operations':
            this.schemeData[i][type][j][dispatch].splice(idx, 1)
            break
          default:
            break
        }
      } else if (method === 'or') {
        switch (type) {
          case 'requirements':
            this.schemeData[i][type].splice(j + 1, 1)
            break
          case 'operations':
            this.schemeData[i][type].splice(j + 1, 1)
            break
          default:
            break
        }
      }
    },
    addRow(method, type, dispatch, i, j, idx) {
      // console.log("方案idx", i, "第一层", j, "第二层", idx)
      if (method === 'and') {
        switch (type) {
          case 'requirements':
            this.schemeData[i][type][j].splice(idx + 1, 0, lodash.cloneDeep(defaultRequirement))
            break
          case 'operations':
            if (dispatch === 'conditions') {
              this.schemeData[i][type][j][dispatch].splice(idx + 1, 0, lodash.cloneDeep(defaultOperationCondition))
            } else if (dispatch === 'methods') {
              this.schemeData[i][type][j][dispatch].splice(idx + 1, 0, lodash.cloneDeep(defaultOperationMethod))
            }
            break
          default:
            break
        }
      } else if (method === 'or') {
        switch (type) {
          case 'requirements':
            this.schemeData[i][type].splice(j + 1, 0, [lodash.cloneDeep(defaultRequirement)])
            break
          case 'operations':
            this.schemeData[i][type].splice(j + 1, 0, {
              conditions: [lodash.cloneDeep(defaultOperationCondition)],
              methods: [lodash.cloneDeep(defaultOperationMethod)]
            })
            break
          default:
            break
        }
      }
    },
    updateData(type, dispatch, field, i, j, idx) {
      switch (type) {
        case 'controlObject':
          this.schemeData[i][type] = this.updateValue
          break
        case 'requirements':
          if (field === 'threshold') {
            this.schemeData[i][type][j][idx][field] = this.firstSliderCenter
          } else if (field === 'referVariable') {
            this.schemeData[i][type][j][idx][field] = this.selectedValue
          } else {
            this.schemeData[i][type][j][idx][field] = this.updateValue
          }
          break
        case 'operations':
          if (field === 'threshold') {
            this.schemeData[i][type][j][dispatch][idx][field] = this.firstSliderCenter
          } else if (field === 'controlValue') {
            this.schemeData[i][type][j][dispatch][idx][field] = this.secondSlider
          } else if (field === 'referVariable' || field === 'controlVariable') {
            this.schemeData[i][type][j][dispatch][idx][field] = this.selectedValue
          } else {
            this.schemeData[i][type][j][dispatch][idx][field] = this.updateValue
          }
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dispatch-rule-comp {
  .scheme-card {
    margin: 10px;
    border: 1px solid #e8e8e8;
    padding: 10px;
    text-align: left;

    .scheme-card-title {
      text-align: left
    }

    .scheme-requirement {
      border: 1px solid #40a9ff;
      padding: 5px;
    }

    .scheme-operations {
      border: 1px solid yellowgreen;
      padding: 5px;
      margin-top: 5px;
    }

    .and-div {
      background-color: #fafafa;
      margin-bottom: 5px;
    }

    .ant-tag {
      margin: 0 3px;
      border: none;
    }

    .item-div {
      .del-btn {

      }
    }

    .or-tag-div {
      background-color: #fff;

      .or-tag {
        margin-bottom: 5px;
      }
    }

    .and-tag {
    }
  }

  .slot-content {
    display: flex;
    justify-content: space-between;
    width: 400px;
    .content-center {
      width: 200px;
    }
  }
}
</style>
