<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">编辑</block></cu-custom>
		<un-login v-if="unLogin"></un-login>
		<view v-if="pageLoad">
			<form @submit="formSubmit">
				<input type="text" style="display: none;" name="_id" :value="data._id" />
				<view class="cu-form-group align-start">
					<view class="title">名称</view>
					<textarea :value="data.title" name="title" maxlength="-1" placeholder="给商品起一个响亮点的名字!"></textarea>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">价格</view>
					<input :value="data.price" name="price" class="input" type="number" placeholder="您要卖多少大洋呢？" />
				</view>
				<view class="cu-form-group align-start">
					<view class="title">加密</view>
					<textarea :value="data.hide" name="hide" maxlength="-1" placeholder="付费后才可以查看的内容"></textarea>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">简介</view>
					<textarea :value="data.content" name="content" maxlength="-1" placeholder="不用付费直接白嫖的内容"></textarea>
				</view>

				<view class="cu-form-group text-right text-sm">
					<view class="hide">
						<text style="margin-right: 10rpx;">销售卡密</text>
						<switch :checked="data.isCode" name="isCode" @change="hideToast" />
					</view>
				</view>
				<view class="bg-white">
					<upimg-box @callParent="callImgList" :defaultImgsList="data.imgList"></upimg-box>
					<view class="padding flex flex-direction"><button class="cu-btn bg-blue shadow lg" form-type="submit">发布</button></view>
				</view>
			</form>
			<!-- <form @submit="formSubmit">
				<input type="text" style="display: none;" name="_id" :value="data._id" />
				<view class="cu-form-group align-start">
					<view class="title">标题</view>
					<textarea :value="data.title" name="title" maxlength="-1" placeholder="请输入标题"></textarea>
				</view>
				<view class="cu-form-group align-start">
					<textarea :value="data.content" name="content" maxlength="-1" placeholder="请输入内容"></textarea>
				</view>
				<view class="bg-white">
					<upimg-box @callParent="callImgList" :defaultImgsList="data.imgList"></upimg-box>			
					<view class="padding flex flex-direction">
						<button class="cu-btn bg-blue shadow lg" form-type="submit">提交</button>
					</view>
				</view>
			</form> -->
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
			isCode: false
		};
	},
	onLoad: function(ops) {
		this.id = ops.id;
		this.getPage();
	},
	methods: {
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
					name: 'bbs_topic',
					data: {
						cloudAction: 'add',
						params: {
							ssuserid: this.ssuserid,
							id: this.id
						}
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
					that.pageLoad = true;
					that.data = res.data.data[0];
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
