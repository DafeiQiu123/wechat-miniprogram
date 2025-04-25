"use strict";
const common_vendor = require("../common/vendor.js");
const utils_config = require("./config.js");
const requestQueue = [];
let isShowLoading = false;
const showLoading = () => {
  if (requestQueue.length === 0 && !isShowLoading) {
    isShowLoading = true;
    common_vendor.index.showLoading({
      title: "加载中...",
      mask: true
    });
  }
  requestQueue.push(1);
};
const hideLoading = () => {
  requestQueue.pop();
  if (requestQueue.length === 0 && isShowLoading) {
    isShowLoading = false;
    common_vendor.index.hideLoading();
  }
};
const requestInterceptor = (options) => {
  const token = common_vendor.index.getStorageSync("token");
  if (token) {
    options.header = {
      ...options.header,
      "Authorization": `Bearer ${token}`
    };
  }
  if (options.loading !== false) {
    showLoading();
  }
  return options;
};
const responseInterceptor = (response, options) => {
  if (options.loading !== false) {
    hideLoading();
  }
  if (response.statusCode >= 200 && response.statusCode < 300) {
    const result = response.data;
    if (utils_config.config.enableLog) {
      console.log("请求成功:", result);
    }
    return result;
  }
  if (response.statusCode === 401) {
    common_vendor.index.removeStorageSync("token");
    common_vendor.index.removeStorageSync("userInfo");
    common_vendor.index.showToast({
      title: "登录已失效，请重新登录",
      icon: "none",
      duration: 2e3
    });
    setTimeout(() => {
      common_vendor.index.reLaunch({
        url: "/pages/login/index"
        // 修正登录页面路径
      });
    }, 1500);
    return Promise.reject(response);
  }
  common_vendor.index.showToast({
    title: response.data.msg || "请求失败",
    icon: "none",
    duration: 2e3
  });
  return Promise.reject(response);
};
const errorHandler = (error, options) => {
  if (options.loading !== false) {
    hideLoading();
  }
  common_vendor.index.showToast({
    title: "网络连接失败，请检查网络设置",
    icon: "none",
    duration: 2e3
  });
  if (utils_config.config.enableLog) {
    console.error("请求失败:", error);
  }
  return Promise.reject(error);
};
const request = (options) => {
  options = {
    url: "",
    method: "GET",
    data: {},
    header: {
      "Content-Type": "application/json"
    },
    loading: true,
    ...options
  };
  if (options.url.indexOf("http") !== 0) {
    options.url = utils_config.config.baseUrl + options.url;
  }
  options = requestInterceptor(options);
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
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
const get = (url, data = {}, options = {}) => {
  return request({
    url,
    method: "GET",
    data,
    ...options
  });
};
const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: "POST",
    data,
    ...options
  });
};
const put = (url, data = {}, options = {}) => {
  return request({
    url,
    method: "PUT",
    data,
    ...options
  });
};
const del = (url, data = {}, options = {}) => {
  return request({
    url,
    method: "DELETE",
    data,
    ...options
  });
};
const upload = (url, filePath, name = "file", formData = {}, options = {}) => {
  options = {
    loading: true,
    ...options
  };
  if (options.loading !== false) {
    showLoading();
  }
  if (url.indexOf("http") !== 0) {
    url = utils_config.config.baseUrl + url;
  }
  const header = {};
  const token = common_vendor.index.getStorageSync("token");
  if (token) {
    header.Authorization = `Bearer ${token}`;
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.uploadFile({
      url,
      filePath,
      name,
      formData,
      header,
      success: (res) => {
        try {
          if (options.loading !== false) {
            hideLoading();
          }
          if (typeof res.data === "string") {
            res.data = JSON.parse(res.data);
          }
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data);
          } else {
            common_vendor.index.showToast({
              title: res.data.message || "上传失败",
              icon: "none",
              duration: 2e3
            });
            reject(res);
          }
        } catch (e) {
          reject(e);
        }
      },
      fail: (err) => {
        if (options.loading !== false) {
          hideLoading();
        }
        common_vendor.index.showToast({
          title: "上传失败，请检查网络设置",
          icon: "none",
          duration: 2e3
        });
        reject(err);
      }
    });
  });
};
const api = {
  // 用户相关
  user: {
    // 登录
    login: (data) => post("/api/user/login", data),
    // 获取用户信息
    getUserInfo: () => get("/api/user/info")
  },
  // 微信相关
  wx: {
    // 微信登录
    login: (data) => post("/api/wx/login", data)
  },
  // 问卷相关
  questionnaire: {
    // 获取问卷列表
    getList: (params) => get("/api/questionnaire/list", params),
    // 获取问卷详情
    getDetail: (id) => get(`/api/questionnaire/${id}`),
    // 提交问卷回答
    submitAnswer: (data) => post("/api/questionnaire/answer", data)
  }
};
const submitAnswers = (answers) => {
  const answerRequest = {
    questionnaireId: answers.length > 0 ? answers[0].questionnaireId : null,
    userId: answers.length > 0 ? answers[0].userId : null,
    userType: answers.length > 0 ? answers[0].userType : 0,
    answers: answers.map((answer) => ({
      questionId: answer.questionId,
      content: answer.content
    })),
    timeSpent: 0
    // 默认耗时
  };
  return post("/api/answer/submit", answerRequest);
};
const request$1 = {
  request,
  get,
  post,
  put,
  del,
  upload,
  api,
  submitAnswers
};
exports.request = request$1;
