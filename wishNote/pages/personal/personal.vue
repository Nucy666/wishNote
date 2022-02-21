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
		<view class="btns-bar">
			<button class="small-btn" @click="notes()">
				<u-icon name="bookmark" :color="noteColor"></u-icon>
			</button>
			<button class="big-btn" @click="addNote()">
				<u-icon name="plus" :color="addColor" size="40rpx"></u-icon>
			</button>
			<button class="small-btn" @click="person()">
				<u-icon name="account" :color="personColor"></u-icon>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addColor: '#FFB6C1',
				personColor: '#FFB6C1',
				noteColor: '#c5c5c5',
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
				loginText:'点击登录'
			}
		},
		onLoad() {
			if(uni.getStorageSync('session')){
				this.loginFlag = true
			}else{
				this.loginFlag = false
			}
		},
		watch:{
			loginFlag(value){
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
			notes() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			outLogin() {
				var that = this
				uni.showModal({
					content:'确认退出登录吗',
					success() {
						that.loginFlag = false
						uni.removeStorageSync('session')
					}
				})
				

			},
			addNote() {
				uni.navigateTo({
					url: '/pages/edit/edit'
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

	.btns-bar {
		left: 12%;
		position: fixed;
		bottom: 50rpx;
		width: 76%;
		height: 140rpx;
		box-shadow: 0px 0px 20rpx 10rpx #f4f4f4;
		border-radius: 70rpx;
		background-color: #FFFFFF;
		z-index: 10;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	.small-btn {
		background-color: #FFFFFF;
		width: 74rpx;
		height: 74rpx;
		border-radius: 37rpx;
		box-shadow: 0px 0px 20rpx 5rpx #f4f4f4;
		padding: 0;
		line-height: 74rpx;
	}

	.big-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
		width: 96rpx;
		height: 96rpx;
		line-height: 96rpx;
		border-radius: 48rpx;
		box-shadow: 0px 0px 20rpx 5rpx #ffe4e6;
		border-color: #FFFFFF;
		padding: 5rpx;
		line-height: 96rpx;
	}

	button::after {
		border: none;
	}
</style>
