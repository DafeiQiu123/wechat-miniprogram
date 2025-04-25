<script>
	import indexPage from './pages/index/index.vue'
	import surveyPage from './pages/survey/survey.vue'
	
	export default {
		globalData: {
			$vm: null
		},
		onLaunch: function() {
			console.log('App Launch')
			
			// #ifdef MP-WEIXIN
			// 确保小程序环境下 getApp().$vm 能正常工作
			if (typeof getApp === 'function') {
				const app = getApp()
				if (app && !app.$vm) {
					app.$vm = this
				}
			}
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
