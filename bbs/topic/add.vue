<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue"><block slot="content">发布商品</block></cu-custom>

		<un-login v-if="unLogin"></un-login>

		<form v-else @submit="formSubmit">
			<view class="cu-form-group align-start">
				<view class="title">名称</view>
				<textarea name="title" maxlength="-1" placeholder="给商品起一个响亮点的名字!"></textarea>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">价格</view>
				<input name="price" class="input" type="number" placeholder="您要卖多少大洋呢？" />
			</view>
			<view class="cu-form-group align-start">
				<view class="title">加密</view>
				<textarea name="hide" maxlength="-1" placeholder="付费后才可以查看的内容"></textarea>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">简介</view>
				<textarea name="content" maxlength="-1" placeholder="不用付费直接白嫖的内容"></textarea>
			</view>
			<view class="cu-form-group align-start" v-show="isCode">
				<view class="title">卡密</view>
				<textarea v-model="codeString" maxlength="-1" placeholder="请输入卡密,一行一条" v-on:input="codeInput"></textarea>
			</view>

			<view class="cu-form-group text-right text-sm">
				<view class="" v-show="isCode">已经输入卡密：{{ codeHeight }}条</view>
				<view class="hide">
					<text style="margin-right: 10rpx;">销售卡密</text>
					<switch name="isCode" @change="hideToast" />
				</view>
			</view>
			<view class="bg-white">
				<upimg-box @callParent="callImgList" :defaultImgsList="[]"></upimg-box>
				<view class="padding flex flex-direction"><button class="cu-btn bg-blue shadow lg" form-type="submit">发布</button></view>
			</view>
		</form>

		<mt-footer></mt-footer>
	</view>
</template>

<script>
import upimgBox from '@/components/upimgbox.vue';
import mtFooter from '@/components/footer.vue';
import mdate from '@/common/date.js';
export default {
	components: {
		mtFooter,
		upimgBox
	},
	data: function() {
		return {
			imgsList: [],
			unLogin: true,
			ssuserid: '',
			codeString: '',
			codeHeight: 0,
			isCode: false
		};
	},
	onLoad: function() {
		this.getPage();
	},
	methods: {
		hideToast: function(e) {
			let isTrue = e.detail.value; //是否销售卡密
			this.isCode = isTrue;
			uni.showToast({
				icon: 'none',
				title: isTrue ? '您可以先少量的添加卡密，当库存不足后后可在“我的商品”中补充库存' : '请将要销售的内容输入在加密中',
				duration: 2000
			});
		},
		codeInput: function() {
			this.codeHeight = this.codeString.replace(/[^\n]/gm, '').length + 1;
		},
		getPage: function() {
			//start 检测登录
			this.ssuserid = getApp().globalData.ssuserid;
			// console.log(getApp().globalData)
			this.unLogin = getApp().globalData.unLogin;
			if (this.ssuserid == '') {
				return false;
			}
			//End 检测是否登录
		},
		callImgList: function(e) {
			this.imgsList = e;
		},
		formSubmit: function(e) {
			var params = e.detail.value;
			if (params.title == '' || params.content == '' || this.imgsList.length == 0 || params.hide == '' || params.price < 0) {
				uni.showToast({
					title: '标题、内容、价格、加密 必填，图片至少上传一张！',
					icon: 'none'
				});
				return;
			}
			params.createTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
			params.imgList = this.imgsList;
			params.userid = this.ssuserid;
			params.love_num = 0;
			params.view_num = 1;
			params.comment_num = 0;
			params.status = 0;
			
			if (this.codeString != null && this.isCode == true) {
				var snsArr = this.codeString.split(/[(\n)\n]+/); //如果卡密不是空的，则进行分割并清除空行
				console.log(snsArr)
				snsArr.forEach((item, index) => {
					if (!item) {
						snsArr.splice(index, 1); //删除空项
					}
				});
				params.code = snsArr; //赋值所有卡密数组
			}

			uniCloud
				.callFunction({
					name: 'bbs_topic',
					data: {
						cloudAction: 'save',
						params: params
					}
				})
				.then(res => {
					uni.showToast({
						title: '发布成功'
					});
					uni.reLaunch({
						url: '/pages/index/index'
					});
				})
				.catch(err => {
					console.error(err);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.input {
	margin-top: 26rpx;
}
</style>
