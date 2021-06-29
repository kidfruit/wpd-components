<template>
  <div class="status-info-comp-test">
    <StatusInfoComp
      :className="className"
      :statusInfoStyle="statusInfoStyle"
      :infoData="infoData"
    />
  </div>
</template>

<script>
import StatusInfoComp from "~/StatusInfoComp/src/StatusInfoComp";
export default {
  name: 'StatusInfoCompTest',
  components: { StatusInfoComp },
  data() {
    return {
      className: 'status-info-comp',
      statusInfoStyle: {
        width: '100%',
        height: '50px',
        fontSize: '18px'
      },
      infoData: [
        {
          typeName: '类型1',
          kpi: [
            {name: '指标1', value: '数值1', color: 'yellow'},
            {name: '指标2', value: '数值2', color: 'orange'},
          ]
        },
        {
          typeName: '类型2',
          kpi: [
            {name: '指标3', value: '数值333333333333', color: 'red'},
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>