"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      selectedRating: null,
      afterRating: null
    };
  },
  methods: {
    selectRating(rating) {
      this.selectedRating = rating;
      console.log("选中评分:", rating);
    },
    selectAfterRating(rating) {
      this.afterRating = rating;
      console.log("练习后评分:", rating);
    },
    goBack() {
      common_vendor.index.navigateBack();
    },
    goNext() {
      if (this.selectedRating) {
        if (this.afterRating) {
          common_vendor.index.navigateTo({
            url: "/pages/survey/step3"
          });
        } else {
          common_vendor.index.showToast({
            title: "请完成练习后评分",
            icon: "none"
          });
        }
      } else {
        common_vendor.index.showToast({
          title: "请选择一个评分",
          icon: "none"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f(10, (num, k0, i0) => {
      return {
        a: common_vendor.t(num),
        b: num,
        c: $data.selectedRating === num ? 1 : "",
        d: common_vendor.o(($event) => $options.selectRating(num), num)
      };
    }),
    b: $data.selectedRating
  }, $data.selectedRating ? common_vendor.e({
    c: common_vendor.f(10, (num, k0, i0) => {
      return {
        a: common_vendor.t(num),
        b: "after-" + num,
        c: $data.afterRating === num ? 1 : "",
        d: common_vendor.o(($event) => $options.selectAfterRating(num), "after-" + num)
      };
    }),
    d: $data.afterRating
  }, $data.afterRating ? {} : {}) : {}, {
    e: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    f: common_vendor.o((...args) => $options.goNext && $options.goNext(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/maple/项目/问卷调查/views_wx/views_wx/pages/survey/step2.vue"]]);
wx.createPage(MiniProgramPage);
