<template>
  <div>
    <div v-if="localPeriodType == 'HOUR'" class="hourDiv">
      <a-date-picker v-model="localBTime" type="date" :allow-clear="false"/>
      <a-select style="width: 120px" v-model="hour">
        <a-select-option v-for="h in hours" :key="h">
          {{ h }}时
        </a-select-option>
      </a-select>
    </div>
    <div v-if="localPeriodType == 'DAY'" class="dayDiv">
      <a-month-picker v-model="localBTime" type="date" :allow-clear="false"/>
      <a-select style="width: 120px" v-model="day">
        <a-select-option v-for="d in days" :key="d">
          {{ d }}日
        </a-select-option>
      </a-select>
    </div>
    <div v-if="localPeriodType == 'TENDAY'" class="tendayDiv">
      <a-month-picker v-model="localBTime" type="date" :allow-clear="false"/>
      <a-select style="width: 120px" v-model="tenDay">
        <a-select-option v-for="td in tenDays" :key="td">
          {{ tenDaysTitle[td] }}
        </a-select-option>
      </a-select>
    </div>
    <div v-if="localPeriodType == 'MONTH'" class="monthDiv">
      <a-month-picker v-model="localBTime" type="date" :allow-clear="false"/>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "WpdTimePicker",
  props: {
    bTime: {
      type: Object, // moment对象
      required: true,
    },
    periodType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localBTime: {},
      localPeriodType: "",

      hour: 0,
      hours: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
      ],

      day: 1,
      days: 30,

      tenDay: 1,
      tenDays: [1, 2, 3],
      tenDaysTitle: {
        1: "上旬",
        2: "中旬",
        3: "下旬",
      },
    };
  },
  watch: {
    bTime: {
      handler(nValue) {
        if (nValue) {
          this.localBTime = moment(nValue);
          this.localPeriodType = this.periodType;
          switch (this.localPeriodType) {
            case "HOUR":
              {
                this.localBTime.set("minute", 0).set("second", 0);
              }
              break;
            case "DAY":
              {
                this.localBTime
                  .set("hour", 0)
                  .set("minute", 0)
                  .set("second", 0);
              }
              break;
            case "TENDAY":
              {
                this.localBTime
                  .set("hour", 0)
                  .set("minute", 0)
                  .set("second", 0);
              }
              break;
            case "MONTH":
              {
                this.localBTime
                  .set("date", 1)
                  .set("hour", 0)
                  .set("minute", 0)
                  .set("second", 0);
              }
              break;
            default:
              break;
          }
        }
      },
      immediate: true,
      deep: true,
    },
    periodType: {
      handler(nValue) {
        if (nValue) {
          this.localPeriodType = nValue;
        }
      },
      immediate: true,
      deep: true,
    },
    localBTime: {
      handler(nValue) {
        switch (this.localPeriodType) {
          case "HOUR":
            {
              this.hour = nValue.get("hour");
            }
            break;
          case "DAY":
            {
              this.days = moment(nValue).daysInMonth();
              this.day = nValue.get("date");
            }
            break;
          case "TENDAY":
            {
              const date = moment(nValue).date;
              if (date < 11) {
                this.tenDay = 1;
                nValue.set("date", 1);
              } else if (date < 21) {
                this.tenDay = 2;
                nValue.set("date", 11);
              } else {
                this.tenDay = 3;
                nValue.set("date", 21);
              }
            }
            break;
          //   case "MONTH":
          //     {
          //     }
          //     break;
          default:
            break;
        }
        this.$emit("formChange", nValue);
      },
      immediate: true,
      deep: true,
    },
    hour(nValue) {
      this.localBTime.set("hour", nValue);
      this.$emit("formChange", this.localBTime);
    },
    day(nValue) {
      this.localBTime.set("date", nValue);
      this.$emit("formChange", this.localBTime);
    },
    tenDay(nValue) {
      if (nValue === 1) {
        this.localBTime.set("date", 1);
      } else if (nValue === 2) {
        this.localBTime.set("date", 11);
      } else {
        this.localBTime.set("date", 21);
      }
      this.$emit("formChange", this.localBTime);
    },
  },
  methods: {
    moment,
    getTime() {
      return this.localBTime;
    },
  },
};
</script>

<style lang="less">
.hourDiv, .dayDiv, .tendayDiv {
  .ant-calendar-picker {
    .ant-calendar-picker-input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .ant-select-selection {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
<style lang="less" scoped>
.hourDiv {
  display: flex;
  width: 200px;
}
.dayDiv {
  display: flex;
  width: 200px;
}
.tendayDiv {
  display: flex;
  width: 200px;
}
</style>
