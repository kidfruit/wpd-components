<template>
  <div :class="classes">
    <div class="control">
      <a-button type="primary" @click="resetData" v-if="editable">重置</a-button>
      <a-button type="primary" @click="getData">获取数据</a-button>
      <a-button type="primary" @click="addSchemes" v-if="editable">增加目标对象</a-button>
      <a-button type="primary" @click="updateRelationshipMap" v-if="editable">更新</a-button>
    </div>
    <div class="dispatch-rule-content-container">
      <div class="dispatch-rule-container">
        <!-- scheme -->
        <div
          class="scheme-card"
          v-for="(schemeInfo,i) in schemeData"
          :key="schemeInfo.controlObject + i"
        >
          <div class="scheme-card-title">
            对

            <!-- scheme-controlObject -->
            <a-popover trigger="click" :getPopupContainer="()=>$el" v-if="editable">
              <a-tag color="blue" @click="showInputPopoverCallback(schemeInfo.controlObject)">
                {{ schemeInfo.controlObject }}
              </a-tag>
              <div class="slot-content" slot="content">
                <a-input v-model="updateValue"/>
                <a-button @click="updateData('controlObject', '', '', i)">
                  确认
                </a-button>
              </div>
            </a-popover>
            <a-tag color="blue" v-else>{{ schemeInfo.controlObject }}</a-tag>

            <!-- scheme-controlFor -->
            <a-popover trigger="click" :getPopupContainer="()=>$el" v-if="editable">
              <a-tag color="blue" @click="showInputPopoverCallback(schemeInfo.controlFor)">
                {{ schemeInfo.controlFor }}
              </a-tag>
              <div class="slot-content" slot="content">
                <a-input v-model="updateValue"/>
                <a-button @click="updateData('controlFor', '', '', i)">
                  确认
                </a-button>
              </div>
            </a-popover>
            <a-tag color="blue" v-else>{{ schemeInfo.controlFor }}</a-tag>
          </div>

          <!-- scheme-trigger -->
          <div class="scheme-trigger">
            <div>启动时机</div>
            <div
              class="and-div"
              v-for="(trig,j) in schemeInfo.trigger"
              :key="schemeInfo.controlObject + '-trig-' + j"
            >
              <div class="or-tag-div" v-if="!editable">
                <a-tag v-if="(j > 0 )" class="or-tag" color="cyan">
                  或
                </a-tag>
              </div>
              <div
                v-for="(tg,idx) in trig"
                :key="schemeInfo.controlObject + '-trig-tg' + idx"
              >
                <div class="item-div">
                  <div class="control-row">
                    <div class="condition-row">
                      <div class="forecast-row">
                        <a-tag v-if="(idx > 0 )" color="pink" class="and-tag">
                          且
                        </a-tag>

                        当

                        <!-- scheme-trigger-referName -->
                        <a-popover trigger="click" :getPopupContainer="()=>$el" v-if="editable">
                          <a-tag color="blue" @click="showInputPopoverCallback(tg.referName)">
                            {{ tg.referName }}
                          </a-tag>
                          <div class="slot-content" slot="content">
                            <a-input v-model="updateValue"/>
                            <a-button @click="updateData('trigger', '', 'referName',i,j,idx)">
                              确认
                            </a-button>
                          </div>
                        </a-popover>
                        <a-tag color="blue" v-else>{{ tg.referName }}</a-tag>

                        预报
                      </div>

                      <!-- scheme-trigger-requirements -->
                      <div
                        class="require-row"
                        v-for="(requirement, key) in tg.requirements"
                        :key="schemeInfo.controlObject + '-trig-tg-requirement' + key"
                      >
                        <a-tag v-if="(key > 0 )" color="pink" class="and-tag">
                          且
                        </a-tag>

                        <!-- scheme-trigger-requirements-predictTime -->
                        <a-popover trigger="click" :getPopupContainer="()=>$el" v-if="editable">
                          <a-tag color="blue" @click="showInputPopoverCallback(requirement.predictTime)">
                            {{ requirement.predictTime }}
                          </a-tag>
                          <div class="slot-content" slot="content">
                            <a-input v-model="updateValue"/>
                            <a-button @click="updateData('trigger', '', 'predictTime',i,j,idx,key)">
                              确认
                            </a-button>
                          </div>
                        </a-popover>
                        <a-tag color="blue" v-else>{{ requirement.predictTime }}</a-tag>

                        小时后

                        <!-- scheme-trigger-requirements-referVariable -->
                        <a-popover trigger="click" :getPopupContainer="()=>$el" v-if="editable">
                          <a-tag color="blue" @click="showSelectPopoverCallback(requirement.referVariable)">
                            {{ requirement.referVariable }}
                          </a-tag>
                          <div class="slot-content" slot="content">
                            <a-select
                              style="width: 100px"
                              v-model="selectedValue"
                              :options="selectOptions"
                            />
                            <a-button @click="updateData('trigger', '', 'referVariable',i,j,idx,key)">
                              确认
                            </a-button>
                          </div>
                        </a-popover>
                        <a-tag color="blue" v-else>{{ requirement.referVariable }}</a-tag>

                        <!-- scheme-trigger-requirements-threshold -->
                        <a-popover trigger="click" :getPopupContainer="()=>$el" v-if="editable">
                          <a-tag
                            color="blue"
                            v-if="requirement.threshold[1] !== 999999"
                            @click="showFirstSliderPopoverCallback(requirement.threshold)"
                          >
                            大于 {{requirement.threshold[0]}} 且小于 {{requirement.threshold[1]}}
                          </a-tag>
                          <a-tag
                            color="blue"
                            v-else
                            @click="showFirstSliderPopoverCallback(requirement.threshold)"
                          >
                            大于 {{requirement.threshold[0]}}
                          </a-tag>
                          <div slot="content" class="slot-content">
                            <div class="content-container">
                              <div class="content-left">
                                <a-input-number
                                  v-model="firstSliderLeftInput"
                                  :min="0"
                                  :max="999999"
                                  @change="handleChangeLeftInput"
                                />
                              </div>
                              <div class="content-center">
                                <a-slider
                                  range
                                  :min="0"
                                  :max="999999"
                                  v-model="firstSliderCenter"
                                  @change="handleChangeCenterSlider"
                                />
                              </div>
                              <div class="content-right">
                                <a-input-number
                                  v-model="firstSliderRightInput"
                                  :min="0"
                                  :max="999999"
                                  @change="handleChangeRightInput"
                                />
                              </div>
                            </div>
                            <a-button @click="updateData('trigger', '', 'threshold',i,j,idx,key)">
                              确认
                            </a-button>
                          </div>
                        </a-popover>
                        <span v-else>
                          <a-tag color="blue" v-if="requirement.threshold[1] !== 999999">
                            大于{{requirement.threshold[0]}}且小于{{requirement.threshold[1]}}
                          </a-tag>
                          <a-tag color="blue" v-else>
                            大于 {{requirement.threshold[0]}}
                          </a-tag>
                        </span>
                        {{ unitLib[requirement.referVariable] }}

                        <a-button
                          v-if="editable"
                          type="link"
                          icon="minus-circle"
                          class="del-btn"
                          @click="deleteRow('and', 'trigger','', 'requirement',i,j,idx,key)"
                        />
                        <a-button
                          v-if="editable"
                          type="link"
                          icon="plus-circle"
                          class="add-btn"
                          @click="addRow('and', 'trigger', '', 'requirement', i,j,idx,key)"
                        />
                      </div>
                    </div>
                    <div class="add-delete-control-btn">
                      <a-button
                        v-if="editable"
                        type="link"
                        icon="minus-circle"
                        class="del-btn"
                        @click="deleteRow('and', 'trigger','', '',i,j,idx)"
                      />
                      <a-button
                        v-if="editable"
                        type="link"
                        icon="plus-circle"
                        class="add-btn"
                        @click="addRow('and', 'trigger', '', '', i,j,idx)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="or-tag-div"  v-if="editable">
                <a-tag class="or-tag" color="cyan">
                  或
                </a-tag>
                <a-button
                  type="link"
                  icon="minus-circle"
                  class="del-btn"
                  @click="deleteRow('or', 'trigger', '', '',i,j)"
                />
                <a-button
                  type="link"
                  icon="plus-circle"
                  class="add-btn"
                  @click="addRow('or', 'trigger', '', '', i,j)"
                />
              </div>
            </div>
          </div>

          <!-- scheme-operations -->
          <div class="scheme-operations">
            <div>调度方式</div>
            <div
              class="and-div"
              v-for="(opt,j) in schemeInfo.operations"
              :key="schemeInfo.controlObject + '-operation-' + j"
            >
              <div class="or-tag-div" v-if="!editable">
                <a-tag v-if="(j > 0 )" class="or-tag" color="cyan">
                  或
                </a-tag>
              </div>

              <!-- scheme-operations-conditions -->
              <div
                v-for="(cd,idx) in opt.conditions"
                :key="schemeInfo.controlObject + '-operation-cd' + idx"
              >
                <div class="item-div">
                  <div class="control-row">
                    <div class="condition-row">
                      <div class="forecast-row">
                        <a-tag v-if="(idx > 0 )" color="pink" class="and-tag">
                          且
                        </a-tag>

                        当

                        <!-- scheme-operations-conditions-referName -->
                        <a-popover trigger="click" :getPopupContainer="()=>$el" v-if="editable">
                          <a-tag color="blue" @click="showInputPopoverCallback(cd.referName)">
                            {{ cd.referName }}
                          </a-tag>
                          <div class="slot-content" slot="content">
                            <a-input v-model="updateValue"/>
                            <a-button @click="updateData('operations', 'conditions','referName',i,j,idx)">
                              确认
                            </a-button>
                          </div>
                        </a-popover>
                        <a-tag color="blue" v-else>{{ cd.referName }}</a-tag>

                        预报
                      </div>

                      <!-- scheme-operations-conditions-requirements -->
                      <div
                        class="require-row"
                        v-for="(requirement, key) in cd.requirements"
                        :key="schemeInfo.controlObject + '-operation-cd-requirement' + key"
                      >
                        <a-tag v-if="(key > 0 )" color="pink" class="and-tag">
                          且
                        </a-tag>

                        <!-- scheme-operations-conditions-requirements-predictTime -->
                        <a-popover trigger="click" :getPopupContainer="()=>$el" v-if="editable">
                          <a-tag color="blue" @click="showInputPopoverCallback(requirement.predictTime)">
                            {{ requirement.predictTime }}
                          </a-tag>
                          <div class="slot-content" slot="content">
                            <a-input v-model="updateValue"/>
                            <a-button @click="updateData('operations', 'conditions','predictTime',i,j,idx,key)">
                              确认
                            </a-button>
                          </div>
                        </a-popover>
                        <a-tag color="blue" v-else>{{ requirement.predictTime }}</a-tag>

                        小时后

                        <!-- scheme-operations-conditions-requirements-referVariable -->
                        <a-popover trigger="click" :getPopupContainer="()=>$el" v-if="editable">
                          <a-tag color="blue" @click="showSelectPopoverCallback(requirement.referVariable)">
                            {{ requirement.referVariable }}
                          </a-tag>
                          <div class="slot-content" slot="content">
                            <a-select
                              style="width: 100px"
                              v-model="selectedValue"
                              :options="selectOptions"
                            />
                            <a-button @click="updateData('operations', 'conditions','referVariable',i,j,idx,key)">
                              确认
                            </a-button>
                          </div>
                        </a-popover>
                        <a-tag color="blue" v-else>{{ requirement.referVariable }}</a-tag>

                        <!-- scheme-operations-conditions-requirements-threshold -->
                        <a-popover trigger="click" :getPopupContainer="()=>$el" v-if="editable">
                          <a-tag
                            color="blue"
                            v-if="requirement.threshold[1] !== 999999"
                            @click="showFirstSliderPopoverCallback(requirement.threshold)"
                          >
                            大于 {{requirement.threshold[0]}} 且小于 {{requirement.threshold[1]}}
                          </a-tag>
                          <a-tag
                            color="blue"
                            v-else
                            @click="showFirstSliderPopoverCallback(requirement.threshold)"
                          >
                            大于 {{requirement.threshold[0]}}
                          </a-tag>
                          <div slot="content" class="slot-content">
                            <div class="content-container">
                              <div class="content-left">
                                <a-input-number
                                  v-model="firstSliderLeftInput"
                                  :min="0"
                                  :max="999999"
                                  @change="handleChangeLeftInput"
                                />
                              </div>
                              <div class="content-center">
                                <a-slider
                                  range
                                  :min="0"
                                  :max="999999"
                                  v-model="firstSliderCenter"
                                  @change="handleChangeCenterSlider"
                                />
                              </div>
                              <div class="content-right">
                                <a-input-number
                                  v-model="firstSliderRightInput"
                                  :min="0"
                                  :max="999999"
                                  @change="handleChangeRightInput"
                                />
                              </div>
                            </div>
                            <a-button @click="updateData('operations', 'conditions', 'threshold',i,j,idx,key)">
                              确认
                            </a-button>
                          </div>
                        </a-popover>
                        <span v-else>
                          <a-tag color="blue" v-if="requirement.threshold[1] !== 999999">
                            大于{{requirement.threshold[0]}}且小于{{requirement.threshold[1]}}
                          </a-tag>
                          <a-tag color="blue" v-else>大于 {{requirement.threshold[0]}}</a-tag>
                        </span>
                        {{ unitLib[requirement.referVariable] }}

                        <a-button
                          v-if="editable"
                          type="link"
                          icon="minus-circle"
                          class="del-btn"
                          @click="deleteRow('and', 'operations', 'conditions', 'requirement',i,j,idx,key)"
                        />
                        <a-button
                          v-if="editable"
                          type="link"
                          icon="plus-circle"
                          class="add-btn"
                          @click="addRow('and', 'operations', 'conditions', 'requirement', i,j,idx,key)"
                        />
                      </div>
                    </div>
                    <div class="add-delete-control-btn">
                      <a-button
                        v-if="editable"
                        type="link"
                        icon="minus-circle"
                        class="del-btn"
                        @click="deleteRow('and', 'operations', 'conditions', '',i,j,idx)"
                      />
                      <a-button
                        v-if="editable"
                        type="link"
                        icon="plus-circle"
                        class="add-btn"
                        @click="addRow('and', 'operations', 'conditions', '', i,j,idx)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- scheme-operations-methods -->
              <div class="item-div">

                采用

                <!-- scheme-operations-methods-name -->
                <a-popover trigger="click" :getPopupContainer="()=>$el" v-if="editable">
                  <a-tag color="blue" @click="showInputPopoverCallback(opt.methods.name)">
                    {{ opt.methods.name }}
                  </a-tag>
                  <div class="slot-content" slot="content">
                    <a-input v-model="updateValue"/>
                    <a-button @click="updateData('operations', 'methods','name',i,j)">
                      确认
                    </a-button>
                  </div>
                </a-popover>
                <a-tag color="blue" v-else>{{ opt.methods.name }}</a-tag>

                调度，控制

                <!-- scheme-operations-methods-targetName -->
                <a-popover trigger="click" :getPopupContainer="()=>$el" v-if="editable">
                  <a-tag color="blue" @click="showInputPopoverCallback(opt.methods.targetName)">
                    {{ opt.methods.targetName }}
                  </a-tag>
                  <div class="slot-content" slot="content">
                    <a-input v-model="updateValue"/>
                    <a-button @click="updateData('operations', 'methods','targetName',i,j)">
                      确认
                    </a-button>
                  </div>
                </a-popover>
                <a-tag color="blue" v-else>{{ opt.methods.targetName }}</a-tag>

                <!-- scheme-operations-methods-controlTime -->
                <span v-if="opt.methods.controlTime !== undefined">
                  <a-popover trigger="click" :getPopupContainer="()=>$el" v-if="editable">
                    <a-tag color="blue" @click="showInputPopoverCallback(opt.methods.controlTime)">
                      {{ opt.methods.controlTime }}
                    </a-tag>
                    <div class="slot-content" slot="content">
                      <a-input v-model="updateValue"/>
                      <a-button @click="updateData('operations', 'methods','controlTime',i,j)">
                        确认
                      </a-button>
                    </div>
                  </a-popover>
                  <a-tag color="blue" v-else>{{ opt.methods.controlTime }}</a-tag>
                  小时后
                </span>

                <!-- scheme-operations-methods-controlVariable -->
                <a-popover trigger="click" :getPopupContainer="()=>$el" v-if="editable">
                  <a-tag color="blue" @click="showSelectPopoverCallback(opt.methods.controlVariable)">
                    {{ opt.methods.controlVariable }}
                  </a-tag>
                  <div class="slot content" slot="content">
                    <a-select
                      style="width: 100px"
                      v-model="selectedValue"
                      :options="selectOptions"
                    />
                    <a-button @click="updateData('operations', 'methods','controlVariable',i,j)">
                      确认
                    </a-button>
                  </div>
                </a-popover>
                <a-tag color="blue" v-else>{{ opt.methods.controlVariable }}</a-tag>

                <!-- scheme-operations-methods-controlValue -->
                <a-popover trigger="click" :getPopupContainer="()=>$el" v-if="editable">
                  <a-tag color="blue" @click="showSecondSliderPopoverCallback(opt.methods.controlValue)">
                    {{ opt.methods.AmplyFactor !== undefined ? '等于' : '不超过'}} {{opt.methods.controlValue}}
                  </a-tag>
                  <div slot="content" class="slot-content">
                    <div class="content-container">
                      <div class="content-center">
                        <a-slider
                          style="width: 300px"
                          :min="0"
                          :max="999999"
                          v-model="secondSlider"
                        />
                      </div>
                      <div class="content-right">
                        <a-input-number
                          v-model="secondSlider"
                          :min="0"
                          :max="999999"
                          @change="handleChangeInput"
                        />
                      </div>
                    </div>
                    <a-button @click="updateData('operations', 'methods', 'controlValue',i,j)">
                      确认
                    </a-button>
                  </div>
                </a-popover>
                <a-tag color="blue" v-else>{{ opt.methods.AmplyFactor === 0 ? '等于' : '不超过'}} {{ opt.methods.controlValue }}</a-tag>
                {{ unitLib[opt.methods.controlVariable] }}
              </div>

              <div class="or-tag-div" v-if="editable">
                <a-tag class="or-tag" color="cyan">
                  或
                </a-tag>
                <a-button
                  type="link"
                  icon="minus-circle"
                  class="del-btn"
                  @click="deleteRow('or', 'operations', '', '',i,j)"
                />
                <a-button
                  type="link"
                  icon="plus-circle"
                  class="add-btn"
                  @click="addRow('or', 'operations', '', '', i,j)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relationship-map-container">
        <DispatchRuleRelationshipMap
          ref="DispatchRuleRelationshipMap"
          :ruleData="currentRuleData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import lodash from 'lodash'
