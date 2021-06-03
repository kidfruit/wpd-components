<template>
  <div style="width: 100%">
    <a-modal
        class="associationModel"
        :visible="modalVisible"
        title="数据来源"
        destroyOnClose
    >
    <curve-chart ref="curvechart"
                 v-if="chartshow"
                 :structure="structure"
                 :interpolateCalcShow="interpolateCalcShow"
                 :tableShow="tableShow"
                 :classes="classNames"
                 :chartOption="chartOption"
                 :isRefresh="isRefresh"
                 :chartAxis="chartAxis"
                 :tableColumns="tableColumns"
                 @compute="compute"
                 :chartData="SW_Chart" />
    <!-- <button @click="changing_over">切换</button> -->
    <button @click="fetchData">获取数据123</button>
    <button @click="Refresh">刷新数据</button>
    </a-modal>
    <button @click="() => modalVisible = !modalVisible">打开弹窗</button>

  </div>
</template>
<script>
import CurveChart from '../../packages/CurveChart/src/CurveChart.vue'

import SW_Chart from '../assets/mock/SW_Chart.json';
export default {
  name: 'CurveChartTest',
  components: { CurveChart },
  data() {
    return {
        SW_Chart,
      structure: 'Upanddown', //Upanddown上下结构，about左右结构
      chartshow: true,
      interpolateCalcShow: false,
      tableShow: false,
      classNames: ['testChart'],
      isRefresh: true,
      chartOption: {
        title: {
          text: '水位流量图',
          left: 'center',
        },
      },
      modalVisible:false,
      chartAxis: {
        xAxis: {
          title: '尾水位(m)',
          id: 'dim1',
        },
        yAxis: {
          title: '流量(m)',
          id: 'dim3',
        },
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
          title: '尾水位(m)',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          readOnly: true,
        },
        {
          field: 'dim2',
          title: '顶托水位(m)',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          readOnly: true,
        },
        {
          field: 'dim3',
          title: '流量(m)',
          width: 100,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'center',
          readOnly: true,
        },
      ],
      chartData: [
        {
          dim3: 2500,
          dim2: 63,
          dim1: 63.06,
          index: 1,
        },
        {
          dim3: 2600,
          dim2: 63,
          dim1: 63.07,
          index: 2,
        },
        {
          dim3: 2700,
          dim2: 63,
          dim1: 63.07,
          index: 3,
        },
        {
          dim3: 2800,
          dim2: 63,
          dim1: 63.07,
          index: 4,
        },
        {
          dim3: 2900,
          dim2: 63,
          dim1: 63.08,
          index: 5,
        },
        {
          dim3: 3000,
          dim2: 63,
          dim1: 63.08,
          index: 6,
        },
        {
          dim3: 3100,
          dim2: 63,
          dim1: 63.08,
          index: 7,
        },
        {
          dim3: 85500,
          dim2: 66,
          dim1: 79.52,
          index: 976,
        },
        {
          dim3: 85600,
          dim2: 66,
          dim1: 79.54,
          index: 977,
        },
      ],
    }
  },
  methods: {
    compute(data) {
      //   console.log(data)
      this.$refs['curvechart']._calculationresults('100')
    },
    changeData() {
      this.chartInstance = this.$refs.curvechart.instance
      this.isRefresh = false
    },
    // changing_over() {
    //   if (this.structure == 'Upanddown') {
    //     this.$nextTick(() => (this.chartshow = true))
    //   } else if (this.structure == 'about') {
    //     this.$nextTick(() => (this.chartshow = true))
    //   }
    //   this.structure = 'Upanddown'
    //   this.chartshow = false
    // },
    Refresh() {
      this.chartData = [
        {
          dim2: 14274,
          dim1: 456,
          index: 1,
        },
        {
          dim2: 14882,
          dim1: 5,
          index: 2,
        },
        {
          dim2: 16299,
          dim1: 8,
          index: 3,
        },
        {
          dim2: 18385,
          dim1: 65,
          index: 4,
        },
        {
          dim2: 20895,
          dim1: 79,
          index: 5,
        },
        {
          dim2: 23747,
          dim1: 87,
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
      ]
      this.chartshow = false
      this.$nextTick(() => (this.chartshow = true))
    },
    fetchData() {
      this.chartInstance = this.$refs.curvechart.instance
      //   console.log(this.chartInstance)
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
