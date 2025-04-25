<template>
	<view class="container">
		<view class="page">
			<view class="survey-content">
				<!-- 第一部分：保存平静技巧图表 -->
				<view class="save-section">
					<text class="save-title">请保存或截图这张图片，以便之后练习今天所学的平静技巧时使用！</text>
					
					<view class="techniques-image-container">
						<image class="techniques-image" src="https://tccolumbia.qualtrics.com/CP/File.php?F=F_9pMcGx2ByAVXfBc" mode="widthFix"></image>
					</view>
				</view>
				
				<!-- 第二部分：用户对宁静场景的回答 -->
				<view class="result-card">
					<view class="card-title-container">
						<text class="card-title">想象宁静场景</text>
					</view>
					
					<view class="card-content">
						<view class="question-item">
							<view class="question-icon-container">
								<text class="question-icon">🏝️</text>
							</view>
							<view class="question-content">
								<text class="question-text">你选择了哪个场景？</text>
								<text class="answer-text">{{responses.scene || '未填写'}}</text>
							</view>
						</view>
						
						<view class="question-item">
							<view class="question-icon-container">
								<text class="question-icon">👁️</text>
							</view>
							<view class="question-content">
								<text class="question-text">你看到了什么？</text>
								<text class="answer-text">{{responses.see || '未填写'}}</text>
							</view>
						</view>
						
						<view class="question-item">
							<view class="question-icon-container">
								<text class="question-icon">👂</text>
							</view>
							<view class="question-content">
								<text class="question-text">你听到了什么？</text>
								<text class="answer-text">{{responses.hear || '未填写'}}</text>
							</view>
						</view>
						
						<view class="question-item">
							<view class="question-icon-container">
								<text class="question-icon">👃</text>
							</view>
							<view class="question-content">
								<text class="question-text">你闻到了什么？</text>
								<text class="answer-text">{{responses.smell || '未填写'}}</text>
							</view>
						</view>
						
						<view class="question-item">
							<view class="question-icon-container">
								<text class="question-icon">👐</text>
							</view>
							<view class="question-content">
								<text class="question-text">你触碰到了什么？</text>
								<text class="answer-text">{{responses.touch || '未填写'}}</text>
							</view>
						</view>
						
						<view class="question-item">
							<view class="question-icon-container">
								<text class="question-icon">👅</text>
							</view>
							<view class="question-content">
								<text class="question-text">你品尝到了什么？</text>
								<text class="answer-text">{{responses.taste || '未填写'}}</text>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 第三部分：练习计划 -->
				<view class="save-section">
					<text class="save-title">请截图或拍下你制定的平静技巧练习计划！</text>
				</view>
				
				<view class="result-card">
					<view class="card-title-container">
						<text class="card-title">平静技巧练习计划</text>
					</view>
					
					<view class="card-content">
						<view class="plan-item">
							<text class="plan-question">你想要经常，甚至每天都练习的平静技巧是什么？</text>
							<text class="plan-answer">{{planInfo.technique || '缓慢深呼吸'}}</text>
						</view>
						
						<view class="plan-item">
							<text class="plan-question">你会在什么时间和地点练习这个技巧？</text>
							<text class="plan-answer">{{planInfo.time || '早上醒来后在床上'}}</text>
						</view>
						
						<view class="plan-item">
							<text class="plan-question">如果你经常练习这个技巧，你会有什么感受？</text>
							<text class="plan-answer">{{planInfo.feeling || '未填写'}}</text>
						</view>
					</view>
				</view>
				
				<view class="navigation">
					<view class="nav-button" @click="goBack">
						<text class="nav-icon">←</text>
					</view>
					<view class="nav-button final" @click="finishSurvey">
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
				responses: {
					scene: '',
					see: '',
					hear: '',
					smell: '',
					touch: '',
					taste: ''
				},
				planInfo: {
					technique: '',
					time: '',
					feeling: ''
				}
			}
		},
		onLoad() {
			console.log("Step9页面加载");
			this.loadResponses();
			this.loadPlanInfo();
		},
		methods: {
			loadResponses() {
				// 尝试从本地存储或全局状态获取step5中保存的回答
				try {
					const storedResponses = uni.getStorageSync('scene_responses');
					if (storedResponses) {
						this.responses = JSON.parse(storedResponses);
						console.log("加载到的场景回答:", this.responses);
					} else {
						console.log("未找到保存的场景回答");
					}
				} catch (e) {
					console.error("获取存储的回答失败:", e);
				}
			},
			loadPlanInfo() {
				// 尝试从本地存储或全局状态获取step8中保存的计划信息
				try {
					const storedPlan = uni.getStorageSync('plan_info');
					if (storedPlan) {
						this.planInfo = JSON.parse(storedPlan);
						console.log("加载到的计划信息:", this.planInfo);
					} else {
						console.log("未找到保存的计划信息");
					}
				} catch (e) {
					console.error("获取存储的计划信息失败:", e);
				}
			},
			goBack() {
				uni.navigateBack();
			},
			finishSurvey() {
				// 导航到反馈页面step10
				uni.redirectTo({
					url: '/pages/survey/step10',
					success: () => {
						console.log("成功导航到反馈页面");
					},
					fail: (err) => {
						console.error("导航到反馈页面失败:", err);
						uni.showToast({
							title: '导航失败，请重试',
							icon: 'none'
						});
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
	
	.save-section {
		width: 100%;
		margin: 40rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.save-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #6A3EA1;
		text-align: center;
		margin-bottom: 30rpx;
		padding: 0 20rpx;
		line-height: 1.5;
	}
	
	.techniques-image-container {
		width: 100%;
		display: flex;
		justify-content: center;
		margin: 30rpx 0;
	}
	
	.techniques-image {
		width: 100%;
		max-width: 600rpx;
	}
	
	.result-card {
		width: 100%;
		border: 2rpx solid #ddd;
		border-radius: 20rpx;
		margin: 20rpx 0 40rpx 0;
		overflow: hidden;
		box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
	}
	
	.card-title-container {
		background-color: #E1E7F7;
		padding: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.card-title {
		font-size: 34rpx;
		font-weight: bold;
		color: #333;
	}
	
	.card-content {
		padding: 30rpx;
	}
	
	.question-item {
		display: flex;
		margin-bottom: 30rpx;
	}
	
	.question-item:last-child {
		margin-bottom: 0;
	}
	
	.question-icon-container {
		margin-right: 20rpx;
		display: flex;
		align-items: flex-start;
		padding-top: 5rpx;
	}
	
	.question-icon {
		font-size: 36rpx;
	}
	
	.question-content {
		flex: 1;
	}
	
	.question-text {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.answer-text {
		font-size: 30rpx;
		color: #666;
		display: block;
		line-height: 1.5;
	}
	
	.plan-item {
		margin-bottom: 30rpx;
	}
	
	.plan-item:last-child {
		margin-bottom: 0;
	}
	
	.plan-question {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
		display: block;
		line-height: 1.5;
	}
	
	.plan-answer {
		font-size: 30rpx;
		color: #666;
		display: block;
		line-height: 1.5;
	}
	
	.navigation {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin: 40rpx 0;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	
	.nav-button {
		width: 80rpx;
		height: 80rpx;
		background-color: #e1f3ef;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 2px 5px rgba(0,0,0,0.1);
	}
	
	.nav-button:active {
		opacity: 0.8;
	}
	
	.nav-button.final {
		background-color: #e1f3ef;
	}
	
	.nav-icon {
		font-size: 38rpx;
		color: #333;
	}
	
	@media screen and (min-width: 768px) {
		.page {
			max-width: 960rpx;
		}
	}
</style> 