<template>
	<view class="container">
		<view class="page">
			<view class="survey-content">
				<view class="intro-section">
					<text class="intro-title">为了帮助我们提升"平静训练营"的使用体验，我们想要了解您的使用感受！</text>
					<text class="intro-subtitle">您的反馈将会是匿名的，并将被保存和分享给我们的团队。</text>
				</view>
				
				<!-- 问题1 -->
				<view class="question-section">
					<text class="question-title">1. 总的来说，您喜欢"平静训练营"的外观和体验吗？</text>
					
					<view class="option-list">
						<view class="option-item" :class="{'option-selected': feedback.q1 === 1}" @click="selectOption('q1', 1)">
							<text class="option-text">我讨厌它的外观和体验</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q1 === 2}" @click="selectOption('q1', 2)">
							<text class="option-text">我不喜欢它的外观和体验</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q1 === 3}" @click="selectOption('q1', 3)">
							<text class="option-text">我有一点喜欢它的外观和体验</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q1 === 4}" @click="selectOption('q1', 4)">
							<text class="option-text">我喜欢它的外观和体验</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q1 === 5}" @click="selectOption('q1', 5)">
							<text class="option-text">我非常喜欢它的外观和体验</text>
						</view>
					</view>
				</view>
				
				<!-- 问题2 -->
				<view class="question-section">
					<text class="question-title">2. 总的来说，您能够理解里面的内容吗？</text>
					
					<view class="option-list">
						<view class="option-item" :class="{'option-selected': feedback.q2 === 1}" @click="selectOption('q2', 1)">
							<text class="option-text">我感到非常困惑</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q2 === 2}" @click="selectOption('q2', 2)">
							<text class="option-text">我不太理解</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q2 === 3}" @click="selectOption('q2', 3)">
							<text class="option-text">我有一点理解</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q2 === 4}" @click="selectOption('q2', 4)">
							<text class="option-text">我整体上能理解</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q2 === 5}" @click="selectOption('q2', 5)">
							<text class="option-text">我能完全理解</text>
						</view>
					</view>
				</view>
				
				<!-- 问题3 -->
				<view class="question-section">
					<text class="question-title">3. 在完成"平静训练营"之后，您相信平静技巧能够在多大程度上帮助到您？</text>
					
					<view class="option-list">
						<view class="option-item" :class="{'option-selected': feedback.q3 === 1}" @click="selectOption('q3', 1)">
							<text class="option-text">平静技巧会伤害我</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q3 === 2}" @click="selectOption('q3', 2)">
							<text class="option-text">平静技巧对我没有帮助</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q3 === 3}" @click="selectOption('q3', 3)">
							<text class="option-text">平静技巧会对我有一点帮助</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q3 === 4}" @click="selectOption('q3', 4)">
							<text class="option-text">平静技巧会对我有帮助</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q3 === 5}" @click="selectOption('q3', 5)">
							<text class="option-text">平静技巧会对我有很大的帮助</text>
						</view>
					</view>
				</view>
				
				<!-- 问题4 -->
				<view class="question-section">
					<text class="question-title">4. 您喜欢"平静训练营"的三个地方是什么？</text>
					
					<view class="text-input-container">
						<view class="input-row">
							<text class="input-label">1)</text>
							<input class="text-input" type="text" @input="e => inputChange('like1', e)" />
						</view>
						
						<view class="input-row">
							<text class="input-label">2)</text>
							<input class="text-input" type="text" @input="e => inputChange('like2', e)" />
						</view>
						
						<view class="input-row">
							<text class="input-label">3)</text>
							<input class="text-input" type="text" @input="e => inputChange('like3', e)" />
						</view>
					</view>
				</view>
				
				<!-- 问题5 -->
				<view class="question-section">
					<text class="question-title">5. "平静训练营"的哪三个地方您认为是可以改进的？</text>
					
					<view class="text-input-container">
						<view class="input-row">
							<text class="input-label">1)</text>
							<input class="text-input" type="text" @input="e => inputChange('improve1', e)" />
						</view>
						
						<view class="input-row">
							<text class="input-label">2)</text>
							<input class="text-input" type="text" @input="e => inputChange('improve2', e)" />
						</view>
						
						<view class="input-row">
							<text class="input-label">3)</text>
							<input class="text-input" type="text" @input="e => inputChange('improve3', e)" />
						</view>
					</view>
				</view>
				
				<!-- 问题6 -->
				<view class="question-section">
					<text class="question-title">6. 您会在多大程度上把"平静训练营"推荐给你的学生/朋友？</text>
					
					<view class="option-list">
						<view class="option-item" :class="{'option-selected': feedback.q6 === 1}" @click="selectOption('q6', 1)">
							<text class="option-text">我会告诉他们不要尝试</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q6 === 2}" @click="selectOption('q6', 2)">
							<text class="option-text">我不会推荐它</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q6 === 3}" @click="selectOption('q6', 3)">
							<text class="option-text">我会有一点推荐它</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q6 === 4}" @click="selectOption('q6', 4)">
							<text class="option-text">我会推荐它</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q6 === 5}" @click="selectOption('q6', 5)">
							<text class="option-text">我会强烈推荐它</text>
						</view>
					</view>
				</view>
				
				<!-- 问题7 -->
				<view class="question-section">
					<text class="question-title">7. 您认为其他的青少年会有多喜欢"平静训练营"？</text>
					
					<view class="option-list">
						<view class="option-item" :class="{'option-selected': feedback.q7 === 1}" @click="selectOption('q7', 1)">
							<text class="option-text">他们会讨厌它</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q7 === 2}" @click="selectOption('q7', 2)">
							<text class="option-text">他们不会喜欢它</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q7 === 3}" @click="selectOption('q7', 3)">
							<text class="option-text">他们会有点喜欢它</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q7 === 4}" @click="selectOption('q7', 4)">
							<text class="option-text">他们会喜欢它</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q7 === 5}" @click="selectOption('q7', 5)">
							<text class="option-text">他们会非常喜欢它</text>
						</view>
					</view>
				</view>
				
				<!-- 问题8 -->
				<view class="question-section">
					<text class="question-title">8. 您认为"平静训练营"会对其他青少年的帮助有多大？</text>
					
					<view class="option-list">
						<view class="option-item" :class="{'option-selected': feedback.q8 === 1}" @click="selectOption('q8', 1)">
							<text class="option-text">它不会对他们造成伤害</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q8 === 2}" @click="selectOption('q8', 2)">
							<text class="option-text">它不会对他们有帮助</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q8 === 3}" @click="selectOption('q8', 3)">
							<text class="option-text">它会对他们有一点帮助</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q8 === 4}" @click="selectOption('q8', 4)">
							<text class="option-text">它会对他们有帮助</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': feedback.q8 === 5}" @click="selectOption('q8', 5)">
							<text class="option-text">它会对他们有很大帮助</text>
						</view>
					</view>
				</view>
				
				<!-- 问题9 -->
				<view class="question-section">
					<text class="question-title">9. 您有什么其他想告诉我们的吗？</text>
					
					<view class="textarea-container">
						<textarea class="feedback-textarea" placeholder="请输入您的想法..." @input="e => inputChange('otherFeedback', e)" />
					</view>
				</view>
				
				<view class="submit-section">
					<view class="submit-button" @click="submitFeedback">
						<text class="submit-text">提交反馈</text>
					</view>
				</view>
			</view>
			
			<view class="navigation">
				<view class="nav-button" @click="goBack">
					<text class="nav-icon">←</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request.js';
	import auth from '@/utils/auth.js';
	
	export default {
		data() {
			return {
				feedback: {
					q1: null,
					q2: null,
					q3: null,
					like1: '',
					like2: '',
					like3: '',
					improve1: '',
					improve2: '',
					improve3: '',
					q6: null,
					q7: null,
					q8: null,
					otherFeedback: ''
				},
				questionnaireId: 1, // 问卷ID
				userId: '', // 用户ID
				submitting: false // 是否正在提交
			}
		},
		onLoad() {
			// 检查登录状态，从本地存储获取用户ID
			const userInfo = uni.getStorageSync('userInfo');
			
			if (userInfo) {
				this.userId = userInfo.userId || userInfo.id;
				console.log('获取到用户ID:', this.userId);
			} else {
				// 用户未登录，使用匿名ID
				this.userId = 'anonymous_' + new Date().getTime();
				console.log('使用匿名ID:', this.userId);
			}
		},
		methods: {
			// 选择选项
			selectOption(questionKey, value) {
				this.feedback[questionKey] = value;
			},
			// 文本输入
			inputChange(key, event) {
				this.feedback[key] = event.detail.value;
			},
			// 提交反馈
			submitFeedback() {
				// 检查必填项是否已填写
				const requiredQuestions = ['q1', 'q2', 'q3', 'q6', 'q7', 'q8'];
				const notAnswered = requiredQuestions.filter(key => this.feedback[key] === null);
				
				if (notAnswered.length > 0) {
					uni.showToast({
						title: '请回答所有单选题',
						icon: 'none'
					});
					return;
				}
				
				// 防止重复提交
				if (this.submitting) {
					return;
				}
				
				this.submitting = true;
				
				// 构建答案数组
				const answers = [];
				
				// 添加单选题答案
				Object.keys(this.feedback).forEach(key => {
					// 跳过空值
					if (this.feedback[key] === null || this.feedback[key] === '') {
						return;
					}
					
					// 根据问题键名确定问题ID
					let questionId;
					switch(key) {
						case 'q1': questionId = 1; break;
						case 'q2': questionId = 2; break;
						case 'q3': questionId = 3; break;
						case 'like1': questionId = 4; break;
						case 'like2': questionId = 4; break;
						case 'like3': questionId = 4; break;
						case 'improve1': questionId = 5; break;
						case 'improve2': questionId = 5; break;
						case 'improve3': questionId = 5; break;
						case 'q6': questionId = 6; break;
						case 'q7': questionId = 7; break;
						case 'q8': questionId = 8; break;
						case 'otherFeedback': questionId = 9; break;
					}
					
					// 添加到答案数组
					answers.push({
						questionnaireId: this.questionnaireId,
						questionId: questionId,
						userId: this.userId || 'anonymous',
						userType: this.userId ? 1 : 0, // 1表示微信用户，0表示匿名
						content: this.feedback[key].toString()
					});
				});
				
				// 提交答案
				request.submitAnswers(answers).then(res => {
					if (res.code === 0) {
						uni.showToast({
							title: '提交成功',
							icon: 'success'
						});
						
						// 完成后跳转到首页
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/home/home'
							});
						}, 1500);
					} else {
						uni.showToast({
							title: res.msg || '提交失败',
							icon: 'none'
						});
					}
				}).catch(err => {
					console.error('提交失败:', err);
					uni.showToast({
						title: '提交失败，请稍后重试',
						icon: 'none'
					});
				}).finally(() => {
					this.submitting = false;
				});
			},
			// 返回上一页
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
	
	.survey-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 40rpx 20rpx;
	}
	
	.intro-section {
		margin-bottom: 60rpx;
	}
	
	.intro-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		line-height: 1.6;
		margin-bottom: 20rpx;
	}
	
	.intro-subtitle {
		font-size: 28rpx;
		color: #666;
		line-height: 1.5;
	}
	
	.question-section {
		margin-bottom: 60rpx;
	}
	
	.question-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		line-height: 1.5;
		margin-bottom: 30rpx;
	}
	
	.option-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}
	
	.option-item {
		width: 100%;
		background-color: #f5f5f5;
		padding: 24rpx;
		border-radius: 10rpx;
		box-sizing: border-box;
	}
	
	.option-selected {
		background-color: #2a3654;
	}
	
	.option-selected .option-text {
		color: #ffffff;
	}
	
	.option-text {
		font-size: 28rpx;
		color: #333;
		line-height: 1.5;
	}
	
	.text-input-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}
	
	.input-row {
		display: flex;
		align-items: center;
	}
	
	.input-label {
		font-size: 28rpx;
		color: #333;
		width: 50rpx;
	}
	
	.text-input {
		flex: 1;
		height: 80rpx;
		border: 1px solid #ddd;
		border-radius: 6rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
	}
	
	.textarea-container {
		width: 100%;
		margin-top: 20rpx;
	}
	
	.feedback-textarea {
		width: 100%;
		height: 240rpx;
		border: 1px solid #ddd;
		border-radius: 6rpx;
		padding: 20rpx;
		font-size: 28rpx;
		box-sizing: border-box;
	}
	
	.submit-section {
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
		margin-bottom: 60rpx;
	}
	
	.submit-button {
		background-color: #2a3654;
		padding: 24rpx 80rpx;
		border-radius: 50rpx;
	}
	
	.submit-text {
		color: #ffffff;
		font-size: 32rpx;
		font-weight: bold;
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
	
	.nav-icon {
		font-size: 36rpx;
		color: #333;
	}
</style> 