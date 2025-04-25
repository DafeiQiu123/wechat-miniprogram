"use strict";
const common_vendor = require("../../common/vendor.js");
let exampleAudio = null;
let exampleTimer = null;
const EXAMPLE_DURATION = 23;
const _sfc_main = {
  data() {
    return {
      isPlayingExample: false,
      exampleProgress: 0,
      exampleTimeText: "0:00",
      videoContext: null
    };
  },
  onLoad() {
    console.log("Step7页面加载");
  },
  onReady() {
    this.videoContext = common_vendor.index.createVideoContext("practiceVideo", this);
  },
  onUnload() {
    this.clearExampleTimer();
    this.pauseAllMedia();
  },
  methods: {
    togglePlayExample() {
      console.log("点击示例播放按钮，当前状态:", this.isPlayingExample);
      if (this.isPlayingExample && exampleAudio) {
        console.log("暂停示例音频");
        exampleAudio.pause();
        this.isPlayingExample = false;
        this.clearExampleTimer();
        return;
      }
      if (exampleAudio) {
        console.log("继续播放已存在的示例音频");
        exampleAudio.play();
        this.isPlayingExample = true;
        this.startExampleTimer();
        return;
      }
      try {
        console.log("创建新示例音频实例");
        exampleAudio = common_vendor.wx$1.createInnerAudioContext();
        exampleAudio.src = "https://maple-fin.oss-cn-shenzhen.aliyuncs.com/_finalfinal.mp3";
        exampleAudio.onError((err) => {
          console.error("示例音频播放错误:", err);
          this.isPlayingExample = false;
          this.clearExampleTimer();
          common_vendor.index.showToast({
            title: "音频播放失败",
            icon: "none"
          });
        });
        exampleAudio.onEnded(() => {
          console.log("示例音频播放结束");
          this.isPlayingExample = false;
          this.clearExampleTimer();
          this.exampleProgress = 100;
          this.exampleTimeText = "0:23";
        });
        exampleAudio.play();
        this.isPlayingExample = true;
        this.startExampleTimer();
      } catch (e) {
        console.error("示例音频播放失败:", e);
        this.isPlayingExample = false;
        common_vendor.index.showToast({
          title: "音频播放失败",
          icon: "none"
        });
      }
    },
    startExampleTimer() {
      this.clearExampleTimer();
      exampleTimer = setInterval(() => {
        if (exampleAudio && typeof exampleAudio.currentTime === "number") {
          const currentTime = exampleAudio.currentTime;
          this.exampleProgress = Math.floor(currentTime / EXAMPLE_DURATION * 100);
          const seconds = Math.floor(currentTime % 60);
          this.exampleTimeText = `0:${seconds.toString().padStart(2, "0")}`;
          console.log(`更新示例进度: ${this.exampleProgress}%, 时间: ${this.exampleTimeText}`);
        }
      }, 1e3);
    },
    clearExampleTimer() {
      if (exampleTimer) {
        clearInterval(exampleTimer);
        exampleTimer = null;
      }
    },
    onExampleSliderChange(e) {
      if (!exampleAudio) {
        console.log("示例音频未初始化，无法跳转");
        return;
      }
      try {
        const value = e.detail.value;
        console.log("示例滑块值:", value);
        const seekTime = value / 100 * EXAMPLE_DURATION;
        console.log("跳转到位置:", seekTime, "秒");
        exampleAudio.seek(seekTime);
        const seconds = Math.floor(seekTime % 60);
        this.exampleTimeText = `0:${seconds.toString().padStart(2, "0")}`;
        if (!this.isPlayingExample) {
          console.log("从新位置开始播放示例");
          exampleAudio.play();
          this.isPlayingExample = true;
          this.startExampleTimer();
        }
      } catch (e2) {
        console.error("跳转示例播放失败:", e2);
        common_vendor.index.showToast({
          title: "跳转失败",
          icon: "none"
        });
      }
    },
    // 视频播放控制
    onVideoPlay() {
      console.log("视频开始播放");
      if (exampleAudio && this.isPlayingExample) {
        exampleAudio.pause();
        this.isPlayingExample = false;
        this.clearExampleTimer();
      }
    },
    onVideoPause() {
      console.log("视频暂停播放");
    },
    onVideoEnd() {
      console.log("视频播放结束");
    },
    pauseAllMedia() {
      if (exampleAudio && this.isPlayingExample) {
        try {
          exampleAudio.pause();
          this.isPlayingExample = false;
          this.clearExampleTimer();
        } catch (e) {
          console.error("暂停示例音频失败:", e);
        }
      }
      if (this.videoContext) {
        try {
          this.videoContext.pause();
        } catch (e) {
          console.error("暂停视频失败:", e);
        }
      }
    },
    goBack() {
      this.pauseAllMedia();
      common_vendor.index.navigateBack();
    },
    goNext() {
      this.pauseAllMedia();
      common_vendor.index.navigateTo({
        url: "./step8",
        fail: () => {
          common_vendor.index.showToast({
            title: "恭喜完成所有步骤！",
            icon: "success",
            duration: 2e3
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.isPlayingExample ? "❚❚" : "▶"),
    b: common_vendor.o((...args) => $options.togglePlayExample && $options.togglePlayExample(...args)),
    c: common_vendor.t($data.exampleTimeText),
    d: $data.exampleProgress,
    e: common_vendor.o((...args) => $options.onExampleSliderChange && $options.onExampleSliderChange(...args)),
    f: common_vendor.o((...args) => $options.onVideoPlay && $options.onVideoPlay(...args)),
    g: common_vendor.o((...args) => $options.onVideoPause && $options.onVideoPause(...args)),
    h: common_vendor.o((...args) => $options.onVideoEnd && $options.onVideoEnd(...args)),
    i: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    j: common_vendor.o((...args) => $options.goNext && $options.goNext(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/maple/项目/问卷调查/views_wx/views_wx/pages/survey/step7.vue"]]);
wx.createPage(MiniProgramPage);
