<template>
	<view class="container">
		<view class="page">
			<view class="survey-content">
				<!-- <view class="title-card title-card-blue">
					<text class="title-text">第四步：平静技巧实践</text>
				</view> -->
				
				<!-- 放松肌肉部分 -->
				<view class="technique-section">
					<view class="technique-image-container">
						<image class="technique-image" src="https://tccolumbia.qualtrics.com/CP/Graphic.php?IM=IM_a5k5DdLTpM1Ovbg" mode="widthFix"></image>
					</view>
					
					<view class="technique-content">
						<text class="section-title">如何 <text class="highlight-blue">放松肌肉</text>：</text>
						
						<view class="step-container">
							<view class="step-number">
								<text>1</text>
							</view>
							<view class="step-content">
								<text class="step-text">点击播放键，听听专家讲解如何放松肌肉。</text>
							</view>
						</view>
						
						<view class="step-container">
							<view class="step-number">
								<text>2</text>
							</view>
							<view class="step-content">
								<text class="step-text">在听的同时，完整地跟随音频里的指示。</text>
							</view>
						</view>
						
						<view class="step-container">
							<view class="step-number">
								<text>3</text>
							</view>
							<view class="step-content">
								<text class="step-text">跟着完成8分钟的练习后，看看你有什么样的感觉。</text>
							</view>
						</view>
						
						<view class="step-container">
							<view class="step-number">
								<text>4</text>
							</view>
							<view class="step-content">
								<text class="step-text">点击下方文字下载音频。你可以在日常生活中，使用该音频自主练习放松肌肉。</text>
							</view>
						</view>
					</view>
					
					<!-- 音频播放器 -->
					<view class="audio-player">
						<view class="audio-controls">
							<view class="play-button" @click="togglePlay">
								<text class="play-icon">{{ isPlaying ? '❚❚' : '▶' }}</text>
							</view>
							<text class="time-text">{{ currentTimeText }} / 8:25</text>
							<slider class="audio-slider" min="0" max="100" :value="progress" @change="onSliderChange" />
							<view class="volume-control">
								<text class="volume-icon">🔊</text>
							</view>
							<view class="more-options">
								<text class="options-icon">⋮</text>
							</view>
						</view>
					</view>
					
					<view class="audio-title">
						<text>放松肌肉指导语</text>
					</view>
				</view>
				
				<!-- 快速平静部分 -->
				<view class="technique-section">
					<view class="technique-image-container">
						<image class="technique-image" src="https://tccolumbia.qualtrics.com/CP/File.php?F=F_d0bXri7zcr4pVJk" mode="widthFix"></image>
					</view>
					
					<view class="technique-content">
						<text class="section-title">什么时候使用<text class="highlight-blue">快速平静</text>：</text>
						<text class="content-text">在你突然感到非常不开心，并希望快速让自己好转的时候。你可能坐在教室里准备参加考试，突然感觉很不好。这个时候，快速平静就可以很好地帮助到你。</text>
					</view>
					
					<view class="technique-content">
						<text class="section-title">如何 <text class="highlight-blue">快速平静</text>：</text>
						
						<view class="step-container">
							<view class="step-number">
								<text>1</text>
							</view>
							<view class="step-content">
								<text class="step-text">用鼻子吸气，屏住呼吸几秒钟。</text>
							</view>
						</view>
						
						<view class="step-container">
							<view class="step-number">
								<text>2</text>
							</view>
							<view class="step-content">
								<text class="step-text">在屏住呼吸的同时，想象让你感到平静的场景，并将这个画面保持在脑海中。</text>
							</view>
						</view>
						
						<view class="step-container">
							<view class="step-number">
								<text>3</text>
							</view>
							<view class="step-content">
								<text class="step-text">放松身体紧张的部位。比如，如果你发现自己拳头紧握，就松开手。</text>
							</view>
						</view>
						
						<view class="step-container">
							<view class="step-number">
								<text>4</text>
							</view>
							<view class="step-content">
								<text class="step-text">尽可能慢地呼气，同时想着你的宁静场景，并放松紧张的身体部位。</text>
							</view>
						</view>
					</view>
					
					<view class="next-suggestion">
						<text>在实际生活中尝试这些技巧，找到最适合你的方法！</text>
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
	// 作为全局音频实例，不会在组件销毁时被销毁
	let globalAudio = null;
	let progressTimer = null;
	const AUDIO_DURATION = 505; // 8:25 = 505秒
	
	export default {
		data() {
			return {
				isPlaying: false,
				progress: 0,
				currentTimeText: '0:00'
			}
		},
		onLoad() {
			console.log("Step6页面加载");
		},
		onUnload() {
			// 在组件卸载时清理计时器
			this.clearProgressTimer();
		},
		methods: {
			togglePlay() {
				console.log("点击播放按钮，当前状态:", this.isPlaying);
				
				// 如果正在播放，则暂停
				if (this.isPlaying && globalAudio) {
					console.log("暂停音频");
					globalAudio.pause();
					this.isPlaying = false;
					this.clearProgressTimer();
					return;
				}
				
				// 如果存在全局音频且已暂停，则继续播放
				if (globalAudio) {
					console.log("继续播放已存在的音频");
					globalAudio.play();
					this.isPlaying = true;
					this.startProgressTimer();
					return;
				}
				
				// 如果没有音频实例，则创建新实例
				try {
					console.log("创建新音频实例");
					globalAudio = wx.createInnerAudioContext();
					globalAudio.src = 'https://tccolumbia.qualtrics.com/CP/File.php?F=F_738nxh0lkZi71vE';
					
					// 监听错误
					globalAudio.onError((err) => {
						console.error('音频播放错误:', err);
						this.isPlaying = false;
						this.clearProgressTimer();
						uni.showToast({
							title: '音频播放失败',
							icon: 'none'
						});
					});
					
					// 监听播放结束
					globalAudio.onEnded(() => {
						console.log('音频播放结束');
						this.isPlaying = false;
						this.clearProgressTimer();
						this.progress = 100; // 设置进度条为100%
						this.currentTimeText = '8:25'; // 显示总时长
					});
					
					// 开始播放
					globalAudio.play();
					this.isPlaying = true;
					this.startProgressTimer();
				} catch (e) {
					console.error("音频播放失败:", e);
					this.isPlaying = false;
					uni.showToast({
						title: '音频播放失败',
						icon: 'none'
					});
				}
			},
			startProgressTimer() {
				// 清理已有计时器
				this.clearProgressTimer();
				
				// 开始新的计时器
				progressTimer = setInterval(() => {
					if (globalAudio && typeof globalAudio.currentTime === 'number') {
						// 计算进度百分比
						const currentTime = globalAudio.currentTime;
						this.progress = Math.floor((currentTime / AUDIO_DURATION) * 100);
						
						// 格式化当前时间为分:秒
						const minutes = Math.floor(currentTime / 60);
						const seconds = Math.floor(currentTime % 60);
						this.currentTimeText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
						
						console.log(`更新进度: ${this.progress}%, 时间: ${this.currentTimeText}`);
					}
				}, 1000); // 每秒更新一次
			},
			clearProgressTimer() {
				if (progressTimer) {
					clearInterval(progressTimer);
					progressTimer = null;
				}
			},
			onSliderChange(e) {
				// 实现进度条拖动跳转功能
				if (!globalAudio) {
					console.log("音频未初始化，无法跳转");
					return;
				}
				
				try {
					// 获取滑块值（0-100）
					const value = e.detail.value;
					console.log("滑块值:", value);
					
					// 计算对应的时间位置（秒）
					const seekTime = (value / 100) * AUDIO_DURATION;
					console.log("跳转到位置:", seekTime, "秒");
					
					// 设置音频播放位置
					globalAudio.seek(seekTime);
					
					// 更新显示的时间
					const minutes = Math.floor(seekTime / 60);
					const seconds = Math.floor(seekTime % 60);
					this.currentTimeText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
					
					// 如果当前没有播放，则自动开始播放
					if (!this.isPlaying) {
						console.log("从新位置开始播放");
						globalAudio.play();
						this.isPlaying = true;
						this.startProgressTimer();
					}
				} catch (e) {
					console.error("跳转播放失败:", e);
					uni.showToast({
						title: '跳转失败',
						icon: 'none'
					});
				}
			},
			goBack() {
				// 在离开页面前暂停音频但不销毁实例
				if (globalAudio && this.isPlaying) {
					try {
						globalAudio.pause();
						this.clearProgressTimer();
					} catch (e) {
						console.error("暂停音频失败:", e);
					}
				}
				uni.navigateBack();
			},
			goNext() {
				// 在离开页面前暂停音频但不销毁实例
				if (globalAudio && this.isPlaying) {
					try {
						globalAudio.pause();
						this.clearProgressTimer();
					} catch (e) {
						console.error("暂停音频失败:", e);
					}
				}
				uni.navigateTo({
					url: './step7',
					fail: () => {
						// 如果没有step7页面，则显示完成提示
						uni.showToast({
							title: '恭喜完成所有步骤！',
							icon: 'success',
							duration: 2000
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
	
	.technique-section {
		width: 100%;
		margin-bottom: 60rpx;
		box-sizing: border-box;
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
		margin-bottom: 40rpx;
	}
	
	.section-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 30rpx;
		display: block;
	}
	
	.highlight-blue {
		background-color: #E1F5F7;
		padding: 2rpx 10rpx;
		border-radius: 6rpx;
	}
	
	.content-text {
		font-size: 32rpx;
		color: #333;
		line-height: 1.8;
		margin: 20rpx 0;
		display: block;
		text-align: justify;
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
	
	.audio-player {
		width: 94%;
		margin: 40rpx auto;
		padding: 20rpx 25rpx;
		background-color: #F5F5F5;
		border-radius: 50rpx;
		box-sizing: border-box;
		box-shadow: 0 2px 8px rgba(0,0,0,0.05);
	}
	
	.audio-controls {
		display: flex;
		align-items: center;
	}
	
	.play-button {
		width: 60rpx;
		height: 60rpx;
		background-color: #e3b878;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 20rpx;
	}
	
	.play-icon {
		color: #FFFFFF;
		font-size: 28rpx;
	}
	
	.time-text {
		font-size: 28rpx;
		color: #666;
		margin-right: 20rpx;
		min-width: 120rpx;
	}
	
	.audio-slider {
		flex: 1;
		margin: 0 20rpx;
	}
	
	.volume-control, .more-options {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.volume-icon, .options-icon {
		font-size: 28rpx;
		color: #666;
	}
	
	.audio-title {
		width: 100%;
		text-align: center;
		font-size: 34rpx;
		font-weight: bold;
		color: #4E97A0;
		margin: 20rpx 0 50rpx 0;
	}
	
	.next-suggestion {
		width: 100%;
		text-align: center;
		font-size: 32rpx;
		color: #333;
		margin: 40rpx 0 60rpx 0;
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