import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

let appVm = null

export function createApp() {
  const app = createSSRApp(App)
  
  // 添加全局对象，兼容 getApp().$vm 调用
  const vm = app.config.globalProperties
  appVm = vm
  
  // 在 wx 环境下添加 $vm 属性到 getApp()
  if (typeof wx !== 'undefined') {
    const oldGetApp = global.getApp
    global.getApp = function() {
      const app = oldGetApp.apply(this, arguments)
      // 检查 $vm 是否已存在
      if (!app.$vm && appVm) {
        app.$vm = appVm
      }
      return app
    }
  }
  
  return {
    app,
    vm  // 暴露 vm 对象，使得 getApp().$vm 能够正常工作
  }
}

// 导出一个可以被直接访问的 vm 对象
export function getVM() {
  return appVm
}
// #endif