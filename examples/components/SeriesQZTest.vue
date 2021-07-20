<template>
  <div>
    <series-q-z
      id="series-qz"
      ref="seriesQZ"
      :classes="['test-Chart']"
      :chartAxis="chartAxis"
      :chartOption="chartOption"
      :tableColumns="tableColumns"
      :tableData="tableData"
      :singleData="singleData"
      :splitIndex="splitIndex"
      :structure="structure"
      :seriesQZStyle="seriesQZStyle"
      :setting="{rowHeaders: true}"
    />
    <button @click="update">刷新数据</button>
  </div>
</template>

<script>
import SeriesQZ from "../../packages/SeriesQZ/src/SeriesQZ.vue";
// import fakeData2 from "../assets/mock/SeriesQZ2.json";
export default {
  components: {
    SeriesQZ,
  },
  created() {
    this.handleData();
  },
  data() {
    return {
      chartOption: {},
      chartAxis: {},
      tableColumns: [],
      tableData: [],
      singleData: [],
      splitIndex: 0,
      structure: 'leftright',  // leftright topbottom
      seriesQZStyle: {
        width: '100%',
        height: '500px'
      }
    };
  },
  methods: {
    handleData() {
      this.tableColumns = [
        { 'field': 'time', 'title': '时间', 'width': 80, 'titleAlign': 'center', 'columnAlign': 'center', 'isResize': true, 'readOnly': true },
        { 'field': 'z', 'title': '水位', 'width': 80, 'titleAlign': 'center', 'columnAlign': 'center', 'isResize': true, 'readOnly': true },
        { 'field': 'q', 'title': '流量', 'width': 80, 'titleAlign': 'center', 'columnAlign': 'center', 'isResize': true, 'readOnly': true },
      ]
      this.tableData = [
        {
          "time": "2020-06-01T01:00:00",
          "q": 13600,
          "z": 39.91
        },
        {
          "time": "2020-06-01T02:00:00",
          "q": 13200,
          "z": 39.84
        },
        {
          "time": "2020-06-01T03:00:00",
          "q": 12800,
          "z": 39.77
        },
        {
          "time": "2020-06-01T04:00:00",
          "q": 12600,
          "z": 39.72
        },
        {
          "time": "2020-06-01T05:00:00",
          "q": 12400,
          "z": 39.67
        },
        {
          "time": "2020-06-01T06:00:00",
          "q": 12300,
          "z": 39.63
        },
        {
          "time": "2020-06-01T07:00:00",
          "q": 12100,
          "z": 39.6
        },
        {
          "time": "2020-06-01T08:00:00",
          "q": 12100,
          "z": 39.58
        },
        {
          "time": "2020-06-01T09:00:00",
          "q": 12400,
          "z": 39.61
        },
        {
          "time": "2020-06-01T10:00:00",
          "q": 12900,
          "z": 39.69
        },
        {
          "time": "2020-06-01T11:00:00",
          "q": 13300,
          "z": 39.76
        },
        {
          "time": "2020-06-01T12:00:00",
          "q": 13600,
          "z": 39.81
        },
        {
          "time": "2020-06-01T13:00:00",
          "q": 13800,
          "z": 39.86
        },
        {
          "time": "2020-06-01T14:00:00",
          "q": 13900,
          "z": 39.89
        },
        {
          "time": "2020-06-01T15:00:00",
          "q": 13700,
          "z": 39.87
        },
        {
          "time": "2020-06-01T16:00:00",
          "q": 13500,
          "z": 39.84
        },
        {
          "time": "2020-06-01T17:00:00",
          "q": 13300,
          "z": 39.82
        },
        {
          "time": "2020-06-01T18:00:00",
          "q": 13300,
          "z": 39.8
        },
        {
          "time": "2020-06-01T19:00:00",
          "q": 13500,
          "z": 39.84
        },
        {
          "time": "2020-06-01T20:00:00",
          "q": 13800,
          "z": 39.89
        },
        {
          "time": "2020-06-01T21:00:00",
          "q": 14000,
          "z": 39.93
        },
        {
          "time": "2020-06-01T22:00:00",
          "q": 14100,
          "z": 39.96
        },
        {
          "time": "2020-06-01T23:00:00",
          "q": 14300,
          "z": 39.99
        },
        {
          "time": "2020-06-02T00:00:00",
          "q": 14100,
          "z": 39.98
        },
        {
          "time": "2020-06-02T01:00:00",
          "q": 13600,
          "z": 39.91
        },
        {
          "time": "2020-06-02T02:00:00",
          "q": 13400,
          "z": 39.86
        },
        {
          "time": "2020-06-02T03:00:00",
          "q": 13100,
          "z": 39.82
        },
        {
          "time": "2020-06-02T04:00:00",
          "q": 13000,
          "z": 39.78
        },
        {
          "time": "2020-06-02T05:00:00",
          "q": 12800,
          "z": 39.75
        },
        {
          "time": "2020-06-02T06:00:00",
          "q": 12700,
          "z": 39.73
        },
        {
          "time": "2020-06-02T07:00:00",
          "q": 12700,
          "z": 39.71
        },
        {
          "time": "2020-06-02T08:00:00",
          "q": 12700,
          "z": 39.7
        },
        {
          "time": "2020-06-02T09:00:00",
          "q": 12900,
          "z": 39.72
        },
        {
          "time": "2020-06-02T10:00:00",
          "q": 13600,
          "z": 39.83
        },
        {
          "time": "2020-06-02T11:00:00",
          "q": 14200,
          "z": 39.94
        },
        {
          "time": "2020-06-02T12:00:00",
          "q": 14800,
          "z": 40.04
        },
        {
          "time": "2020-06-02T13:00:00",
          "q": 15100,
          "z": 40.11
        },
        {
          "time": "2020-06-02T14:00:00",
          "q": 15300,
          "z": 40.17
        },
        {
          "time": "2020-06-02T15:00:00",
          "q": 15200,
          "z": 40.17
        },
        {
          "time": "2020-06-02T16:00:00",
          "q": 14900,
          "z": 40.15
        },
        {
          "time": "2020-06-02T17:00:00",
          "q": 14800,
          "z": 40.14
        },
        {
          "time": "2020-06-02T18:00:00",
          "q": 14900,
          "z": 40.16
        },
        {
          "time": "2020-06-02T19:00:00",
          "q": 15400,
          "z": 40.23
        },
        {
          "time": "2020-06-02T20:00:00",
          "q": 15700,
          "z": 40.29
        },
        {
          "time": "2020-06-02T21:00:00",
          "q": 16000,
          "z": 40.35
        },
        {
          "time": "2020-06-02T22:00:00",
          "q": 16200,
          "z": 40.4
        },
        {
          "time": "2020-06-02T23:00:00",
          "q": 16100,
          "z": 40.41
        },
        {
          "time": "2020-06-03T00:00:00",
          "q": 15800,
          "z": 40.38
        }
      ]
      this.singleData = [
        { 'title': '汛限水位', 'field': 'floodLevel', 'value': 145 },
        { 'title': '防洪高水位', 'field': 'floodHighLevel', 'value': 175 }
      ]
      this.splitIndex = 15
    },
    update() {
      this.$refs.seriesQZ.update()
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
