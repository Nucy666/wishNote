<template>
	<view class="main">
		<view class="waterfall">
			<view class="half-view">
				<view @click="previewImage(item.pictureId)" @longpress="showMenu(item.pictureId)" class="item"
					v-for="(item, index) in leftList" :key="item.pictureId">
					<image :src="item.pictureUrl" mode="widthFix"></image>
					<view class="info">{{item.info}}</view>
				</view>
			</view>
			<view class="half-view">
				<view @click="previewImage(item.pictureId)" @longpress="showMenu(item.pictureId)" class="item"
					v-for="(item, index) in rightList" :key="item.pictureId">
					<image :src="item.pictureUrl" mode="widthFix"></image>
					<view class="info">{{item.info}}</view>
				</view>
			</view>
		</view>
		<u-action-sheet :list="menuList" v-model="show" @click="selectMenu"></u-action-sheet>
		<button class="add-btn" @click="addPhoto">
			<u-icon name="plus" color="#FFB6C1"></u-icon>
		</button>
		<u-modal v-model="showModel" title="照片说明" @close="close" @confirm="confirm" :show-cancel-button="true">
			<input class="model-input" type="text" v-model="selectedInfo" placeholder="请输入说明"/>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flowList: [
				],
				leftList: [],
				rightList: [],
				urlArr: [],
				show: false,
				showModel: false,
				menuList: [{
						text: '编辑说明',
					},
					{
						text: '删除',
						color: 'red'
					}
				],
				selectedId: '',
				selectedInfo: '',
				selectedIndex: '',
				noteId:''
			}
		},
		onLoad(option) {
			if(option.id){
				this.noteId = option.id
			}
			this.getImages()
			
		},
		methods: {
			initLeftRight() {
				this.leftList = []
				this.rightList = []
				this.flowList.forEach((item, index) => {
					if (index % 2 == 0) {
						this.leftList.push(item)
					} else {
						this.rightList.push(item)
					}
				})
				console.log(this.leftList)
			},
			getImageIndex(id) {
				var reIdx = 0
				this.flowList.forEach((item, index) => {
					if (item.pictureId == id) {
						reIdx = index
					}
				})
				return reIdx
			},
			getImages() {
				var images = []
				uni.showLoading()
				var that = this
				uni.request({
					url:that.baseUrl+ "/note/picture/pic_urls",
					data:{
						noteId:that.noteId 
					},
					method:"GET",
					success(res) {
						if(res.statusCode==200&&res.data.data){
							that.flowList = res.data.data
							that.flowList.forEach((item, index) => {
								images.push(item.pictureUrl)
							})
							that.urlArr = images
							uni.hideLoading()
							that.initLeftRight()
						}else{
							that.showErr()
						}
					},fail() {
						that.showErr()
					}
				})
				
			},
			previewImage(id) {
				console.log(id)
				console.log(this.getImageIndex(id))
				uni.previewImage({
					current: this.getImageIndex(id),
					urls: this.urlArr
				})
			},
			showMenu(id) {
				console.log(id)
				this.selectedIndex = this.getImageIndex(id)
				console.log(this.selectedIndex)
				this.selectedInfo = this.flowList[this.selectedIndex].info
				this.selectedId = id
				this.show = !this.show
			},
			selectMenu(index) {
				if (this.menuList[index].text == '删除') {
					this.deletePhoto(this.selectedId)
				} else if (this.menuList[index].text == '编辑说明') {
					this.editinfo()
				}
			},
			removePhotoUrl(id) {
				var idx = 0
				this.flowList.forEach((item, index) => {
					if (item.pictureId == id) {
						idx = index
					}
				})
				this.flowList.splice(idx, 1)
				this.urlArr.splice(idx, 1)
				this.initLeftRight()
			},
			deletePhoto(id) {
				var that = this
				uni.showModal({
					content: "是否删除该照片",
					success(res) {
						if (res.confirm) {
							uni.request({
								url:that.baseUrl+ "/note/picture/delete_picture",
								method:"GET",
								data:{
									pictureId:that.flowList[that.selectedIndex].pictureId
								},
								success(res) {
									if(res.data.code==0){
										that.removePhotoUrl(id)
									}
								}
							})
							

						}

					}
				})

			},
			editinfo() {
				this.showModel = true
			},

			getID(length) {
				return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
			},
			addPhoto() {
				
				var that = this
				uni.chooseImage({
					sizeType: "Original",
					success(res) {
						res.tempFilePaths.forEach((item) => {
							console.log(item)
							uni.showLoading()
							uni.uploadFile({
								url:that.baseUrl+"/note/picture/save_pic",
								filePath:item,
								name:'file',
								formData:{
									noteId:that.noteId
								},
								dataType:'data',
								success: (res) => {
									res = JSON.parse(res.data);
									if(res.code==0){
										var image = {
											pictureUrl: item,
											pictureId: res.extendVal,
											info: '',
										}
										that.flowList.push(image)
										that.urlArr.push(item)
										that.initLeftRight()
										uni.hideLoading()
									}
									else{
										uni.showToast({
											title:'上传失败',
											icon:'none'
										})
									}
								},
								fail() {
									uni.showToast({
										title:'上传失败',
										icon:'none'
									})
								}
								
							})
						})

					}
				})
			},
			close() {
				this.selectedInfo = ''
			},

			confirm() {
				// console.log(e)
				uni.showLoading()
				var that = this
				uni.request({
					url:that.baseUrl+ '/note/picture/save_pic_info',
					data:{
						pictureId:that.flowList[that.selectedIndex].pictureId,
						info:that.selectedInfo
					},
					method:"POST",
					success(res) {
						
						if(res.statusCode==200&&res.data.code==0){
							uni.hideLoading()
							that.flowList[that.selectedIndex].info = that.selectedInfo
							that.selectedInfo = ''
							uni.hideLoading()
						}
						else{
							uni.showToast({
								title:"保存失败",
								icon:"none"
							})
						}
					},
					fail(e) {
						uni.showToast({
							title:"保存失败",
							icon:"none"
						})
					}
				})
			

			}
		}
	}
</script>

<style scoped>
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 25rpx;
		padding-bottom: 40rpx;
	}

	.item {
		margin-top: 20rpx;
		margin-left: 3%;
		width: 94%;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 0px 0px 20rpx 10rpx #f4f4f4;
	}

	.waterfall {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.half-view {
		width: 50%;
	}

	image {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		width: 86%;
		border-radius: 20rpx;
	}

	.info {
		margin-bottom: 20rpx;
		align-self: flex-start;
		margin-left: 7%;
		color: grey;
	}

	.add-btn {
		background-color: #FFFFFF;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		box-shadow: 0px 0px 20rpx 10rpx #f4f4f4;
		padding: 0;
		position: fixed;
		right: 40rpx;
		bottom: 40rpx;
		line-height: 100rpx;
	}

	button::after {
		border: none;
	}

	.model-input{
		width: 80%;
		border: 1px #f1f1f1 solid;
		border-radius: 10rpx;
		margin-left: 10%;
		height: 60rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		padding-left: 10rpx;
	}
</style>
