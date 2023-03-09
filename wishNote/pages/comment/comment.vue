<template>
	<view class="main">
		<view class="main" style="margin-bottom:128rpx ;">
			<view class="comment-item" v-for="(item,index) in resData" @longpress="showMenu(item)" :key="item.id">
				<image :src="item.avatar" mode=""></image>
				<view class="name-content-time">
					<view class="name">{{item.nickName}}</view>
					<view class="comment-content">
						{{item.context}}
					</view>
					<view class="comment-time">
						{{item.createTime}}
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-textarea" :style="{bottom: inputBottom+'px'}">
			<view class="textarea-container">
				<textarea v-model="commentInput" :maxlength="-1" :auto-height="true" :show-confirm-bar="false" placeholder="说点好听的话吧"
					:cursor-spacing="10" :fixed="true" :adjust-position="false" 
					@blur="blurTextarea" />
			</view>
			<button @click="addComment" class="primary-btn">发布</button>
		</view>
		<u-action-sheet :list="menuList" v-model="show" @click="selectMenu"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resData: [],
				menuList: [
					{
						text: '删除',
						color: 'red'
					}
				],
				commentInput: "",
				inputBottom: 0,
				selectedId: '',
				show:false,
				noteId:'',
				selectedUser:''
			}
		},
		onLoad(option) {
			uni.onKeyboardHeightChange(res => {
			  this.inputBottom = res.height
			})
			if(option.id){
				this.noteId = option.id
			}
			var that = this
			uni.request({
				url:that.baseUrl + '/note/query_comment_list',
				method:'GET',
				data:{
					noteId:that.noteId
				},
				success(res) {
					if(res.data.data){
						that.resData = res.data.data
					}else{
						
					}
				}
			})
		},
		methods: {
			blurTextarea(){
				this.inputBottom = 0
			},
			addComment(){
				if(this.commentInput){
					var that = this
					uni.showLoading({
						
					})
					uni.request({
						url:that.baseUrl + '/note/comment_note',
						method:'POST',
						header:{
							'Access-Token':uni.getStorageSync('session'),
							
						},
						data:{
							noteId:that.noteId,
							userId:uni.getStorageSync('userId'),
							context:that.commentInput
						},
						success(res) {
							if(res.data.code==0){
								that.resData.splice(0,0,{
									id: res.data.extendVal,
									avatar: uni.getStorageSync('avatar'),
									nickName:  uni.getStorageSync('name'),
									context: that.commentInput,
									createTime:res.data.createTime
								})
								uni.hideLoading()
								that.commentInput = ''
							}else{
								that.showErr()
							}
						},fail() {
							that.showErr()
						}
					})
				}else{
					uni.showToast({
						title:'请输入内容',
						icon:'none'
					})
				}
				
			},
			selectMenu(index) {
				if (this.menuList[index].text == '删除') {
					this.deleteComment()
				} 
			},
			showMenu(item) {
				if(item.userId == uni.getStorageSync('userId')){
					this.selectedId = item.id
					this.show = !this.show
				}
				
			},
			deleteComment(){
				var that = this
				uni.showModal({
					content: "是否删除该评论",
					success(res) {
						if (res.confirm) {
							uni.showLoading({
								
							})
							uni.request({
								url:that.baseUrl+'/note/delete_comment',
								method:'GET',
								header:{
									'Access-Token':uni.getStorageSync('session')
								},
								data:{
									commentId:that.selectedId,
									userId:uni.getStorageSync('userId')
								},
								success(res) {
									if(res.data.code==0){
										let idx
										that.resData.forEach((item,index)=>{
											if(item.id==that.selectedId){
												idx = index;
											}
										})
										that.resData.splice(idx,1)
										uni.showToast({
											title:"删除成功",
											icon:'none'
										})
									}else{
										uni.showToast({
											title:"删除失败",
											icon:'none'
										})
									}
								},fail() {
									that.showErr()
								}
							})
							
							
				
						}
				
					}
				})
				
			}
		}
	}
</script>

<style scoped>
	.main {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 20rpx;
	}

	.comment-item {
		width: 100%;
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
	}

	.name-content-time {
		width: 590rpx;
		display: flex;
		flex-direction: column;
		margin-left: 30rpx;
		border-bottom: 1px #e8e8e8 solid;
		border-collapse:collapse;
	}

	image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 40rpx;
		margin-left: 30rpx;
	}

	.name {
		font-size: 28rpx;
		color: #7e7e7e;
	}

	.comment-content {
		margin-top: 10rpx;
		margin-bottom: 10rpx;

	}

	.comment-time {
		font-size: 20rpx;
		color: #a2a2a2;
	}

	.bottom-textarea {
		position: fixed;
		bottom: 0px;
		left: 0px;
		right: 0px;
		background-color: #f2f2f2;
		padding-bottom: 40rpx;
		display: flex;
		padding-top: 10rpx;
		align-items: flex-end;
	}

	.textarea-container {
		padding-left: 10rpx;
		flex: 1;
		min-height: 70rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 8rpx;
		box-sizing: border-box;
		margin-left: 30rpx;
		margin-right: 20rpx;
	}

	.textarea-container>textarea {
		
		max-height: 100rpx;
		font-size: 35rpx;
		color: rgba(8, 8, 8, 1);
		width: auto;
	}
	.primary-btn{
		width: 130rpx;
		height: 72rpx;
		margin-right: 40rpx;
		line-height: 72rpx;
		color: white;
		background-color: #FFB6C1;
		font-size: 35rpx;
	}
	.primary-btn::after{
		border: none;
	}
</style>
