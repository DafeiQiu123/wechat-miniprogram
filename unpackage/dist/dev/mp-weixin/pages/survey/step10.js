"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      feedback: {
        q1: null,
        q2: null,
        q3: null,
        like1: "",
        like2: "",
        like3: "",
        improve1: "",
        improve2: "",
        improve3: "",
        q6: null,
        q7: null,
        q8: null,
        otherFeedback: ""
      },
      questionnaireId: 1,
      // 问卷ID
      userId: "",
      // 用户ID
      submitting: false
      // 是否正在提交
    };
  },
  onLoad() {
    const userInfo = common_vendor.index.getStorageSync("userInfo");
    if (userInfo) {
      this.userId = userInfo.userId || userInfo.id;
      console.log("获取到用户ID:", this.userId);
    } else {
      this.userId = "anonymous_" + (/* @__PURE__ */ new Date()).getTime();
      console.log("使用匿名ID:", this.userId);
    }
  },
  methods: {
    // 选择选项
    selectOption(questionKey, value) {
      this.feedback[questionKey] = value;
    },
    // 文本输入
    inputChange(key, event) {
      this.feedback[key] = event.detail.value;
    },
    // 提交反馈
    submitFeedback() {
      const requiredQuestions = ["q1", "q2", "q3", "q6", "q7", "q8"];
      const notAnswered = requiredQuestions.filter((key) => this.feedback[key] === null);
      if (notAnswered.length > 0) {
        common_vendor.index.showToast({
          title: "请回答所有单选题",
          icon: "none"
        });
        return;
      }
      if (this.submitting) {
        return;
      }
      this.submitting = true;
      const answers = [];
      Object.keys(this.feedback).forEach((key) => {
        if (this.feedback[key] === null || this.feedback[key] === "") {
          return;
        }
        let questionId;
        switch (key) {
          case "q1":
            questionId = 1;
            break;
          case "q2":
            questionId = 2;
            break;
          case "q3":
            questionId = 3;
            break;
          case "like1":
            questionId = 4;
            break;
          case "like2":
            questionId = 4;
            break;
          case "like3":
            questionId = 4;
            break;
          case "improve1":
            questionId = 5;
            break;
          case "improve2":
            questionId = 5;
            break;
          case "improve3":
            questionId = 5;
            break;
          case "q6":
            questionId = 6;
            break;
          case "q7":
            questionId = 7;
            break;
          case "q8":
            questionId = 8;
            break;
          case "otherFeedback":
            questionId = 9;
            break;
        }
        answers.push({
          questionnaireId: this.questionnaireId,
          questionId,
          userId: this.userId || "anonymous",
          userType: this.userId ? 1 : 0,
          // 1表示微信用户，0表示匿名
          content: this.feedback[key].toString()
        });
      });
      utils_request.request.submitAnswers(answers).then((res) => {
        if (res.code === 0) {
          common_vendor.index.showToast({
            title: "提交成功",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.reLaunch({
              url: "/pages/home/home"
            });
          }, 1500);
        } else {
          common_vendor.index.showToast({
            title: res.msg || "提交失败",
            icon: "none"
          });
        }
      }).catch((err) => {
        console.error("提交失败:", err);
        common_vendor.index.showToast({
          title: "提交失败，请稍后重试",
          icon: "none"
        });
      }).finally(() => {
        this.submitting = false;
      });
    },
    // 返回上一页
    goBack() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.feedback.q1 === 1 ? 1 : "",
    b: common_vendor.o(($event) => $options.selectOption("q1", 1)),
    c: $data.feedback.q1 === 2 ? 1 : "",
    d: common_vendor.o(($event) => $options.selectOption("q1", 2)),
    e: $data.feedback.q1 === 3 ? 1 : "",
    f: common_vendor.o(($event) => $options.selectOption("q1", 3)),
    g: $data.feedback.q1 === 4 ? 1 : "",
    h: common_vendor.o(($event) => $options.selectOption("q1", 4)),
    i: $data.feedback.q1 === 5 ? 1 : "",
    j: common_vendor.o(($event) => $options.selectOption("q1", 5)),
    k: $data.feedback.q2 === 1 ? 1 : "",
    l: common_vendor.o(($event) => $options.selectOption("q2", 1)),
    m: $data.feedback.q2 === 2 ? 1 : "",
    n: common_vendor.o(($event) => $options.selectOption("q2", 2)),
    o: $data.feedback.q2 === 3 ? 1 : "",
    p: common_vendor.o(($event) => $options.selectOption("q2", 3)),
    q: $data.feedback.q2 === 4 ? 1 : "",
    r: common_vendor.o(($event) => $options.selectOption("q2", 4)),
    s: $data.feedback.q2 === 5 ? 1 : "",
    t: common_vendor.o(($event) => $options.selectOption("q2", 5)),
    v: $data.feedback.q3 === 1 ? 1 : "",
    w: common_vendor.o(($event) => $options.selectOption("q3", 1)),
    x: $data.feedback.q3 === 2 ? 1 : "",
    y: common_vendor.o(($event) => $options.selectOption("q3", 2)),
    z: $data.feedback.q3 === 3 ? 1 : "",
    A: common_vendor.o(($event) => $options.selectOption("q3", 3)),
    B: $data.feedback.q3 === 4 ? 1 : "",
    C: common_vendor.o(($event) => $options.selectOption("q3", 4)),
    D: $data.feedback.q3 === 5 ? 1 : "",
    E: common_vendor.o(($event) => $options.selectOption("q3", 5)),
    F: common_vendor.o((e) => $options.inputChange("like1", e)),
    G: common_vendor.o((e) => $options.inputChange("like2", e)),
    H: common_vendor.o((e) => $options.inputChange("like3", e)),
    I: common_vendor.o((e) => $options.inputChange("improve1", e)),
    J: common_vendor.o((e) => $options.inputChange("improve2", e)),
    K: common_vendor.o((e) => $options.inputChange("improve3", e)),
    L: $data.feedback.q6 === 1 ? 1 : "",
    M: common_vendor.o(($event) => $options.selectOption("q6", 1)),
    N: $data.feedback.q6 === 2 ? 1 : "",
    O: common_vendor.o(($event) => $options.selectOption("q6", 2)),
    P: $data.feedback.q6 === 3 ? 1 : "",
    Q: common_vendor.o(($event) => $options.selectOption("q6", 3)),
    R: $data.feedback.q6 === 4 ? 1 : "",
    S: common_vendor.o(($event) => $options.selectOption("q6", 4)),
    T: $data.feedback.q6 === 5 ? 1 : "",
    U: common_vendor.o(($event) => $options.selectOption("q6", 5)),
    V: $data.feedback.q7 === 1 ? 1 : "",
    W: common_vendor.o(($event) => $options.selectOption("q7", 1)),
    X: $data.feedback.q7 === 2 ? 1 : "",
    Y: common_vendor.o(($event) => $options.selectOption("q7", 2)),
    Z: $data.feedback.q7 === 3 ? 1 : "",
    aa: common_vendor.o(($event) => $options.selectOption("q7", 3)),
    ab: $data.feedback.q7 === 4 ? 1 : "",
    ac: common_vendor.o(($event) => $options.selectOption("q7", 4)),
    ad: $data.feedback.q7 === 5 ? 1 : "",
    ae: common_vendor.o(($event) => $options.selectOption("q7", 5)),
    af: $data.feedback.q8 === 1 ? 1 : "",
    ag: common_vendor.o(($event) => $options.selectOption("q8", 1)),
    ah: $data.feedback.q8 === 2 ? 1 : "",
    ai: common_vendor.o(($event) => $options.selectOption("q8", 2)),
    aj: $data.feedback.q8 === 3 ? 1 : "",
    ak: common_vendor.o(($event) => $options.selectOption("q8", 3)),
    al: $data.feedback.q8 === 4 ? 1 : "",
    am: common_vendor.o(($event) => $options.selectOption("q8", 4)),
    an: $data.feedback.q8 === 5 ? 1 : "",
    ao: common_vendor.o(($event) => $options.selectOption("q8", 5)),
    ap: common_vendor.o((e) => $options.inputChange("otherFeedback", e)),
    aq: common_vendor.o((...args) => $options.submitFeedback && $options.submitFeedback(...args)),
    ar: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/maple/项目/问卷调查/views_wx/views_wx/pages/survey/step10.vue"]]);
wx.createPage(MiniProgramPage);
