<template>
	<view class="main">
		<view class="datetime">
			{{resData.day+' '+resData.week+' '+resData.time}}
		</view>
		
		<view class="line"></view>
		<view class="note-content">
			{{resData.noteContent}}
		</view>
		<view v-if="updateTime" class="update">上次更新：{{updateTime}}</view>
		<view class="btns-bar">
			<button class="small-btn" @click="toPhotos"><u-icon name="photo" :color="btnColor"></u-icon></button>
			<button class="small-btn" @click="previousNote"><u-icon name="arrow-leftward" :color="btnColor"></u-icon></button>
			<button class="big-btn" @click="toEdit(resData.id)"><u-icon name="edit-pen-fill" :color="btnColor" size="40rpx"></u-icon></button>
			<button class="small-btn" @click="nextNote"><u-icon name="arrow-rightward" :color="btnColor"></u-icon></button>
			<button class="small-btn" @click="more"><u-icon name="more-circle" :color="btnColor"></u-icon></button>
		</view>
		<u-action-sheet :list="menuList" v-model="show" @click="moreSelect"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnColor:'#FFB6C1',
				updateTime:'',
				resData:{
					
					id:'14asd46',
					day:'2022.01.18',
					week:'周二',
					time:'14:46',
					noteContent:''
				},
				menuList:[
					{
						text:'评论',
					},
					{
						text:'删除',
						color:"#FF0000"
					}
				],
				show:false
			}
		},
		onLoad(option) {
			var that = this
			uni.request({
				url:this.baseUrl + '/note/note_detail',
				method:"GET",
				data:{
					noteId:option.id
				},
				success(res) {
					console.log(res.data)
					that.resData.noteContent = res.data.context
					that.updateTime = res.data.updateTime
				}
			})
		},
		methods: {
			toEdit(id){
				console.log(id)
				uni.navigateTo({
					url:'/pages/edit/edit'
				})
			},
			toPhotos(){
				uni.navigateTo({
					url:"/pages/notePhotos/notePhotos"
				})
			},
			deleteNote(id){
				
				uni.showModal({
					content:"是否删除该笔记",
					success(res){
						if(res.confirm){
							console.log(id)
							uni.navigateBack({
								
							})
						}
						
					}
				})
			},
			more(){
				this.show = !this.show
			},
			moreSelect(index){
				if(this.menuList[index].text=='删除'){
					this.deleteNote(this.resData.id)
				}else if(this.menuList[index].text=='评论'){
					uni.navigateTo({
						url:'/pages/comment/comment'
					})
				}
			},
			previousNote(){
				this.resData = {
					id:'14asd46',
					day:'2022.01.18',
					week:'周二',
					time:'14:46',
					noteContent:"前一个"
				}
			},
			nextNote(){
				this.resData = {
					id:'14asd46',
					day:'2022.01.18',
					week:'周二',
					time:'14:46',
					noteContent:"后一个"
				}
			}
		}
	}
</script>

<style scoped>
	.main{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 40rpx;
	}
.note-content{
	margin-top: 20rpx;
	width: 92%;
	line-height: 55rpx;
	font-size: 32rpx;
	
}
.datetime{
	margin-left: 5%;
	align-self: flex-start;
	color: #aaaaaa;
	font-weight: 600;
	margin-bottom: 20rpx;
}
.line{
	width: 90%;
	height: 1px;
	border-top: #d8d8d8 solid 0.5px;
}
.update{
	color:grey;
	font-size: 20rpx;
	margin-bottom: 200rpx;
	align-self: flex-end;
	margin-right: 30rpx;
}
.btns-bar{
	position: fixed;
	bottom: 50rpx;
	width: 88%;
	height: 140rpx;
	box-shadow:0px 0px 20rpx 10rpx #f4f4f4;
	border-radius: 70rpx;
	background-color: #FFFFFF;
	z-index: 10;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
}
.small-btn{
	background-color: #FFFFFF;
	width: 74rpx;
	height: 74rpx;
	border-radius: 37rpx;
	box-shadow:0px 0px 20rpx 5rpx #f4f4f4;
	padding: 0;
	line-height: 74rpx;
}
.big-btn{
	background-color: #FFFFFF;
	width: 96rpx;
	height: 96rpx;
	border-radius: 48rpx;
	box-shadow:0px 0px 20rpx 5rpx #f4f4f4;
	border-color: #FFFFFF;
	padding: 0;
	line-height: 96rpx;
}
button::after{ border: none; }
</style>
