<template>
	<view class="login">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">注册</block>
		</cu-custom>

		<view class="content padding-xl">
			<!-- 头部logo -->
			<view class="flex justify-center">
				<image :src="logoImage" mode="widthFix" class="header"></image>
			</view>

			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="username" type="text" maxlength="11" placeholder="请填写用户名"></wInput>
				<wInput v-model="password" type="text" maxlength="11" placeholder="请输入登录密码"></wInput>
				<wInput v-model="password2" type="text" maxlength="11" placeholder="请再次输入密码"></wInput>
			</view>
			<wButton text="注 册" :rotate="isRotate" @click.native="formSubmit"></wButton>
			<view class="flex justify-center margin-top-xl">
				<navigator class="cl-white pointer flex-1" url="/pages/login/index">去登录</navigator>
				<!-- <navigator class="cl-white pointer" url="/pages/login/findpwd" >忘记密码</navigator> -->
			</view>
		</view>
		<!-- 		<view class="regBox" v-if="pageLoad">
			<form @submit="formSubmit">		
			
			<view class="cu-form-group margin-top">
				<view class="title">用户名</view>
				<input type="text" placeholder="请填写用户名" name="nickname"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">密码</view>
				<input name="password" type="text" password=true  placeholder="请填写密码"></input>
			</view>				
			
			<view class="cu-form-group">
				<view class="title">确认密码</view>
				<input name="password2" type="text" password=true  placeholder="请填写密码"></input>
			</view>	
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue shadow lg" type="primary" form-type="submit">立即注册</button>
			</view>
		   
			</form>
		</view> -->
	</view>
</template>

<script>
	import wInput from '@/components/watch-login/watch-input.vue';
	import wButton from '@/components/watch-login/watch-button.vue';
	var yzmTimer = 60,
		yzmTime = 59,
		yzmEnable = true;
	export default {
		components: {
			wInput,
			wButton
		},
		data: function() {
			return {
				logoImage: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-blogfaka/cab53950-fe29-11ea-b680-7980c8a877b8.png',
				isRotate: false, //是否加载旋转
				pageLoad: false,
				pageData: {},
				username: '',
				password: '',
				password2: '',
				nickname: ''
			};
		},
		onLoad: function(option) {
			this.pageLoad = true;
		},

		methods: {

			formSubmit: function(e) {
				var that = this;
				that.nickname = that.username;
				if (that.password != that.password2) {
					uni.showToast({
						title: "两次密码不一样",
						icon: "none"
					})
					return false;
				}
				that.isRotate = true;
				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'register',
						params: {
							username: that.username,
							password: that.password,
							nickname: that.nickname,
							gold: 0,
							grade: 0,
							avatar: "/static/user_head.jpg"
						}
					},
					success(e) {
						that.isRotate = false;
						uni.showModal({
							showCancel: false,
							content: e.result.msg
						})
						if (e.result.code == 0) {
							uni.setStorageSync('uniIdToken', e.result.token);
							var callRes = uniCloud.callFunction({
								name: 'user-center',
								data: {
									action: 'checkToken'
								},
								success: function(callRes) {
									if (callRes.result.uid == undefined) {
										return false;
									}
									getApp().globalData.ssuserid = callRes.result.uid;
									getApp().globalData.unLogin = false;
									uni.reLaunch({
										url: "/pages/index/index"
									})
								}
							})

						}

					},
					fail(e) {
						that.isRotate = false;
						console.error(e)
						uni.showModal({
							showCancel: false,
							content: '注册失败，请稍后再试'
						})
					}
				})

			}
		},
	}
</script>

<style scoped lang="scss">
	.login {
		background-color: #ffffff;
		width: 100vw;
		height: 100vh;
	}

	.main {
		margin-top: 40upx;
	}

	.header {
		width: 30vw;
	}
</style>
