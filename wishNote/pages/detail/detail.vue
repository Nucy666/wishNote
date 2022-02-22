<template>
	<view class="main">
		<view class="datetime" v-if="createDate">
			{{getYearMonth(createDate)+'.'+getDay(createDate)+' '+getWeek(createDate)+' '+getHourMinute(createDate)}}
		</view>
		
		<view class="line"></view>
		<view class="note-content">
			{{noteContent}}
		</view>
		<view v-if="updateTime" class="update">上次更新：{{updateTime}}</view>
		<view class="btns-bar">
			<button class="small-btn" @click="toPhotos"><u-icon name="photo" :color="btnColor"></u-icon></button>
			<button class="small-btn" @click="previousNote"><u-icon name="arrow-leftward" :color="btnColor"></u-icon></button>
			<button class="big-btn" @click="toEdit(noteId)"><u-icon name="edit-pen-fill" :color="btnColor" size="40rpx"></u-icon></button>
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
				noteId:'',
				btnColor:'#FFB6C1',
				updateTime:'',
				createDate:'',
				noteContent:'',
				updateFlag:false,
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
			this.noteId = option.id
		    this.getData()
		   var that = this
		   uni.$on('update',function(data){
				that.updateFlag = true
			})
		},
		onShow() {
			if(this.updateFlag){
				this.getData()
				this.updateFlag = false
			}
		},
		methods: {
			getData(){
				uni.showLoading()
				var that = this
				uni.request({
					url:this.baseUrl + '/note/note_detail',
					method:"GET",
					data:{
						noteId:that.noteId
					},
					success(res) {
						console.log(res.data)
						if(res.statusCode==200&& res.data){
							that.noteContent = res.data.context
							that.updateTime = res.data.updateTime
							that.createDate = res.data.timestamp
						}else{
							that.showErr()
						}
					},
					fail() {
						that.showErr()
					},
					complete() {
						uni.hideLoading()
					}
				})
			},
			toEdit(id){
				console.log(id)
				uni.navigateTo({
					url:'/pages/edit/edit?id='+this.noteId
				})
			},
			toPhotos(){
				uni.navigateTo({
					url:"/pages/notePhotos/notePhotos?id="+this.noteId
				})
			},
			deleteNote(){
				var that = this
				uni.showModal({
					content:"是否删除该笔记",
					success(res){
						if(res.confirm){
							uni.showLoading()
							uni.request({
								url:that.baseUrl+'/note/delete_note',
								method:"GET",
								data:{
									noteId:that.noteId
								},
								success(res) {
									if(res.statusCode==200&&res.data.code==0){
										uni.showToast({
											title:'删除成功',
											icon:'none'
										})
										uni.$emit('updateIndex')
										setTimeout(()=>{
											uni.navigateBack({
												
											})
										},500)
										
									}else{
										uni.showToast({
											title:'删除失败',
											icon:'none'
										})
									}
								},
								fail() {
									uni.showToast({
										title:'删除失败',
										icon:'none'
									})
								}
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
					this.deleteNote()
				}else if(this.menuList[index].text=='评论'){
					uni.navigateTo({
						url:'/pages/comment/comment?id='+this.noteId
					})
				}
			},
			previousNote(){
				this.preOrNextNote(0)
			},
			nextNote(){
				this.preOrNextNote(1)
			},
			preOrNextNote(flag){
				var that = this
				uni.showLoading()
				uni.request({
					url:that.baseUrl+'/note/note_pre_or_next',
					method:"GET",
					data:{
						index:flag,
						noteId:that.noteId
					},
					success(res) {
						uni.hideLoading()
						console.log(res)
						if(res.statusCode==200&& res.data){
							that.noteId = res.data.noteId
							that.noteContent = res.data.context
							that.updateTime = res.data.updateTime
							that.createDate = res.data.timestamp
						}else if(res.data===''){
							uni.showToast({
								title:'无上下篇笔记',
								icon:'none'
							})
						}else{
							that.showErr()
						}
						
					},
					fail() {
						that.showErr()
					}
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
