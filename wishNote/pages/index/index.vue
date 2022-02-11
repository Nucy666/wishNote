<template>
	<view class="content">
		<u-time-line>
			<block v-for="item in noteList" :key="item.id">
				<view class="time-title">
					<view style="width: 100rpx;display: flex; align-items: center;justify-content: space-between;">
						<text style="font-size: 40rpx;font-weight: 600;">{{item.day}}</text><text
							style="font-size: 24rpx;">{{item.week}}</text>
					</view>
					<view style="font-size: 26rpx;color:grey">{{item.month}}</view>
				</view>
				<u-time-line-item>
					<template v-slot:content>
						<view class="note-item" @click="gotoDetail(item.id)">
							<view class="u-order-desc">{{item.title}}</view>
							<view class="u-order-time">{{item.time}}</view>
						</view>
					</template>
				</u-time-line-item>
			</block>
		</u-time-line>
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
				noteColor: '#FFB6C1',
				addColor: '#FFB6C1',
				personColor: '#c5c5c5',
				title: 'Hello',
				noteList: [{
						id: 'asd446546',
						title: '日照香炉生紫烟，遥看瀑布挂前川，飞流直下三千尺。',
						day: '18',
						month: '2022.01',
						week: '周二',
						time: '10:30'
					},
					{
						id: 'asd44654',
						title: '日照香炉生紫烟，遥看瀑布挂前川，飞流直下三千尺。',
						day: '18',
						month: '2022.01',
						week: '周二',
						time: '10:30'
					},
					{
						id: 'asd46546',
						title: '日照香炉生紫烟，遥看瀑布挂前川，飞流直下三千尺。',
						day: '18',
						month: '2022.01',
						week: '周二',
						time: '10:30'
					}
				]
			}

		},

		onLoad() {

		},
		methods: {
			gotoDetail(id) {
				console.log(id)
				uni.navigateTo({
					url: '/pages/detail/detail'
				})
			},
			notes() {
				
			},
			person() {
				
				uni.switchTab({
					url:'/pages/personal/personal'
				})
			},
			addNote(){
				uni.navigateTo({
					url:'/pages/edit/edit'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: 40rpx;
		padding-left: 25%;
	}

	u-time-line {
		width: 70%;
		// margin-left: 25%;

	}

	.time-title {
		width: 225rpx;
		left: -225rpx;
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.note-item {
		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 490rpx;
		height: 180rpx;
		border-radius: 12rpx;
		padding: 20rpx;
		box-shadow: 0px 0px 20rpx 10rpx #f4f4f4;
	}

	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}

	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.u-order-desc {
		line-height: 44rpx;
		display: flex;
		flex-wrap: wrap;
		font-size: 28rpx;
		overflow: hidden;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
		position: absolute;
		bottom: 20rpx;
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
