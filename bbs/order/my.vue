<template>
	<view class="space">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">我的订单</block></cu-custom>
		<un-login v-if="unLogin"></un-login>
		<view v-else>
			<view class="order">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#0083dd"></uni-segmented-control>
				<view class="content">
					<view v-if="current === 0">
						
								<view class="orderItem">
									<image class="orderImg" src="../../static/user_head.jpg" mode="aspectFill"></image>
									<view class="orderInfo">
										<view class="orderName">爱奇艺月卡</view>
										<view class="orderPrice">20</view>
										<view class="orderNumber">3</view>
										<view class="orderTime">2020-10-05 13:52</view>
									</view>
									<view class="orderOperate">
										<button type="default" size="mini">查看卡密</button>
										<button type="default" size="mini">删除订单</button>
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

<style lang="scss">

.orderItem{
	margin-top: 20rpx;
	padding: 25rpx;
	background-color: #fff;
	box-shadow:  0px 0px 15px #c9c6cb;
	display: flex;
	border-radius: 10rpx;
	.orderOperate{
		display: flex;
		width: 260rpx;
		flex-direction: column;
		justify-content: space-around;
	}
	.orderImg{
		width: 160rpx;
		height: 160rpx;
		margin-right: 25rpx;
		border-radius: 10rpx;
	}
	.orderInfo{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 300rpx;
		.orderName{
			font-size: $uni-font-size-base;
			color: #006bd8;
		}
	}
	.orderPrice{
		font-size: $uni-font-size-sm;
		color: $uni-text-color-grey;
	}
	.orderNumber{
		font-size: $uni-font-size-sm;
		color: $uni-text-color-grey;
	}
	.orderTime{
		font-size: $uni-font-size-sm;
		color: $uni-text-color-grey;
	}
	.orderPrice::after{
		content: " 元";
	}
	.orderNumber::after{
		content: " 张";
	}
}

	
.order {
	margin: 30rpx;
}
.money {
	width: 96%;
	height: 300rpx;
	line-height: 300rpx;
	margin: 2%;
	text-align: center;
	background-image: linear-gradient(135deg, #52e5e7 10%, #130cb7 100%);
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
