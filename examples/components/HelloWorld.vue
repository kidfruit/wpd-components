<template>
  <div class="about">
    <toast-2 :message="'yyy'" @clicked="clickedHello"></toast-2>
    <characteristic-curve :currentKey="'sss'"></characteristic-curve>
  </div>
</template>

<script>
import CharacteristicCurve from '../../packages/CharacteristicCurve/src/CharacteristicCurve.vue'
export default {
  components: { CharacteristicCurve },
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
