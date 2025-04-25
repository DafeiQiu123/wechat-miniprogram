"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onLoad() {
    console.log("Step3页面加载");
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    goNext() {
      common_vendor.index.navigateTo({
        url: "/pages/survey/step4"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.o((...args) => $options.goNext && $options.goNext(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/maple/项目/问卷调查/views_wx/views_wx/pages/survey/step3.vue"]]);
wx.createPage(MiniProgramPage);
