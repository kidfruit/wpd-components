<template>
  <div class="time-play-control">
    <div class="control-left">
      <a-icon
        class="time-play-control-icon"
        type="control"
        @click="handleClickControl"
      />
    </div>
    <div class="control-right">
      <div class="control-right-play">
        <!-- 播放暂停 -->
        <a-icon
          class="time-play-control-icon"
          type="pause-circle"
          v-if="isPlay"
          @click="handleClickPauseCircle"
        />
        <a-icon
          class="time-play-control-icon"
          type="play-circle"
          v-else
          @click="handleClickPlayCircle"
        />

        <!-- 进度条 -->
        <a-slider
          style="width: 200px;"
          v-model="sliderValue"
          :tooltipVisible="false"
          :max="time.length - 1"
          :min="0"
          :disabled="isOverall"
        />
      </div>

      <div class="control-right-setting">
        <!-- 左移操作 -->
        <a-icon
          class="time-play-control-icon"
          type="fast-backward"
          @click="handleClickFastBackward"
        />
        <a-icon
          class="time-play-control-icon"
          type="step-backward"
          @click="handleCLickStepBackward"
        />

        <!-- 展示框 -->
        <a-input
          style="width: 125px;"
          size="large"
          v-model="inputValue"
          :disabled="isOverall"
        />

        <!-- 右移操作 -->
        <a-icon
          class="time-play-control-icon"
          type="step-forward"
          @click="handleCLickStepForward"
        />
        <a-icon
          class="time-play-control-icon"
          type="fast-forward"
          @click="handleCLickFastForward"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'TimePlayControl',
  props: {
    time: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isPlay: true,
      sliderValue: 0,
      interval: null,
      isOverall: false
    }
  },
  computed: {
    inputValue() {
      return moment(this.time[this.sliderValue]).format('YYYY-MM-DD')
    }
  },
  watch: {
    sliderValue: {
      handler() {
        if (this.sliderValue < 0) this.sliderValue = 0
        if (this.sliderValue >= this.time.length) this.sliderValue = 0
        this.$emit('getTime', this.sliderValue)
      }
    },
    isPlay: {
      immediate: true,
      handler() {
        if (this.isPlay) {
          this.interval = setInterval(() => {
            this.sliderValue ++
          }, 1000)
        } else {
          clearInterval(this.interval)
        }
      }
    },
    isOverall: {
      handler() {
        let controlRightDom = document.querySelector('.control-right')
        if (this.isOverall) {
          this.handleClickPauseCircle()
          controlRightDom.style.pointerEvents = 'none'
          controlRightDom.style.opacity = 0.5
          this.$emit('getTime', 'overall')
        } else {
          this.handleClickPlayCircle()
          controlRightDom.style.pointerEvents = 'auto'
          controlRightDom.style.opacity = 1
        }
      }
    }
  },
  methods: {
    handleClickControl() {
      this.isOverall = !this.isOverall
    },
    handleClickPauseCircle() {
      this.isPlay = !this.isPlay
    },
    handleClickPlayCircle() {
      this.isPlay = !this.isPlay
    },
    handleClickFastBackward() {
      this.sliderValue = 0
    },
    handleCLickStepBackward() {
      this.sliderValue--
    },
    handleCLickStepForward() {
      this.sliderValue++
    },
    handleCLickFastForward() {
      this.sliderValue = this.time.length - 1
    }
  }
}
</script>

<style lang="less" scoped>
.time-play-control {
  width: 600px;
  height: 100px;
  border: 2px solid #555555;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  box-sizing: content-box;
  .control-left {
    width: 50px;
    height: 100px;
    padding: 20px 0;
    border-right: 2px solid #555555;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .control-right {
    width: 550px;
    height: 100px;
    padding: 20px;
    display: flex;
    .control-right-play {
      width: 275px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .control-right-setting {
      width: 235px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }

  /* icon 样式 */
  .time-play-control-icon {
    font-size: 30px;
    color: #555555;
    cursor: pointer;
  }
}
</style>
