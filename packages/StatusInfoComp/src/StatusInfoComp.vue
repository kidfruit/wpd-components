<template>
  <div class="status-info" :class="className" :style="statusInfoStyle">
    <div class="status-info-type" v-for="i of infoData" :key="i.typeName">
      <div class="status-info-typeName">{{ i.typeName }}:</div>
      <div class="status-info-kpi" v-for="j of i.kpi" :key="j.name">
        <div class="status-info-kpi-name">{{j.name}}</div>
        <div class="status-info-kpi-value" :style="{backgroundColor: j.color}">{{j.value}}</div>
      </div>
      ；
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusInfoComp',
  props: {
    className: {
      type: String,
      required: false
    },
    statusInfoStyle: {
      type: Object,
      required: false,
      default: function () {
        return {
          width: '100%',
          height: '30px'
        }
      }
    },
    infoData: {
      type: Array,
      required: false,
      default: function () {
        return [
          {
            typeName: '类型1',
            kpi: [
              {name: '指标1', value: '数值1', color: 'yellow'},
              {name: '指标2', value: '数值2', color: 'orange'},
            ]
          }
        ]
      }
    }
  }
}
</script>

<style scoped lang="less">
.status-info {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  .status-info-type {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    margin-right: 10px;
    .status-info-typeName {
      margin-right: 10px;
      font-weight: bold;
    }
    .status-info-kpi {
      display: flex;
      flex-direction: row;
      justify-content: left;
      align-items: center;
      margin-right: 10px;
      .status-info-kpi-name {
        margin-right: 5px;
      }
      .status-info-kpi-value {
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        padding: 10px;
        color: rgba(0, 0, 0, .6);
        border-radius: 5px;
        font-weight: bold;
      }
    }
  }
}
</style>