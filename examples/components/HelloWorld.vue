<template>
  <div class="about">
    <!-- <toast-2 :message="'yyy'" @clicked="clickedHello"></toast-2> -->
    <table-chart-test v-if="false"></table-chart-test>
    <scheme-table-test v-if="false"></scheme-table-test>
    <simple-table-test v-if="false"></simple-table-test>
    <char-table-test v-if="true"></char-table-test>
  </div>
</template>

<script>
import TableChartTest from './TableChartTest'
import SchemeTableTest from './SchemeTableTest'
import SimpleTableTest from "./SimpleTableTest";
import CharTableTest from './CharTableTest.vue';
export default {
  components: {
    TableChartTest,
    SchemeTableTest,
    SimpleTableTest,
    CharTableTest,
  },
  name: 'HelloWorld',
  methods: {
    clickedHello() {
      alert('iii')
    },
  },
}
</script>
<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>
<style scoped></style>
