/**
 * 微信登录模拟工具
 * 用于本地开发环境，绕过真实微信登录
 */

import config from '../utils/config.js';

// 模拟的openid前缀
const MOCK_OPENID_PREFIX = 'mock_openid_';

/**
 * 模拟微信登录流程
 * @returns {Promise} 登录结果
 */
export function mockWxLogin() {
  return new Promise((resolve, reject) => {
    console.log('[Mock] 模拟微信登录中...');
    
    // 模拟的用户数据
    const mockUserData = {
      token: 'mock_token_' + Date.now(),
      openid: MOCK_OPENID_PREFIX + Math.random().toString(36).substring(2),
      userId: Math.floor(Math.random() * 1000)
    };
    
    // 模拟网络延迟
    setTimeout(() => {
      console.log('[Mock] 登录成功:', mockUserData);
      resolve({
        code: 200,
        msg: '登录成功',
        data: mockUserData
      });
    }, 500);
  });
}

/**
 * 判断当前token是否为模拟生成的
 * @returns {Boolean} 是否为模拟token
 */
export function isMockLogin() {
  const openid = uni.getStorageSync('openid');
  return openid && openid.startsWith(MOCK_OPENID_PREFIX);
}

/**
 * 检查微信环境
 */
export function checkWxEnvironment() {
  // 获取系统信息
  const systemInfo = uni.getSystemInfoSync();
  
  // 判断是否在微信环境中
  const isWxEnv = systemInfo.environment === 'wxmp' || systemInfo.platform === 'mp-weixin';
  
  return {
    isWxEnv,
    systemInfo
  };
} 