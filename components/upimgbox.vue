<template>
	<view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(img,imgIndex) in imgsList" :key="imgIndex">
				 <image :src="img.imgurl+'?x-oss-process=image/resize,m_fixed,h_100,w_100'" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @click="delImg(imgIndex)">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @click="upImg()">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
 
	export default {
		name:"upimg-box",
		props:{
			defaultImgsList:Array,
		},
		data:function(){
			return {
				imgsList:this.defaultImgsList,
			}
		},
		methods:{
			upImg:function(){
				var that=this;
				
				uni.chooseImage({
					success: function (chooseImageRes) {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						const len=tempFilePaths.length;
						for(var i=0;i<len;i++){
							 uniCloud.uploadFile({
								filePath: tempFilePaths[i],
								cloudPath: Date.now()+'.jpg',
								dataType:"json",
								success: function (res) {
									// console.log(res.fileID)
									if(res.success==true){
										// console.log("aaa")
										that.imgsList.push({
											imgurl:res.fileID
										})
										that.$emit("callParent",that.imgsList)
									}									 
								}
							});
						}
					}
				});
			},
			delImg:function(index){
				var len=this.imgsList.length;
				var imgslist=[];
				var imgsData="";
				var mgs=this.imgsList;
				for(var i in mgs){
					if(i!=index){
						imgslist.push(mgs[i]);						
					}
				}
				for(var i=0;i<imgslist.length;i++){
					if(i>0){
						imgsData+=",";
					}
					imgsData+=imgslist[i].imgurl;
				}
				// console.log(imgsData);
				this.imgsData=imgsData;
				this.imgsList=imgslist;
				this.$emit("callParent",this.imgsList)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
