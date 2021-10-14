<template>
  <div :class="[className, 'select-time-period']">
    <div class="period-range">
      时段范围：
      <a-radio-group v-model="periodRangeValue">
        <a-radio
          v-for="item in timeRange"
          :key="item.id"
          :value="item.id"
        >
          {{ item.name }}
        </a-radio>
      </a-radio-group>

    </div>
    <div class="time-picker">
      <a-range-picker
        style="width: 450px;"
        showTime
        :format="format"
        :mode="mode"
        :open="openStatus"
        v-model="rangePickerValue"
        @calendarChange="handleCalendarChange"
        @openChange="handleOpenChange"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import lodash from "lodash";
export default {
  name: 'SelectTimePeriod',
  props: {
    className: {
      type: String,
      default: ''
    },
    timeRange: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      moment,
      periodRangeValue: this.timeRange[0].id,
      rangePickerValue: null,
      mode: null,
      format: 'YYYY-MM-DD HH',
      openStatus: false
    }
  },
  watch: {
    periodRangeValue: {
      deep: true,
      immediate: true,
      handler(newValue) {
        switch (newValue) {
          case '1h':
            this.mode = ['time', 'time']
            break
          case '3h':
            this.mode = ['time', 'time']
            break
          case '1d':
            this.mode = ['date', 'date']
            break
          case '1m':
            this.mode = ['date', 'date']
            break
          case 'other':
            this.mode = ['date', 'date']
            break
          default:
            break
        }
      }
    },
    rangePickerValue: {
      handler() {
        this.$emit('getPeriodRange', {
          type: this.periodRangeValue,
          startTime: this.rangePickerValue[0].format(this.format),
          endTime: this.rangePickerValue[1].format(this.format)
        })
      }
    }
  },
  methods: {
    handleCalendarChange(dates) {
      switch (this.periodRangeValue) {
        case '1h':
          this.$nextTick(() => {
            this.rangePickerValue = [
              lodash.cloneDeep(dates[0]),
              lodash.cloneDeep(dates[0]).add(1, 'h')
            ]
            this.handleOpenChange()
          })
          break
        case '3h':
          this.$nextTick(() => {
            this.rangePickerValue = [
              lodash.cloneDeep(dates[0]),
              lodash.cloneDeep(dates[0]).add(3, 'h')
            ]
            this.handleOpenChange()
          })
          break
        case '1d':
          this.$nextTick(() => {
            this.rangePickerValue = [
              lodash.cloneDeep(dates[0]),
              lodash.cloneDeep(dates[0]).add(1, 'd')
            ]
            this.handleOpenChange()
          })
          break
        case '1m':
          this.$nextTick(() => {
            this.rangePickerValue = [
              lodash.cloneDeep(dates[0]),
              lodash.cloneDeep(dates[0]).add(1, 'M')
            ]
            this.handleOpenChange()
          })
          break
        case 'other':
          this.$nextTick(() => {
            if (dates[1]) {
              this.rangePickerValue = [
                lodash.cloneDeep(dates[0]),
                lodash.cloneDeep(dates[1])
              ]
              this.handleOpenChange()
            }
          })
          break
        default:
          break
      }

    },
    handleOpenChange() {
      this.openStatus = !this.openStatus
    },
  }
}
</script>

<style lang="less" scoped>
.select-time-period {
  width: 500px;
  margin: auto;
  .period-range {
    margin-bottom: 10px;
  }
}
</style>