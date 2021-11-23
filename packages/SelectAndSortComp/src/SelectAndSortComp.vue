<template>
  <div
    class="select-and-sort-comp"
    :style="selectAndSortCompStyle"
    :class="classes"
  >
    <div class="select-comp">
      <div class="select-comp-checkAll">
        <a-checkbox @change="onCheckALlChange">全部蓄滞洪区</a-checkbox>
      </div>
      <div class="select-comp-content">
        <div
          class="select-comp-groups"
          v-for="group in checkData"
          :key="group.groupName"
        >
          <div class="select-comp-group-title">{{group.groupName}}</div>
          <div class="select-comp-group-checkbox" :key="checkboxKey">
            <a-checkbox
              v-for="item in group.data"
              :key="item.id"
              :id="item.id"
              :defaultChecked="item.check"
              @change="onCheckChange($event,group.groupName)"
            >
              {{item.name}}
            </a-checkbox>
          </div>
        </div>
      </div>
    </div>
    <div class="sort-comp">
      <div class="sort-comp-title">启动顺序调整</div>
      <div class="sort-comp-groups">
        <div
          class="sort-comp-group"
          v-for="group in sortTableData"
          :key="group.groupName"
        >
          <SimpleTable
            :ref="group.groupName"
            :style="{width: 'calc(100% - 30px)'}"
            :setting="{rowHeaders: true}"
            :tableData="group.data"
            :tableColumns="[{
              title: group.groupName,
              field: 'name',
              isResize: true,
              titleAlign: 'center',
              columnAlign: 'center',
            }]"
            @moveDone="moveDone"
          />
          <div class="control">
            <a-icon type="up-square" @click="moveUp(group.groupName)"/>
            <a-icon type="down-square" @click="moveDown(group.groupName)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lodash from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import SimpleTable from '~/SimpleTable/src/SimpleTable'
export default {
  name: 'SelectAndSortComp',
  components: { SimpleTable },
  props: {
    className: {
      type: String,
      required: false
    },
    structure: {
      type: String,
      required: false,
      default: 'leftright'
    },
    selectAndSortCompStyle: {
      type: Object,
      required: false,
      default: function () {
        return {
          width: '100%',
          height: '200px'
        }
      }
    },
    checkData: {
      type: Array,
      required: false,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      classes: [this.className].concat(this.structure),
      sortTableData: [],
      checkboxKey: uuidv4(),
      currentGroupName: ''
    }
  },
  created() {
    this.initSortTableData()
  },
  methods: {
    initSortTableData() {
      this.sortTableData = []
      this.checkData.forEach(item => {
        const checkData = item.data.filter(i => i.check === true)
        let data = []
        checkData.forEach(val => {
          data[val.order] = val
        })
        this.sortTableData.push({
          groupName: item.groupName,
          data,
        })
      })
    },
    onCheckALlChange(e) {
      // console.log(e)
      if (e.target.checked === true) {
        this.checkData.forEach(group => {
          group.data.forEach(item => {
            item.check = true
            this.sortTableData.forEach(val => {
              if (val.groupName === group.groupName) {
                if (item.order == null) {
                  item.order = val.data.length
                  this.initSortTableData()
                }
              }
            })
          })
        })
      } else {
        this.checkData.forEach(group => {
          group.data.forEach(item => {
            item.check = false
            item.order = null
          })
        })
      }
      this.checkboxKey = uuidv4()
      this.initSortTableData()
      this.$emit('getResultData', this.sortTableData)
    },
    onCheckChange(e,groupName) {
      // console.log(e,groupName)
      if (e.target.checked === true) {
        this.checkData.forEach(group => {
          group.data.forEach(item => {
            if (item.id === e.target.id) {
              item.check = true
              this.sortTableData.forEach(val => {
                if (val.groupName === groupName) {
                  item.order = val.data.length
                }
              })
            }
          })
        })
      } else {
        this.checkData.forEach(group => {
          group.data.forEach(item => {
            if (item.id === e.target.id) {
              // console.log(item)
              item.check = false
              item.order = null
            }
          })
        })
        let checkArr = []
        this.checkData.forEach(group => {
          if (group.groupName === groupName) {
            group.data.forEach(item => {
              if (item.order !== null) {
                checkArr.push(item)
              }
            })
          }
        })
        checkArr = lodash.orderBy(checkArr, 'order')
        // console.log(checkArr)
        checkArr.forEach((item, index) => {
          item.order = index
        })
      }
      this.initSortTableData()
      let resultData = []
      this.sortTableData.forEach(item => {
        if (item.groupName === groupName) {
          resultData.push(item)
        }
      })
      this.$emit('getResultData', resultData)
    },
    moveUp(e) {
      this.currentGroupName = e
      this.$refs[e][0].moveUp()
    },
    moveDown(e) {
      this.currentGroupName = e
      this.$refs[e][0].moveDown()
    },
    moveDone(data) {
      // console.log(data)
      data.forEach((item, index) => {
        item.order = index
      })
      this.checkData.forEach(group => {
        if (group.groupName === this.currentGroupName) {
          group.data.forEach(item => {
            data.forEach(val => {
              if (item.id === val.id) {
                item.order = val.order
              }
            })
          })
        }
      })
      this.initSortTableData()
      const resultData = [{
        groupName: this.currentGroupName,
        data
      }]
      this.$emit('getResultData', resultData)
    }
  }
}
</script>

<style lang="less" scoped>
.select-and-sort-comp.leftright {
  .select-comp {
    float: left;
    width: 400px;
    height: 100%;
    //background: antiquewhite;
  }
  .sort-comp {
    float: left;
    width: calc(100% - 400px);
    height: 100%;
    //background: cadetblue;
  }
}
.select-and-sort-comp.topbottom {
  .select-comp {
    float: left;
    width: 100%;
    height: 100%;
    //background: antiquewhite;
  }
  .sort-comp {
    float: left;
    width: 100%;
    height: 100%;
    //background: cadetblue;
  }
}

.select-and-sort-comp {
  .select-comp {
    border: 1px solid #ccc;
    .select-comp-checkAll {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      //background: cornflowerblue;
    }
    .select-comp-content {
      width: 100%;
      height: calc(100% - 50px);
      overflow-y: auto;
      .select-comp-groups {
        .select-comp-group-title {
          display: flex;
          justify-content: left;
          align-items: center;
          height: 30px;
          padding-left: 15px;
          border: 1px solid #ccc;
          font-weight: bold;
          color: #ffffff;
          background: #1890FF;
        }
        .select-comp-group-checkbox {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          padding: 10px;
          .ant-checkbox-wrapper {
            display: flex;
            justify-content: left;
            align-items: center;
            width: 50%;
            height: 25px;
            margin-left: 0;
            padding-left: 20px;
          }
        }
      }
    }
  }
  .sort-comp {
    border: 1px solid #ccc;
    .sort-comp-title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      //background: darkcyan;
    }
    .sort-comp-groups {
      width: 100%;
      height: calc(100% - 50px);
      display: flex;
      justify-content: space-around;
      .sort-comp-group {
        display: flex;
        width: 100%;
        .control {
          display: flex;
          flex-direction: column;
          width: 30px;
          height: 50px;
          font-size: 24px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>