<template>
	<view class="main">
		<textarea class="note-content" v-model="noteContent" placeholder="写笔记" maxlength='-1' focus="true" selection-end='1'/>
		<view class="btns">
			<button type="default" class="btn" @click="setTime">设定时间</button>
			<button type="default" class="btn" @click="saveNote">保存笔记</button>
		</view>
		<u-picker v-model="show" mode="time" :params="params" @confirm="confirmTime" :default-time="noteTime"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noteTime:'',
				noteContent:"",
				show:false,
				noteId:'',
				params: {
							year: true,
							month: true,
							day: true,
							hour: true,
							minute: true,
							second: true
						},
			}
		},
		onLoad(option) {
			if(option.id){
				uni.showLoading({
					
				})
				var that = this
				that.noteId = option.id
				console.log(that.noteId)
				uni.request({
					url:this.baseUrl + '/note/note_detail',
					method:"GET",
					data:{
						noteId:option.id
					},
					success(res) {
						console.log(res.data)
						if(res.statusCode==200&& res.data){
							that.noteContent = res.data.context
							that.noteTime = res.data.noteTime
							uni.hideLoading()
						}else{
							that.showErr()
						}
					},
					fail() {
						that.showErr()
					}
				})
			}
		},
		methods: {
			setTime(){
				this.show = true
			},
			confirmTime(e){
				console.log(e)
				this.noteTime = e.year+'-'+e.month+'-'+e.day+' '+e.hour+':'+e.minute+':'+e.second
			},
			saveNote(){
				
				var that = this
				uni.showLoading({
					
				})
				uni.request({
					url:this.baseUrl + '/note/save_note',
					method:"POST",
					data:{
						noteTime:that.noteTime,
						id:that.noteId,
						context:that.noteContent
					},
					header:{
						"Access-Token":uni.getStorageSync('session')
					},
					success(res) {
						console.log(res.data)
						if(res.statusCode==200&& res.data.code==0){
							uni.showToast({
								title:'保存成功',
								icon:'none'
							})
							uni.$emit('update')
							uni.$emit('updateIndex')
						}else{
							uni.showToast({
								title:'保存失败',
								icon:'none'
							})
						}
					},
					fail() {
						uni.showToast({
							title:'保存失败',
							icon:'none'
						})
					}
				})
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
		padding-top: 25rpx;
	}
	.note-content{
		height: 90vh;
		width: 92%;
		line-height: 55rpx;
		font-size: 32rpx;
		/* margin-bottom: 200rpx; */
	}
	.btns{
		height: 100rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 100%;
	}
	.btn{
		background-color: #ffffff;
		width: 150rpx;
		height: 74rpx;
		border-radius: 20rpx;
		box-shadow: 0px 0px 20rpx 5rpx #f4f4f4;
		padding: 0;
		line-height: 74rpx;
		color: #FFB6C1;
		font-size: 26rpx;
	}
	button::after {
		border: none;
	}
</style>
