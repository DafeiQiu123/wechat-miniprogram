"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      selectedTechnique: null,
      selectedPersonalTechnique: null,
      selectedTime: null,
      answers: {
        timing: "",
        benefit: "",
        otherTime: "",
        feeling: ""
      }
    };
  },
  onLoad() {
    console.log("Step8页面加载");
  },
  methods: {
    selectTechnique(option) {
      this.selectedTechnique = option;
      console.log("选中技巧选项:", option);
    },
    selectPersonalTechnique(option) {
      this.selectedPersonalTechnique = option;
      console.log("选中个人技巧选项:", option);
    },
    selectTime(option) {
      this.selectedTime = option;
      console.log("选中时间选项:", option);
    },
    inputChange(field, e) {
      this.answers[field] = e.detail.value;
      console.log(`${field} 输入:`, e.detail.value);
    },
    savePlanInfo() {
      try {
        let techniqueName = "";
        switch (this.selectedPersonalTechnique) {
          case 1:
            techniqueName = "缓慢深呼吸";
            break;
          case 2:
            techniqueName = "想象宁静场景";
            break;
          case 3:
            techniqueName = "放松肌肉";
            break;
          case 4:
            techniqueName = "快速平静";
            break;
        }
        let timeInfo = "";
        if (this.selectedTime === 4 && this.answers.otherTime) {
          timeInfo = this.answers.otherTime;
        } else {
          switch (this.selectedTime) {
            case 1:
              timeInfo = "早上醒来后在床上";
              break;
            case 2:
              timeInfo = "刷完牙后在自己房间里";
              break;
            case 3:
              timeInfo = "写作业前坐在书桌边";
              break;
          }
        }
        const planInfo = {
          technique: techniqueName,
          time: timeInfo,
          feeling: this.answers.feeling
        };
        common_vendor.index.setStorageSync("plan_info", JSON.stringify(planInfo));
        console.log("已保存计划信息:", planInfo);
      } catch (e) {
        console.error("保存计划信息失败:", e);
      }
    },
    goBack() {
      common_vendor.index.navigateBack();
    },
    goNext() {
      if (!this.selectedTechnique || !this.selectedPersonalTechnique || !this.selectedTime) {
        common_vendor.index.showToast({
          title: "请完成所有选择",
          icon: "none"
        });
        return;
      }
      if (this.selectedTime === 4 && !this.answers.otherTime) {
        common_vendor.index.showToast({
          title: "请填写其他练习时间",
          icon: "none"
        });
        return;
      }
      this.savePlanInfo();
      common_vendor.index.redirectTo({
        url: "/pages/survey/step9",
        success: () => {
          console.log("成功导航到step9");
        },
        fail: (err) => {
          console.error("导航到step9失败:", err);
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
  return common_vendor.e({
    a: $data.selectedTechnique === 1 ? 1 : "",
    b: common_vendor.o(($event) => $options.selectTechnique(1)),
    c: $data.selectedTechnique === 2 ? 1 : "",
    d: common_vendor.o(($event) => $options.selectTechnique(2)),
    e: $data.selectedTechnique === 3 ? 1 : "",
    f: common_vendor.o(($event) => $options.selectTechnique(3)),
    g: $data.selectedTechnique === 4 ? 1 : "",
    h: common_vendor.o(($event) => $options.selectTechnique(4)),
    i: common_vendor.o((e) => $options.inputChange("timing", e)),
    j: common_vendor.o((e) => $options.inputChange("benefit", e)),
    k: $data.selectedPersonalTechnique === 1 ? 1 : "",
    l: common_vendor.o(($event) => $options.selectPersonalTechnique(1)),
    m: $data.selectedPersonalTechnique === 2 ? 1 : "",
    n: common_vendor.o(($event) => $options.selectPersonalTechnique(2)),
    o: $data.selectedPersonalTechnique === 3 ? 1 : "",
    p: common_vendor.o(($event) => $options.selectPersonalTechnique(3)),
    q: $data.selectedPersonalTechnique === 4 ? 1 : "",
    r: common_vendor.o(($event) => $options.selectPersonalTechnique(4)),
    s: $data.selectedTime === 1 ? 1 : "",
    t: common_vendor.o(($event) => $options.selectTime(1)),
    v: $data.selectedTime === 2 ? 1 : "",
    w: common_vendor.o(($event) => $options.selectTime(2)),
    x: $data.selectedTime === 3 ? 1 : "",
    y: common_vendor.o(($event) => $options.selectTime(3)),
    z: $data.selectedTime === 4 ? 1 : "",
    A: common_vendor.o(($event) => $options.selectTime(4)),
    B: $data.selectedTime === 4
  }, $data.selectedTime === 4 ? {
    C: common_vendor.o((e) => $options.inputChange("otherTime", e))
  } : {}, {
    D: common_vendor.o((e) => $options.inputChange("feeling", e)),
    E: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    F: common_vendor.o((...args) => $options.goNext && $options.goNext(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/maple/项目/问卷调查/views_wx/views_wx/pages/survey/step8.vue"]]);
wx.createPage(MiniProgramPage);
