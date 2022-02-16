<template>
	<view class="content">
		<u-time-line>
			<block v-for="item in noteList" :key="item.id">
				<view class="time-title">
					<view style="width: 100rpx;display: flex; align-items: center;justify-content: space-between;">
						<text style="font-size: 40rpx;font-weight: 600;">{{getDay(item.timestamp)}}</text><text
							style="font-size: 24rpx;">{{getWeek(item.timestamp)}}</text>
					</view>
					<view style="font-size: 26rpx;color:grey">{{getYearMonth(item.timestamp)}}</view>
				</view>
				<u-time-line-item>
					<template v-slot:content>
						<view class="note-item" @click="gotoDetail(item.id)">
							<view class="u-order-desc">{{item.name}}</view>
							<view class="u-order-time">{{getHourMinute(item.timestamp)}}</view>
						</view>
					</template>
				</u-time-line-item>
			</block>
		</u-time-line>
		<u-loadmore :status="status" style="left: -100rpx; margin-bottom: 200rpx;" @loadmore="loadmore"/>
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
				status:'loadmore',
				noteColor: '#FFB6C1',
				addColor: '#FFB6C1',
				personColor: '#c5c5c5',
				title: 'Hello',
				noteList: [],
				pageNum:1,
				pageSize:1,
			}

		},
		onLoad() {
			var that = this
			uni.request({
				url:this.baseUrl+'/note/note_by_page',
				method:"POST",
				data:{
					pageNo:that.pageNum,
					pageSize:that.pageSize
					
				},
				success(res) {
					console.log(res.data)
					if(res.statusCode==200){
						that.noteList = res.data.data
						that.pageNum += 1
					}else{
						that.showErr()
					}
				},fail() {
					that.showErr()
				}
			})
		},
		onPullDownRefresh() {
			var that = this
			that.pageNum = 1
			uni.request({
				url:that.baseUrl+'/note/note_by_page',
				method:"POST",
				data:{
					pageNo:that.pageNum,
					pageSize:that.pageSize
					
				},
				success(res) {
					if(res.statusCode==200){
						console.log(res.data)
						that.noteList = res.data.data
						that.pageNum += 1
						uni.stopPullDownRefresh()
						that.status = 'loadmore'
					}else{
						that.showErr()
					}
				},fail() {
					that.showErr()
				}
			})
			
		},
		onReachBottom() {
			this.loadmore()
		},
		methods: {
			gotoDetail(id) {
				console.log(id)
				uni.navigateTo({
					url: '/pages/detail/detail?id='+id
				})
			},
			notes() {
				
			},
			loadmore(){
				this.status = 'loading'
				var that = this
				uni.request({
					url:that.baseUrl+'/note/note_by_page',
					method:"POST",
					data:{
						pageNo:that.pageNum,
						pageSize:that.pageSize
					},
					success(res) {
						console.log(res.data)
						if(res.statusCode==200){
							if(that.noteList.length>= res.data.total){
								that.status = 'nomore'
								return
							}
							that.noteList=that.noteList.concat(res.data.data);
							that.pageNum += 1
							uni.stopPullDownRefresh()
							that.status = 'loadmore'
						}else{
							that.showErr()
						}
					
					},
					fail(e) {
						that.showErr()
					}
				})
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
			},
			getYearMonth(time){
				var date = new Date(time);
				if(date.getMonth()+1<10)
					return date.getFullYear()+'.0'+(date.getMonth()+1)
				else
					return date.getFullYear()+'.'+(date.getMonth()+1)
			},
			getDay(time){
				var date = new Date(time);
				return date.getDate().toString()
			},
			getHourMinute(time){
				var date = new Date(time);
				var hour = date.getHours()
				var minutes = date.getMinutes()
				if(hour<10)
					hour = '0'+ hour
				if(minutes<10)
					minutes = '0'+ minutes
				return hour+':'+minutes
			},
			getWeek(time) {
				var date = new Date(time);
			    var week;
			    if(date.getDay() == 0) week = "周日"
			    if(date.getDay() == 1) week = "周一"
			    if(date.getDay() == 2) week = "周二"
			    if(date.getDay() == 3) week = "周三"
			    if(date.getDay() == 4) week = "周四"
			    if(date.getDay() == 5) week = "周五"
			    if(date.getDay() == 6) week = "周六"
			    return week;
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
		// margin-bottom:200rpx;
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
