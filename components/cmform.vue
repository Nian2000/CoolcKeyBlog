<template>
	<view>
		<view class="text-gray padding justify-center flex" v-if="Object.keys(list).length == 0"><text>暂无留言，快来夺走他的第一次</text></view>
		<view v-else id="comment-list" class="comment-list">
			<view class="cu-list menu-avatar comment">
				<view class="cu-item" v-for="(item, key) in list" :key="key">
					<view class="cu-avatar round" :style="'background-image:url(' + item.user.avatar + ');'"></view>
					<view class="content">
						<view class="text-grey">{{ item.user.nickname }}</view>
						<view class="text-gray text-content text-df" :pid="item.id" :title="'回复@' + item.nickname" :reply_text="'回复@' + item.nickname">{{ item.content }}</view>
						<view class="flex justify-between">
							<view class="text-gray text-df">{{ item.createTime }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="text-gray padding justify-center flex" v-if="listShow" @click="getList"><text>查看更多留言</text></view>
		<view v-if="!unLogin" class="padding-tb-xl margin-top-xl">
			<view class="cu-bar foot bg-white justify-end flex">
				<view class="padding-right-xl"><button class="cu-btn bg-blue shadow lg" @click="show = true">留言</button></view>
				<view class="padding-right-xl"><button class="cu-btn bg-red shadow lg" @click="showBuy = true; totalPrice=price;">购买</button></view>
			</view>
		</view>
		<u-popup v-model="show" mode="bottom">
			<view class="wrap">
				<form @submit="cmFormSubmit" class="">
					<view style="display: none;">
						<input type="text" name="tablename" :value="tablename" />
						<input type="text" name="objectid" :value="objectid" />
						<input type="text" name="price" :value="price" />
					</view>
					<view class="cu-form-group align-start">
						<view class="title">评论</view>
						<textarea name="content" maxlength="-1" placeholder="温馨提示:系统有严格的审查机制,请勿发布违法或诽谤等内容"></textarea>
					</view>
					<view class="flex justify-center padding">
						<button @click="show = false" class="cu-btn shadow margin-right-xl bg-red">取消</button>
						<button formType="submit" class="cu-btn shadow bg-blue">评论</button>
					</view>
				</form>
			</view>
		</u-popup>
		<u-popup v-model="showBuy" mode="bottom">
			<view class="padding">
				<text class="margin-bottom">请问要买几张卡密？</text>
				<slider class="margin-bottom" :value="buyNumber" @changing="buyNumberM" min="1" max="50" show-value />
				<view class="flex">购买<input style="width: 100rpx;text-align: center;" type="text" v-model="buyNumber" />张卡密（{{ totalPrice }}元）</view>
				
				<view class="flex justify-center margin-top">
					<button @click="showBuy = false" class="cu-btn shadow margin-right-xl bg-red">取消</button>
					<button formType="submit" class="cu-btn shadow margin-right-xl bg-blue">支付宝</button>
					<button formType="submit" class="cu-btn shadow margin-right-xl bg-green">微信支付</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import mdate from '../common/date.js';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
import uniTag from "@/components/uni-tag/uni-tag.vue";
export default {
	components: {
		uniPopup,
		uniPopupMessage,
		uniPopupDialog,
		uniTag
	},
	props: {
		tablename: '',
		objectid: '',
		price:0
	},
	data: function() {
		return {
			rscount: 0,
			list: [],
			cmFormClass: '',
			cmBtnClass: '',
			unLogin: true,
			ssuserid: '',
			show: false,
			showBuy: false,
			start: 0,
			limit: 4,
			listShow: true,
			index: 0,
			buyNumber: 1,
			totalPrice: 0, //要更新到初始价格
		};
	},
	created: function() {
		this.getPage();
		//start 检测登录
		this.ssuserid = getApp().globalData.ssuserid;
		// console.log(getApp().globalData)
		this.unLogin = getApp().globalData.unLogin;
		//End 检测是否登录
	},
	methods: {
		buyNumberM: function(e) {
			this.buyNumber = e.detail.value;
			this.totalPrice = this.price * this.buyNumber;
		},
		getPage: function() {
			var that = this;
			uniCloud.callFunction({
				name: 'comment',
				data: {
					cloudAction: 'list',
					params: {
						objectid: this.objectid,
						tablename: this.tablename,
						start: 0,
						limit: this.limit
					}
				},
				success: function(e) {
					var res = e.result.data;
					that.list = [];
					if (res.list.length < that.limit) {
						that.listShow = false;
					} else {
						that.listShow = true;
					}
					for (var i in res.list) {
						that.list.push(res.list[i]);
					}
					that.start = 0 + that.limit;
					// console.log(that.start)
					// console.log(that.list)
				},
				fail: function(e) {
					// console.log(e)
				}
			});
		},
		getList: function() {
			var that = this;
			// console.log(this.objectid)
			uniCloud.callFunction({
				name: 'comment',
				data: {
					cloudAction: 'list',
					params: {
						objectid: this.objectid,
						tablename: this.tablename,
						start: this.start,
						limit: this.limit
					}
				},
				success: function(e) {
					var res = e.result.data;
					if (res.list.length < that.limit) {
						for (let i in res.list) {
							that.list.push(res.list[i]);
						}
						that.start = that.start + that.limit;
						uni.showToast({
							title: '没有评论了！',
							icon: 'none'
						});
						that.listShow = false;
						// console.log(that.start)
					} else {
						for (let i in res.list) {
							that.list.push(res.list[i]);
						}
						that.start = that.start + that.limit;
					}
					// console.log(that.list)
				},
				fail: function(e) {
					// console.log(e)
				}
			});
		},
		cmFormSubmit: function(e) {
			var that = this;
			var params = e.detail.value;
			console.log(params)
			if (params.content == '') {
				uni.showToast({
					title: '评论内容不能为空！',
					icon: 'none'
				});
				return;
			}
			this.show = false;
			params.userid = this.ssuserid;
			params.status = 0;
			params.createTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
			uniCloud.callFunction({
				name: 'comment',
				data: {
					cloudAction: 'save',
					params: params
				},
				success: function(e) {
					if (e.result.error) {
						uni.showToast({
							title: e.result.message
						});
						return false;
					}
					that.getPage();
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
