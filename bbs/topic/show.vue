<template>
	<view v-if="pageLoad">
		
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">{{data.title}}</block>
		</cu-custom>

		<view class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="cu-avatar round lg" :style="'backgroundImage:url('+ author.avatar +')'"></view>
				<view class="content flex-sub">
					<view>{{author.nickname}}</view>
					<view class="text-gray flex justify-between">							
						<view class="text-sm">{{data.createTime}} 发布</view>
					</view>					
				</view>				
			</view>
		</view>
		
		<view class="cu-card no-card">
			<view class="cu-item padding">
				<view class="flex justify-star align-center">
					<view class="price margin-bottom-sm margin-right-sm"> {{data.price}} </view>
					<view class="margin-bottom-sm margin-right-sm"> <uni-tag :text="data.isCode?'卡密':'虚拟商品'" type="default" size="small"></uni-tag></view>
					<view class="margin-bottom-sm text-sm text-gray"><uni-tag :text="data.isCode?data.number?'库存:'+data.number:'售空':'库存充足'" type="default" size="small"></uni-tag></view>
				</view>
				<view class="text-content margin-bottom-sm">
					 {{data.title}} <br>{{data.content}}
				</view>
			<!-- 	<view class="text-gray flex justify-end">
					<view class="text-sm margin-bottom-sm">{{data.createTime}}</view>									
				</view> -->
				<image style="width: 100%;" v-for="(item,index) in data.imgList" :key="index" :src="item.imgurl" mode="widthFix" @click="openImg(item.imgurl)"></image>		
				
				<view  v-if="!unLogin" class="content flex-sub margin-top-sm">
					<view class="text-gray flex justify-around">
						<view @click="loveToggle(data._id)" v-bind:class="islove?'text-red':''"><text class="cuIcon-appreciatefill"></text>点赞</view>
						<view @click="favToggle(data._id)" v-bind:class="isfav?'text-red':''"><text class="cuIcon-likefill"></text>收藏</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top-sm">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 留言列表
			</view>
		</view>
		<cmform tablename="bbs-topic" :objectid="data._id"></cmform>
	</view>
</template>

<script>
	import cmform from "../../components/cmform.vue";
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
	import uniTag from "@/components/uni-tag/uni-tag.vue";
	export default {
		components: {
			cmform,
			uniNoticeBar,
			uniTag
		},
		data: function() {
			return {
				pageLoad:false,
				author: {},
				data: {},
				id: "",
				islove: false,
				isfav: false,
				ssuserid:"",
				unLogin:true
			}
		},
		onLoad: function(ops) {
			this.id = ops.id;
			
			//start 检测登录
			this.ssuserid=getApp().globalData.ssuserid;
			// console.log(this.ssuserid);
			// console.log(getApp().globalData)
			this.unLogin=getApp().globalData.unLogin;
			// console.log(this.unLogin)
			//End 检测是否登录 
			this.getPage();
			this.addView();
		},
		methods: {
			getMore(){
				uni.showToast({
					title:"去查看嘿嘿"
				})
			},
			openImg(url){
				uni.previewImage({
					urls:this.imgList,
					current:url
				});
				
				// uni.downloadFile({
				//   url: url,
				//   success: function (res) {
				//     var filePath = res.tempFilePath;
				//     uni.openDocument({
				//       filePath: filePath,
				//       success: function (res) {
				//         console.log('打开文档成功');
				//       }
				//     });
				//   }
				// });
			},
			getPage: function() {
				var that = this;
				uniCloud.callFunction({
					name: "bbs_topic",
					data: {
						cloudAction: "show",
						params:{
							id: this.id
						}
						
					}
				}).then((res) => {
					var res = res.result.data;
					that.data = res.data;
					 
					that.author = res.user;
					that.pageLoad=true;
				})
				
				uniCloud.callFunction({
					name:"love",
					data:{
						cloudAction:"get",
						params:{
							objectid:this.id,
							tablename:"bbs-topic",
							ssuserid:this.ssuserid,
						}
					},
					success:function(e){
						// console.log("love",e);
						if(e.result.data==1){
							that.islove=true;
						}else{
							that.islove=false;
						}
					},
				})
				
				uniCloud.callFunction({
					name:"fav",
					data:{
						cloudAction:"get",
						params:{
							objectid:this.id,
							tablename:"bbs-topic",
							ssuserid:this.ssuserid,
						}
					},
					success:function(e){
						if(e.result.data==1){
							that.isfav=true;
						}else{
							that.isfav=false;
						}
					},
				})
			},
			addView: function() {
				var that = this;
				uniCloud.callFunction({
					name: "bbs_topic",
					data: {
						cloudAction: "addView",
						params:{
							id: this.id,
						}
					}
				}).then((res) => {


				})
			},
			favToggle: function(id) {
				
				var that = this;
				var that = this;
				uniCloud.callFunction({
					name:"fav",
					data:{
						cloudAction:"toggle",
						params:{
							objectid:id,
							tablename:"bbs-topic",
							ssuserid:this.ssuserid,
						}
					},
					success:function(e){
						if(e.result.data.action=='add'){
							that.isfav=true;
						}else{
							that.isfav=false;
						}
						 
					},
					fail:function(e){
						// console.log(e)
					}
				}) 
			},
			loveToggle: function(id) {
				// console.log(id)
				var that = this;
				uniCloud.callFunction({
					name:"love",
					data:{
						cloudAction:"toggle",
						params:{
							objectid:id,
							tablename:"bbs-topic",
							ssuserid:this.ssuserid,
						}
					},
					success:function(e){
						if(e.result.data.action=='add'){
							that.islove=true;
						}else{
							that.islove=false;
						}						 
					},
					fail:function(e){
						// console.log(e)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.price{
		color: #ff4c00;
		font-size: 40rpx;
		font-weight: 500;
	}
	.price::before{
		content: "￥";
		font-size: 30rpx;
		font-weight: 400;
	}
</style>
