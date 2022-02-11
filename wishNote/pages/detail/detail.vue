<template>
	<view class="main">
		<view class="datetime">
			{{resData.day+' '+resData.week+' '+resData.time}}
		</view>
		
		<view class="line"></view>
		<view class="note-content">
			{{resData.noteContent}}
		</view>
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
				resData:{
					id:'14asd46',
					day:'2022.01.18',
					week:'周二',
					time:'14:46',
					noteContent:"我和我女朋友是在qq空间里面认识的，她很喜欢发动态，刚开始没怎么注意，后面看多了，我就点进去看了下，觉得她好像很有趣，应该是那种直来直往的人，她喜欢健身，当时我也在控制体重，所以就厚着脸皮问她健身一些东西，她也回复我了，第一时间好激动，开始幻想后面的事情，但是她一下又非常冷漠，中间有好长时间没联系。国庆节回家我顺便给他吐槽了回家好堵，但是她就是很冷漠回了，我给他吐槽很久，她就回一句习惯就好，我感觉是烧红的铁被冷水冲熄了一样，后面没有联系了。 10月底的时候我发了个朋友圈，我没想到她在下面评论了，让我一下子又心动了起来，我不知道咋个回复，怕回复不好又没话题了，甚至还喊杨力一文帮我想咋个回。最后我主动和她聊天，给她说最近一些事情。刚开始话题也很少，把该说的说完了我就不知道怎么说下去了，但是好在她是那种话题很多的人，不至于显得很尴尬。这样大概有一个星期。和她聊的多了之后我更加地觉得她就是我第一眼看到的样子，没有变。 以后得几个星期，我们每天都会聊到半夜两三点，偶尔五六点。聊对一些事情的看法，聊日常生活的事情，她有心情不好emo的时候，我也尽量安静地倾听。夜虽然难熬，但是我知道那个时候她也需要一个倾听对象。我记得每天晚上她们室友睡觉以后她就不能说话了，我自己说，她打字，就这样，一晚上上下来，一千多条消息全是她的。后面晚上我下班回家，都有空的时候我们就一起玩游戏，聊聊日常。但是我感觉我和她之间始终有些不自然，平时聊天她偶尔也会无意说一些让我有点难受的话，但是还好我脸皮还是有那么厚。edg夺冠那天打着电话一起看了比赛，她也会玩lol，我就在幻想好久能和她一起玩一盘。 我决定了，我想去见她，周五的时候我订了票，我不知道这次过去见面了会怎么样，我也没有把握，我怕被拒绝，怕她不见我呢？但是我没想那么多了，我只想去见她。周六到了南充，坐上了去他们学校的公交，在学校外面等她。她来了，第一次见面的时候我不敢正眼看她，所以后面她经常问我第一眼见她啥感受，我说不出来。和她一见面没有任何尴尬，也像是朋友见面，没有因为没话题而不说话，一路上都在相互分享。一起逛了南充，吃了小吃，陪她室友过生，重要的是一起打了一枚戒指。后面一起陪室友过生回去的路上，我骑着车，她骑车载着她，那天晚上她答应了我，我在想也没有一个正式的表白这样在一起了有点突然。但是机会在我面前我不能失去了。这一天是11.14。 未完待续......"	
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
	margin-bottom: 200rpx;
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
