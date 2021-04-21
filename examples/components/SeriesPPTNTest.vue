<template>
  <div style="width: 100%">
    <seriesPPTN ref="Seriespptn"
                 :calculationshow="calculationshow"
                 :tableShow="tableShow"
                 :classes="classNames"
                 :chartOption="chartOption"
                 :isRefresh="isRefresh"
                 :chartAxis="chartAxis"
                 :tableColumns="tableColumns"
                 @compute="compute"
                 :chartData="chartData" />
    <button @click="fetchData">获取数据123</button>
  </div>
</template>
<script>
import SeriesPPTN from '../../packages/SeriesPPTNTest/src/SeriesPPTN.vue'

export default {
  name: 'SeriesPPTNTest',
  components: { SeriesPPTN },
  data() {
    return {
      calculationshow: false,
      tableShow: false,
      classNames: ['testChart'],
      isRefresh: true,
      chartOption: {
        title: {
          text: '水位流量图',
          left: 'center',
        },
      },
      chartAxis: {
        xAxis: 'dim2',
        yAxis: 'dim1',
        ytitle: '水位(m)',
      },
      tableColumns: [
        {
          field: 'index',
          title: '序号',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          readOnly: true,
        },
        {
          field: 'dim1',
          title: '水位(m)',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          readOnly: true,
        },
        {
          field: 'dim2',
          title: '泄流能力(m³/s)',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          readOnly: true,
        },
      ],
      chartData: [
        {
          dim2: 14274,
          dim1: 540,
          index: 1,
        },
        {
          dim2: 14882,
          dim1: 545,
          index: 2,
        },
        {
          dim2: 16299,
          dim1: 550,
          index: 3,
        },
        {
          dim2: 18385,
          dim1: 555,
          index: 4,
        },
        {
          dim2: 20895,
          dim1: 560,
          index: 5,
        },
        {
          dim2: 23747,
          dim1: 565,
          index: 6,
        },
        {
          dim2: 26701,
          dim1: 570,
          index: 7,
        },
        {
          dim2: 28618,
          dim1: 575,
          index: 8,
        },
        {
          dim2: 30094,
          dim1: 580,
          index: 9,
        },
        {
          dim2: 31448,
          dim1: 585,
          index: 10,
        },
        {
          dim2: 33712,
          dim1: 590,
          index: 11,
        },
        {
          dim2: 38034,
          dim1: 595,
          index: 12,
        },
        {
          dim2: 43682,
          dim1: 600,
          index: 13,
        },
        {
          dim2: 50434,
          dim1: 605,
          index: 14,
        },
        {
          dim2: 58144,
          dim1: 610,
          index: 15,
        },
      ],
    }
  },
  methods: {
    compute(data) {
      console.log(data)
      this.$refs['Seriespptn']._calculationresults('100')
    },
    changeData() {
      this.chartInstance = this.$refs.Seriespptn.instance
      this.isRefresh = false
    },
    fetchData() {
      this.chartInstance = this.$refs.Seriespptn.instance
      console.log(this.chartInstance)
    },
  },
}
</script>
<style>
.testChart {
  width: 100%;
  height: 50vh;
}
</style>
