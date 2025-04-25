<template>
	<view class="container">
		<view class="banner-container">
			<image class="banner-image" src="https://tccolumbia.qualtrics.com/CP/Graphic.php?IM=IM_9GkanAKHDCuzJuS" mode="widthFix"></image>
		</view>
		
		<view class="menu-container">
			<view class="menu-item" @click="navigateToCourse">
				<view class="menu-box">
					<image class="menu-icon" src="/static/icon/home-1.png" mode="aspectFit"></image>
					<text class="menu-text">课程</text>
				</view>
			</view>
			
			<view class="menu-item" @click="showContactConfirm">
				<view class="menu-box">
					<image class="menu-icon" src="/static/icon/my-1.png" mode="aspectFit"></image>
					<text class="menu-text">联系客服</text>
				</view>
			</view>
		</view>
		
		<view class="intro-section">
			<view class="intro-title">平静训练营</view>
			<view class="intro-desc">帮助你掌握应对压力和焦虑的技巧，提升心理韧性</view>
			
			<view class="feature-list">
				<view class="feature-item">
					<text class="feature-icon">✓</text>
					<text class="feature-text">科学的放松技术</text>
				</view>
				<view class="feature-item">
					<text class="feature-icon">✓</text>
					<text class="feature-text">简单易学的冥想练习</text>
				</view>
				<view class="feature-item">
					<text class="feature-icon">✓</text>
					<text class="feature-text">有效的情绪管理方法</text>
				</view>
				<view class="feature-item">
					<text class="feature-icon">✓</text>
					<text class="feature-text">专业的心理健康指导</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
			
		},
		methods: {
			// 跳转到课程页面
			navigateToCourse() {
				uni.navigateTo({
					url: '/pages/index/index'
				});
			},
			
			// 显示联系客服确认框
			showContactConfirm() {
				uni.showModal({
					title: '联系客服',
					content: '是否联系客服咨询？',
					confirmText: '确认',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							// 使用微信小程序客服会话功能
							uni.navigateTo({
								url: '/pages/contact/contact',
								fail: (err) => {
									console.error('打开客服页面失败', err);
									uni.showToast({
										title: '打开客服失败，请重试',
										icon: 'none'
									});
								}
							});
						}
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
		background-color: #ffffff;
		box-sizing: border-box;
	}
	
	.banner-container {
		width: 100%;
		height: auto;
		padding: 0;
		
	}
	
	.banner-image {
		width: 100%;
		height: auto;
		border-radius: 20rpx;
	}
	
	.menu-container {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		box-sizing: border-box;
	}
	
	.menu-item {
		width: 48%;
	}
	
	.menu-box {
		background-color: #F8F8F8;
		border-radius: 12rpx;
		height: 180rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow: 0 4rpx 8rpx rgba(0,0,0,0.1);
	}
	
	.menu-icon {
		width: 60rpx;
		height: 60rpx;
		margin-bottom: 16rpx;
	}
	
	.menu-text {
		font-size: 32rpx;
		color: #333333;
		font-weight: bold;
	}
	
	.intro-section {
		width: 100%;
		padding: 40rpx 30rpx;
		box-sizing: border-box;
	}
	
	.intro-title {
		font-size: 40rpx;
		font-weight: bold;
		color: #2a3654;
		margin-bottom: 16rpx;
		text-align: center;
	}
	
	.intro-desc {
		font-size: 28rpx;
		color: #666666;
		line-height: 1.6;
		text-align: center;
		margin-bottom: 40rpx;
	}
	
	.feature-list {
		width: 100%;
	}
	
	.feature-item {
		display: flex;
		align-items: center;
		margin-bottom: 24rpx;
	}
	
	.feature-icon {
		width: 40rpx;
		height: 40rpx;
		background-color: #2a3654;
		color: #ffffff;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		margin-right: 16rpx;
	}
	
	.feature-text {
		font-size: 28rpx;
		color: #333333;
		line-height: 1.5;
	}
</style> 