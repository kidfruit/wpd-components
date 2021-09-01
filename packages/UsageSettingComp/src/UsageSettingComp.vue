<template>
  <div :class="classes">
    <a-table
      :title="() => usageTitle"
      :pagination="false"
      :columns="usageColumns"
      :dataSource="usageDataSource"
    >
      <a-switch
        slot="isOpen"
        slot-scope="text, record, index"
        checkedChildren="是"
        unCheckedChildren="否"
        :defaultChecked="text"
        @change="handleChangeIsOpen(index, $event)"
      />
      <a-input
        slot="v"
        slot-scope="text, record, index"
        type="number"
        style="width: 200px;"
        :defaultValue="text"
        :disabled="!record.isOpen"
        :max="record.capacity - record.used"
        :min="0"
        @change="handleChangeV(index, $event)"
      />
      <a-date-picker
        slot="time"
        slot-scope="text, record, index"
        show-time
        :disabled="!record.isOpen"
        :format="formatTimeStr"
        :defaultValue="text"
        @change="handleChangeTime(index, $event)"
      />
    </a-table>
  </div>
</template>

<script>
import lodash from 'lodash'
import moment from 'moment'
export default {
  name: 'UsageSettingComp',
  props: {
    className: {
      type: String,
      required: false
    },
    usageData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      deepCloneUsageData: {},
      usageColumns: [
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '是否使用',
          dataIndex: 'isOpen',
          scopedSlots: { customRender: 'isOpen' }
        },
        {
          title: '蓄洪容积（亿立方）',
          dataIndex: 'capacity'
        },
        {
          title: '已用容积（亿立方）',
          dataIndex: 'used'
        },
        {
          title: '可用容积（亿立方）',
          dataIndex: 'available'
        },
        {
          title: '本次使用（亿立方）',
          dataIndex: 'v',
          scopedSlots: { customRender: 'v' },
        },
        {
          title: '开始使用时间',
          dataIndex: 'time',
          scopedSlots: { customRender: 'time' }
        }
      ],
      usageDataSource: [],
      usageTitle: '',
      moment,
      formatTimeStr: 'YYYY-MM-DD HH:00:00'
    }
  },
  computed: {
    classes() {
      return [this.className].concat('usage-setting-comp')
    }
  },
  watch: {
    usageData: {
      immediate: true,
      deep: true,
      handler() {
        this.initUsageData()
      }
    }
  },
  methods: {
    initUsageData() {
      this.deepCloneUsageData = lodash.cloneDeep(this.usageData)

      this.usageTitle = this.deepCloneUsageData.name

      this.usageDataSource = []
      this.deepCloneUsageData.children.forEach(item => {
        item.key = item.id
        item.available = item.capacity - item.used
        this.usageDataSource.push(item)
      })
    },
    handleChangeIsOpen(index, event) {
      this.deepCloneUsageData.children[index].isOpen = event
      this.$emit('getUsageData', this.deepCloneUsageData)
    },
    handleChangeV(index, event) {
      this.deepCloneUsageData.children[index].v = event.target.value
      this.$emit('getUsageData', this.deepCloneUsageData)
    },
    handleChangeTime(index, event) {
      this.deepCloneUsageData.children[index].time = moment(event).format(this.formatTimeStr)
      this.$emit('getUsageData', this.deepCloneUsageData)
    }
  }
}
</script>

<style lang="less">
.usage-setting-comp {
  .ant-table-title {
    font-size: 25px;font-weight: bold;
  }
}
</style>
