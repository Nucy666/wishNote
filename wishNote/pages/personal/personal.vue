<template>
	<view class="content">
		<view class="wallpaper">
			<image class="wallpaper" src="/static/images/wallpaper.png" mode="widthFix"></image>
		</view>
		
		<view class="header" @click="login()">
			<image :src="avatar" class="headerImage" mode=""></image>
		</view>
		<view style="font-size: 34rpx; font-weight: 600;">{{name}}</view>
		<view class="functions">
			<view class="func-item" v-for="item,index in functions" :key='index'>
				<u-cell-item icon="setting-fill" :title="item" :title-style="titleStyle"></u-cell-item>
				
			</view>
		</view>
		<button class="out-btn" @click="login()">{{loginText}}</button>
		<tab-bar :isShowAdd='loginFlag&&(isMaster==1)' :tabIndex='2'></tab-bar>
	</view>
</template>

<script>
	import tabBar from '../../components/tabbar/tabbar.vue'
	export default {
		components:{tabBar},
		data() {
			return {
				avatar:'/static/logo.png',
				loginFlag:false,
				name:'未登录',
				info:'',
				functions:['账号安全','系统消息','意见反馈','关于笔记'],
				titleStyle:{
					fontSize:"32rpx",
					color:"#000000",
					'margin-left':"20rpx"
				},
				loginText:'点击登录',
				isMaster:0
			}
		},
		onLoad() {
			this.loginFlag = !!uni.getStorageSync('session')
			this.isMaster = uni.getStorageSync('isMaster')
		},
		watch:{
			loginFlag(value){
				this.glLogin = value
				if(value){
					this.loginText = '退出登录'
					this.name = uni.getStorageSync('name')
					this.avatar = uni.getStorageSync('avatar')
				}else{
					this.loginText = '点击登录'
					this.name = '未登录'
					this.avatar = '/static/logo.png'
				}
			}
		},
		methods: {
			outLogin() {
				var that = this
				uni.showModal({
					content:'确认退出登录吗',
					success(res) {
						if(res.confirm){
							that.loginFlag = false
							uni.removeStorageSync('session')
							uni.$emit('updateState','')
						}
						
					}
				})
				

			},
			login() {
				if(this.loginFlag){
					this.outLogin()
					return
				}
				var that = this
				uni.getUserProfile({
					desc: '展示头像和昵称',
					success: function(infoRes) {
						console.log(infoRes);
						uni.showLoading()
						uni.login({
							provider: 'weixin',
							  success: function (loginRes) {
								  uni.request({
								  	url:that.baseUrl+ "/note/user/login",
									method:"POST",
									data:{
										avatarUrl:infoRes.userInfo.avatarUrl,
										nickName:infoRes.userInfo.nickName,
										js_code:loginRes.code
									},
									success(res) {
										console.log(res)
										if(res.statusCode==200&&res.data.code==0){
											uni.showToast({
												title:"登陆成功",
												icon:"none"
											})
											that.avatar = infoRes.userInfo.avatarUrl
											that.name = infoRes.userInfo.nickName
											uni.setStorageSync('avatar',infoRes.userInfo.avatarUrl)
											uni.setStorageSync('name',infoRes.userInfo.nickName)
											console.log(loginRes);
											that.loginFlag = true
											uni.setStorageSync('session',res.data.session_key)
											uni.setStorageSync('userId',res.data.userId)
											uni.setStorageSync('isMaster',res.data.isMaster)
											that.isMater = res.data.isMaster
											uni.$emit('updateState','')
										}else{
											uni.showToast({
												title:"登录失败",
												icon:"none"
											})
										}
									},
									fail() {
										that.showErr()
									}
								  })
								
							  }
						})
					},
					fail(e) {
						uni.showToast({
							title:'用户取消登录',
							icon:"none"
						})
					}
				})
				
				
			
			}
		
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		height: 105vh;
		background-color: #f6f5f9;
	}
	.functions{
		margin-top: 100rpx;
		width: 90%;
		background-color: #ffffff;
		border-radius: 20rpx;
		font-size: 32rpx;
	}
	.wallpaper {
		width: 100%;
	}
	.out-btn{
		background-color: #ffffff;
		margin-top: 50rpx;
		width: 90%;
		height: 100rpx;
		border-radius: 20rpx;
		font-size: 32rpx;
		line-height: 100rpx;
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 160rpx;
		width: 160rpx;
		border-radius: 80rpx;
		margin-top: -80rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 10rpx 10rpx rgba(210, 210, 210, 0.2);
	}

	.headerImage {
		height: 150rpx;
		width: 150rpx;
		border-radius: 75rpx;
	}

</style>
