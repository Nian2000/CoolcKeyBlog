<template>
	<view class="padding-tb-xl margin-top-xl">
		<view class="cu-bar tabbar bg-white foot">
			<view class="action" :class="[isActive.home ? 'text-blue' : 'text-gray']" @click="goHome()">
				<view class="cuIcon-home"></view> 首页
			</view>
			<view class="action text-gray add-action" @click="goAdd()">
				<button class="cu-btn cuIcon-add bg-gradual-blue shadow"></button>
				发布
			</view>
			<view class="action" :class="[isActive.user ? 'text-blue' : 'text-gray']" @click="goUser()">
				<view class="cuIcon-my" ></view>
				我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			tab:''
		},
		mounted() {
			if(this.tab == 'home'){
				this.isActive.home = true
				this.isActive.user = false
			}else if(this.tab == 'user'){
				this.isActive.home = false
				this.isActive.user = true
			}
		},
		data() {
			return {
				isActive:{
					home:false,
					user:false
				}
			};
		},
		methods:{
			goHome:function(){
				// console.log("goHome")
				uni.redirectTo({
					url:"/pages/index/index"
				})

			},
			goAdd:function(){
				// console.log("add")
				uni.redirectTo({
					url:"/bbs/topic/add",
					fail:function(e){
						console.log(e)
					} 
				}) 
			},
			goUser:function(){
				uni.redirectTo({
					url:"/pages/user/index"
				})				
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
