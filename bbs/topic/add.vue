<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">发布内容</block>
		</cu-custom>
		
		<un-login v-if="unLogin"></un-login> 
		
		<form v-else @submit="formSubmit">
			<view class="cu-form-group align-start">
				<view class="title">标题</view>
				<textarea name="title" maxlength="-1" placeholder="请输入标题"></textarea>
			</view>
			<view class="cu-form-group align-start">
				<textarea name="content" maxlength="-1" placeholder="请输入内容"></textarea>
			</view>
			<view class="bg-white">
				<upimg-box @callParent="callImgList" :defaultImgsList="[]"></upimg-box>			
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-blue shadow lg" form-type="submit">发布</button>
				</view>
			</view>
		</form>
		
		<mt-footer></mt-footer> 
	</view>
</template>

<script> 
	import upimgBox from "@/components/upimgbox.vue";
	import mtFooter from "@/components/footer.vue";
	import mdate from "@/common/date.js"; 
	export default {
		components:{
			mtFooter,
			upimgBox
		},
		data:function(){
			return {
				imgsList:[],
				unLogin:true,
				ssuserid:""
			}
		},
		onLoad:function(){
			this.getPage();
	
		},
		methods:{
			getPage:function(){
				//start 检测登录
				this.ssuserid=getApp().globalData.ssuserid;
				// console.log(getApp().globalData)
				this.unLogin=getApp().globalData.unLogin;
				if(this.ssuserid==''){
					return false;
				} 
				//End 检测是否登录 
			},
			callImgList:function(e){
				this.imgsList=e;
			},
			formSubmit:function(e){
				var params=e.detail.value;
				// console.log(params)
				if( params.title =='' || params.content=='' || this.imgsList.length == 0){
					uni.showToast({
						title:"标题、内容必填，图片至少上传一张！",
						icon:'none'
					})
					return
				}
				params.createTime=new Date().Format("yyyy-MM-dd hh:mm:ss");			 
				params.imgList=this.imgsList;
				params.userid=this.ssuserid;
				params.love_num=0;
				params.view_num=1;
				params.comment_num=0;
				params.status=0;
				uniCloud.callFunction({
					name: 'bbs_topic',
					data: {
						cloudAction:"save",
						params:params
					}
				}).then((res) => {
					uni.showToast({
						title:"发布成功"
					}) 
					uni.reLaunch({
						url:"/pages/index/index"
					})
				}).catch((err) => { 
					console.error(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
