<template>
	<view class="container">
		<view class="page">
			<view class="survey-content">
				<view class="title-card title-card-yellow">
					<text class="title-text">第二步：专家和同龄人的经验</text>
				</view>
				
				<view class="content-section">
					<text class="content-text">或许你会觉得，像缓慢深呼吸这样简单的动作能缓解压力听起来不可思议。然而，众多科学家已经对我们今天要教给你的这些平静技巧进行了深入研究。科学研究证实，这些技巧确实能有效减轻压力！</text>
				</view>
				
				<view class="research-section">
					<view class="research-title">
						<text class="section-title highlight">首先：</text>
						<text class="section-subtitle">让我们了解一项美国大学的研究。</text>
					</view>
					
					<text class="research-text">在该研究中，科研人员教了参与研究的青少年平静技巧，比如缓慢深呼吸和肌肉放松。</text>
					
					<view class="research-points">
						<view class="point-item">
							<text class="point-icon">+</text>
							<text class="point-text">这些青少年非常努力地练习了平静技巧。</text>
						</view>
						
						<view class="point-item">
							<text class="point-icon">+</text>
							<text class="point-text">当然，他们<text class="text-italic">有时</text>还是会感到有压力——这是人类的正常反应！</text>
						</view>
						
						<view class="point-item">
							<text class="point-icon">+</text>
							<text class="point-text">持续练习平静技巧几周后，这些青少年明显变得更平静，也更少焦虑了。</text>
						</view>
						
						<view class="point-item">
							<text class="point-icon">+</text>
							<text class="point-text">追踪研究显示，三年后，他们仍然保持着使用这些技巧的习惯，且压力和焦虑水平也比过去更低。</text>
						</view>
					</view>
				</view>
				
				<!-- 图表展示 -->
				<view class="chart-container">
					<image class="chart-image" src="https://tccolumbia.qualtrics.com/CP/File.php?F=F_1MIfCDmcbzSXcKW" mode="widthFix"></image>
				</view>
				
				<!-- 同龄人故事 -->
				<view class="story-section">
					<view class="story-title">
						<text class="section-title highlight">然后：</text>
						<text class="section-subtitle">我们来听听高年级同学小吴的故事，听他是如何通过这些平静技巧得到帮助的。</text>
					</view>
					
					<!-- 音频播放器 -->
					<view class="audio-player">
						<view class="audio-controls">
							<view class="play-button" @click="togglePlay">
								<text class="play-icon">{{ isPlaying ? '❚❚' : '▶' }}</text>
							</view>
							<text class="time-text">{{ currentTimeText }} / 1:03</text>
							<slider class="audio-slider" min="0" max="100" :value="progress" @change="onSliderChange" />
							<view class="volume-control">
								<text class="volume-icon">🔊</text>
							</view>
							<view class="more-options">
								<text class="options-icon">⋮</text>
							</view>
						</view>
					</view>
					
					<!-- 故事内容 -->
					<view class="story-card-container">
						<view class="story-card">
							<text class="story-content">"新学期刚开始时，我特别焦虑，整天担心这担心那。我担心自己的学习跟不上，也担心交不到朋友。每天被这些情绪淹没让我整个人都很疲惫。我想要去学一些能让我感觉好一点的方法。</text>
							
							<text class="story-content">我在网上找到了很多平静技巧。经过几个月的学习和尝试，我发现其中一些真的有效。我学会了在做我害怕的事情之前，比如说上台发言，先深深地吸一口气，这样能让我很快就觉得不那么紧张了。我还会在每天睡前花10分钟绷紧然后放松肌肉，这能帮助我放松下来，停止胡思乱想，快速入睡。</text>
							
							<text class="story-content">现在我放松多了，在新班级里交到了不少朋友，成绩也不错。我很开心，也很自豪。虽然现在有时候，还是会紧张焦虑，但我现在不会害怕这些情绪了，因为我知道该怎么应对和化解它们。"</text>
							
							<text class="story-note">(为保护隐私，名字、声音和细节已做修改。)</text>
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
	// 作为全局音频实例，不会在组件销毁时被销毁
	let globalAudio = null;
	let progressTimer = null;
	const AUDIO_DURATION = 63; // 1:03 = 63秒
	
	export default {
		data() {
			return {
				isPlaying: false,
				progress: 0,
				currentTimeText: '0:00'
			}
		},
		onLoad() {
			console.log("Step4页面加载");
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
					globalAudio.src = 'https://tccolumbia.qualtrics.com/CP/File.php?F=F_eJuKPsM6iuSCSns';
					
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
						this.currentTimeText = '1:03'; // 显示总时长
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
			toggleMute() {
				// 简化，不实现静音功能
				console.log("切换静音");
			},
			showOptions() {
				// 简化，不实现菜单选项
				console.log("显示更多选项");
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
					url: './step5'
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
	
	.title-card-yellow {
		background-color: #FFF8E1;
	}
	
	.title-text {
		font-size: 38rpx;
		font-weight: bold;
		color: #E6A23C;
		text-align: center;
	}
	
	.content-section {
		width: 100%;
		margin-bottom: 60rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	
	.content-text {
		font-size: 34rpx;
		color: #333;
		line-height: 1.8;
		text-align: justify;
	}
	
	.research-section {
		width: 100%;
		margin-bottom: 60rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	
	.research-title {
		margin-bottom: 30rpx;
	}
	
	.section-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
	}
	
	.highlight {
		color: #E6A23C;
		font-weight: bold;
		font-size: 38rpx;
	}
	
	.section-subtitle {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-left: 10rpx;
	}
	
	.research-text {
		font-size: 34rpx;
		color: #333;
		line-height: 1.8;
		margin-bottom: 40rpx;
		display: block;
		text-align: justify;
	}
	
	.research-points {
		margin-top: 30rpx;
	}
	
	.point-item {
		display: flex;
		margin-bottom: 30rpx;
		align-items: flex-start;
	}
	
	.point-icon {
		font-size: 36rpx;
		color: #E6A23C;
		font-weight: bold;
		margin-right: 15rpx;
		line-height: 1.5;
	}
	
	.point-text {
		font-size: 34rpx;
		color: #333;
		line-height: 1.8;
		flex: 1;
		text-align: justify;
	}
	
	.text-italic {
		font-style: italic;
	}
	
	.chart-container {
		width: calc(100% - 200rpx);
		margin: 0rpx 100rpx 50rpx 100rpx;
		background-color: #E1F5F7;
		border-radius: 25rpx;
		padding: 40rpx 30rpx;
		box-sizing: border-box;
		box-shadow: 0 2px 10px rgba(0,0,0,0.03);
	}
	
	.chart-image {
		width: 100%;
	}
	
	.story-section {
		width: 100%;
		margin-bottom: 60rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	
	.story-title {
		margin-bottom: 30rpx;
	}
	
	.audio-player {
		width: 90%;
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
	
	.story-card-container {
		position: relative;
		width: 100%;
		margin: 30rpx 0rpx 50rpx 0rpx;
		padding: 0;
		box-sizing: border-box;
		/* 只保留上下的不规则效果 */
		clip-path: polygon(
			0% 2%, 3% 0%, 7% 1%, 12% 0%, 17% 2%, 22% 0%, 27% 1%, 32% 0%, 37% 2%, 42% 0%,
			47% 1%, 52% 0%, 57% 2%, 62% 0%, 67% 1%, 72% 0%, 77% 2%, 82% 0%, 87% 1%,
			92% 0%, 97% 2%, 100% 0%,
			100% 100%, 97% 98%, 92% 100%, 87% 98%, 82% 100%, 77% 98%, 72% 100%, 67% 98%,
			62% 100%, 57% 98%, 52% 100%, 47% 98%, 42% 100%, 37% 98%, 32% 100%, 27% 98%,
			22% 100%, 17% 98%, 12% 100%, 7% 98%, 3% 100%, 0% 98%
		);
	}
	
	.story-card {
		width: 100%;
		padding: 50rpx 45rpx;
		background-color: #f1dab0;
		color: #000;
		border: none;
		border-radius: 0;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
		margin: 0;
	}
	
	/* 添加内部边框，模拟手绘直线效果 */
	.story-card::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border: 8rpx solid #555;
		border-radius: 0;
		/* 增强左右边缘的手绘感 */
		border-left-width: 10rpx;
		border-right-width: 10rpx;
		border-top-width: 6rpx;
		border-bottom-width: 7rpx;
		/* 确保边框在内容之下 */
		z-index: 0;
	}
	
	/* 添加第二层内部边框，增强视觉效果 */
	.story-card::after {
		content: "";
		position: absolute;
		top: -20rpx;
		left: -20rpx;
		right: -2rpx;
		bottom: -2rpx;
		border: 2rpx solid rgba(0,0,0,0.5);
		border-left-width: 3rpx;
		border-right-width: 3rpx;
		z-index: -1;
	}
	
	.story-content {
		display: block;
		font-size: 32rpx;
		line-height: 1.6;
		text-align: left;
		margin-bottom: 30rpx;
		color: #000;
		position: relative;
		z-index: 1;
	}
	
	.story-note {
		display: block;
		font-size: 28rpx;
		text-align: right;
		font-style: italic;
		color: #000;
		position: relative;
		z-index: 1;
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
</style> 