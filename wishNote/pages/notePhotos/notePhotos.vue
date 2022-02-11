<template>
	<view class="main">
		<view class="waterfall">
			<view class="half-view">
				<view @click="previewImage(item.id)" @longpress="showMenu(item.id)" class="item"
					v-for="(item, index) in leftList" :key="item.id">
					<image :src="item.url" mode="widthFix"></image>
					<view class="intro">{{item.intro}}</view>
				</view>
			</view>
			<view class="half-view">
				<view @click="previewImage(item.id)" @longpress="showMenu(item.id)" class="item"
					v-for="(item, index) in rightList" :key="item.id">
					<image :src="item.url" mode="widthFix"></image>
					<view class="intro">{{item.intro}}</view>
				</view>
			</view>
		</view>
		<u-action-sheet :list="menuList" v-model="show" @click="selectMenu"></u-action-sheet>
		<button class="add-btn" @click="addPhoto">
			<u-icon name="plus" color="#FFB6C1"></u-icon>
		</button>
		<u-modal v-model="showModel" title="照片说明" @close="close" @confirm="confirm" :show-cancel-button="true">
			<input class="model-input" type="text" v-model="selectedIntro" placeholder="请输入说明"/>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flowList: [{
						id: '4sadsad',
						url: '/static/images/image1.jpg',
						intro: '第一次看电影'
					},
					{
						id: '31sadas',
						url: '/static/images/image2.jpg',
						intro: '第二次看电影'
					},
					{
						id: '43qsadasd',
						url: '/static/images/image3.jpg',
						intro: '第三次看电影'
					},
					{
						id: '87asdgas',
						url: '/static/images/image4.jpg',
						intro: '第四次看电影'
					}
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
				selectedIntro: '',
				selectedIndex: ''
			}
		},
		onLoad() {
			this.getImages()
			this.initLeftRight()
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
			},
			getImageIndex(id) {
				var reIdx = 0
				this.flowList.forEach((item, index) => {
					if (item.id == id) {
						reIdx = index
					}
				})
				return reIdx
			},
			getImages() {
				var images = []
				this.flowList.forEach((item, index) => {
					images.push(item.url)
				})
				this.urlArr = images
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
				this.selectedIndex = this.getImageIndex(id)
				this.selectedIntro = this.flowList[this.selectedIndex].intro
				this.selectedId = id
				this.show = !this.show
			},
			selectMenu(index) {
				if (this.menuList[index].text == '删除') {
					this.deletePhoto(this.selectedId)
				} else if (this.menuList[index].text == '编辑说明') {
					this.editIntro()
				}
			},
			removePhotoUrl(id) {
				var idx = 0
				this.flowList.forEach((item, index) => {
					if (item.id == id) {
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
							that.removePhotoUrl(id)
							uni.showToast({
								icon: 'none',
								title: '删除了'
							})

						}

					}
				})

			},
			editIntro() {
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
							var image = {
								url: item,
								id: that.getID(8),
								intro: ''
							}
							that.flowList.push(image)
							that.urlArr.push(item)
							that.initLeftRight()
						})

					}
				})
			},
			close() {
				this.selectedIntro = ''

			},

			confirm() {
				// console.log(e)
				this.flowList[this.selectedIndex].intro = this.selectedIntro
				this.initLeftRight()
				this.selectedIntro = ''

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

	.intro {
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
