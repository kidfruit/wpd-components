<template>
  <div class="usage-setting-comp"
       :class="classes"
  >
    hello world
  </div>
</template>

<script>
export default {
  name: 'UsageSettingComp',
  components: {  },
  props: {
    className: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      classes: [this.className].concat(this.structure)
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>