<template>
  <div
    :class="classNames"
  >
    hello world
  </div>
</template>

<script>

export default {
  name: 'MultiSeriesResult',
  components: {
  },
  props: {
    classes: {
      type: Array,
      required: false,
    }
  },
  data() {
    return {};
  },
  computed: {
    classNames() {
      return ['multi-series-result'].concat(this.classes)
    }
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
</style>
