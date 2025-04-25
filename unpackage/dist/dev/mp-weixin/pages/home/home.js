"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onLoad() {
  },
  methods: {
    // 跳转到课程页面
    navigateToCourse() {
      common_vendor.index.navigateTo({
        url: "/pages/index/index"
      });
    },
    // 显示联系客服确认框
    showContactConfirm() {
      common_vendor.index.showModal({
        title: "联系客服",
        content: "是否联系客服咨询？",
        confirmText: "确认",
        cancelText: "取消",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.navigateTo({
              url: "/pages/contact/contact",
              fail: (err) => {
                console.error("打开客服页面失败", err);
                common_vendor.index.showToast({
                  title: "打开客服失败，请重试",
                  icon: "none"
                });
              }
            });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.navigateToCourse && $options.navigateToCourse(...args)),
    b: common_vendor.o((...args) => $options.showContactConfirm && $options.showContactConfirm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/maple/项目/问卷调查/views_wx/views_wx/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
