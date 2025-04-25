/**
 * 用户认证工具类
 */
import request from './request.js';

// 用户信息存储key
const USER_INFO_KEY = 'userInfo';
const TOKEN_KEY = 'token';

/**
 * 保存用户信息到本地存储
 * @param {Object} userInfo 用户信息
 */
const saveUserInfo = (userInfo) => {
  if (userInfo) {
    uni.setStorageSync(USER_INFO_KEY, userInfo);
  }
};

/**
 * 保存token到本地存储
 * @param {String} token JWT令牌
 */
const saveToken = (token) => {
  if (token) {
    uni.setStorageSync(TOKEN_KEY, token);
  }
};

/**
 * 获取本地存储的用户信息
 * @returns {Object} 用户信息
 */
const getUserInfo = () => {
  return uni.getStorageSync(USER_INFO_KEY) || null;
};

/**
 * 获取本地存储的token
 * @returns {String} token
 */
const getToken = () => {
  return uni.getStorageSync(TOKEN_KEY) || '';
};

/**
 * 清除本地存储的用户信息和token
 */
const clearUserInfo = () => {
  uni.removeStorageSync(USER_INFO_KEY);
  uni.removeStorageSync(TOKEN_KEY);
};

/**
 * 检查用户是否已登录
 * @returns {Boolean} 是否已登录
 */
const isLoggedIn = () => {
  return !!getToken();
};

/**
 * 微信登录
 * @returns {Promise} 登录结果
 */
const wxLogin = () => {
  return new Promise((resolve, reject) => {
    // 获取微信登录code
    uni.login({
      provider: 'weixin',
      success: async (loginRes) => {
        if (loginRes.code) {
          try {
            // 发送code到后端换取token和用户信息
            const res = await request.post('/api/user/wx-login', {
              code: loginRes.code
            });
            
            // 存储token和用户信息
            if (res.data && res.data.token) {
              saveToken(res.data.token);
              saveUserInfo(res.data.userInfo);
              resolve(res.data);
            } else {
              reject(new Error('登录失败，未获取到有效的用户信息'));
            }
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error('微信登录失败'));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

/**
 * 获取用户信息
 * @returns {Promise} 用户信息
 */
const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    // 检查是否已经登录
    if (!isLoggedIn()) {
      reject(new Error('用户未登录'));
      return;
    }
    
    // 获取用户信息
    uni.getUserProfile({
      desc: '用于完善用户资料',
      success: async (profileRes) => {
        try {
          // 更新用户信息到后端
          const res = await request.post('/api/user/update-profile', {
            userInfo: profileRes.userInfo
          });
          
          // 更新本地存储的用户信息
          if (res.data && res.data.userInfo) {
            saveUserInfo(res.data.userInfo);
            resolve(res.data.userInfo);
          } else {
            reject(new Error('获取用户信息失败'));
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

/**
 * 退出登录
 */
const logout = () => {
  return new Promise((resolve) => {
    clearUserInfo();
    resolve();
  });
};

/**
 * 检查登录状态，如果未登录则跳转到登录页
 * @param {String} redirectUrl 登录成功后重定向的地址
 */
const checkLogin = (redirectUrl) => {
  if (!isLoggedIn()) {
    uni.navigateTo({
      url: '/pages/login/login' + (redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : '')
    });
    return false;
  }
  return true;
};

export default {
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