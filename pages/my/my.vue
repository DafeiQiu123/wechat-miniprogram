<template>
	<view class="container">
		<view class="header">
			<view class="user-info">
				<view class="avatar-container">
					<image class="avatar" :src="userInfo.avatarUrl || '/static/icon/avatar.png'" mode="aspectFill"></image>
				</view>
				<view class="user-details" v-if="isLoggedIn">
					<text class="nickname">{{userInfo.nickName}}</text>
					<text class="user-id" v-if="userInfo.userId">ID: {{userInfo.userId}}</text>
				</view>
				<view class="user-details" v-else>
					<text class="nickname">未登录</text>
				</view>
			</view>
		</view>
		
		<view class="content">
			<view class="menu-list">
				<!-- <view class="menu-item" @click="navigateTo('/pages/survey/survey')">
					<text class="menu-icon">📝</text>
					<text class="menu-text">参与调查</text>
					<text class="menu-arrow">〉</text>
				</view>
				
				<view class="menu-item" @click="navigateTo('/pages/history/history')">
					<text class="menu-icon">📊</text>
					<text class="menu-text">历史记录</text>
					<text class="menu-arrow">〉</text>
				</view>
				
				<view class="menu-item" @click="navigateTo('/pages/settings/settings')">
					<text class="menu-icon">⚙️</text>
					<text class="menu-text">设置</text>
					<text class="menu-arrow">〉</text>
				</view>
				
				<view class="menu-item" @click="navigateTo('/pages/feedback/feedback')">
					<text class="menu-icon">💬</text>
					<text class="menu-text">意见反馈</text>
					<text class="menu-arrow">〉</text>
				</view>
				
				<view class="menu-item" @click="navigateTo('/pages/about/about')">
					<text class="menu-icon">ℹ️</text>
					<text class="menu-text">关于我们</text>
					<text class="menu-arrow">〉</text>
				</view> -->
			</view>
			
			<view class="action-button" @click="isLoggedIn ? logout() : goToLogin()">
				<text class="action-text" :class="{'logout-text': isLoggedIn}">{{isLoggedIn ? '退出登录' : '登录'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import auth from '@/utils/auth.js';
	
	export default {
		data() {
			return {
				userInfo: {},
				isLoggedIn: false
			}
		},
		onShow() {
			// 每次页面显示时获取最新的用户信息
			this.getUserInfo();
		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				// 从本地存储获取用户信息
				const userInfo = auth.getUserInfo();
				if (userInfo) {
					this.userInfo = userInfo;
					this.isLoggedIn = true;
				} else {
					this.userInfo = {};
					this.isLoggedIn = false;
				}
			},
			// 退出登录
			logout() {
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗？',
					success: (res) => {
						if (res.confirm) {
							auth.logout().then(() => {
								this.userInfo = {};
								this.isLoggedIn = false;
								uni.showToast({
									title: '已退出登录',
									icon: 'success'
								});
							});
						}
					}
				});
			},
			// 导航到其他页面
			navigateTo(url) {
				uni.navigateTo({
					url: url,
					fail: (err) => {
						console.error('导航失败:', err);
						// 对于tabBar页面使用switchTab
						if (url === '/pages/home/home') {
							uni.switchTab({
								url: url
							});
						}
					}
				});
			},
			// 跳转到登录页面
			goToLogin() {
				uni.navigateTo({
					url: '/pages/login/login',
					fail: (err) => {
						console.error('跳转登录页面失败:', err);
					}
				});
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		min-height: 100vh;
		background-color: #f5f5f5;
		box-sizing: border-box;
	}
	
	.header {
		width: 100%;
		background-color: #2a3654;
		background: linear-gradient(to right, #2a3654, #3a4c72);
		padding: 40rpx 30rpx;
		box-sizing: border-box;
	}
	
	.user-info {
		display: flex;
		align-items: center;
	}
	
	.avatar-container {
		width: 140rpx;
		height: 140rpx;
		border-radius: 70rpx;
		overflow: hidden;
		background-color: #ffffff;
		margin-right: 30rpx;
		border: 4rpx solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.2);
	}
	
	.avatar {
		width: 100%;
		height: 100%;
	}
	
	.user-details {
		display: flex;
		flex-direction: column;
	}
	
	.nickname {
		font-size: 36rpx;
		color: #ffffff;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
	
	.user-id {
		font-size: 24rpx;
		color: rgba(255, 255, 255, 0.8);
	}
	
	.content {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
	}
	
	.menu-list {
		width: 100%;
		background-color: #ffffff;
		border-radius: 12rpx;
		overflow: hidden;
		margin-bottom: 40rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}
	
	.menu-item {
		display: flex;
		align-items: center;
		padding: 34rpx 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}
	
	.menu-item:last-child {
		border-bottom: none;
	}
	
	.menu-icon {
		font-size: 40rpx;
		margin-right: 20rpx;
	}
	
	.menu-text {
		flex: 1;
		font-size: 30rpx;
		color: #333333;
	}
	
	.menu-arrow {
		font-size: 30rpx;
		color: #999999;
	}
	
	.action-button {
		width: 100%;
		height: 90rpx;
		background-color: #ffffff;
		border-radius: 45rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}
	
	.action-text {
		font-size: 32rpx;
		color: #2a3654;
	}
	
	.logout-text {
		color: #ff3a30;
	}
</style> 