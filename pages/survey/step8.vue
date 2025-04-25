<template>
	<view class="container">
		<view class="page">
			<view class="survey-content">
				<view class="title-card title-card-purple">
					<text class="title-text">第四步：让平静技巧融入你的生活</text>
				</view>
				
				<view class="content-section">
					<text class="content-text">这些平静技巧不会让我们的悲伤情绪彻底消失——毕竟每个人都会有不安的时候。但是，如果我们经常使用这些平静技巧，甚至每天都用，我们就可以更少感到紧张、不开心或无聊厌烦。</text>
				</view>
				
				<view class="task-section">
					<text class="task-text highlight">为了更好地帮助你理解如何将平静技巧融入日常生活，接下来你将要......</text>
					
					<text class="task-item highlight">首先：告诉一名低年级同学如何缓解紧张。</text>
					
					<text class="task-item highlight">然后：制定一个计划，说明你要怎么在日常生活中练习这种技巧。</text>
				</view>
				
				<!-- 问题与回答 -->
				<view class="question-box">
					<text class="question-text">"你好！我现在真的很痛苦，每天晚上试图入睡的时候总是觉得很紧张，因为我停不下来胡思乱想。晚上睡不好，第二天早上醒来感觉就更差了。我该怎么办？"——一名低年级同学</text>
				</view>
				
				<view class="selection-section">
					<text class="selection-title">你会推荐哪一种平静技巧给这名低年级同学呢？</text>
					<text class="selection-subtitle">(可能好几种技巧都会对TA有帮助，但我们现在先选择一种。)</text>
					
					<view class="option-list">
						<view class="option-item" :class="{'option-selected': selectedTechnique === 1}" @click="selectTechnique(1)">
							<text class="option-text">缓慢深呼吸</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': selectedTechnique === 2}" @click="selectTechnique(2)">
							<text class="option-text">想象宁静场景</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': selectedTechnique === 3}" @click="selectTechnique(3)">
							<text class="option-text">放松肌肉</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': selectedTechnique === 4}" @click="selectTechnique(4)">
							<text class="option-text">快速平静</text>
						</view>
					</view>
				</view>
				
				<view class="timing-section">
					<text class="timing-title highlight">这名低年级同学可以在什么时间、什么地点使用这种平静技巧？</text>
					
					<text class="timing-example">比如：睡觉前躺在床上的时候</text>
					
					<view class="question-container">
						<input class="answer-input" type="text"  @input="e => inputChange('timing', e)" />
					</view>
				</view>
				
				<view class="benefit-section">
					<text class="benefit-title highlight">你认为这种平静技巧会对TA有什么帮助？</text>
					<text class="benefit-subtitle">尝试这个平静技巧后，TA可能会有什么样的感觉？</text>
					
					<view class="question-container">
						<input class="answer-input" type="text"  @input="e => inputChange('benefit', e)" />
					</view>
				</view>
				
				<view class="personal-section">
					<text class="personal-title highlight">在今天学到的平静技巧中，哪一种是你最想经常练习，甚至每天都练习的呢？</text>
					
					<text class="personal-note">💡：可以是你今天学到的最喜欢的平静技巧，也可以是你想要练习的技巧。当然，你也可以练习多种技巧！但现在，我们先为其中一种制定一个练习计划。</text>
					
					<view class="option-list">
						<view class="option-item" :class="{'option-selected': selectedPersonalTechnique === 1}" @click="selectPersonalTechnique(1)">
							<text class="option-text">缓慢深呼吸</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': selectedPersonalTechnique === 2}" @click="selectPersonalTechnique(2)">
							<text class="option-text">想象宁静场景</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': selectedPersonalTechnique === 3}" @click="selectPersonalTechnique(3)">
							<text class="option-text">放松肌肉</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': selectedPersonalTechnique === 4}" @click="selectPersonalTechnique(4)">
							<text class="option-text">快速平静</text>
						</view>
					</view>
				</view>
				
				<view class="plan-section">
					<text class="plan-title highlight">你计划要在什么时间、什么地点练习这个平静技巧？</text>
					
					<view class="option-list">
						<view class="option-item" :class="{'option-selected': selectedTime === 1}" @click="selectTime(1)">
							<text class="option-text">早上醒来后在床上</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': selectedTime === 2}" @click="selectTime(2)">
							<text class="option-text">刷完牙后在自己房间里</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': selectedTime === 3}" @click="selectTime(3)">
							<text class="option-text">写作业前坐在书桌边</text>
						</view>
						
						<view class="option-item" :class="{'option-selected': selectedTime === 4}" @click="selectTime(4)">
							<text class="option-text">其他（请在下方填写）：</text>
						</view>
					</view>
					
					<view class="question-container" v-if="selectedTime === 4">
						<input class="answer-input" type="text"  @input="e => inputChange('otherTime', e)" />
					</view>
				</view>
				
				<view class="feeling-section">
					<text class="feeling-title highlight">如果你经常练习这个平静技巧，你觉得自己会有什么样的感觉？</text>
					
					<view class="question-container">
						<input class="answer-input" type="text"  @input="e => inputChange('feeling', e)" />
					</view>
				</view>
				
				<view class="navigation">
					<view class="nav-button" @click="goBack">
						<text class="nav-icon">←</text>
					</view>
					<view class="nav-button final" @click="goNext">
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
				selectedTechnique: null,
				selectedPersonalTechnique: null,
				selectedTime: null,
				answers: {
					timing: '',
					benefit: '',
					otherTime: '',
					feeling: ''
				}
			}
		},
		onLoad() {
			console.log("Step8页面加载");
		},
		methods: {
			selectTechnique(option) {
				this.selectedTechnique = option;
				console.log('选中技巧选项:', option);
			},
			selectPersonalTechnique(option) {
				this.selectedPersonalTechnique = option;
				console.log('选中个人技巧选项:', option);
			},
			selectTime(option) {
				this.selectedTime = option;
				console.log('选中时间选项:', option);
			},
			inputChange(field, e) {
				this.answers[field] = e.detail.value;
				console.log(`${field} 输入:`, e.detail.value);
			},
			savePlanInfo() {
				// 保存用户选择的技巧和计划信息
				try {
					let techniqueName = '';
					switch(this.selectedPersonalTechnique) {
						case 1:
							techniqueName = '缓慢深呼吸';
							break;
						case 2:
							techniqueName = '想象宁静场景';
							break;
						case 3:
							techniqueName = '放松肌肉';
							break;
						case 4:
							techniqueName = '快速平静';
							break;
					}
					
					let timeInfo = '';
					if(this.selectedTime === 4 && this.answers.otherTime) {
						timeInfo = this.answers.otherTime;
					} else {
						switch(this.selectedTime) {
							case 1:
								timeInfo = '早上醒来后在床上';
								break;
							case 2:
								timeInfo = '刷完牙后在自己房间里';
								break;
							case 3:
								timeInfo = '写作业前坐在书桌边';
								break;
						}
					}
					
					const planInfo = {
						technique: techniqueName,
						time: timeInfo,
						feeling: this.answers.feeling
					};
					
					uni.setStorageSync('plan_info', JSON.stringify(planInfo));
					console.log("已保存计划信息:", planInfo);
				} catch (e) {
					console.error("保存计划信息失败:", e);
				}
			},
			goBack() {
				uni.navigateBack();
			},
			goNext() {
				// 验证必须选择至少一个选项
				if (!this.selectedTechnique || !this.selectedPersonalTechnique || !this.selectedTime) {
					uni.showToast({
						title: '请完成所有选择',
						icon: 'none'
					});
					return;
				}
				
				// 如果选择"其他"时间，需要验证填写了内容
				if (this.selectedTime === 4 && !this.answers.otherTime) {
					uni.showToast({
						title: '请填写其他练习时间',
						icon: 'none'
					});
					return;
				}
				
				// 保存用户计划信息
				this.savePlanInfo();
				
				// 使用redirectTo替代navigateTo
				uni.redirectTo({
					url: '/pages/survey/step9',
					success: () => {
						console.log("成功导航到step9");
					},
					fail: (err) => {
						console.error("导航到step9失败:", err);
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
	
	.title-card {
		width: 100%;
		padding: 24rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 40rpx 0 100rpx 0;
		border-radius: 100rpx;
	}
	
	
	.title-card-purple {
		background-color: #F3EAF9;
	}
	
	.title-text {
		font-size: 40rpx;
		font-weight: bold;
		color: #6A3EA1;
		text-align: center;
	}
	
	.content-section {
		margin: 20rpx 0 40rpx 0;
	}
	
	.content-text {
		font-size: 34rpx;
		line-height: 1.6;
		color: #333;
		text-align: justify;
	}
	
	.task-section {
		margin: 20rpx 0 40rpx 0;
	}
	
	.task-text {
		font-size: 34rpx;
		line-height: 1.6;
		color: #333;
		margin-bottom: 20rpx;
		display: block;
	}
	
	.task-item {
		font-size: 34rpx;
		line-height: 1.6;
		color: #333;
		margin: 10rpx 0;
		display: block;
	}
	
	.highlight {
		color: #6A3EA1;
		font-weight: bold;
	}
	
	.question-box {
		background-color: #E1E7F7;
		border-radius: 15rpx;
		padding: 30rpx;
		margin: 30rpx 0;
		border: 2rpx solid rgba(0,0,0,0.1);
	}
	
	.question-text {
		font-size: 32rpx;
		color: #333;
		line-height: 1.6;
		text-align: justify;
	}
	
	.selection-section {
		margin: 30rpx 0;
	}
	
	.selection-title {
		font-size: 34rpx;
		color: #333;
		font-weight: bold;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.selection-subtitle {
		font-size: 30rpx;
		color: #666;
		margin-bottom: 20rpx;
		display: block;
	}
	
	.option-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		margin: 20rpx 0;
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
		font-size: 32rpx;
		color: #333;
	}
	
	.timing-section, .benefit-section, .personal-section, .plan-section, .feeling-section {
		margin: 40rpx 0;
	}
	
	.timing-title, .benefit-title, .personal-title, .plan-title, .feeling-title {
		font-size: 34rpx;
		margin-bottom: 20rpx;
		display: block;
	}
	
	.timing-example {
		font-size: 30rpx;
		color: #666;
		margin-bottom: 20rpx;
		display: block;
	}
	
	.benefit-subtitle {
		font-size: 32rpx;
		color: #333;
		margin-bottom: 20rpx;
		display: block;
	}
	
	.personal-note {
		font-size: 30rpx;
		color: #666;
		margin: 20rpx 0;
		line-height: 1.6;
		display: block;
	}
	
	.question-container {
		margin-bottom: 30rpx;
	}
	
	.answer-input {
		width: 100%;
		height: 60rpx;
		border: 2rpx solid #666;
		border-radius: 0;
		padding: 0 20rpx;
		font-size: 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
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