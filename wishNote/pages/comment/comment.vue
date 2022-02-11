<template>
	<view class="main">
		<view class="comment-item" v-for="(item,index) in resData" @longpress="showMenu(item.id)" :key="item.id">
			<image :src="item.headIcon" mode=""></image>
			<view class="name-content-time">
				<view class="name">{{item.name}}</view>
				<view class="comment-content">
					{{item.comment}}
				</view>
				<view class="comment-time">
					{{item.dateTime}}
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
				resData: [{
						id: 'asdasd',
						headIcon: '/static/logo.png',
						name: '小明',
						comment: '羡慕了羡慕了羡慕了羡慕了羡慕了羡慕了羡慕了羡慕了羡慕了羡慕了羡慕了羡慕了羡慕了羡慕了羡慕了羡慕了羡慕了',
						dateTime: '2022.01.01 10:10'
					},
					{
						id: 'asd123asd',
						headIcon: '/static/logo.png',
						name: '小红',
						comment: '爱了爱了',
						dateTime: '2022.01.01 10:10'
					},
					{
						id: 'asda423sd',
						headIcon: '/static/logo.png',
						name: '小张',
						comment: '真不错',
						dateTime: '2022.01.01 10:10'
					},
					{
						id: 'asda234sd',
						headIcon: '/static/logo.png',
						name: '小军',
						comment: '我觉得可以啊',
						dateTime: '2022.01.01 10:10'
					},
				],
				menuList: [
					{
						text: '删除',
						color: 'red'
					}
				],
				commentInput: "",
				inputBottom: 0,
				selectedId: '',
				show:false
			}
		},
		methods: {
			blurTextarea(){
				this.inputBottom = 0
			},
			addComment(){
				if(this.commentInput){
					this.resData.push({
						id: this.getID(8),
						headIcon: '/static/logo.png',
						name: '小军',
						comment: this.commentInput,
						dateTime: '2022.01.01 10:10'
					})
					this.commentInput = ''
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
			getID(length){
			   return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
			},
			showMenu(id) {
				this.selectedId = id
				this.show = !this.show
			},
			deleteComment(){
				var that = this
				uni.showModal({
					content: "是否删除该评论",
					success(res) {
						if (res.confirm) {
							let idx
							that.resData.forEach((item,index)=>{
								if(item.id==that.selectedId){
									idx = index;
								}
							})
							that.resData.splice(idx,1)
							uni.showToast({
								icon: 'none',
								title: '删除了'
							})
				
						}
				
					}
				})
				
			}
		},
		onLoad() {
			uni.onKeyboardHeightChange(res => {
			  this.inputBottom = res.height
			})
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
