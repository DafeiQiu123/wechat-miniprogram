<template>
	<view class="container">
		<view class="page">
			<image class="banner-image" src="https://tccolumbia.qualtrics.com/CP/Graphic.php?IM=IM_9GkanAKHDCuzJuS" mode="widthFix"></image>
			
			<view class="section">
				<text class="question-title">你是否经常感到：</text>
				
				<view class="emotions-row">
					<view class="emotion-group">
						<text class="emotion-emoji">😥</text>
						<text class="emotion-text">压力重重</text>
					</view>
					<text class="separator">|</text>
					<view class="emotion-group">
						<text class="emotion-emoji">😓</text>
						<text class="emotion-text">紧张不安</text>
					</view>
					<text class="separator">|</text>
					<view class="emotion-group">
						<text class="emotion-emoji">😖</text>
						<text class="emotion-text">烦躁难耐</text>
					</view>
				</view>
				
				<text class="help-text">我们可以帮你。</text>
			</view>
			
			<view class="title-card">
				<text class="title-text">平静训练营是什么？</text>
			</view>
			
			<view class="description-text">
				平静训练营会教你一些实用的<text class="highlight-text">平静技巧</text>，帮助你在<text class="highlight-text">焦虑</text>、<text class="highlight-text">紧张</text>或<text class="highlight-text">生气</text>时平复情绪，找回内心的<text class="highlight-text">平静与舒适</text>。
			</view>
			
			<view class="title-card">
				<text class="title-text">平静训练营会怎么帮助你？</text>
			</view>
			
			<view class="step-card step-card-pink">
				<view class="step-title-wrapper">
					<text class="step-title step-title-pink">第一步：了解问题所在</text>
				</view>
				<view class="step-content">
					告诉我们哪些情绪和经历正困扰着你，需要平静技巧的帮助？
				</view>
			</view>
			
			<view class="step-card step-card-beige">
				<view class="step-title-wrapper">
					<text class="step-title step-title-beige">第二步：听听专家和同龄人的经验</text>
				</view>
				<view class="step-content">
					你会听到其他人如何通过平静技巧得到帮助的真实故事。
				</view>
			</view>
			
			<view class="step-card step-card-blue">
				<view class="step-title-wrapper">
					<text class="step-title step-title-blue">第三步：学习平静技巧</text>
				</view>
				<view class="step-content">
					你将学习并练习使用这些平静技巧。
				</view>
			</view>
			
			<view class="step-card step-card-purple">
				<view class="step-title-wrapper">
					<text class="step-title step-title-purple">第四步：让平静技巧融入你的生活</text>
				</view>
				<view class="step-content">
					我们会帮助你制定计划，让这些技巧融入你的日常生活中。
				</view>
			</view>
			
			<view class="next-button" @click="goToSurvey">
				<text class="next-icon">→</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '平静训练营',
				isLoading: true
			}
		},
		onLoad() {
			this.checkLoginStatus();
			console.log('首页加载，查看登录信息:', uni.getStorageSync('token'), uni.getStorageSync('userInfo'));
		},
		methods: {
			checkLoginStatus() {
				this.isLoading = true;
				
				// 检查用户是否已登录
				const token = uni.getStorageSync('token');
				if (!token) {
					// 未登录，显示提示并跳转到登录页面
					uni.showToast({
						title: '请先登录',
						icon: 'none',
						duration: 1500,
						success: () => {
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/login/login',
									fail: (err) => {
										console.error('跳转登录页面失败:', err);
										uni.showToast({
											title: '跳转失败，请重试',
											icon: 'none'
										});
									}
								});
							}, 1500);
						}
					});
				} else {
					// 已登录
					console.log('用户已登录，token存在');
					this.isLoading = false;
				}
			},
			goToSurvey() {
				uni.navigateTo({
					url: '../survey/survey'
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
		background-color: #ffffff;
		box-sizing: border-box;
	}
	
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 750rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	
	.banner-image {
		width: 100%;
		margin-bottom: 40rpx;
		border-radius: 20rpx;
	}
	
	.section {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: 0;
		box-sizing: border-box;
		margin-bottom: 50rpx;
	}
	
	.question-title {
		font-size: 34rpx;
		font-weight: normal;
		color: #333;
		text-align: center;
		margin-bottom: 20rpx;
	}
	
	.emotions-row {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-bottom: 40rpx;
	}
	
	.emotion-group {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.emotion-emoji {
		font-size: 46rpx;
		margin-right: 8rpx;
	}
	
	.emotion-text {
		font-size: 28rpx;
		color: #333;
		font-weight: normal;
	}
	
	.separator {
		margin: 0 20rpx;
		color: #cccccc;
		font-size: 40rpx;
	}
	
	.help-text {
		font-size: 32rpx;
		color: #333;
		text-align: center;
		font-weight: normal;
		margin-top: 10rpx;
	}
	
	.title-card {
		width: 100%;
		background-color: #e8f4f8;
		padding: 24rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 40rpx 0 30rpx 0;
		border-radius: 100rpx;
	}
	
	.title-text {
		font-size: 36rpx;
		font-weight: bold;
		color: #2c4b8e;
		text-align: center;
	}
	
	.description-text {
		font-size: 32rpx;
		color: #333;
		line-height: 1.6;
		margin-bottom: 40rpx;
		padding: 0 20rpx;
		text-align: left;
	}
	
	.highlight-text {
		color: #2c70b8;
		font-weight: bold;
	}
	
	.step-card {
		width: 100%;
		padding: 30rpx;
		border-radius: 20rpx;
		margin-bottom: 30rpx;
		box-sizing: border-box;
	}
	
	.step-card-pink {
		background-color: #fcedf2;
	}
	
	.step-card-beige {
		background-color: #fcf6e9;
	}
	
	.step-card-blue {
		background-color: #ebf5fc;
	}
	
	.step-card-purple {
		background-color: #f5effa;
	}
	
	.step-title-wrapper {
		margin-bottom: 15rpx;
	}
	
	.step-title {
		font-size: 36rpx;
		font-weight: bold;
		display: block;
	}
	
	.step-title-pink {
		color: #d94967;
	}
	
	.step-title-beige {
		color: #e5a23d;
	}
	
	.step-title-blue {
		color: #2c70b8;
	}
	
	.step-title-purple {
		color: #9966cc;
	}
	
	.step-content {
		font-size: 30rpx;
		color: #333;
		line-height: 1.6;
	}
	
	.next-button {
		width: 70rpx;
		height: 70rpx;
		background-color: #e1f3ef;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 20rpx 0 50rpx 0;
		align-self: flex-end;
		cursor: pointer;
	}
	
	.next-button:active {
		opacity: 0.8;
	}
	
	.next-icon {
		font-size: 36rpx;
		color: #333;
	}
	
	@media screen and (min-width: 768px) {
		.page {
			max-width: 960rpx;
		}
		
		.title-card {
			max-width: 90%;
		}
	}
</style>
