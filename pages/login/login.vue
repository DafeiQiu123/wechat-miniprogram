<template>
	<view class="container">
		<view class="login-box">
			<view class="title">平静训练营</view>
			<view class="subtitle">心灵成长的旅程</view>
			<view class="logo">
				<image src="/static/icon/wechat.png" mode="aspectFit" class="wechat-logo"></image>
			</view>
			<view class="description">
				<text>使用微信账号登录</text>
				<text class="sub-text">登录后即可开始使用平静训练营</text>
			</view>
			<button class="login-btn" open-type="getUserInfo" @getuserinfo="handleGetUserInfo">微信一键登录</button>
			
			<!-- 调试区域 -->
			<view class="debug-area" v-if="showDebug">
				<view class="debug-title">调试信息</view>
				<view class="debug-item">
					<text>当前环境: {{config.env}}</text>
				</view>
				<view class="debug-item">
					<text>API地址: {{config.baseUrl}}</text>
				</view>
				<view class="debug-item">
					<text>Code: {{code || '未获取'}}</text>
				</view>
				<view class="debug-actions">
					<button class="debug-btn" @click="checkApiConfig">检查配置</button>
					<button class="debug-btn" @click="testServerConnection">测试连接</button>
				</view>
				<view class="debug-actions" style="margin-top: 10rpx;">
					<button class="debug-btn" @click="getWxCode">重新获取Code</button>
					<button class="debug-btn" @click="checkWxConfig">微信环境</button>
				</view>
				<view class="debug-actions" style="margin-top: 10rpx;">
					<button class="debug-btn debug-btn-green" @click="debugLoginSuccess">调试登录</button>
					<button class="debug-btn" @click="mockLogin">模拟登录</button>
				</view>
			</view>
			
			<!-- 隐藏的调试按钮 -->
			<view class="debug-trigger" @click="toggleDebug"></view>
			
			<!-- 加载中 -->
			<view class="loading-overlay" v-if="loading">
				<view class="loading-box">
					<view class="loading-spinner"></view>
					<text class="loading-text">登录中...</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/utils/config.js';
	
	export default {
		data() {
			return {
				code: '',
				showDebug: false,
				config: config,
				loading: false
			}
		},
		onLoad() {
			// 获取微信登录code
			this.getWxCode();
		},
		methods: {
			toggleDebug() {
				this.showDebug = !this.showDebug;
			},
			checkApiConfig() {
				console.log('当前API配置:', config);
				uni.showModal({
					title: 'API配置',
					content: `当前API地址: ${config.api.wxLogin}`,
					showCancel: false
				});
			},
			mockLogin() {
				// 模拟登录成功
				console.log('执行模拟登录');
				
				// 保存模拟数据
				uni.setStorageSync('token', 'mock_token_123456');
				uni.setStorageSync('userInfo', {
					openid: 'mock_openid_123456',
					userId: 1
				});
				
				uni.showToast({
					title: '模拟登录成功',
					icon: 'success'
				});
				
				// 跳转回首页
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/index/index',
						success: () => {
							console.log('跳转首页成功');
						},
						fail: (err) => {
							console.error('跳转首页失败:', err);
						}
					});
				}, 1500);
			},
			// 测试服务器连接
			testServerConnection() {
				uni.showLoading({
					title: '测试连接中...'
				});
				
				uni.request({
					url: config.baseUrl,
					method: 'GET',
					timeout: 5000,
					success: (res) => {
						uni.hideLoading();
						uni.showModal({
							title: '连接测试',
							content: `服务器连接成功! 状态码: ${res.statusCode}`,
							showCancel: false
						});
					},
					fail: (err) => {
						uni.hideLoading();
						uni.showModal({
							title: '连接测试',
							content: `连接失败: ${err.errMsg}`,
							showCancel: false
						});
					}
				});
			},
			// 检查微信配置
			checkWxConfig() {
				// 获取微信环境信息
				const info = uni.getSystemInfoSync();
				console.log('系统信息:', info);
				
				uni.showModal({
					title: '微信环境信息',
					content: `操作系统: ${info.platform}\n微信版本: ${info.version}\n系统版本: ${info.system}\n小程序基础库: ${info.SDKVersion}`,
					showCancel: false
				});
			},
			// 假装登录成功的调试方法
			debugLoginSuccess() {
				// 直接模拟登录成功的响应
				const mockResponse = {
					code: 0,
					msg: "登录成功",
					data: {
						token: "debug_token_" + new Date().getTime(),
						openid: "debug_openid_" + Math.random().toString(36).substring(2),
						userId: 999
					}
				};
				
				// 保存模拟数据
				uni.setStorageSync('token', mockResponse.data.token);
				uni.setStorageSync('userInfo', mockResponse.data);
				
				console.log('调试模式: 保存的登录信息', mockResponse.data);
				
				uni.showToast({
					title: '调试登录成功',
					icon: 'success'
				});
				
				// 跳转到首页
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/home/home',
						success: () => {
							console.log('跳转到首页成功');
						},
						fail: (err) => {
							console.error('跳转到首页失败:', err);
						}
					});
				}, 1500);
			},
			getWxCode() {
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						this.code = loginRes.code;
						console.log('获取code成功:', this.code);
					},
					fail: (err) => {
						console.error('获取code失败:', err);
						uni.showToast({
							title: '获取登录信息失败',
							icon: 'none'
						});
					}
				});
			},
			// 获取用户信息并登录
			handleGetUserInfo(e) {
				if (e.detail.errMsg !== 'getUserInfo:ok') {
					uni.showToast({
						title: '获取用户信息失败',
						icon: 'none'
					});
					return;
				}
				
				this.loading = true;
				
				// 确保有code
				if (!this.code) {
					// 重新获取code
					uni.login({
						provider: 'weixin',
						success: (loginRes) => {
							this.code = loginRes.code;
							console.log('重新获取code成功:', this.code);
							// 递归调用继续登录流程
							this.processLogin(e.detail.userInfo);
						},
						fail: (err) => {
							console.error('获取code失败:', err);
							this.loading = false;
							uni.showToast({
								title: '获取登录信息失败',
								icon: 'none'
							});
						}
					});
				} else {
					// 直接继续登录流程
					this.processLogin(e.detail.userInfo);
				}
			},
			// 处理登录流程
			processLogin(userInfo) {
				console.log('开始登录请求，code:', this.code);
				
				// 构造请求数据
				const loginData = {
					code: this.code,
					userInfo: JSON.stringify(userInfo) // 将userInfo对象转换为JSON字符串
				};
				
				console.log('登录请求数据:', loginData);
				console.log('登录请求地址:', config.baseUrl + '/api/wx/login');
				
				// 发送登录请求
				uni.request({
					url: config.baseUrl + '/api/wx/login',
					method: 'POST',
					data: loginData,
					header: {
						'Content-Type': 'application/json'
					},
					success: (res) => {
						console.log('登录响应完整数据:', res);
						
						if (res.statusCode === 200) {
							const responseData = res.data;
							console.log('登录响应数据:', responseData);
							
							if (responseData.code === 0) {
								// 登录成功
								console.log('登录成功, 保存数据:', responseData.data);
								
								// 保存token和用户信息
								uni.setStorageSync('token', responseData.data.token);
								uni.setStorageSync('userInfo', responseData.data);
								
								uni.showToast({
									title: '登录成功',
									icon: 'success'
								});
								
								// 跳转到首页
								setTimeout(() => {
									uni.switchTab({
										url: '/pages/home/home',
										success: () => {
											console.log('跳转到首页成功');
										},
										fail: (err) => {
											console.error('跳转到首页失败:', err);
										}
									});
								}, 1500);
							} else {
								// 业务逻辑错误
								console.error('业务逻辑错误:', responseData);
								uni.showToast({
									title: responseData.msg || '登录失败',
									icon: 'none'
								});
							}
						} else {
							// HTTP错误
							console.error('HTTP错误:', res.statusCode);
							uni.showToast({
								title: '服务器响应错误: ' + res.statusCode,
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						console.error('请求失败:', err);
						uni.showToast({
							title: '网络请求失败: ' + err.errMsg,
							icon: 'none'
						});
					},
					complete: () => {
						this.loading = false;
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
		justify-content: center;
		min-height: 100vh;
		background-color: #f5f5f5;
		/* 增加背景渐变效果 */
		background: linear-gradient(to bottom, #e6f7ff, #f5f5f5);
	}

	.login-box {
		width: 90%;
		max-width: 600rpx;
		background-color: #ffffff;
		padding: 50rpx 40rpx;
		border-radius: 20rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.title {
		font-size: 44rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 10rpx;
		color: #2a3654;
	}
	
	.subtitle {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 30rpx;
	}

	.logo {
		margin: 30rpx 0;
	}

	.wechat-logo {
		width: 140rpx;
		height: 140rpx;
		border-radius: 70rpx;
		border: 4rpx solid #f0f0f0;
	}

	.description {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.description text {
		font-size: 32rpx;
		color: #333;
		margin-bottom: 10rpx;
	}

	.sub-text {
		font-size: 28rpx;
		color: #666;
	}

	.login-btn {
		width: 100%;
		height: 90rpx;
		background-color: #07C160;
		color: #ffffff;
		border-radius: 45rpx;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 40rpx;
		box-shadow: 0 4rpx 10rpx rgba(7, 193, 96, 0.3);
	}

	.login-btn:active {
		opacity: 0.8;
	}

	.debug-area {
		margin-top: 20rpx;
		padding: 20rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
		width: 100%;
	}

	.debug-title {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 20rpx;
		color: #333;
	}

	.debug-item {
		margin-bottom: 10rpx;
	}

	.debug-actions {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-around;
	}

	.debug-btn {
		width: 40%;
		height: 80rpx;
		background-color: #07C160;
		color: #ffffff;
		border-radius: 10rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.debug-btn:active {
		opacity: 0.8;
	}

	.debug-trigger {
		width: 60rpx;
		height: 60rpx;
		background-color: transparent;
		position: absolute;
		right: 20rpx;
		bottom: 20rpx;
	}

	.debug-btn-green {
		background-color: #4CAF50 !important;
	}
	
	.loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
	}
	
	.loading-box {
		padding: 30rpx;
		background-color: #fff;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.loading-spinner {
		width: 60rpx;
		height: 60rpx;
		border: 4rpx solid #f3f3f3;
		border-top: 4rpx solid #07C160;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 20rpx;
	}
	
	.loading-text {
		font-size: 28rpx;
		color: #333;
	}
	
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
</style> 