"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_auth = require("../../utils/auth.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      isLoggedIn: false
    };
  },
  onShow() {
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      const userInfo = utils_auth.auth.getUserInfo();
      if (userInfo) {
        this.userInfo = userInfo;
        this.isLoggedIn = true;
      } else {
        this.userInfo = {};
        this.isLoggedIn = false;
      }
    },
    // 退出登录
    logout() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            utils_auth.auth.logout().then(() => {
              this.userInfo = {};
              this.isLoggedIn = false;
              common_vendor.index.showToast({
                title: "已退出登录",
                icon: "success"
              });
            });
          }
        }
      });
    },
    // 导航到其他页面
    navigateTo(url) {
      common_vendor.index.navigateTo({
        url,
        fail: (err) => {
          console.error("导航失败:", err);
          if (url === "/pages/home/home") {
            common_vendor.index.switchTab({
              url
            });
          }
        }
      });
    },
    // 跳转到登录页面
    goToLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login",
        fail: (err) => {
          console.error("跳转登录页面失败:", err);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.userInfo.avatarUrl || "/static/icon/avatar.png",
    b: $data.isLoggedIn
  }, $data.isLoggedIn ? common_vendor.e({
    c: common_vendor.t($data.userInfo.nickName),
    d: $data.userInfo.userId
  }, $data.userInfo.userId ? {
    e: common_vendor.t($data.userInfo.userId)
  } : {}) : {}, {
    f: common_vendor.t($data.isLoggedIn ? "退出登录" : "登录"),
    g: $data.isLoggedIn ? 1 : "",
    h: common_vendor.o(($event) => $data.isLoggedIn ? $options.logout() : $options.goToLogin())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/maple/项目/问卷调查/views_wx/views_wx/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
