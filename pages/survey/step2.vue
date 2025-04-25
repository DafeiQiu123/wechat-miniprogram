<template>
	<view class="container">
		<view class="page">
			<view class="survey-content">
				<view class="title-card title-card-pink">
					<text class="title-text">第一步：了解问题所在</text>
				</view>
				
				<text class="content-text content-bold">不只是你有这样的感受。</text>
				<text class="content-text">超过30%的青少年表示自己感到压力太大。</text>
				
				<text class="content-text content-bold" style="margin-top: 40rpx;">为什么压力对人的影响如此之大？</text>
				
				<text class="content-text">它会通过影响学业表现、运动状态、与亲友的关系等各种方面，让生活陷入困境。</text>
				
				<text class="content-text" style="margin-top: 80rpx;">让我们先从一个简单的平静技巧开始。</text>
				
				<text class="content-text" style="margin-top: 40rpx;">首先，我们想知道你此刻的感受。</text>
				
				<text class="content-text content-bold" style="margin-top: 100rpx;">请从 1-😊非常平静 到 10-😣非常有压力 中选择一个数字来评价你此刻的感受。</text>
				
				<view class="rating-container">
					<view 
						v-for="num in 10" 
						:key="num" 
						class="rating-item" 
						:class="{'rating-selected': selectedRating === num}"
						@click="selectRating(num)"
					>
						<text class="rating-text">{{ num }}</text>
					</view>
				</view>
				
				<!-- 选择评分后显示的内容 -->
				<view v-if="selectedRating" class="breathing-section">
					<text class="content-text">感谢你分享自己的感受！现在，我们要一起学习四种平静技巧中的第一种。</text>
					
					<view class="breathing-image-container">
						<image class="breathing-image" src="https://tccolumbia.qualtrics.com/CP/Graphic.php?IM=IM_817HfKQd80zinRA" mode="aspectFit"></image>
					</view>
					
					<!-- 卡片容器 -->
					<view class="card instruction-card card-shadow">
						<!-- 标题区域 -->
						<view class="card-header">
							<text class="instruction-title">如何 <text class="text-highlight-blue">缓慢深呼吸</text>：</text>
						</view>
						
						<!-- 步骤区域 -->
						<view class="steps-container">
							<!-- 步骤 1 -->
							<view class="step-item">
								<view class="step-number">
									<text>1</text>
								</view>
								<view class="step-content">
									<text class="step-text">将一只手放在肚子上，如果你觉得舒服也可以闭上眼睛。</text>
								</view>
							</view>
							
							<!-- 步骤 2 -->
							<view class="step-item">
								<view class="step-number">
									<text>2</text>
								</view>
								<view class="step-content">
									<text class="step-text">通过鼻腔缓慢吸气，数到五。要吸进一大口气，像是准备要吹生日蛋糕上的蜡烛一样。确保气息进入腹部而非胸腔，感受腹部隆起带动手掌移动。</text>
								</view>
							</view>
							
							<!-- 步骤 3 -->
							<view class="step-item">
								<view class="step-number">
									<text>3</text>
								</view>
								<view class="step-content">
									<text class="step-text">现在，缓慢地呼气，数到六。想象正在逐个吹灭排列的蜡烛。</text>
								</view>
							</view>
						</view>
					</view>
					
					<text class="content-text breathing-text">进行四次<text class="text-highlight-blue">缓慢深呼吸</text>。可以跟随视频一起来！</text>
					
					<view class="breathing-video-container card-shadow">
						<image class="breathing-video" src="https://tccolumbia.qualtrics.com/CP/Graphic.php?IM=IM_eyOI8lGzcqTZgqy" mode="widthFix"></image>
					</view>
					
					<text class="content-text" style="margin-top: 60rpx;">现在，你已经尝试了<text class="text-highlight-blue">缓慢深呼吸</text>，感觉如何？</text>
					
					<text class="content-text content-bold" style="margin-top: 40rpx;">请从 1-😊非常平静 到 10-😣非常有压力 对你现在的压力水平进行评分。</text>
					
					<view class="rating-container">
						<view 
							v-for="num in 10" 
							:key="'after-'+num" 
							class="rating-item" 
							:class="{'rating-selected': afterRating === num}"
							@click="selectAfterRating(num)"
						>
							<text class="rating-text">{{ num }}</text>
						</view>
					</view>
					
					<!-- 练习后评分结果反馈 -->
					<view v-if="afterRating" class="feedback-section">
						<!-- 先显示压力水平下降的内容 -->
						<view class="feedback-content">
							<view class="feedback-title">如果你的压力水平下降了……</view>
							<view class="feedback-text">太好了！<text class="text-bold">缓慢深呼吸</text>可能是你应对压力的一个有效的平静技巧。</view>
						</view>
						
						<!-- 再显示压力水平没有下降的内容 -->
						<view class="feedback-content">
							<view class="feedback-title">如果你的压力水平没有下降……</view>
							<view class="feedback-text">请持续练习！平静技巧不一定第一次就能见效，<text class="text-bold">练习得越多，它们对我们的帮助就越大。</text>而且，每个人喜欢的平静技巧不同。随后，我们会教你<text class="text-bold">另外三种可能更适合你的平静技巧。</text></view>
						</view>
						
						<!-- 为什么有效 -->
						<view class="feedback-content">
							<view class="reason-title">为什么<text class="text-bold">缓慢深呼吸</text>有用呢？</view>
							<view class="feedback-text">它能帮助你：<text class="text-bold">减缓心率</text> | <text class="text-bold">放松肌肉</text> | <text class="text-bold">放慢呼吸</text></view>
							<view class="feedback-text">为了更好地理解<text class="text-bold">身体上的变化如何帮助你平静下来</text>，我们来看看当你感到压力时，身体会发生什么。</view>
						</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectedRating: null,
				afterRating: null
			}
		},
		methods: {
			selectRating(rating) {
				this.selectedRating = rating;
				console.log('选中评分:', rating);
			},
			selectAfterRating(rating) {
				this.afterRating = rating;
				console.log('练习后评分:', rating);
			},
			goBack() {
				uni.navigateBack();
			},
			goNext() {
				if (this.selectedRating) {
					// 如果已选择评分且已完成练习后评分
					if (this.afterRating) {
						// 跳转到下一步
						uni.navigateTo({
							url: '/pages/survey/step3'
						});
					} else {
						// 提示完成练习后评分
						uni.showToast({
							title: '请完成练习后评分',
							icon: 'none'
						});
					}
				} else {
					// 未选择评分提示
					uni.showToast({
						title: '请选择一个评分',
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
		margin: 40rpx 0 100rpx 0;
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
		margin-bottom: 20rpx;
	}
	
	.content-bold {
		font-weight: bold;
	}
	
	.text-bold {
		font-weight: bold;
	}
	
	.result-title {
		font-size: 40rpx;
		font-weight: bold;
		line-height: 1.4;
		margin-bottom: 16rpx;
		color: #1e507b;
		display: block;
	}
	
	.title-underline {
		border-bottom: 2px solid #1e507b;
		display: inline-block;
		padding-bottom: 6rpx;
		margin-bottom: 20rpx;
	}
	
	.explain-title {
		font-size: 40rpx;
		font-weight: bold;
		line-height: 1.4;
		color: #1e507b;
	}
	
	.highlight-text {
		color: #2c70b8;
		font-weight: bold;
	}
	
	.rating-container {
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin: 30rpx 0 50rpx 0;
		flex-wrap: nowrap;
	}
	
	.rating-item {
		flex: 1;
		height: 80rpx;
		max-width: calc(100% / 10 - 8rpx);
		min-width: 40rpx;
		background-color: #f2f2f2;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 8rpx;
	}
	
	.rating-item:last-child {
		margin-right: 0;
	}
	
	.rating-selected {
		background-color: #2a3654;
	}
	
	.rating-selected .rating-text {
		color: #ffffff;
	}
	
	.rating-text {
		font-size: 32rpx;
		color: #333;
	}
	
	.breathing-section {
		width: 100%;
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
	}
	
	.feedback-section {
		width: 100%;
		margin-top: 60rpx;
		display: flex;
		flex-direction: column;
	}
	
	.feedback-content {
		margin-bottom: 60rpx;
		text-align: left;
	}
	
	.feedback-title {
		font-size: 40rpx;
		font-weight: bold;
		color: #1e507b;
		margin-bottom: 20rpx;
		line-height: 1.4;
		text-align: left;
	}
	
	.reason-title {
		font-size: 40rpx;
		font-weight: bold;
		color: #1e507b;
		margin-bottom: 20rpx;
		line-height: 1.4;
		text-align: left;
		border-bottom: none;
		padding-bottom: 0;
		display: block;
	}
	
	.feedback-text {
		font-size: 34rpx;
		color: #333;
		line-height: 1.6;
		margin-bottom: 20rpx;
		text-align: left;
	}
	
	.breathing-image-container {
		width: 100%;
		display: flex;
		justify-content: center;
		margin: 40rpx 0;
	}
	
	.breathing-image {
		width: 300rpx;
		height: 300rpx;
	}
	
	.card-shadow {
		box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.05);
	}
	
	.card {
		position: relative;
		width: 100%;
		background-color: #f0f9fa;
		border-radius: 36rpx;
		margin: 30rpx 0;
		overflow: hidden;
		padding: 30rpx;
		box-sizing: border-box;
	}
	
	.card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #f0f9fa;
		z-index: -1;
	}
	
	.card-header {
		margin-bottom: 30rpx;
	}
	
	.instruction-title {
		font-size: 36rpx;
		font-weight: normal;
		color: #333;
	}
	
	.steps-container {
		display: flex;
		flex-direction: column;
	}
	
	.step-item {
		display: flex;
		margin-bottom: 30rpx;
		align-items: flex-start;
	}
	
	.step-item:last-child {
		margin-bottom: 0;
	}
	
	.step-content {
		flex: 1;
	}
	
	.text-highlight-blue {
		color: #4c7f9e;
		font-weight: bold;
		background-color: rgba(76, 127, 158, 0.1);
		padding: 0 4rpx;
	}
	
	.step-number {
		width: 75rpx;
		height: 75rpx;
		background-color: rgba(210, 240, 240, 0.8);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 20rpx;
		flex-shrink: 0;
	}
	
	.step-number text {
		font-size: 38rpx;
		color: #468097;
		font-weight: 500;
	}
	
	.step-text {
		font-size: 32rpx;
		color: #333;
		line-height: 1.6;
		padding-top: 12rpx;
	}
	
	.breathing-text {
		text-align: center;
		margin: 40rpx 0;
		font-weight: bold;
	}
	
	.breathing-video-container {
		width: 100%;
		background-color: #e1f3ef;
		border-radius: 36rpx;
		overflow: hidden;
		margin: 20rpx 0 40rpx 0;
		box-sizing: border-box;
	}
	
	.breathing-video {
		width: 100%;
		display: block;
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