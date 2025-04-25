"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "平静训练营",
      isLoading: true
    };
  },
  onLoad() {
    this.checkLoginStatus();
    console.log("首页加载，查看登录信息:", common_vendor.index.getStorageSync("token"), common_vendor.index.getStorageSync("userInfo"));
  },
  methods: {
    checkLoginStatus() {
      this.isLoading = true;
      const token = common_vendor.index.getStorageSync("token");
      if (!token) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none",
          duration: 1500,
          success: () => {
            setTimeout(() => {
              common_vendor.index.redirectTo({
                url: "/pages/login/login",
                fail: (err) => {
                  console.error("跳转登录页面失败:", err);
                  common_vendor.index.showToast({
                    title: "跳转失败，请重试",
                    icon: "none"
                  });
                }
              });
            }, 1500);
          }
        });
      } else {
        console.log("用户已登录，token存在");
        this.isLoading = false;
      }
    },
    goToSurvey() {
      common_vendor.index.navigateTo({
        url: "../survey/survey"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goToSurvey && $options.goToSurvey(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/maple/项目/问卷调查/views_wx/views_wx/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
