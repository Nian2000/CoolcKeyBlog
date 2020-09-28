<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">库存管理</block>
		</cu-custom>
		<un-login v-if="unLogin"></un-login>
		<view>
			<view class="">
				<uni-section title="添加新的卡密" type="circle"></uni-section>
				<view class="cu-form-group align-start"><textarea v-model="codeString" maxlength="-1" placeholder="请输入卡密,一行一条"
					 v-on:input="codeInput"></textarea></view>
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
							<view class="cu-item shadow" v-for="(item,index) in list" :key="index">
								<view class="text-content padding-sm text-cut" style="width:100%;">
									{{item.code}}
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
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				codeString: '',
				unLogin: true,
				goodsId: '',
				list: [],
				upOption: {
					page: {
						num: 0,
						size: 20,
						time: null
					},
					noMoreSize: 20
				},
				response: ''
			}
		},
		onLoad: function(ops) {
			this.goodsId = ops.id;
			this.unLogin = getApp().globalData.unLogin;
		},
		onShow() {

		},
		methods: {
			/*下拉刷新的回调*/
			downCallback() {
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调*/
			upCallback(page) {
				var that = this;
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 设置为4
				let goodsId = that.goodsId;
				uniCloud.callFunction({
					name: "code",
					data: {
						type: "get",
						params: {
							start: (pageNum - 1) * pageSize,
							limit: pageSize,
							goodsId: goodsId,
						}
					},
					success(response) {
						console.log("请求成功", response)
						let res = response.result.data
						let curPageData = res.list
						let curPageLen = res.list.length
						let totalSize = res.total
						console.log(res)
						//设置列表数据
						if (page.num == 1) that.list = []; //如果是第一页需手动置空列表
						that.list = that.list.concat(curPageData); //追加新数据					
						// 请求成功,隐藏加载状态
						that.mescroll.endBySize(curPageLen, totalSize)
					},
					fail() {
						//  请求失败,隐藏加载状态
						console.log("请求失败")
						that.mescroll.endErr()
					}
				})
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			}
		}
	}
</script>

<style lang="scss" scoped></style>
