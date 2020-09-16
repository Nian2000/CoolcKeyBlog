<template>
	<view class="space">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">我的钱包</block></cu-custom>
		<un-login v-if="unLogin"></un-login>
		<view v-else>
			<view class="money">
				<view class="over">余额：{{ user.gold }}元</view>
			</view>
			<view class="button">
				<button type="default">提现</button>
				<button type="default">充值</button>
			</view>
		</view>
		<m-footer tab="user"></m-footer>
	</view>
</template>

<script>
import mtFooter from '../../components/footer.vue';
export default {
	components: {
		mtFooter
	},
	data: function() {
		return {
			pageLoad: false,
			pageHide: false,
			user: {},
			unLogin: true,
			ssuserid: ''
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

<style lang="scss">
.money {
	width: 96%;
	height: 300rpx;
	line-height: 300rpx;
	margin: 2%;
	text-align: center;
	background-image: linear-gradient( 135deg, #52E5E7 10%, #130CB7 100%);
	border-radius: 10rpx;
	.over {
		color: #fff;
		font-size: 40rpx;
	}
}

.button {
	width: 96%;
	margin: 2%;
	display: flex;
	button {
		width: 50%;
	}
}
</style>
