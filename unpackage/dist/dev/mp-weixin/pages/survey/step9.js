"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      responses: {
        scene: "",
        see: "",
        hear: "",
        smell: "",
        touch: "",
        taste: ""
      },
      planInfo: {
        technique: "",
        time: "",
        feeling: ""
      }
    };
  },
  onLoad() {
    console.log("Step9页面加载");
    this.loadResponses();
    this.loadPlanInfo();
  },
  methods: {
    loadResponses() {
      try {
        const storedResponses = common_vendor.index.getStorageSync("scene_responses");
        if (storedResponses) {
          this.responses = JSON.parse(storedResponses);
          console.log("加载到的场景回答:", this.responses);
        } else {
          console.log("未找到保存的场景回答");
        }
      } catch (e) {
        console.error("获取存储的回答失败:", e);
      }
    },
    loadPlanInfo() {
      try {
        const storedPlan = common_vendor.index.getStorageSync("plan_info");
        if (storedPlan) {
          this.planInfo = JSON.parse(storedPlan);
          console.log("加载到的计划信息:", this.planInfo);
        } else {
          console.log("未找到保存的计划信息");
        }
      } catch (e) {
        console.error("获取存储的计划信息失败:", e);
      }
    },
    goBack() {
      common_vendor.index.navigateBack();
    },
    finishSurvey() {
      common_vendor.index.redirectTo({
        url: "/pages/survey/step10",
        success: () => {
          console.log("成功导航到反馈页面");
        },
        fail: (err) => {
          console.error("导航到反馈页面失败:", err);
          common_vendor.index.showToast({
            title: "导航失败，请重试",
            icon: "none"
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.responses.scene || "未填写"),
    b: common_vendor.t($data.responses.see || "未填写"),
    c: common_vendor.t($data.responses.hear || "未填写"),
    d: common_vendor.t($data.responses.smell || "未填写"),
    e: common_vendor.t($data.responses.touch || "未填写"),
    f: common_vendor.t($data.responses.taste || "未填写"),
    g: common_vendor.t($data.planInfo.technique || "缓慢深呼吸"),
    h: common_vendor.t($data.planInfo.time || "早上醒来后在床上"),
    i: common_vendor.t($data.planInfo.feeling || "未填写"),
    j: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    k: common_vendor.o((...args) => $options.finishSurvey && $options.finishSurvey(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/maple/项目/问卷调查/views_wx/views_wx/pages/survey/step9.vue"]]);
wx.createPage(MiniProgramPage);
