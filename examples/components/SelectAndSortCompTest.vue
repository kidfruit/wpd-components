<template>
  <div class="select-and-sort-comp-test">
    <SelectAndSortComp
      :className="className"
      :structure="structure"
      :selectAndSortCompStyle="selectAndSortCompStyle"
      :checkData="checkData"
      @getResultData="getResultData"
    />
  </div>
</template>

<script>
import SelectAndSortComp from "~/SelectAndSortComp/src/SelectAndSortComp";
export default {
  name: "SelectAndSortCompTest",
  components: { SelectAndSortComp },
  data() {
    return {
      className: 'select-and-sort-comp-test',
      structure: 'leftright', // topbottom,leftright
      selectAndSortCompStyle: {
        width: '100%',
        height: '300px'
      },
      checkData: [
        {
          groupName: '荆江分洪区',
          data: [
            {name:'荆江分洪区',id:'A1',check:true,order:1},
            {name:'宛市扩大区',id:'A2',check:true},
            {name:'虎西备蓄区',id:'A3',check:false,order:2},
            {name:'人民大垸',id:'A4',check:false,order:0},
          ]
        },
        {
          groupName: '城陵矶分洪区',
          data: [
            {name:'钱粮湖垸',id:'B1',check:true},
            {name:'共双茶垸',id:'B2',check:false},
            {name:'大通湖东垸',id:'B3',check:true},
            {name:'123垸',id:'B4',check:false},
            {name:'abc垸',id:'B5',check:true},
            {name:'asd垸',id:'B6',check:false},
          ]
        },
        {
          groupName: '123城陵矶分洪区',
          data: [
            {name:'钱粮湖垸',id:'c1',check:true},
            {name:'共双茶垸',id:'c2',check:false},
            {name:'大通湖东垸',id:'c3',check:false},
            {name:'123垸',id:'c4',check:false},
            {name:'abc垸',id:'c5',check:true},
            {name:'asd垸',id:'c6',check:false},
          ]
        }
      ]
    }
  },
  methods: {
    getResultData(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.select-and-sort-comp-test {
  width: 100%;
}
</style>