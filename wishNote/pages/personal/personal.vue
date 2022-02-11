<template>
	<view class="content">
		<view class="wallpaper">
			<image class="wallpaper" src="/static/images/wallpaper.png" mode="widthFix"></image>
		</view>
		<view class="header">
			<image src="/static/logo.png" class="headerImage" mode=""></image>
		</view>
		<view style="font-size: 34rpx; font-weight: 600;">小杨</view>
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
				personColor:'#FFB6C1',
				noteColor:'#c5c5c5'
			}
		},
		methods: {
			notes() {
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			person() {
				
				
			},
			addNote(){
				uni.navigateTo({
					url:'/pages/edit/edit'
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.wallpaper{
		width: 100%;
	}
	.header{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 160rpx;
		width: 160rpx;
		border-radius: 80rpx;
		margin-top: -80rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 10rpx 10rpx rgba(210,210,210,0.2);
	}
	.headerImage{
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
		padding:5rpx;
		line-height: 96rpx;
	}

	button::after {
		border: none;
	}
</style>
