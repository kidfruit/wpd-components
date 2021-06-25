<template>
  <div>
    <div v-if="time.periodType == 'HOUR'" class="hourDiv">
      <a-date-picker v-model="time.bTime" type="date" />
      <a-select style="width: 120px" v-model="hour">
        <a-select-option v-for="h in hours" :key="h">
          {{ h }}时
        </a-select-option>
      </a-select>
    </div>
    <div v-if="time.periodType == 'DAY'" class="dayDiv">
      <a-month-picker v-model="time.bTime" type="date" />
      <a-select style="width: 120px" v-model="day">
        <a-select-option v-for="d in days" :key="d">
          {{ d }}日
        </a-select-option>
      </a-select>
    </div>
    <div v-if="time.periodType == 'TENDAY'" class="tendayDiv">
      <a-month-picker v-model="time.bTime" type="date" />
      <a-select style="width: 120px" v-model="tenDay">
        <a-select-option v-for="td in tenDays" :key="td">
          {{ tenDaysTitle[td] }}
        </a-select-option>
      </a-select>
    </div>
    <div v-if="time.periodType == 'MONTH'" class="monthDiv">
      <a-month-picker v-model="time.bTime" type="date" />
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "WpdTimePicker",
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      time: {},
      realTime: {},

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
    form: {
      handler(nValue) {
        this.time = Object.assign({}, nValue);
        this.time.bTime = moment(this.time.bTime);
        // 规整
        switch (this.time.periodType) {
          case "HOUR":
            {
              this.time.bTime.set("minute", 0).set("second", 0);
            }
            break;
          case "DAY":
            {
              this.time.bTime
                .set("hour", 0)
                .set("minute", 0)
                .set("second", 0);
            }
            break;
          case "TENDAY":
            {
              this.time.bTime
                .set("hour", 0)
                .set("minute", 0)
                .set("second", 0);
            }
            break;
          case "MONTH":
            {
              this.time.bTime
                .set("date", 1)
                .set("hour", 0)
                .set("minute", 0)
                .set("second", 0);
            }
            break;
          default:
            break;
        }
      },
      immediate: true,
      deep: true,
    },
    time: {
      handler(nValue) {
        // 选项
        switch (nValue.periodType) {
          case "HOUR":
            {
              this.hour = nValue.bTime.get("hour");
            }
            break;
          case "DAY":
            {
              this.days = moment(nValue.bTime).daysInMonth();
              this.day = nValue.bTime.get("date");
            }
            break;
          case "TENDAY":
            {
              const date = moment(nValue.bTime).date;
              if (date < 11) {
                this.tenDay = 1;
                nValue.bTime.set("date", 1);
              } else if (date < 21) {
                this.tenDay = 2;
                nValue.bTime.set("date", 11);
              } else {
                this.tenDay = 3;
                nValue.bTime.set("date", 21);
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
      },
      immediate: true,
      deep: true,
    },

    hour(nValue) {
      this.time.bTime.set("hour", nValue);
    },
    day(nValue) {
      this.time.bTime.set("date", nValue);
    },
    tenDay(nValue) {
      if (nValue === 1) {
        this.time.bTime.set("date", 1);
      } else if (nValue === 2) {
        this.time.bTime.set("date", 11);
      } else {
        this.time.bTime.set("date", 21);
      }
    },
  },
  methods: {
    moment,
    getTime(){
        return this.time
    }
  },
};
</script>
<style scoped>
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
