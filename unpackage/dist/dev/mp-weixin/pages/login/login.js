"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_config = require("../../utils/config.js");
const _sfc_main = {
  data() {
    return {
      code: "",
      showDebug: false,
      config: utils_config.config,
      loading: false
    };
  },
  onLoad() {
    this.getWxCode();
  },
  methods: {
    toggleDebug() {
      this.showDebug = !this.showDebug;
    },
    checkApiConfig() {
      console.log("当前API配置:", utils_config.config);
      common_vendor.index.showModal({
        title: "API配置",
        content: `当前API地址: ${utils_config.config.api.wxLogin}`,
        showCancel: false
      });
    },
    mockLogin() {
      console.log("执行模拟登录");
      common_vendor.index.setStorageSync("token", "mock_token_123456");
      common_vendor.index.setStorageSync("userInfo", {
        openid: "mock_openid_123456",
        userId: 1
      });
      common_vendor.index.showToast({
        title: "模拟登录成功",
        icon: "success"
      });
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/index/index",
          success: () => {
            console.log("跳转首页成功");
          },
          fail: (err) => {
            console.error("跳转首页失败:", err);
          }
        });
      }, 1500);
    },
    // 测试服务器连接
    testServerConnection() {
      common_vendor.index.showLoading({
        title: "测试连接中..."
      });
      common_vendor.index.request({
        url: utils_config.config.baseUrl,
        method: "GET",
        timeout: 5e3,
        success: (res) => {
          common_vendor.index.hideLoading();
          common_vendor.index.showModal({
            title: "连接测试",
            content: `服务器连接成功! 状态码: ${res.statusCode}`,
            showCancel: false
          });
        },
        fail: (err) => {
          common_vendor.index.hideLoading();
          common_vendor.index.showModal({
            title: "连接测试",
            content: `连接失败: ${err.errMsg}`,
            showCancel: false
          });
        }
      });
    },
    // 检查微信配置
    checkWxConfig() {
      const info = common_vendor.index.getSystemInfoSync();
      console.log("系统信息:", info);
      common_vendor.index.showModal({
        title: "微信环境信息",
        content: `操作系统: ${info.platform}
微信版本: ${info.version}
系统版本: ${info.system}
小程序基础库: ${info.SDKVersion}`,
        showCancel: false
      });
    },
    // 假装登录成功的调试方法
    debugLoginSuccess() {
      const mockResponse = {
        code: 0,
        msg: "登录成功",
        data: {
          token: "debug_token_" + (/* @__PURE__ */ new Date()).getTime(),
          openid: "debug_openid_" + Math.random().toString(36).substring(2),
          userId: 999
        }
      };
      common_vendor.index.setStorageSync("token", mockResponse.data.token);
      common_vendor.index.setStorageSync("userInfo", mockResponse.data);
      console.log("调试模式: 保存的登录信息", mockResponse.data);
      common_vendor.index.showToast({
        title: "调试登录成功",
        icon: "success"
      });
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/home/home",
          success: () => {
            console.log("跳转到首页成功");
          },
          fail: (err) => {
            console.error("跳转到首页失败:", err);
          }
        });
      }, 1500);
    },
    getWxCode() {
      common_vendor.index.login({
        provider: "weixin",
        success: (loginRes) => {
          this.code = loginRes.code;
          console.log("获取code成功:", this.code);
        },
        fail: (err) => {
          console.error("获取code失败:", err);
          common_vendor.index.showToast({
            title: "获取登录信息失败",
            icon: "none"
          });
        }
      });
    },
    // 获取用户信息并登录
    handleGetUserInfo(e) {
      if (e.detail.errMsg !== "getUserInfo:ok") {
        common_vendor.index.showToast({
          title: "获取用户信息失败",
          icon: "none"
        });
        return;
      }
      this.loading = true;
      if (!this.code) {
        common_vendor.index.login({
          provider: "weixin",
          success: (loginRes) => {
            this.code = loginRes.code;
            console.log("重新获取code成功:", this.code);
            this.processLogin(e.detail.userInfo);
          },
          fail: (err) => {
            console.error("获取code失败:", err);
            this.loading = false;
            common_vendor.index.showToast({
              title: "获取登录信息失败",
              icon: "none"
            });
          }
        });
      } else {
        this.processLogin(e.detail.userInfo);
      }
    },
    // 处理登录流程
    processLogin(userInfo) {
      console.log("开始登录请求，code:", this.code);
      const loginData = {
        code: this.code,
        userInfo: JSON.stringify(userInfo)
        // 将userInfo对象转换为JSON字符串
      };
      console.log("登录请求数据:", loginData);
      console.log("登录请求地址:", utils_config.config.baseUrl + "/api/wx/login");
      common_vendor.index.request({
        url: utils_config.config.baseUrl + "/api/wx/login",
        method: "POST",
        data: loginData,
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          console.log("登录响应完整数据:", res);
          if (res.statusCode === 200) {
            const responseData = res.data;
            console.log("登录响应数据:", responseData);
            if (responseData.code === 0) {
              console.log("登录成功, 保存数据:", responseData.data);
              common_vendor.index.setStorageSync("token", responseData.data.token);
              common_vendor.index.setStorageSync("userInfo", responseData.data);
              common_vendor.index.showToast({
                title: "登录成功",
                icon: "success"
              });
              setTimeout(() => {
                common_vendor.index.switchTab({
                  url: "/pages/home/home",
                  success: () => {
                    console.log("跳转到首页成功");
                  },
                  fail: (err) => {
                    console.error("跳转到首页失败:", err);
                  }
                });
              }, 1500);
            } else {
              console.error("业务逻辑错误:", responseData);
              common_vendor.index.showToast({
                title: responseData.msg || "登录失败",
                icon: "none"
              });
            }
          } else {
            console.error("HTTP错误:", res.statusCode);
            common_vendor.index.showToast({
              title: "服务器响应错误: " + res.statusCode,
              icon: "none"
            });
          }
        },
        fail: (err) => {
          console.error("请求失败:", err);
          common_vendor.index.showToast({
            title: "网络请求失败: " + err.errMsg,
            icon: "none"
          });
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.handleGetUserInfo && $options.handleGetUserInfo(...args)),
    b: $data.showDebug
  }, $data.showDebug ? {
    c: common_vendor.t($data.config.env),
    d: common_vendor.t($data.config.baseUrl),
    e: common_vendor.t($data.code || "未获取"),
    f: common_vendor.o((...args) => $options.checkApiConfig && $options.checkApiConfig(...args)),
    g: common_vendor.o((...args) => $options.testServerConnection && $options.testServerConnection(...args)),
    h: common_vendor.o((...args) => $options.getWxCode && $options.getWxCode(...args)),
    i: common_vendor.o((...args) => $options.checkWxConfig && $options.checkWxConfig(...args)),
    j: common_vendor.o((...args) => $options.debugLoginSuccess && $options.debugLoginSuccess(...args)),
    k: common_vendor.o((...args) => $options.mockLogin && $options.mockLogin(...args))
  } : {}, {
    l: common_vendor.o((...args) => $options.toggleDebug && $options.toggleDebug(...args)),
    m: $data.loading
  }, $data.loading ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/maple/项目/问卷调查/views_wx/views_wx/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
