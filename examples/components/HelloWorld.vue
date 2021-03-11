<template>
  <div class="about">
    <!-- <toast-2 :message="'yyy'" @clicked="clickedHello"></toast-2> -->
    <table-chart-test></table-chart-test>
    <scheme-table-test v-if="false"></scheme-table-test>
    <simple-table-test></simple-table-test>
  </div>
</template>

<script>
import TableChartTest from "./TableChartTest";
import SchemeTableTest from "./SchemeTableTest";
import SimpleTableTest from "./SimpleTableTest";
export default {
  components: { TableChartTest, SchemeTableTest, SimpleTableTest },
  name: "HelloWorld",
  methods: {
    clickedHello() {
      alert("iii");
    },
  },
};
</script>
<style scoped></style>
