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
        { 'field': 'outq', 'title': '出库流量', 'width': 80, 'titleAlign': 'center', 'columnAlign': 'center', 'isResize': true, 'readOnly': true },
        { 'field': 'inq', 'title': '入库流量', 'width': 80, 'titleAlign': 'center', 'columnAlign': 'center', 'isResize': true, 'readOnly': true },
      ]
      this.tableData = [
        {
          "time": "2020-06-01T17:00:00",
          "outq": 14800,
          "z": 149.54,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-01T18:00:00",
          "outq": 14900,
          "z": 149.48,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-01T19:00:00",
          "outq": 14900,
          "z": 149.43,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-01T20:00:00",
          "outq": 14900,
          "z": 149.4,
          "inq": 10200,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-01T21:00:00",
          "outq": 15000,
          "z": 149.37,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-01T22:00:00",
          "outq": 12800,
          "z": 149.37,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-01T23:00:00",
          "outq": 9930,
          "z": 149.49,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T00:00:00",
          "outq": 9910,
          "z": 149.51,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T01:00:00",
          "outq": 10900,
          "z": 149.51,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T02:00:00",
          "outq": 10900,
          "z": 149.48,
          "inq": 10200,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T03:00:00",
          "outq": 10900,
          "z": 149.48,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T04:00:00",
          "outq": 10900,
          "z": 149.48,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T05:00:00",
          "outq": 10900,
          "z": 149.47,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T06:00:00",
          "outq": 10900,
          "z": 149.51,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T07:00:00",
          "outq": 13300,
          "z": 149.37,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T08:00:00",
          "outq": 16400,
          "z": 149.25,
          "inq": 10100,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T09:00:00",
          "outq": 16400,
          "z": 149.15,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T10:00:00",
          "outq": 16400,
          "z": 149.09,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T11:00:00",
          "outq": 16500,
          "z": 149.01,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T12:00:00",
          "outq": 14900,
          "z": 149.03,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T13:00:00",
          "outq": 13300,
          "z": 149.06,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T14:00:00",
          "outq": 13300,
          "z": 149.12,
          "inq": 10100,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T15:00:00",
          "outq": 13400,
          "z": 149.06,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T16:00:00",
          "outq": 14200,
          "z": 149.03,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        },
        {
          "time": "2020-06-02T17:00:00",
          "outq": 16500,
          "z": 148.96,
          "inq": null,
          "floodLevel": 145,
          "floodHighLevel": 175
        }
      ]
      this.singleData = [
        { 'title': '汛限水位', 'field': 'floodLevel', 'value': 145 },
        { 'title': '防洪高水位', 'field': 'floodHighLevel', 'value': 175 }
      ]
      this.splitIndex = 15
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
