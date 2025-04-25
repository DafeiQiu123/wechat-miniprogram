<template>
	<view class="container">
		<view class="page">
			<view class="title-card title-card-pink">
				<text class="title-text">第一步：了解问题所在</text>
			</view>
			
			<view class="survey-content">
				<text class="content-text">每个人都会遇到问题。</text>
				<text class="content-text content-bold">以下哪一个问题是你曾经遇到过的，或者你觉得在将来可能会遇到的？</text>
				
				<view class="tip-box">
					<text class="tip-icon">💡</text>
					<text class="tip-text">如果你面临多个困扰，或者不确定该选哪个，也没关系！就挑一个，我们今天一起先来解决它。</text>
				</view>
			</view>
			
			<view class="option-list">
				<view class="option-item" :class="{'option-selected': selectedOption === 1}" @click="selectOption(1)">
					<text class="option-text">"我经常感到压力大、焦虑不安或担心。"</text>
				</view>
				
				<view class="option-item" :class="{'option-selected': selectedOption === 2}" @click="selectOption(2)">
					<text class="option-text">"我经常感到紧张、情绪低落或空虚无聊。"</text>
				</view>
				
				<view class="option-item" :class="{'option-selected': selectedOption === 3}" @click="selectOption(3)">
					<text class="option-text">"我容易生气、争吵，陷入不必要的麻烦。"</text>
				</view>
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
</template>

<script>
	export default {
		data() {
			return {
				selectedOption: null  // 初始为未选择状态
			}
		},
		methods: {
			selectOption(option) {
				this.selectedOption = option;
				console.log('选中选项:', option);
			},
			goBack() {
				uni.navigateBack();
			},
			goNext() {
				if (this.selectedOption) {
					// 如果已选择，跳转到下一步
					uni.navigateTo({
						url: '/pages/survey/step2'
					});
				} else {
					// 未选择提示
					uni.showToast({
						title: '请选择一个选项',
						icon: 'none'
					});
				}
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
	
	.title-card {
		width: 100%;
		padding: 24rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 40rpx 0 100rpx 0;
		border-radius: 100rpx;
	}
	
	.title-card-pink {
		background-color: #fcedf2;
	}
	
	.title-text {
		font-size: 36rpx;
		font-weight: bold;
		color: #d94967;
		text-align: center;
	}
	
	.survey-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
		padding: 0 20rpx;
	}
	
	.content-text {
		font-size: 32rpx;
		color: #333;
		line-height: 1.6;
		margin-bottom: 20rpx;
	}
	
	.content-bold {
		font-weight: bold;
	}
	
	.tip-box {
		display: flex;
		padding: 20rpx 0;
		margin: 10rpx 0 30rpx 0;
	}
	
	.tip-icon {
		font-size: 32rpx;
		margin-right: 10rpx;
	}
	
	.tip-text {
		font-size: 24rpx;
		color: #666;
		line-height: 1.5;
	}
	
	.option-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}
	
	.option-item {
		width: 100%;
		background-color: #f2f2f2;
		padding: 30rpx;
		border-radius: 20rpx;
		box-sizing: border-box;
	}
	
	.option-selected {
		background-color: #2a3654 !important;
	}
	
	.option-selected .option-text {
		color: #ffffff !important;
	}
	
	.option-text {
		font-size: 30rpx;
		color: #333;
		line-height: 1.6;
	}
	
	.navigation {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin: 50rpx 0;
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