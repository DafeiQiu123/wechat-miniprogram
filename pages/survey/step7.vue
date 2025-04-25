<template>
	<view class="container">
		<view class="page">
			<view class="survey-content">
				<!-- 快速平静示例部分 -->
				<view class="technique-section">
					<view class="technique-image-container">
						<image class="technique-image" src="https://tccolumbia.qualtrics.com/CP/File.php?F=F_d0bXri7zcr4pVJk" mode="widthFix"></image>
					</view>
					
					<view class="example-section">
						<text class="example-title">示例</text>
						
						<text class="example-text">看看小羽同学是怎么进行<text class="highlight-text">快速平静</text>的。</text>
						
						<!-- 卧室图片 -->
						<view class="example-image-container">
							<image class="example-image" src="https://tccolumbia.qualtrics.com/CP/Graphic.php?IM=IM_6KJc4guDWZ0Bdt4" mode="widthFix"></image>
						</view>
						
						<!-- 示例音频播放器 -->
						<view class="audio-player">
							<view class="audio-controls">
								<view class="play-button" @click="togglePlayExample">
									<text class="play-icon">{{ isPlayingExample ? '❚❚' : '▶' }}</text>
								</view>
								<text class="time-text">{{ exampleTimeText }} / 0:23</text>
								<slider class="audio-slider" min="0" max="100" :value="exampleProgress" @change="onExampleSliderChange" />
								<view class="volume-control">
									<text class="volume-icon">🔊</text>
								</view>
							</view>
						</view>
						
						<!-- 示例描述文本框 -->
						<view class="quote-box">
							<text class="quote-text">"这是我在快速平静的时候会做的。我会先深吸一口气，然后屏住呼吸，想象我在自己的房间里，我的狗狗就在我的身边。然后，我会放松我的肩膀，从腹部慢慢地呼气，同时继续想象我和狗狗在房间里的情景。这能让我很快感觉好起来。"</text>
						</view>
					</view>
					
					<!-- 轮到你了 -->
					<view class="your-turn-section">
						<view class="technique-image-container">
							<image class="technique-image" src="https://tccolumbia.qualtrics.com/CP/File.php?F=F_d0bXri7zcr4pVJk" mode="widthFix"></image>
						</view>
						
						<view class="your-turn-header">
							<text class="your-turn-title">轮到你了!</text>
						</view>
						
						<text class="instruction-text">跟随动画中的指导，练习快速平静。</text>
						
						<!-- 练习视频播放器 -->
						<view class="video-container">
							<video 
								id="practiceVideo"
								src="https://tccolumbia.qualtrics.com/CP/File.php?F=F_3C1oRLZQSxRJvnw"
								controls
								show-play-btn="true"
								show-center-play-btn="true"
								show-fullscreen-btn="true"
								autoplay="true"
								loop="false"
								class="practice-video"
								@play="onVideoPlay"
								@pause="onVideoPause"
								@ended="onVideoEnd"
							></video>
						</view>
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
	// 示例音频实例
	let exampleAudio = null;
	let exampleTimer = null;
	const EXAMPLE_DURATION = 23; // 0:23 = 23秒
	
	export default {
		data() {
			return {
				isPlayingExample: false,
				exampleProgress: 0,
				exampleTimeText: '0:00',
				videoContext: null
			}
		},
		onLoad() {
			console.log("Step7页面加载");
		},
		onReady() {
			this.videoContext = uni.createVideoContext('practiceVideo', this);
		},
		onUnload() {
			// 在组件卸载时清理计时器并暂停音频
			this.clearExampleTimer();
			this.pauseAllMedia();
		},
		methods: {
			togglePlayExample() {
				console.log("点击示例播放按钮，当前状态:", this.isPlayingExample);
				
				// 如果正在播放，则暂停
				if (this.isPlayingExample && exampleAudio) {
					console.log("暂停示例音频");
					exampleAudio.pause();
					this.isPlayingExample = false;
					this.clearExampleTimer();
					return;
				}
				
				// 如果存在示例音频且已暂停，则继续播放
				if (exampleAudio) {
					console.log("继续播放已存在的示例音频");
					exampleAudio.play();
					this.isPlayingExample = true;
					this.startExampleTimer();
					return;
				}
				
				// 如果没有音频实例，则创建新实例
				try {
					console.log("创建新示例音频实例");
					exampleAudio = wx.createInnerAudioContext();
					exampleAudio.src = 'https://maple-fin.oss-cn-shenzhen.aliyuncs.com/_finalfinal.mp3';
					
					// 监听错误
					exampleAudio.onError((err) => {
						console.error('示例音频播放错误:', err);
						this.isPlayingExample = false;
						this.clearExampleTimer();
						uni.showToast({
							title: '音频播放失败',
							icon: 'none'
						});
					});
					
					// 监听播放结束
					exampleAudio.onEnded(() => {
						console.log('示例音频播放结束');
						this.isPlayingExample = false;
						this.clearExampleTimer();
						this.exampleProgress = 100; // 设置进度条为100%
						this.exampleTimeText = '0:23'; // 显示总时长
					});
					
					// 开始播放
					exampleAudio.play();
					this.isPlayingExample = true;
					this.startExampleTimer();
				} catch (e) {
					console.error("示例音频播放失败:", e);
					this.isPlayingExample = false;
					uni.showToast({
						title: '音频播放失败',
						icon: 'none'
					});
				}
			},
			startExampleTimer() {
				// 清理已有计时器
				this.clearExampleTimer();
				
				// 开始新的计时器
				exampleTimer = setInterval(() => {
					if (exampleAudio && typeof exampleAudio.currentTime === 'number') {
						// 计算进度百分比
						const currentTime = exampleAudio.currentTime;
						this.exampleProgress = Math.floor((currentTime / EXAMPLE_DURATION) * 100);
						
						// 格式化当前时间为分:秒
						const seconds = Math.floor(currentTime % 60);
						this.exampleTimeText = `0:${seconds.toString().padStart(2, '0')}`;
						
						console.log(`更新示例进度: ${this.exampleProgress}%, 时间: ${this.exampleTimeText}`);
					}
				}, 1000); // 每秒更新一次
			},
			clearExampleTimer() {
				if (exampleTimer) {
					clearInterval(exampleTimer);
					exampleTimer = null;
				}
			},
			onExampleSliderChange(e) {
				// 实现进度条拖动跳转功能
				if (!exampleAudio) {
					console.log("示例音频未初始化，无法跳转");
					return;
				}
				
				try {
					// 获取滑块值（0-100）
					const value = e.detail.value;
					console.log("示例滑块值:", value);
					
					// 计算对应的时间位置（秒）
					const seekTime = (value / 100) * EXAMPLE_DURATION;
					console.log("跳转到位置:", seekTime, "秒");
					
					// 设置音频播放位置
					exampleAudio.seek(seekTime);
					
					// 更新显示的时间
					const seconds = Math.floor(seekTime % 60);
					this.exampleTimeText = `0:${seconds.toString().padStart(2, '0')}`;
					
					// 如果当前没有播放，则自动开始播放
					if (!this.isPlayingExample) {
						console.log("从新位置开始播放示例");
						exampleAudio.play();
						this.isPlayingExample = true;
						this.startExampleTimer();
					}
				} catch (e) {
					console.error("跳转示例播放失败:", e);
					uni.showToast({
						title: '跳转失败',
						icon: 'none'
					});
				}
			},
			// 视频播放控制
			onVideoPlay() {
				console.log("视频开始播放");
				// 暂停音频避免冲突
				if (exampleAudio && this.isPlayingExample) {
					exampleAudio.pause();
					this.isPlayingExample = false;
					this.clearExampleTimer();
				}
			},
			onVideoPause() {
				console.log("视频暂停播放");
			},
			onVideoEnd() {
				console.log("视频播放结束");
			},
			pauseAllMedia() {
				// 暂停示例音频
				if (exampleAudio && this.isPlayingExample) {
					try {
						exampleAudio.pause();
						this.isPlayingExample = false;
						this.clearExampleTimer();
					} catch (e) {
						console.error("暂停示例音频失败:", e);
					}
				}
				
				// 暂停视频
				if (this.videoContext) {
					try {
						this.videoContext.pause();
					} catch (e) {
						console.error("暂停视频失败:", e);
					}
				}
			},
			goBack() {
				// 在离开页面前暂停所有媒体
				this.pauseAllMedia();
				uni.navigateBack();
			},
			goNext() {
				// 在离开页面前暂停所有媒体
				this.pauseAllMedia();
				uni.navigateTo({
					url: './step8',
					fail: () => {
						// 如果没有step8页面，则显示完成提示
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
	
	.technique-section {
		width: 100%;
		margin-bottom: 60rpx;
		box-sizing: border-box;
	}
	
	.technique-image-container {
		width: 100%;
		display: flex;
		justify-content: center;
		margin: 30rpx 0;
	}
	
	.technique-image {
		width: 300rpx;
	}
	
	.example-section {
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-bottom: 50rpx;
	}
	
	.example-title {
		font-size: 40rpx;
		font-weight: bold;
		color: #333;
		text-align: center;
		display: block;
		margin-bottom: 30rpx;
	}
	
	.example-text {
		font-size: 34rpx;
		color: #333;
		text-align: center;
		display: block;
		margin-bottom: 30rpx;
	}
	
	.highlight-text {
		color: #4E97A0;
		font-weight: bold;
	}
	
	.example-image-container {
		width: 100%;
		border: 2rpx solid #333;
		border-radius: 10rpx;
		overflow: hidden;
		margin: 30rpx 0;
	}
	
	.example-image {
		width: 100%;
	}
	
	.audio-player {
		width: 94%;
		margin: 30rpx auto;
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
	
	.volume-control {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.volume-icon {
		font-size: 28rpx;
		color: #666;
	}
	
	.quote-box {
		width: 100%;
		background-color: #E1F5F7;
		border-radius: 15rpx;
		padding: 30rpx;
		margin: 30rpx 0;
		box-sizing: border-box;
		border: 2rpx solid rgba(0,0,0,0.1);
	}
	
	.quote-text {
		font-size: 32rpx;
		color: #333;
		line-height: 1.6;
		text-align: justify;
	}
	
	.your-turn-section {
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	
	.your-turn-header {
		margin: 10rpx 0 30rpx 0;
	}
	
	.your-turn-title {
		font-size: 40rpx;
		font-weight: bold;
		color: #333;
		text-align: center;
		display: block;
		padding: 10rpx 40rpx;
		background-color: #E1F5F7;
		border-radius: 10rpx;
		margin: 0 auto;
		width: fit-content;
	}
	
	.instruction-text {
		font-size: 34rpx;
		color: #333;
		text-align: center;
		display: block;
		margin: 30rpx 0;
	}
	
	.video-container {
		width: 100%;
		margin: 30rpx 0;
		border-radius: 10rpx;
		overflow: hidden;
	}
	
	.practice-video {
		width: 100%;
		height: 420rpx;
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