<template>
	<view class="space">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">我的订单</block></cu-custom>
		<un-login v-if="unLogin"></un-login>
		<view v-else>
			<view class="padding">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#0083dd"></uni-segmented-control>
				<view class="margin-top-sm">
					<view v-if="current === 0">
						<view class="cu-list menu-avatar">
							<view class="cu-item">
								<view class="cu-avatar  lg" style="background-image:url(../../static/user_head.jpg);"></view>
								<view class="content">
									<view class="text-grey">爱奇艺月卡</view>
									<view class="text-gray text-sm flex"><view class="text-cut">2020-10-05 13:52</view></view>
								</view>
								<view class="action">
									<view class="text-grey text-xs">20元</view>
									<view class="cu-tag round bg-grey sm">5张</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="current === 1">选项卡2的内容</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import mtFooter from '../../components/footer.vue';
import UniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';

export default {
	components: {
		mtFooter,
		UniSegmentedControl
	},
	data: function() {
		return {
			pageLoad: false,
			pageHide: false,
			user: {},
			unLogin: true,
			ssuserid: '',
			items: ['买到的', '卖出的'],
			current: 0
		};
	},
	onLoad: function(option) {
		//start 检测登录
		this.ssuserid = getApp().globalData.ssuserid;
		this.unLogin = getApp().globalData.unLogin;
		if (this.ssuserid == '') {
			return false;
		}
		//End 检测是否登录
		this.getPage();
	},
	onHide: function() {},
	methods: {
		onClickItem: function(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		},
		gourl: function(url) {
			uni.navigateTo({
				url: url
			});
		},
		getPage: function() {
			var that = this;
			uniCloud.callFunction({
				name: 'user-center',
				data: {
					action: 'get',
					id: this.ssuserid
				},
				success: function(e) {
					var res = e.result;
					if (res.error) {
						return false;
					}
					// console.log(res)
					that.pageLoad = true;
					that.user = res.data.user;
				}
			});
		}
	}
};
</script>

<style lang="scss"></style>
