<template>
  <div>
    小时
    <wpd-time-picker
      :bTime="form1.bTime"
      :periodType="form1.periodType"
      ref="form1Ref"
      @formChange="formChange"
      class="timePickerWrap"
    ></wpd-time-picker>
    <button @click="eTime1 = getETime('form1Ref')">获取结果</button>
    <div>{{ eTime1 }}</div>
    日
    <wpd-time-picker
      :bTime="form2.bTime"
      :periodType="form2.periodType"
      ref="form2Ref"
      @formChange="formChange"
      class="timePickerWrap"
    ></wpd-time-picker>
    <button @click="eTime2 = getETime('form2Ref')">获取结果</button>
    <div>{{ eTime2 }}</div>
    旬
    <wpd-time-picker
      :bTime="form3.bTime"
      :periodType="form3.periodType"
      ref="form3Ref"
      @formChange="formChange"
      class="timePickerWrap"
    ></wpd-time-picker>
    <button @click="eTime3 = getETime('form3Ref')">获取结果</button>
    <div>{{ eTime3 }}</div>
    月
    <wpd-time-picker
      :bTime="form4.bTime"
      :periodType="form4.periodType"
      ref="form4Ref"
      @formChange="formChange"
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
      const form_r = this.$refs?.[ref]?.getTime();
      if (form_r) {
        return WpdTimePickerUtile.indexTimeGet(
          form_r.bTime,
          form_r.periodType,
          form_r.periodTypeNum,
          form_r.periodNum
        );
      }
      return "";
    },
    formChange(bTime) {
      console.log(moment(bTime).format('YYYY-MM-DD HH:mm:ss'));
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
