<template>
  <div class="about">
    <!-- <toast-2 :message="'yyy'" @clicked="clickedHello"></toast-2> -->
    <table-chart-test></table-chart-test>
  </div>
</template>

<script>
import TableChartTest from './TableChartTest'
export default {
  components: { TableChartTest },
  name: 'HelloWorld',
  methods:{
    clickedHello(){
      alert("iii")
    }
  }
}
</script>
<style scoped>
</style>
