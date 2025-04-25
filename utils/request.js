/**
 * 网络请求工具类
 */
import config from './config.js';

// 请求队列
const requestQueue = [];
// 是否正在显示loading
let isShowLoading = false;

/**
 * 显示loading
 */
const showLoading = () => {
  if (requestQueue.length === 0 && !isShowLoading) {
    isShowLoading = true;
    uni.showLoading({
      title: '加载中...',
      mask: true
    });
  }
  requestQueue.push(1);
};

/**
 * 隐藏loading
 */
const hideLoading = () => {
  requestQueue.pop();
  if (requestQueue.length === 0 && isShowLoading) {
    isShowLoading = false;
    uni.hideLoading();
  }
};

/**
 * 请求拦截器
 * @param {Object} options 请求配置
 */
const requestInterceptor = (options) => {
  // 添加token
  const token = uni.getStorageSync('token');
  if (token) {
    options.header = {
      ...options.header,
      'Authorization': `Bearer ${token}`
    };
  }
  
  // 显示loading
  if (options.loading !== false) {
    showLoading();
  }
  
  return options;
};

/**
 * 响应拦截器
 * @param {Object} response 响应结果
 * @param {Object} options 请求配置
 */
const responseInterceptor = (response, options) => {
  // 隐藏loading
  if (options.loading !== false) {
    hideLoading();
  }
  
  // HTTP请求成功
  if (response.statusCode >= 200 && response.statusCode < 300) {
    const result = response.data;
    
    if (config.enableLog) {
      console.log('请求成功:', result);
    }
    
    return result;
  }
  
  // 登录失效
  if (response.statusCode === 401) {
    uni.removeStorageSync('token');
    uni.removeStorageSync('userInfo');
    uni.showToast({
      title: '登录已失效，请重新登录',
      icon: 'none',
      duration: 2000
    });
    
    // 延迟跳转到登录页
    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/login/index' // 修正登录页面路径
      });
    }, 1500);
    return Promise.reject(response);
  }
  
  // 其他错误
  uni.showToast({
    title: response.data.msg || '请求失败',
    icon: 'none',
    duration: 2000
  });
  
  return Promise.reject(response);
};

/**
 * 错误处理
 * @param {Object} error 错误信息
 * @param {Object} options 请求配置
 */
const errorHandler = (error, options) => {
  // 隐藏loading
  if (options.loading !== false) {
    hideLoading();
  }
  
  // 显示错误信息
  uni.showToast({
    title: '网络连接失败，请检查网络设置',
    icon: 'none',
    duration: 2000
  });
  
  if (config.enableLog) {
    console.error('请求失败:', error);
  }
  
  return Promise.reject(error);
};

/**
 * 发送请求
 * @param {Object} options 请求配置
 */
const request = (options) => {
  // 合并请求配置
  options = {
    url: '',
    method: 'GET',
    data: {},
    header: {
      'Content-Type': 'application/json'
    },
    loading: true,
    ...options
  };
  
  // 拼接完整URL
  if (options.url.indexOf('http') !== 0) {
    options.url = config.baseUrl + options.url;
  }
  
  // 请求拦截器
  options = requestInterceptor(options);
  
  // 发送请求
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        try {
          const result = responseInterceptor(res, options);
          resolve(result);
        } catch (e) {
          reject(e);
        }
      },
      fail: (err) => {
        errorHandler(err, options);
        reject(err);
      }
    });
  });
};

/**
 * GET请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 请求配置
 */
const get = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'GET',
    data,
    ...options
  });
};

/**
 * POST请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 请求配置
 */
const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'POST',
    data,
    ...options
  });
};

/**
 * PUT请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 请求配置
 */
const put = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'PUT',
    data,
    ...options
  });
};

/**
 * DELETE请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 请求配置
 */
const del = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'DELETE',
    data,
    ...options
  });
};

/**
 * 上传文件
 * @param {String} url 请求地址
 * @param {String} filePath 文件路径
 * @param {String} name 文件对应的key
 * @param {Object} formData 附加的表单数据
 * @param {Object} options 请求配置
 */
const upload = (url, filePath, name = 'file', formData = {}, options = {}) => {
  // 合并请求配置
  options = {
    loading: true,
    ...options
  };
  
  // 显示loading
  if (options.loading !== false) {
    showLoading();
  }
  
  // 拼接完整URL
  if (url.indexOf('http') !== 0) {
    url = config.baseUrl + url;
  }
  
  // 添加token
  const header = {};
  const token = uni.getStorageSync('token');
  if (token) {
    header.Authorization = `Bearer ${token}`;
  }
  
  // 发送请求
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url,
      filePath,
      name,
      formData,
      header,
      success: (res) => {
        try {
          // 隐藏loading
          if (options.loading !== false) {
            hideLoading();
          }
          
          // 解析响应数据
          if (typeof res.data === 'string') {
            res.data = JSON.parse(res.data);
          }
          
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data);
          } else {
            uni.showToast({
              title: res.data.message || '上传失败',
              icon: 'none',
              duration: 2000
            });
            reject(res);
          }
        } catch (e) {
          reject(e);
        }
      },
      fail: (err) => {
        // 隐藏loading
        if (options.loading !== false) {
          hideLoading();
        }
        
        // 显示错误信息
        uni.showToast({
          title: '上传失败，请检查网络设置',
          icon: 'none',
          duration: 2000
        });
        
        reject(err);
      }
    });
  });
};

/**
 * 业务接口
 */
const api = {
  // 用户相关
  user: {
    // 登录
    login: (data) => post('/api/user/login', data),
    // 获取用户信息
    getUserInfo: () => get('/api/user/info')
  },
  
  // 微信相关
  wx: {
    // 微信登录
    login: (data) => post('/api/wx/login', data)
  },
  
  // 问卷相关
  questionnaire: {
    // 获取问卷列表
    getList: (params) => get('/api/questionnaire/list', params),
    // 获取问卷详情
    getDetail: (id) => get(`/api/questionnaire/${id}`),
    // 提交问卷回答
    submitAnswer: (data) => post('/api/questionnaire/answer', data)
  }
};

/**
 * 提交问卷答案
 * @param {Array} answers 答案数组
 */
const submitAnswers = (answers) => {
  // 将答案数组包装成一个请求对象
  const answerRequest = {
    questionnaireId: answers.length > 0 ? answers[0].questionnaireId : null,
    userId: answers.length > 0 ? answers[0].userId : null,
    userType: answers.length > 0 ? answers[0].userType : 0,
    answers: answers.map(answer => ({
      questionId: answer.questionId,
      content: answer.content
    })),
    timeSpent: 0 // 默认耗时
  };
  
  return post('/api/answer/submit', answerRequest);
};

export default {
  request,
  get,
  post,
  put,
  del,
  upload,
  api,
  submitAnswers
}; 