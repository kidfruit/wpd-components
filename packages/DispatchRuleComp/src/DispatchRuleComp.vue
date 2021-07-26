<template>
  <div
      :class="classes"
  >
    <div
        v-for="(schemeInfo,i) in schemeData"
        :key="schemeInfo.controlObject + i"
        class="scheme-card"
    >
      <div class="scheme-card-title">目标对象：{{ schemeInfo.controlObject }}</div>
      <div class="scheme-requirement">
        <div>
          启动时机
        </div>
        <div
            v-for="(rqmt,j) in schemeInfo.requirements"
            :key="schemeInfo.controlObject + '-require-' + j"
            class="and-div"
        >
          <div class="or-tag-div">
            <a-tag v-if="(j > 0 )" class="or-tag" color="cyan">或</a-tag>
          </div>
          <div
              v-for="(r,idx) in rqmt"
              :key="schemeInfo.controlObject + '-require-r' + idx"
          >
            <div class="item-div">
              <a-tag v-if="(idx > 0 )" color="pink" class="and-tag">且</a-tag>
              当
              <a-tag color="blue">{{ r.referName + '(' + r.referId + ')' }}</a-tag>
              预报
              <a-tag color="blue">{{ r.predictTime }}</a-tag>
              小时后
              <a-tag color="blue">{{ r.referVariable }}</a-tag>
              大于
              <a-tag color="blue">{{ r.threshold[0] }}</a-tag>
              {{ unitLib[r.referVariable] }}
            </div>
          </div>
        </div>
      </div>
      <div class="scheme-operations">
        <div>
          调度方式
        </div>
        <div
            v-for="(opt,j) in schemeInfo.operations"
            :key="schemeInfo.controlObject + '-operation-' + j"
            class="and-div"
        >
          <div
              v-for="(cd,idx) in opt.conditions"
              :key="schemeInfo.controlObject + '-operation-cd' + idx"
          >

            <div class="item-div">
              <a-tag v-if="(idx > 0 )" color="pink" class="and-tag">且</a-tag>
              当
              <a-tag color="blue">{{ cd.referName + '(' + cd.referId + ')' }}</a-tag>
              预报
              <a-tag color="blue">{{ cd.predictTime }}</a-tag>
              小时后
              <a-tag color="blue">{{ cd.referVariable }}</a-tag>
              大于
              <a-tag color="blue">{{ cd.threshold[0] }}</a-tag>
              <template v-if="cd.threshold[1] !== 999999">
                且小于<a-tag color="blue">{{ cd.threshold[1] }}</a-tag>
              </template>
              {{ unitLib[cd.referVariable] }}
            </div>
          </div>
          <div
              v-for="(mt,idx) in opt.methods"
              :key="schemeInfo.controlObject + '-operation-mt' + idx"
          >
            <a-tag v-if="(idx > 0 )" color="pink" class="and-tag">且</a-tag>
            <div class="item-div">
              采用
              <a-tag color="blue">{{ mt.name }}</a-tag>
              调度，控制
              <a-tag color="blue">{{ mt.target + '(' + mt.targetId + ')' }}</a-tag>
              <a-tag color="blue">{{ mt.controlVariable }}</a-tag>
              小于
              <a-tag color="blue">{{ mt.controlValue }}</a-tag>
              {{ unitLib[mt.controlVariable] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DispatchRuleComp',
  props: {
    className: {
      type: String,
      required: false
    },
    ruleData: {
      type: Array,
      required: true
    },
    currentId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      currentRuleData: {},
      schemeData: [],
      unitLib: {
        "流量": "m³/s",
        "水位": "m"
      }
    }
  },
  computed: {
    classes() {
      return ['dispatch-rule-comp'].concat(this.classNames)
    },
  },
  watch: {
    currentId: {
      handler(value) {
        this.filterData(value)
      },
      immediate: true
    }
  },
  mounted() {
    console.log(this.ruleData)
  },
  methods: {
    filterData(id) {
      this.currentRuleData = this.ruleData.find(rd => rd.stcd === id)
      if (this.currentRuleData) {
        this.schemeData = this.currentRuleData.schemes
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
    .scheme-requirement{
      border:1px solid #40a9ff;
      padding: 5px;
    }

    .scheme-operations{
      border:1px solid yellowgreen;
      padding: 5px;
      margin-top:5px;
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
}
</style>