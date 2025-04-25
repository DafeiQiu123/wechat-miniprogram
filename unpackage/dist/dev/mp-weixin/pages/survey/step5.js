"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      questionInputs: ["", "", "", "", "", ""],
      showError: false
    };
  },
  onLoad() {
    console.log("Step5页面加载");
  },
  methods: {
    inputChange(index, e) {
      this.questionInputs[index] = e.detail.value;
      console.log(`问题${index} 输入:`, e.detail.value);
    },
    saveResponses() {
      try {
        const responses = {
          scene: this.questionInputs[0],
          see: this.questionInputs[1],
          hear: this.questionInputs[2],
          touch: this.questionInputs[3],
          smell: this.questionInputs[4],
          taste: this.questionInputs[5]
        };
        common_vendor.index.setStorageSync("scene_responses", JSON.stringify(responses));
        console.log("已保存场景回答:", responses);
      } catch (e) {
        console.error("保存回答失败:", e);
      }
    },
    goBack() {
      common_vendor.index.navigateBack();
    },
    goNext() {
      if (!this.questionInputs[0]) {
        this.showError = true;
        common_vendor.index.showToast({
          title: "请至少回答第一个问题",
          icon: "none"
        });
        return;
      }
      this.showError = false;
      this.saveResponses();
      common_vendor.index.navigateTo({
        url: "./step6"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((e) => $options.inputChange(0, e)),
    b: $data.showError
  }, $data.showError ? {} : {}, {
    c: common_vendor.o((e) => $options.inputChange(1, e)),
    d: common_vendor.o((e) => $options.inputChange(2, e)),
    e: common_vendor.o((e) => $options.inputChange(3, e)),
    f: common_vendor.o((e) => $options.inputChange(4, e)),
    g: common_vendor.o((e) => $options.inputChange(5, e)),
    h: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    i: common_vendor.o((...args) => $options.goNext && $options.goNext(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/maple/项目/问卷调查/views_wx/views_wx/pages/survey/step5.vue"]]);
wx.createPage(MiniProgramPage);
