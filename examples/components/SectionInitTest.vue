<template>
  <div style="width: 100%;height: 500px;">
    <SectionInit
      ref="SectionInit"
      :classes="classNames"
      id="standard-chart"
      :setting="{ rowHeaders: true, height: 300 }"
      :isRefresh="isRefresh"
      :treeData="treeData"
      :chartOption="chartOption"
      :extraOptions="extraOptions"
      :rawData="rawData"
      :chartAxis="{ legend: { right: 150 } }"
    />
  </div>
</template>

<script>
import SectionInit from '../../packages/SectionInit/src/SectionInit.vue'
import fakeData from '../assets/mock/SectionInit.json'
export default {
  components: {
    SectionInit,
  },
  data() {
    return {
      classNames: [],
      isRefresh: true,
      chartOption: {
        title: {
          text: '水位流量图',
          left: 'center',
        },
      },
      treeData: [],
      rawData: [],
      extraOptions: {
        title: {
          text: '断面信息图',
          left: 'center',
        },
      },
    }
  },
  created() {
    if (fakeData.state === 0) {
      let rawData = fakeData.data
      rawData.sectionQArray = []
      rawData.sectionZArray = []
      for (let i = 0; i < rawData.sectionDataList.length; i++) {
        // 初始流量
        rawData.sectionQArray.push(0.0)
        // 初始水位
        rawData.sectionZArray.push(213.5 + i + parseInt(Math.random() * 10))

        rawData.sectionDistanceArray.push(123)
      }

      this.treeData = [
        { title: '罗渡溪-渠嘉', key: rawData.riverReachId, children: [] },
      ]
      this.treeData[0].children = rawData.sectionDataList.map((el) => {
        return {
          key: el.sectionCode,
          title: `${el.sectionCode} ${el.sectionName}`,
        }
      })
      this.rawData = rawData
    }
  },
}
</script>
