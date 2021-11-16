<template>
  <div>
    SearchFilterCompdddd
  </div>
</template>
<script>

export default {
  name: 'SearchFilterComp',
  props: {
    data:{
      type:Array,
      required:true
    },
    placeHolder:{
      type:String,
      required:false,
      default:'搜索'
    },
    displayTitle:{
      type:String,
      required:true
    },
    displayKey:{
      type:String,
      required:false,
      default:null
    }
  },
  mounted() {
    console.log(this.data)

  },
  watch: {

  },
  methods: {

  }
}
</script>
