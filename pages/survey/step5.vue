<template>
	<view class="container">
		<view class="page">
			<view class="survey-content">
				<view class="title-card title-card-blue">
					<text class="title-text">第三步：学习平静技巧</text>
				</view>
				
				<view class="content-section">
					<text class="content-text">正如你所读到的，今天我们学习的平静技巧能有效帮助青少年缓解压力。</text>
					
					<text class="content-text">我们已经学会了第一个技巧 - <text class="highlight">缓慢深呼吸</text>，接下来让我们继续学习其他的吧！</text>
				</view>
				
				<!-- 平静技巧图表 -->
				<view class="techniques-container">
					<image class="techniques-image" src="https://tccolumbia.qualtrics.com/CP/File.php?F=F_9pMcGx2ByAVXfBc" mode="widthFix"></image>
				</view>
				
				<!-- 小提醒卡片 -->
				<view class="tip-card">
					<view class="tip-header">
						<text class="tip-icon">💡</text>
						<text class="tip-title">小提醒</text>
					</view>
					<view class="tip-content">
						<view class="tip-item">
							<text class="tip-plus">+</text>
							<text class="tip-text">每个人喜欢的平静技巧不同</text>
						</view>
						<view class="tip-item">
							<text class="tip-plus">+</text>
							<text class="tip-text">找到对你最有效的那些平静技巧！</text>
						</view>
					</view>
				</view>
				
				<!-- 宁静场景部分 -->
				<view class="technique-section">
					<view class="technique-image-container">
						<image class="technique-image" src="https://tccolumbia.qualtrics.com/CP/Graphic.php?IM=IM_cwkiMao9xs7LOuO" mode="widthFix"></image>
					</view>
					
					<view class="technique-content">
						<text class="section-title">如何 <text class="highlight-blue">想象宁静场景</text>：</text>
						
						<view class="step-container">
							<view class="step-number">
								<text>1</text>
							</view>
							<view class="step-content">
								<text class="step-text">如果你愿意，可以闭上眼睛。当然，你也可以在过程中睁着眼睛。</text>
							</view>
						</view>
						
						<view class="step-container">
							<view class="step-number">
								<text>2</text>
							</view>
							<view class="step-content">
								<text class="step-text">想象一个能让你感到完全安全和平静的地方。它可以是你曾去过的地方，也可以是你虚构出来的任何地方。</text>
							</view>
						</view>
						
						<view class="step-container">
							<view class="step-number">
								<text>3</text>
							</view>
							<view class="step-content">
								<text class="step-text">在脑海中描绘出这个地方。专注于在这个场景里你能看到、听到、闻到、触碰到和尝到的事物。</text>
							</view>
						</view>
					</view>
					
					<!-- 示例部分 -->
					<view class="example-section">
						<text class="example-title">在你自己尝试之前，可以先看看使用这个技巧的示例。</text>
						
						<view class="example-image-container">
							<image class="example-image" src="https://tccolumbia.qualtrics.com/CP/Graphic.php?IM=IM_cwkiMao9xs7LOuO" mode="widthFix"></image>
						</view>
						
						<text class="example-label">示例</text>
						
						<view class="example-card">
							<view class="example-header">
								<text class="example-technique">技巧2: 想象宁静场景</text>
							</view>
							
							<view class="example-item">
								<text class="example-question">你选择了什么地方?</text>
								<text class="example-answer">沙滩</text>
							</view>
							
							<view class="example-item">
								<text class="example-question">你看到了什么? 听到了什么?</text>
								<text class="example-answer">拍打的海浪，海鸥</text>
							</view>
							
							<view class="example-item">
								<text class="example-question">你触碰到了什么?</text>
								<text class="example-answer">我脚上沾满了粗糙的沙子</text>
							</view>
							
							<view class="example-item">
								<text class="example-question">你闻到了什么?</text>
								<text class="example-answer">海风</text>
							</view>
							
							<view class="example-item">
								<text class="example-question">你尝到了什么?</text>
								<text class="example-answer">香草味冰淇淋，椰子汁</text>
							</view>
						</view>
					</view>
					
					<!-- 互动部分 -->
					<view class="interactive-section">
						<text class="interactive-instruction">假装自己真的在你想象的那个地方，回答以下问题。五个问题不一定都要回答，你想回答多少就回答多少。</text>
						
						<view class="question-container" style="flex-direction: column; align-items: flex-start;">
							<view style="display: flex; width: 100%; align-items: center; justify-content: space-between;">
								<text class="question-text" style="width: 220rpx;">你选择了什么宁静场景?</text>
								<input class="answer-input" type="text" @input="e => inputChange(0, e)" />
							</view>
							<text v-if="showError" class="error-tip">请回答此问题。</text>
						</view>
						
						<view class="question-container">
							<view class="question-icon-and-text" style="width: 220rpx;">
								<text class="question-icon">👁️</text>
								<text class="question-text" style="width: auto;">你看到了什么?</text>
							</view>
							<input class="answer-input" type="text" @input="e => inputChange(1, e)" />
						</view>
						
						<view class="question-container">
							<view class="question-icon-and-text" style="width: 220rpx;">
								<text class="question-icon">👂</text>
								<text class="question-text" style="width: auto;">你听到了什么?</text>
							</view>
							<input class="answer-input" type="text" @input="e => inputChange(2, e)" />
						</view>
						
						<view class="question-container">
							<view class="question-icon-and-text" style="width: 220rpx;">
								<text class="question-icon">👐</text>
								<text class="question-text" style="width: auto;">你触碰到了什么?</text>
							</view>
							<input class="answer-input" type="text" @input="e => inputChange(3, e)" />
						</view>
						
						<view class="question-container">
							<view class="question-icon-and-text" style="width: 220rpx;">
								<text class="question-icon">👃</text>
								<text class="question-text" style="width: auto;">你闻到了什么?</text>
							</view>
							<input class="answer-input" type="text" @input="e => inputChange(4, e)" />
						</view>
						
						<view class="question-container">
							<view class="question-icon-and-text" style="width: 220rpx;">
								<text class="question-icon">👅</text>
								<text class="question-text" style="width: auto;">你尝到了什么?</text>
							</view>
							<input class="answer-input" type="text" @input="e => inputChange(5, e)" />
						</view>
					</view>
					
					<!-- 放松肌肉部分 -->
					<view class="muscle-section">
						<view class="muscle-image-container">
							<image class="muscle-image" src="https://tccolumbia.qualtrics.com/CP/Graphic.php?IM=IM_a5k5DdLTpM1Ovbg" mode="widthFix"></image>
						</view>
						
						<text class="muscle-text">你还可以在深呼吸的同时配合收紧和放松肌肉来平复情绪。</text>
						
						<text class="next-instruction">初次练习时，最好有专家指导。你可以跳转下一页进行尝试！</text>
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
				questionInputs: ['', '', '', '', '', ''],
				showError: false
			}
		},
		onLoad() {
			console.log("Step5页面加载");
		},
		methods: {
			inputChange(index, e) {
				this.questionInputs[index] = e.detail.value;
				console.log(`问题${index} 输入:`, e.detail.value);
			},
			saveResponses() {
				// 将用户回答保存到本地存储
				try {
					const responses = {
						scene: this.questionInputs[0],
						see: this.questionInputs[1],
						hear: this.questionInputs[2],
						touch: this.questionInputs[3],
						smell: this.questionInputs[4],
						taste: this.questionInputs[5]
					};
					
					uni.setStorageSync('scene_responses', JSON.stringify(responses));
					console.log("已保存场景回答:", responses);
				} catch (e) {
					console.error("保存回答失败:", e);
				}
			},
			goBack() {
				uni.navigateBack();
			},
			goNext() {
				if (!this.questionInputs[0]) {
					this.showError = true;
					uni.showToast({
						title: '请至少回答第一个问题',
						icon: 'none'
					});
					return;
				}
				
				this.showError = false;
				this.saveResponses();
				
				uni.navigateTo({
					url: './step6'
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
		padding: 32rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 30rpx 0 70rpx 0;
		border-radius: 60rpx;
	}
	
	.title-card-blue {
		background-color: #E1F5F7;
	}
	
	.title-text {
		font-size: 38rpx;
		font-weight: bold;
		color: #4E97A0;
		text-align: center;
	}
	
	.content-section {
		width: 100%;
		margin-bottom: 40rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	
	.content-text {
		font-size: 34rpx;
		color: #333;
		line-height: 1.8;
		margin-bottom: 20rpx;
		display: block;
		text-align: justify;
	}
	
	.highlight {
		color: #4E97A0;
		font-weight: bold;
	}
	
	.highlight-blue {
		background-color: #E1F5F7;
		padding: 2rpx 10rpx;
		border-radius: 6rpx;
	}
	
	.techniques-container {
		width: 100%;
		margin: 30rpx 0;
		display: flex;
		justify-content: center;
	}
	
	.techniques-image {
		width: 95%;
		border-radius: 20rpx;
	}
	
	.tip-card {
		width: 95%;
		margin: 40rpx auto;
		padding: 30rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
		border-left: 8rpx solid #4E97A0;
	}
	
	.tip-header {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	
	.tip-icon {
		font-size: 40rpx;
		margin-right: 10rpx;
	}
	
	.tip-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #4E97A0;
	}
	
	.tip-content {
		padding-left: 10rpx;
	}
	
	.tip-item {
		display: flex;
		align-items: flex-start;
		margin-bottom: 15rpx;
	}
	
	.tip-plus {
		font-size: 32rpx;
		color: #4E97A0;
		font-weight: bold;
		margin-right: 15rpx;
	}
	
	.tip-text {
		font-size: 32rpx;
		color: #333;
		line-height: 1.6;
	}
	
	.technique-section {
		width: 100%;
		margin: 40rpx 0;
	}
	
	.technique-image-container {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 30rpx;
	}
	
	.technique-image {
		width: 300rpx;
	}
	
	.technique-content {
		padding: 0 30rpx;
	}
	
	.section-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 30rpx;
		display: block;
	}
	
	.step-container {
		display: flex;
		margin-bottom: 30rpx;
	}
	
	.step-number {
		width: 60rpx;
		height: 60rpx;
		background-color: #E1F5F7;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 20rpx;
	}
	
	.step-number text {
		font-size: 32rpx;
		font-weight: bold;
		color: #4E97A0;
	}
	
	.step-content {
		flex: 1;
	}
	
	.step-text {
		font-size: 32rpx;
		color: #333;
		line-height: 1.6;
	}
	
	.example-section {
		width: 100%;
		margin: 50rpx 0;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	
	.example-title {
		font-size: 32rpx;
		color: #333;
		line-height: 1.6;
		margin-bottom: 30rpx;
		display: block;
	}
	
	.example-image-container {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 20rpx;
	}
	
	.example-image {
		width: 300rpx;
	}
	
	.example-label {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		display: block;
		text-align: center;
		margin-bottom: 20rpx;
	}
	
	.example-card {
		width: 100%;
		border: 2rpx solid #DEDEDE;
		border-radius: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;
	}
	
	.example-header {
		margin-bottom: 30rpx;
		padding-bottom: 15rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}
	
	.example-technique {
		font-size: 34rpx;
		font-weight: bold;
		color: #4E97A0;
	}
	
	.example-item {
		margin-bottom: 20rpx;
	}
	
	.example-question {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.example-answer {
		font-size: 32rpx;
		color: #666;
		display: block;
		margin-left: 30rpx;
	}
	
	.interactive-section {
		width: 100%;
		margin: 50rpx 0;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	
	.interactive-instruction {
		font-size: 32rpx;
		color: #333;
		line-height: 1.6;
		margin-bottom: 40rpx;
		display: block;
	}
	
	.question-container {
		margin-bottom: 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	
	.question-text {
		font-size: 30rpx;
		font-weight: normal;
		color: #333;
		margin-bottom: 0;
		margin-right: 20rpx;
		white-space: nowrap;
		flex-shrink: 0;
		width: 220rpx;
		text-align: left;
	}
	
	.answer-input {
		width: 350rpx;
		height: 60rpx;
		border: 1rpx solid #000;
		border-radius: 0;
		padding: 0 20rpx;
		font-size: 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	
	.question-icon-and-text {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 220rpx;
		text-align: left;
	}
	
	.muscle-section {
		width: 100%;
		margin: 50rpx 0;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	
	.muscle-image-container {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 30rpx;
	}
	
	.muscle-image {
		width: 300rpx;
		margin-bottom: 20rpx;
	}
	
	.muscle-text {
		font-size: 32rpx;
		color: #333;
		line-height: 1.6;
		margin-bottom: 30rpx;
		display: block;
		text-align: center;
	}
	
	.next-instruction {
		font-size: 32rpx;
		color: #333;
		line-height: 1.6;
		margin-bottom: 50rpx;
		display: block;
		text-align: center;
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
	
	.nav-icon {
		font-size: 38rpx;
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
	
	.question-icon {
		font-size: 34rpx;
		margin-right: 10rpx;
	}
	
	/* 红色提示文字 */
	.error-tip {
		color: #E46A76;
		font-size: 26rpx;
		margin-top: 10rpx;
	}
</style> 