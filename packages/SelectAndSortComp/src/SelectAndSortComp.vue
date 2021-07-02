<template>
  <div class="select-and-sort-comp"
       :style="selectAndSortCompStyle"
       :class="classes"
  >
    <div class="select-comp">
      <div class="select-comp-checkAll">
        <a-checkbox @change="onCheckALlChange">全部蓄滞洪区</a-checkbox>
      </div>
      <div class="select-comp-content">
        <div class="select-comp-groups"
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
              @change="onCheckChange"
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
        <div class="sort-comp-group"
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
      checkboxKey: +new Date() + (Math.random() * 1000).toFixed(0),
      currentGroupName: ''
    }
  },
  created() {
    this.initSortTableData()
  },
  methods: {
    initSortTableData() {
      this.checkData.forEach(item => {
        const data = item.data.filter(i => i.check === true)
        this.sortTableData.push({
          groupName: item.groupName,
          data,
        })
      })
    },
    onCheckALlChange(e) {
      console.log(e)
      if (e.target.checked === true) {
        this.checkData.forEach(group => {
          group.data.forEach(item => {
            item.check = true
          })
        })
      } else {
        this.checkData.forEach(group => {
          group.data.forEach(item => {
            item.check = false
          })
        })
      }
      this.checkboxKey = +new Date() + (Math.random() * 1000).toFixed(0)
      this.sortTableData = []
      this.initSortTableData()
    },
    onCheckChange(e) {
      console.log(e)
      this.checkData.forEach(group => {
        group.data.forEach(item => {
          if (item.id === e.target.id) {
            item.check = e.target.checked
          }
        })
      })
      this.sortTableData = []
      this.initSortTableData()
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