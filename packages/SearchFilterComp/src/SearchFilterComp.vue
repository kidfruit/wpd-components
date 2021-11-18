<template>
  <div class="search-filter-comp">
    <a-input-group compact>
      <a-select
        style="width: 100px;"
        v-model="currentSelected"
      >
        <a-select-option
          v-for="item in selectOptions"
          :key="item"
        >
          {{item}}
        </a-select-option>
      </a-select>
      <a-input-search
        style="width: 250px;"
        enter-button
        v-model="inputValue"
        :placeholder="placeholder"
      />
    </a-input-group>
  </div>
</template>

<script>
import lodash from 'lodash'
export default {
  name: 'SearchFilterComp',
  props: {
    searchFilterData:{
      type:Array,
      required:true
    },
    placeholder:{
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
    },
    searchBy: {
      type: Array,
      required: true
    }
  },
  data() {
    this.copySearchFilterData = lodash.cloneDeep(this.searchFilterData)
    this.returnSearchResultData = []
    return {
      selectOptions: ['所有'],
      currentSelected: '所有',
      inputValue: ''
    }
  },
  created() {
    /** 构造下拉框options */
    this.copySearchFilterData = lodash.cloneDeep(this.searchFilterData)
    this.copySearchFilterData.forEach(item => {
      this.selectOptions.push(item[this.displayTitle])
    })
  },
  watch: {
    inputValue: {
      deep: true,
      handler() {
        this.searchFilter()
      }
    },
    currentSelected: {
      deep: true,
      handler() {
        if (this.inputValue === '') {
          this.copySearchFilterData.forEach(item => {
            if (item[this.displayTitle] === this.currentSelected) {
              this.$emit('returnSearchResultData', [item])
            }
          })
        } else {
          this.searchFilter()
        }
      }
    }
  },
  methods: {
    searchFilter() {
      this.copySearchFilterData = lodash.cloneDeep(this.searchFilterData)
      this.returnSearchResultData = []
      // console.log(this.copySearchFilterData)
      if (this.currentSelected === '所有') {
        if (this.inputValue === '') {
          this.returnSearchResultData = this.copySearchFilterData
        } else {
          this.copySearchFilterData.forEach(item => {
            let searchFilterItem = lodash.cloneDeep(item)
            searchFilterItem.children = []
            // console.log(item, searchFilterItem)
            item.children.forEach(val => {
              this.searchBy.forEach(el => {
                if (val[el].includes(this.inputValue)) {
                  // console.log(val, el)
                  searchFilterItem.children.push({
                    [this.displayTitle]: `${val[this.displayTitle]} ${this.displayKey ? '(' + val[this.displayKey] + ')' : ''}`,
                    key: val.key
                  })
                }
              })
            })
            searchFilterItem.children = lodash.unionWith(searchFilterItem.children, lodash.isEqual)
            // console.log(searchFilterItem.children)
            if (searchFilterItem.children.length !== 0) {
              this.returnSearchResultData.push(searchFilterItem)
            }
          })
        }
      } else {
        if (this.inputValue === '') {
          this.copySearchFilterData.forEach(item => {
            if (item[this.displayTitle] === this.currentSelected) {
              this.returnSearchResultData.push(item)
            }
          })
        } else {
          this.copySearchFilterData.forEach(item => {
            if (item[this.displayTitle] === this.currentSelected) {
              let searchFilterItem = lodash.cloneDeep(item)
              searchFilterItem.children = []
              // console.log(item, searchFilterItem)
              item.children.forEach(val => {
                this.searchBy.forEach(el => {
                  if (val[el].includes(this.inputValue)) {
                    // console.log(val, el)
                    searchFilterItem.children.push({
                      [this.displayTitle]: `${val[this.displayTitle]} ${this.displayKey ? '(' + val[this.displayKey] + ')' : ''}`,
                      key: val.key
                    })
                  }
                })
              })
              searchFilterItem.children = lodash.unionWith(searchFilterItem.children, lodash.isEqual)
              // console.log(searchFilterItem.children)
              if (searchFilterItem.children.length !== 0) {
                this.returnSearchResultData.push(searchFilterItem)
              }
            }
          })
        }
      }
      // console.log(this.returnSearchResultData)
      this.$emit('returnSearchResultData', this.returnSearchResultData)
    }
  }
}
</script>
