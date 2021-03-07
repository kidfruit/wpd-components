<template>
  <div class="about">
    <!-- <toast-2 :message="'yyy'" @clicked="clickedHello"></toast-2> -->
    <table-chart-test></table-chart-test>
    <scheme-table-test v-if="false"></scheme-table-test>
  </div>
</template>

<script>
import TableChartTest from "./TableChartTest";
import SchemeTableTest from "./SchemeTableTest";
export default {
  components: { TableChartTest, SchemeTableTest },
  name: "HelloWorld",
  methods: {
    clickedHello() {
      alert("iii");
    },
  },
};
</script>
<style scoped></style>
