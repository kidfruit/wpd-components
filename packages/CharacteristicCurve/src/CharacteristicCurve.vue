<template>
  <div>
    <a-tabs default-active-key="1" tab-position="left" @change="callback">
      <a-tab-pane
        v-for="item in chartTableDatas"
        :key="item.key"
        :tab="item.title"
      >
        <chart-table :data="updateDataType(item.key)" style="width:90%;"></chart-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  name: "CharacteristicCurve",
  props: {
    currentKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentDataType: "",
      chartTableDatas: [],
    };
  },
  mounted() {
    // var myChart = this.$echarts.init(document.getElementById("tzqx"));
    // // 指定图表的配置项和数据
    // var option = {
    //   xAxis: {
    //     type: "category",
    //     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    //   },
    //   yAxis: {
    //     type: "value",
    //   },
    //   series: [
    //     {
    //       data: [820, 932, 901, 934, 1290, 1330, 1320],
    //       type: "bar",
    //     },
    //   ],
    // };
    // // 使用刚指定的配置项和数据显示图表。
    // myChart.setOption(option);
  },
  // computed:{
  //   chartTableData:{
  //     get(){

  //     }
  //   }
  // },
  watch: {
    currentKey: {
      handler: "updateCurrentKey",
      immediate: true,
    },
  },
  methods: {
    callback(value) {
      console.log(value);
    },
    updateCurrentKey(Key) {
      this.chartTableDatas = []
      this.$emit("getCurves", Key, (value) => {
        if (value) {
          for (let i = 0; i < value.length; i++) {
            this.chartTableDatas.push({
              tableData: value[i].tableData,
              tableColumns: value[i].tableColumns,
              key: value[i].id,
              title: value[i].name,
            });
          }
        }
      });
    },
    updateDataType(dataType){
      if (this.chartTableDatas) {
        for (let i  = 0; i < this.chartTableDatas.length; i++) {
          if (this.chartTableDatas[i].key == dataType) {
            return this.chartTableDatas[i]
          }
        }
      }
    }
  },
};
</script>
<style scoped></style>
