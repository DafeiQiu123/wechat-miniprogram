<template>
  <view class="login-container">
    <view class="logo">
      <image src="/static/logo.png" mode="aspectFit"></image>
    </view>
    <view class="title">欢迎使用问卷调查系统</view>
    <view class="subtitle">请使用微信登录</view>
    
    <button class="login-btn" open-type="getUserInfo" @getuserinfo="handleGetUserInfo">
      微信一键登录
    </button>
    
    <view class="loading" v-if="loading">
      <view class="loading-text">登录中...</view>
    </view>
  </view>
</template>

<script>
import request from '@/utils/request.js'
import config from '@/utils/config.js'

export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    // 获取用户信息
    async handleGetUserInfo(e) {
      if (e.detail.errMsg !== 'getUserInfo:ok') {
        uni.showToast({
          title: '获取用户信息失败',
          icon: 'none'
        })
        return
      }
      
      this.loading = true
      try {
        // 获取微信登录code
        const loginRes = await uni.login()
        if (loginRes.errMsg !== 'login:ok') {
          throw new Error('微信登录失败')
        }
        
        // 调用后端登录接口
        const res = await request.api.wx.login({
          code: loginRes.code,
          userInfo: e.detail.userInfo
        })
        
        console.log('登录响应:', res)
        
        if (res.code === 0) {
          console.log('登录成功，准备保存token和跳转')
          // 保存token和用户信息
          uni.setStorageSync('token', res.data.token)
          uni.setStorageSync('userInfo', res.data)
          
          // 登录成功，跳转到首页
          uni.switchTab({
            url: '/pages/index/index',
            success: () => {
              console.log('跳转到首页成功')
            },
            fail: (err) => {
              console.error('跳转到首页失败:', err)
            }
          })
        } else {
          throw new Error(res.msg || '登录失败')
        }
      } catch (error) {
        console.error('登录失败:', error)
        uni.showToast({
          title: error.message || '登录失败，请重试',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
  min-height: 100vh;
  background-color: #f8f8f8;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin: 100rpx 0 50rpx;
}

.logo image {
  width: 100%;
  height: 100%;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.subtitle {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 100rpx;
}

.login-btn {
  width: 80%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  background-color: #07c160;
  color: #fff;
  font-size: 32rpx;
  border-radius: 44rpx;
  margin-top: 40rpx;
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.loading-text {
  color: #fff;
  font-size: 32rpx;
}
</style> 