import DispatchRuleRelationshipMap from "~/DispatchRuleRelationshipMap/src/DispatchRuleRelationshipMap";
const defaultScheme = {
  controlObject: '城陵矶',
  controlFor: '防洪',
  trigger: [
    [
      {
        referName: '三峡',
        referId: '60106980',
        requirements: [
          {
            predictTime: 0,
            referVariable: '水位',
            threshold: [145, 158]
          }
        ]
      }
    ]
  ],
  operations: [
    {
      conditions: [
        {
          referName: '三峡',
          referId: '60106980',
          requirements: [
            {
              predictTime: 0,
              referVariable: '水位',
              threshold: [145, 158]
            }
          ]
        }
      ],
      methods: {
        name: '补偿',
        targetName: '三峡',
        targetId: '60106980',
        controlVariable: '流量',
        controlValue: 60000
      }
    }
  ]
}
const defaultTrigger = {
  referName: '三峡',
  referId: '60106980',
  requirements: [
    {
      predictTime: 0,
      referVariable: '水位',
      threshold: [145, 158]
    }
  ]
}
const defaultOperationCondition = {
  referName: '三峡',
  referId: '60106980',
  requirements: [
    {
      predictTime: 0,
      referVariable: '水位',
      threshold: [145, 158]
    }
  ]
}
const defaultOperationMethod = {
  name: '补偿',
  targetName: '三峡',
  targetId: '60106980',
  controlVariable: '流量',
  controlValue: 60000
}
const defaultRequirement = {
  predictTime: 0,
  referVariable: '水位',
  threshold: [145, 158]
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
      this.secondSlider = +val
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
        this.schemeDataCopy = lodash.cloneDeep(this.schemeData)
      }
    },
    resetData() {
      //console.log(this.schemeDataCopy)
      this.schemeData = lodash.cloneDeep(this.schemeDataCopy)
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
    deleteRow(method, type, dispatch, requirement, i, j, idx, key) {
      // console.log('=========================================')
      // console.log('method:', method)
      // console.log('type:', type)
      // console.log('dispatch:', dispatch)
      // console.log('requirement:', requirement)
      // console.log('i:', i)
      // console.log('j:', j)
      // console.log('idx:', idx)
      // console.log('key:', key)
      // console.log('=========================================')
      if (method === 'and') {
        switch (type) {
          case 'trigger':
            if (requirement === 'requirement') {
              this.schemeData[i][type][j][idx].requirements.splice(key, 1)
            } else {
              this.schemeData[i][type][j].splice(idx, 1)
            }
            break
          case 'operations':
            if (requirement === 'requirement') {
              this.schemeData[i][type][j][dispatch][idx].requirements.splice(key, 1)
            } else {
              this.schemeData[i][type][j][dispatch].splice(idx, 1)
            }
            break
          default:
            break
        }
      } else if (method === 'or') {
        switch (type) {
          case 'trigger':
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
    addRow(method, type, dispatch, requirement, i, j, idx, key) {
      // console.log('=========================================')
      // console.log('method:', method)
      // console.log('type:', type)
      // console.log('dispatch:', dispatch)
      // console.log('requirement:', requirement)
      // console.log('i:', i)
      // console.log('j:', j)
      // console.log('idx:', idx)
      // console.log('key:', key)
      // console.log('=========================================')
      if (method === 'and') {
        switch (type) {
          case 'trigger':
            if (requirement === 'requirement') {
              this.schemeData[i][type][j][idx].requirements.splice(key + 1, 0, lodash.cloneDeep(defaultRequirement))
            } else {
              this.schemeData[i][type][j].splice(idx + 1, 0, lodash.cloneDeep(defaultTrigger))
            }
            break
          case 'operations':
            if (dispatch === 'conditions') {
              if (requirement === 'requirement') {
                this.schemeData[i][type][j][dispatch][idx].requirements.splice(key + 1, 0, lodash.cloneDeep(defaultRequirement))
              } else {
                this.schemeData[i][type][j][dispatch].splice(idx + 1, 0, lodash.cloneDeep(defaultOperationCondition))
              }
            }
            break
          default:
            break
        }
      } else if (method === 'or') {
        switch (type) {
          case 'trigger':
            this.schemeData[i][type].splice(j + 1, 0, [lodash.cloneDeep(defaultTrigger)])
            break
          case 'operations':
            this.schemeData[i][type].splice(j + 1, 0, {
              conditions: [lodash.cloneDeep(defaultOperationCondition)],
              methods: lodash.cloneDeep(defaultOperationMethod)
            })
            break
          default:
            break
        }
      }
    },
    updateData(type, dispatch, field, i, j, idx, key) {
      console.log('=========================================')
      console.log('type:', type)
      console.log('dispatch:', dispatch)
      console.log('field:', field)
      console.log('i:', i)
      console.log('j:', j)
      console.log('idx:', idx)
      console.log('key:', key)
      console.log('=========================================')
      switch (type) {
        case 'controlObject':
          this.schemeData[i][type] = this.updateValue
          break
        case 'controlFor':
          this.schemeData[i][type] = this.updateValue
          break
        case 'trigger':
          if (field === 'predictTime') {
            this.schemeData[i][type][j][idx].requirements[key][field] = this.updateValue
          } else if (field === 'referVariable') {
            this.schemeData[i][type][j][idx].requirements[key][field] = this.selectedValue
          } else if (field === 'threshold') {
            this.schemeData[i][type][j][idx].requirements[key][field] = this.firstSliderCenter
          } else {
            this.schemeData[i][type][j][idx][field] = this.updateValue
          }
          break
        case 'operations':
          if (field === 'predictTime') {
            this.schemeData[i][type][j][dispatch][idx].requirements[key][field] = this.updateValue
          } else if (field === 'referVariable') {
            this.schemeData[i][type][j][dispatch][idx].requirements[key][field] = this.selectedValue
          } else if (field === 'threshold') {
            this.schemeData[i][type][j][dispatch][idx].requirements[key][field] = this.firstSliderCenter
          } else if (field === 'referName') {
            this.schemeData[i][type][j][dispatch][idx][field] = this.updateValue
          } else if (field === 'controlVariable') {
            this.schemeData[i][type][j][dispatch][field] = this.selectedValue
          } else if (field === 'controlValue') {
            this.schemeData[i][type][j][dispatch][field] = this.secondSlider
          } else {
            this.schemeData[i][type][j][dispatch][field] = this.updateValue
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
  display: flex;
  flex-direction: column;
  .control {
    display: flex;
    justify-content: flex-end;
    padding-right: 50px;
    button {
      margin-right: 20px;
    }
  }
  .dispatch-rule-content-container {
    display: flex;
    height: 800px;
    .dispatch-rule-container {
      width: 50%;
      overflow: auto;
      .scheme-card {
        margin: 10px;
        border: 1px solid #e8e8e8;
        padding: 10px;
        text-align: left;

        .scheme-card-title {
          text-align: left
        }

        .scheme-trigger {
          border: 1px solid #40a9ff;
          padding: 5px;
          .control-row {
            margin: 5px 0;
            display: flex;
            align-items: center;
            background: #f1f1f1;
            .condition-row {
              display: flex;
              flex-direction: column;
            }
            .add-delete-control-btn {
              margin-left: 20px;
            }
          }
        }

        .scheme-operations {
          border: 1px solid yellowgreen;
          padding: 5px;
          margin-top: 5px;
          .control-row {
            margin: 5px 0;
            display: flex;
            align-items: center;
            background: #f1f1f1;
            .condition-row {
              display: flex;
              flex-direction: column;
            }
            .add-delete-control-btn {
              margin-left: 50px;
            }
          }
        }

        .and-div {
          background-color: #fafafa;
          margin-bottom: 5px;
        }

        .ant-tag {
          margin: 0 3px;
          border: none;
        }

        .or-tag-div {
          background-color: #fff;

          .or-tag {
            margin-bottom: 5px;
          }
        }
      }

    }
    .relationship-map-container {
      margin-top: 20px;
      width: 50%;
    }
  }
  .slot-content {
    display: flex;
    .ant-btn {
      margin-left: 10px;
    }
    .content-container {
      display: flex;
      justify-content: space-between;
      width: 400px;
      .content-center {
        width: 200px;
      }
    }
  }
}
</style>
