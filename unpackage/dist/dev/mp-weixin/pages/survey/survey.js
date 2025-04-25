"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      selectedOption: null
      // 初始为未选择状态
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      console.log("选中选项:", option);
    },
    goBack() {
      common_vendor.index.navigateBack();
    },
    goNext() {
      if (this.selectedOption) {
        common_vendor.index.navigateTo({
          url: "/pages/survey/step2"
        });
      } else {
        common_vendor.index.showToast({
          title: "请选择一个选项",
          icon: "none"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.selectedOption === 1 ? 1 : "",
    b: common_vendor.o(($event) => $options.selectOption(1)),
    c: $data.selectedOption === 2 ? 1 : "",
    d: common_vendor.o(($event) => $options.selectOption(2)),
    e: $data.selectedOption === 3 ? 1 : "",
    f: common_vendor.o(($event) => $options.selectOption(3)),
    g: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    h: common_vendor.o((...args) => $options.goNext && $options.goNext(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/maple/项目/问卷调查/views_wx/views_wx/pages/survey/survey.vue"]]);
wx.createPage(MiniProgramPage);
