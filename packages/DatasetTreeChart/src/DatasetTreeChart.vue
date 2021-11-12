<template>
  <div :class="classes">
    DatasetTreeChart1111
  </div>
</template>

<script>

export default {
  name: 'DatasetTreeChart',
  components: {  },
  props: {
    className: {
      type: String,
      required: false
    },
    treeChartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    classes() {
      return ['dataset-tree-chart'].concat(this.classNames)
    }
  },
  mounted() {
    console.log('data: ',this.treeChartData)
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.dataset-tree-chart {

}
</style>
