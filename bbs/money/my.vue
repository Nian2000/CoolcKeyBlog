<template>
	<view class="space">
		<view class="background">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</view>
		<cu-custom :isBack="true">
			<block slot="content">我的钱包</block>
		</cu-custom>
		<un-login v-if="unLogin"></un-login>
		<view v-else>
			<view class="wallet">
				<view class="money">
					<view class="over">余额：{{ user.gold }}元</view>
				</view>
				<view class="flex justify-around">
					<view type="default" class="padding btn-tm">提现</view>
					<view type="default" class="padding btn-tm">充值</view>
				</view>
			</view>
		</view>
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
	.btn-tm{
		border: 1rpx #6c6c6c solid;
		width: 300rpx;
		text-align: center;
		border-radius: 20rpx;
		box-shadow: 0rpx 3rpx 25rpx rgba($color: #000000, $alpha: 0.3);
	}

	.wallet {
		z-index: 9999;
	}

	.money {
		width: 96%;
		height: 300rpx;
		line-height: 300rpx;
		margin: 2%;
		text-align: center;
		border-radius: 10rpx;

		.over {
			color: #000000;
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



	.background {
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	.background span {
		width: 20vmin;
		height: 20vmin;
		border-radius: 20vmin;
		backface-visibility: hidden;
		position: absolute;
		animation-name: move;
		animation-duration: 6s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}

	.background span:nth-child(1) {
		color: rgba($color: #65dfff, $alpha: 0.3);
		top: 44%;
		left: 97%;
		animation-duration: 15s;
		animation-delay: -13.8s;
		transform-origin: 11vw -22vh;
		box-shadow: 40vmin 0 10.12735945vmin currentColor;
	}

	.background span:nth-child(2) {
		color: rgba($color: #00fffe, $alpha: 0.4);
		top: 93%;
		left: 8%;
		animation-duration: 13.8s;
		animation-delay: -10.9s;
		transform-origin: 10vw 23vh;
		box-shadow: 40vmin 0 12.7346672971vmin currentColor;
	}

	.background span:nth-child(3) {
		color: rgba($color: #449bff, $alpha: 0.3);
		top: 14%;
		left: 41%;
		animation-duration: 15.9s;
		animation-delay: -6.7s;
		transform-origin: -9vw -24vh;
		box-shadow: -40vmin 0 11.4923952406vmin currentColor;
	}

	.background span:nth-child(4) {
		color: rgba($color: #63d0ff, $alpha: 0.6);
		top: 52%;
		left: 75%;
		animation-duration: 14.3s;
		animation-delay: -12.6s;
		transform-origin: 16vw 25vh;
		box-shadow: 40vmin 0 13.3657534039vmin currentColor;
	}

	.background span:nth-child(5) {
		color: rgba($color: #00a0ff, $alpha: 0.5);
		top: 7%;
		left: 5%;
		animation-duration: 15.9s;
		animation-delay: -10s;
		transform-origin: 8vw 3vh;
		box-shadow: -40vmin 0 13.3942178273vmin currentColor;
	}

	.background span:nth-child(6) {
		color: rgba($color: #00eafa, $alpha: 0.4);
		top: 35%;
		left: 1%;
		animation-duration: 11.6s;
		animation-delay: -6s;
		transform-origin: 0vw 17vh;
		box-shadow: -40vmin 0 7.6304875279vmin currentColor;
	}

	.background span:nth-child(7) {
		color: rgba($color: #37bdff, $alpha: 0.8);
		top: 42%;
		left: 84%;
		animation-duration: 11s;
		animation-delay: -6.9s;
		transform-origin: 11vw -8vh;
		box-shadow: 40vmin 0 13.6665321499vmin currentColor;
	}

	.background span:nth-child(8) {
		color: rgba($color: #30b8ff, $alpha: 0.7);
		top: 53%;
		left: 95%;
		animation-duration: 15s;
		animation-delay: -10.9s;
		transform-origin: 25vw 15vh;
		box-shadow: 40vmin 0 13.2849881717vmin currentColor;
	}

	.background span:nth-child(9) {
		color: rgba($color: #65dfff, $alpha: 0.4);
		top: 75%;
		left: 67%;
		animation-duration: 11.7s;
		animation-delay: -13.9s;
		transform-origin: -11vw -3vh;
		box-shadow: 40vmin 0 7.2158804055vmin currentColor;
	}

	.background span:nth-child(10) {
		color: rgba($color: #65dfff, $alpha: 0.3);
		top: 59%;
		left: 51%;
		animation-duration: 12.1s;
		animation-delay: -11.7s;
		transform-origin: -5vw -7vh;
		box-shadow: -40vmin 0 7.4269772253vmin currentColor;
	}


	@keyframes move {
		100% {
			transform: translate3d(0, 0, 1px) rotate(360deg);
		}
	}
</style>
