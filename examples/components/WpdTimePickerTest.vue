<template>
  <div>
    小时
    <wpd-time-picker
      :form="form1"
      ref="form1Ref"
      class="timePickerWrap"
    ></wpd-time-picker>
    <button @click="eTime1 = getETime('form1Ref')">获取结果</button>
    <div>{{ eTime1 }}</div>
    日
    <wpd-time-picker
      :form="form2"
      ref="form2Ref"
      class="timePickerWrap"
    ></wpd-time-picker>
    <button @click="eTime2 = getETime('form2Ref')">获取结果</button>
    <div>{{ eTime2 }}</div>
    旬
    <wpd-time-picker
      :form="form3"
      ref="form3Ref"
      class="timePickerWrap"
    ></wpd-time-picker>
    <button @click="eTime3 = getETime('form3Ref')">获取结果</button>
    <div>{{ eTime3 }}</div>
    月
    <wpd-time-picker
      :form="form4"
      ref="form4Ref"
      class="timePickerWrap"
    ></wpd-time-picker>
    <button @click="eTime4 = getETime('form4Ref')">获取结果</button>
    <div>{{ eTime4 }}</div>
  </div>
</template>
<script>
import WpdTimePicker from "../../packages/WpdTimePicker/src/WpdTimePicker.vue";
import WpdTimePickerUtile from "../../packages/WpdTimePickerUtile/src/WpdTimePickerUtile";
import moment from "moment";
export default {
  components: { WpdTimePicker },
  name: "WpdTimePickerTest",
  data() {
    return {
      form1: {
        funcId: "RD_SYNSIM",
        schemeName: "全流域",
        schemeDesc: "",
        timeType: "6*小时",
        bTime: moment("2021-05-22 08:07:06", "YYYY-MM-DD HH:mm:ss"),
        periodNum: 1,
        preHeatNum: 4,
        periodType: "HOUR",
        periodTypeNum: 1,
      },
      eTime1: "",
      form2: {
        funcId: "RD_SYNSIM",
        schemeName: "全流域",
        schemeDesc: "",
        timeType: "6*天",
        bTime: moment("2021-05-22 08:07:06", "YYYY-MM-DD HH:mm:ss"),
        periodNum: 12,
        preHeatNum: 4,
        periodType: "DAY",
        periodTypeNum: 6,
      },
      eTime2: "",
      form3: {
        funcId: "RD_SYNSIM",
        schemeName: "全流域",
        schemeDesc: "",
        timeType: "6*旬",
        bTime: moment("2021-05-22 08:07:06", "YYYY-MM-DD HH:mm:ss"),
        periodNum: 3,
        preHeatNum: 4,
        periodType: "TENDAY",
        periodTypeNum: 1,
      },
      eTime3: "",
      form4: {
        funcId: "RD_SYNSIM",
        schemeName: "全流域",
        schemeDesc: "",
        timeType: "6*月",
        bTime: moment("2021-05-22 08:07:06", "YYYY-MM-DD HH:mm:ss"),
        periodNum: 12,
        preHeatNum: 4,
        periodType: "MONTH",
        periodTypeNum: 6,
      },
      eTime4: "",
      className: "timePickerWrap",
    };
  },
  methods: {
    getETime(ref) {
      const form_r = this.$refs.[ref]?.getTime();
      if (form_r) {
        return WpdTimePickerUtile.indexTimeGet(
          form_r,
          form_r.periodNum
        ).format("YYYY-MM-DD HH:mm:ss");
      }
      return "";
    },
  },
};
</script>
<style scoped>
.timePickerWrap {
  width: 200px;
  margin: auto;
}
</style>
