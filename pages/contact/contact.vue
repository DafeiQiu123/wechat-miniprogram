<template>
	<view class="container">
		<view class="contact-header">
			<view class="title">联系客服</view>
			<view class="desc">如有问题，请联系我们的客服人员</view>
		</view>
		
		<view class="contact-content">
			<button open-type="contact" class="contact-btn">
				<text class="contact-btn-text">开始对话</text>
			</button>
			
			<view class="contact-tips">
				<view class="tip-item">
					<text class="tip-icon">📱</text>
					<text class="tip-text">工作时间: 周一至周日 9:00-22:00</text>
				</view>
				<view class="tip-item">
					<text class="tip-icon">⏱️</text>
					<text class="tip-text">通常在1小时内回复</text>
				</view>
			</view>
		</view>
		
		<view class="back-btn" @click="goBack">
			<text>返回</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			goBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 40rpx;
		background-color: #f5f5f5;
		min-height: 100vh;
	}
	
	.contact-header {
		width: 100%;
		margin-bottom: 60rpx;
		text-align: center;
	}
	
	.title {
		font-size: 40rpx;
		font-weight: bold;
		color: #2a3654;
		margin-bottom: 20rpx;
	}
	
	.desc {
		font-size: 28rpx;
		color: #666666;
	}
	
	.contact-content {
		width: 100%;
		background-color: #ffffff;
		border-radius: 12rpx;
		padding: 40rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		margin-bottom: 40rpx;
	}
	
	.contact-btn {
		width: 100%;
		height: 90rpx;
		background-color: #07C160;
		color: #ffffff;
		border-radius: 45rpx;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 40rpx;
	}
	
	.contact-btn-text {
		color: #ffffff;
	}
	
	.contact-tips {
		width: 100%;
	}
	
	.tip-item {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	
	.tip-icon {
		margin-right: 20rpx;
		font-size: 32rpx;
	}
	
	.tip-text {
		font-size: 28rpx;
		color: #666666;
	}
	
	.back-btn {
		padding: 20rpx 60rpx;
		background-color: #ffffff;
		border-radius: 45rpx;
		color: #2a3654;
		font-size: 30rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}
</style> 