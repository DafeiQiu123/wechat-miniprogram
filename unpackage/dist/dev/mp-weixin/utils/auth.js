"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request = require("./request.js");
const USER_INFO_KEY = "userInfo";
const TOKEN_KEY = "token";
const saveUserInfo = (userInfo) => {
  if (userInfo) {
    common_vendor.index.setStorageSync(USER_INFO_KEY, userInfo);
  }
};
const saveToken = (token) => {
  if (token) {
    common_vendor.index.setStorageSync(TOKEN_KEY, token);
  }
};
const getUserInfo = () => {
  return common_vendor.index.getStorageSync(USER_INFO_KEY) || null;
};
const getToken = () => {
  return common_vendor.index.getStorageSync(TOKEN_KEY) || "";
};
const clearUserInfo = () => {
  common_vendor.index.removeStorageSync(USER_INFO_KEY);
  common_vendor.index.removeStorageSync(TOKEN_KEY);
};
const isLoggedIn = () => {
  return !!getToken();
};
const wxLogin = () => {
  return new Promise((resolve, reject) => {
    common_vendor.index.login({
      provider: "weixin",
      success: async (loginRes) => {
        if (loginRes.code) {
          try {
            const res = await utils_request.request.post("/api/user/wx-login", {
              code: loginRes.code
            });
            if (res.data && res.data.token) {
              saveToken(res.data.token);
              saveUserInfo(res.data.userInfo);
              resolve(res.data);
            } else {
              reject(new Error("登录失败，未获取到有效的用户信息"));
            }
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error("微信登录失败"));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    if (!isLoggedIn()) {
      reject(new Error("用户未登录"));
      return;
    }
    common_vendor.index.getUserProfile({
      desc: "用于完善用户资料",
      success: async (profileRes) => {
        try {
          const res = await utils_request.request.post("/api/user/update-profile", {
            userInfo: profileRes.userInfo
          });
          if (res.data && res.data.userInfo) {
            saveUserInfo(res.data.userInfo);
            resolve(res.data.userInfo);
          } else {
            reject(new Error("获取用户信息失败"));
          }
        } catch (error) {
          reject(error);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
const logout = () => {
  return new Promise((resolve) => {
    clearUserInfo();
    resolve();
  });
};
const checkLogin = (redirectUrl) => {
  if (!isLoggedIn()) {
    common_vendor.index.navigateTo({
      url: "/pages/login/login" + (redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : "")
    });
    return false;
  }
  return true;
};
const auth = {
  saveUserInfo,
  saveToken,
  getUserInfo,
  getToken,
  clearUserInfo,
  isLoggedIn,
  wxLogin,
  getUserProfile,
  logout,
  checkLogin
};
exports.auth = auth;
