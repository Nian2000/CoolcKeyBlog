<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">库存管理</block></cu-custom>
		<un-login v-if="unLogin"></un-login>
		<view v-if="pageLoad">
			<view class="">
				<uni-section title="添加新的卡密" type="circle"></uni-section>
				<view class="cu-form-group align-start"><textarea v-model="codeString" maxlength="-1" placeholder="请输入卡密,一行一条" v-on:input="codeInput"></textarea></view>
				<view class="flex padding-top-sm">
					<button class="bg-red shadow">清空卡密</button>
					<button class="bg-blue shadow">添加卡密</button>
				</view>
				<uni-section title="管理之前的卡密" type="line"></uni-section>
				<view class="cu-form-group align-start">
				<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
				<!--  @init="mescrollInit" @down="downCallback" @up="upCallback"为固定值,不可删改(与mescroll-mixins保持一致) 
					:down="downOption" :up="upOption" 绝大部分情况无需配置 
					:top="顶部偏移量" :bottom="底部偏移量" :topbar="状态栏" :safearea="安全区" (常用)
					字节跳动小程序 ref="mescrollRef" 必须配置 
					此处支持写入原生组件 -->
					<view class="cu-card case isCard">
						<view class="cu-item shadow" v-for="(item,index) in list" :key="index" @click="goDetail(item._id)">
							<view class="text-content padding-sm text-cut" style="width:100%;">
								{{item.code}}
							</view>
							<view class="content flex-sub">				
								<view class="text-gray flex justify-around padding-bottom">
									<view><text class="cuIcon-appreciatefill"></text> {{item.love_num}}</view>
									<view><text class="cuIcon-messagefill"></text> {{item.comment_num}}</view>
									<view><text class="cuIcon-attentionfill"></text> {{item.view_num}}</view>
								</view>
							</view>
						</view>
					</view>
				</mescroll-body>	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import mdate from '@/common/date.js';
import upimgBox from '../../components/upimgbox.vue';
export default {
	components: {
		upimgBox
	},
	data: function() {
		return {
			imgsList: [],
			id: '',
			data: {},
			pageLoad: false,
			ssuserid: '',
			isCode: false,
			lists: ['A', 'B', 'C', 'D', 'E']
		};
	},
	onLoad: function(ops) {
		this.id = ops.id;
		this.getPage();
	},
	methods: {
		resetLoadMore() {
			this.$refs['list'].resetLoadmore();
		},
		callImgList: function(e) {
			this.imgsList = e;
		},
		getPage: async function() {
			var that = this;
			//start 检测登录
			this.ssuserid = getApp().globalData.ssuserid;
			this.unLogin = getApp().globalData.unLogin;
			if (this.ssuserid == '') {
				return false;
			}
			//End 检测是否登录
			uniCloud
				.callFunction({
					name: 'code',
					data: {
						type: 'get',
						params: {
							ssuserid: this.ssuserid,
							goodsId: this.id
						}
					}
				})
				.then(result => {
					console.log(result)
					// var res = result.result;
					// if (res.error) {
					// 	uni.showToast({
					// 		title: res.message
					// 	});
					// 	return false;
					// }
					// that.pageLoad = true;
					// that.data = res.data.data[0];
					// console.log(that.data);
				});
		},
		formSubmit: function(e) {
			if (this.imgsList.length == 0) {
				this.imgsList = this.data.imgList;
			}
			var params = e.detail.value;
			params.createTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
			params.imgList = this.imgsList;
			params.ssuserid = this.ssuserid;
			uniCloud
				.callFunction({
					name: 'bbs_topic',
					data: {
						cloudAction: 'save',
						params: params
					}
				})
				.then(result => {
					var res = result.result;
					if (res.error) {
						uni.showToast({
							title: res.message
						});
						return false;
					}
					uni.showToast({
						title: '发布成功',
						icon: 'none'
					});
					uni.navigateBack();
				})
				.catch(err => {
					console.error(err);
				});
		}
	}
};
</script>

<style lang="scss" scoped></style>
