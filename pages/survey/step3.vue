<template>
	<view class="container">
		<view class="page">
			<view class="survey-content">
				<view class="title-card title-card-pink">
					<text class="title-text">第一步：了解问题所在</text>
				</view>
				
				<text class="content-text content-bold" style="margin-top: 40rpx; font-size: 36rpx;">压力通常会在身体上表现出来。</text>
				
				<!-- 图片区域容器 -->
				<view class="images-container">
					<!-- 大图展示 -->
					<image class="main-image" src="https://tccolumbia.qualtrics.com/CP/Graphic.php?IM=IM_cDgRK1F3MrJvzZI" mode="widthFix"></image>
					
					<!-- 两张小图片 -->
					<view class="small-images-container">
						<image class="small-image" src="https://tccolumbia.qualtrics.com/CP/Graphic.php?IM=IM_0i8xboNdjbEuu6q" mode="aspectFill"></image>
						<image class="small-image" src="https://tccolumbia.qualtrics.com/CP/Graphic.php?IM=IM_7PuGDQBiqZlekL4" mode="aspectFill"></image>
					</view>
				</view>
				
				<!-- 常见压力反应列表 -->
				<view class="reaction-section">
					<text class="section-title">常见的压力反应有：</text>
					<text class="reaction-list">肌肉紧绷 | 胸闷 | 刺痛 | 出汗 | 心率加速 | 呼吸急促</text>
				</view>
				
				<!-- 用户提问区域 -->
				<view class="question-section">
					<text class="question-text">当感受到压力时，你的身体会发生什么变化？</text>
					<textarea class="answer-input" />
				</view>
				
				<!-- 提示信息 -->
				<view class="tip-section">
					<text class="tip-text">即使你无法改变让你烦恼的事情，你仍然可以使用平静技巧来缓解身体上的压力感。</text>
				</view>
				
				<view class="navigation">
					<view class="nav-button" @click="goBack">
						<text class="nav-icon">←</text>
					</view>
					<view class="nav-button" @click="goNext">
						<text class="nav-icon">→</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			console.log("Step3页面加载");
		},
		methods: {
			goBack() {
				uni.navigateBack();
			},
			goNext() {
				uni.navigateTo({
					url: '/pages/survey/step4'
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
		box-sizing: border-box;
	}
	
	.survey-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	
	.title-card {
		width: 100%;
		padding: 24rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 40rpx 0 60rpx 0;
		border-radius: 100rpx;
	}
	
	.title-card-pink {
		background: linear-gradient(to right, #fff0f5, #fcedf2, #fff0f5);
	}
	
	.title-text {
		font-size: 36rpx;
		font-weight: bold;
		color: #d94967;
		text-align: center;
	}
	
	.content-text {
		font-size: 32rpx;
		color: #333;
		line-height: 1.6;
		margin-bottom: 30rpx;
	}
	
	.content-bold {
		font-weight: bold;
	}
	
	.images-container {
		width: calc(100% - 120rpx);
		display: flex;
		flex-direction: column;
		margin: 40rpx 60rpx 80rpx 60rpx;
		box-sizing: border-box;
	}
	
	.main-image {
		width: 100%;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
	}
	
	.small-images-container {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	
	.small-image {
		width: 49.5%;
		height: 300rpx;
		object-fit: cover;
		border-radius: 20rpx;
	}
	
	.reaction-section {
		width: 100%;
		margin: 10rpx 0 80rpx 0;
	}
	
	.section-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 30rpx;
		display: block;
	}
	
	.reaction-list {
		font-size: 34rpx;
		color: #333;
		line-height: 1.8;
		display: block;
	}
	
	.question-section {
		width: 100%;
		margin: 0 0 80rpx 0;
	}
	
	.question-text {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 30rpx;
		display: block;
	}
	
	.answer-input {
		width: 100%;
		height: 220rpx;
		border: 1px solid #333;
		border-radius: 0;
		padding: 20rpx;
		font-size: 32rpx;
		box-sizing: border-box;
	}
	
	.tip-section {
		width: 100%;
		margin: 0 0 100rpx 0;
	}
	
	.tip-text {
		font-size: 34rpx;
		color: #194f87;
		line-height: 1.8;
		font-weight: 500;
		display: block;
	}
	
	.navigation {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin: 30rpx 0;
	}
	
	.nav-button {
		width: 70rpx;
		height: 70rpx;
		background-color: #e1f3ef;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.nav-button:active {
		opacity: 0.8;
	}
	
	.nav-icon {
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