/**
 * 配置文件
 */

// 服务器配置
const serverOptions = {
  // 生产环境 - 真实部署的服务器
  // production: 'https://your-server-domain.com',

  // 开发环境 - 本地局域网IP
  development: 'http://wj.funyog.com:7070' // 使用您的实际IP地址 192.168.1.59（之前是192.168.1.3）
};

// 选择当前使用的环境
const currentEnv = 'development'; // 可选：'production', 'development'

// 设置当前使用的服务器地址
const baseUrl = serverOptions[currentEnv];

// 导出配置
export default {
  // 环境信息
  env: currentEnv,

  // API基础URL
  baseUrl,

  // 请求超时时间（毫秒）
  timeout: 10000,

  // 微信小程序配置
  wx: {
    appId: 'wxd16967caf15e5be1' // 确保与后端配置保持一致
  },

  // 是否开启日志
  enableLog: true,

  // API端点
  api: {
    wxLogin: `${baseUrl}/api/wx/login`
    // 其他API地址...
  }
};
