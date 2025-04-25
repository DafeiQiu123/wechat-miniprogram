"use strict";
const common_vendor = require("../../common/vendor.js");
let globalAudio = null;
let progressTimer = null;
const AUDIO_DURATION = 505;
const _sfc_main = {
  data() {
    return {
      isPlaying: false,
      progress: 0,
      currentTimeText: "0:00"
    };
  },
  onLoad() {
    console.log("Step6页面加载");
  },
  onUnload() {
    this.clearProgressTimer();
  },
  methods: {
    togglePlay() {
      console.log("点击播放按钮，当前状态:", this.isPlaying);
      if (this.isPlaying && globalAudio) {
        console.log("暂停音频");
        globalAudio.pause();
        this.isPlaying = false;
        this.clearProgressTimer();
        return;
      }
      if (globalAudio) {
        console.log("继续播放已存在的音频");
        globalAudio.play();
        this.isPlaying = true;
        this.startProgressTimer();
        return;
      }
      try {
        console.log("创建新音频实例");
        globalAudio = common_vendor.wx$1.createInnerAudioContext();
        globalAudio.src = "https://tccolumbia.qualtrics.com/CP/File.php?F=F_738nxh0lkZi71vE";
        globalAudio.onError((err) => {
          console.error("音频播放错误:", err);
          this.isPlaying = false;
          this.clearProgressTimer();
          common_vendor.index.showToast({
            title: "音频播放失败",
            icon: "none"
          });
        });
        globalAudio.onEnded(() => {
          console.log("音频播放结束");
          this.isPlaying = false;
          this.clearProgressTimer();
          this.progress = 100;
          this.currentTimeText = "8:25";
        });
        globalAudio.play();
        this.isPlaying = true;
        this.startProgressTimer();
      } catch (e) {
        console.error("音频播放失败:", e);
        this.isPlaying = false;
        common_vendor.index.showToast({
          title: "音频播放失败",
          icon: "none"
        });
      }
    },
    startProgressTimer() {
      this.clearProgressTimer();
      progressTimer = setInterval(() => {
        if (globalAudio && typeof globalAudio.currentTime === "number") {
          const currentTime = globalAudio.currentTime;
          this.progress = Math.floor(currentTime / AUDIO_DURATION * 100);
          const minutes = Math.floor(currentTime / 60);
          const seconds = Math.floor(currentTime % 60);
          this.currentTimeText = `${minutes}:${seconds.toString().padStart(2, "0")}`;
          console.log(`更新进度: ${this.progress}%, 时间: ${this.currentTimeText}`);
        }
      }, 1e3);
    },
    clearProgressTimer() {
      if (progressTimer) {
        clearInterval(progressTimer);
        progressTimer = null;
      }
    },
    onSliderChange(e) {
      if (!globalAudio) {
        console.log("音频未初始化，无法跳转");
        return;
      }
      try {
        const value = e.detail.value;
        console.log("滑块值:", value);
        const seekTime = value / 100 * AUDIO_DURATION;
        console.log("跳转到位置:", seekTime, "秒");
        globalAudio.seek(seekTime);
        const minutes = Math.floor(seekTime / 60);
        const seconds = Math.floor(seekTime % 60);
        this.currentTimeText = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        if (!this.isPlaying) {
          console.log("从新位置开始播放");
          globalAudio.play();
          this.isPlaying = true;
          this.startProgressTimer();
        }
      } catch (e2) {
        console.error("跳转播放失败:", e2);
        common_vendor.index.showToast({
          title: "跳转失败",
          icon: "none"
        });
      }
    },
    goBack() {
      if (globalAudio && this.isPlaying) {
        try {
          globalAudio.pause();
          this.clearProgressTimer();
        } catch (e) {
          console.error("暂停音频失败:", e);
        }
      }
      common_vendor.index.navigateBack();
    },
    goNext() {
      if (globalAudio && this.isPlaying) {
        try {
          globalAudio.pause();
          this.clearProgressTimer();
        } catch (e) {
          console.error("暂停音频失败:", e);
        }
      }
      common_vendor.index.navigateTo({
        url: "./step7",
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
    a: common_vendor.t($data.isPlaying ? "❚❚" : "▶"),
    b: common_vendor.o((...args) => $options.togglePlay && $options.togglePlay(...args)),
    c: common_vendor.t($data.currentTimeText),
    d: $data.progress,
    e: common_vendor.o((...args) => $options.onSliderChange && $options.onSliderChange(...args)),
    f: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    g: common_vendor.o((...args) => $options.goNext && $options.goNext(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/maple/项目/问卷调查/views_wx/views_wx/pages/survey/step6.vue"]]);
wx.createPage(MiniProgramPage);
