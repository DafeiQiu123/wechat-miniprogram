"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/index/index.js";
  "./pages/survey/survey.js";
  "./pages/survey/step2.js";
  "./pages/survey/step3.js";
  "./pages/survey/step4.js";
  "./pages/survey/step5.js";
  "./pages/survey/step6.js";
  "./pages/survey/step7.js";
  "./pages/survey/step8.js";
  "./pages/survey/step9.js";
  "./pages/survey/step10.js";
  "./pages/my/my.js";
  "./pages/login/login.js";
  "./pages/contact/contact.js";
}
const pages = [
  "pages/index/index",
  "pages/survey/survey",
  "pages/survey/step2",
  "pages/survey/step3"
];
const window = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "压力管理",
  navigationBarBackgroundColor: "#ffffff",
  backgroundColor: "#ffffff"
};
const style = "v2";
const sitemapLocation = "sitemap.json";
const App = {
  pages,
  window,
  style,
  sitemapLocation
};
let appVm = null;
function createApp() {
  const app = common_vendor.createSSRApp(App);
  const vm = app.config.globalProperties;
  appVm = vm;
  if (typeof common_vendor.wx$1 !== "undefined") {
    const oldGetApp = global.getApp;
    global.getApp = function() {
      const app2 = oldGetApp.apply(this, arguments);
      if (!app2.$vm && appVm) {
        app2.$vm = appVm;
      }
      return app2;
    };
  }
  return {
    app,
    vm
    // 暴露 vm 对象，使得 getApp().$vm 能够正常工作
  };
}
function getVM() {
  return appVm;
}
createApp().app.mount("#app");
exports.createApp = createApp;
exports.getVM = getVM;
