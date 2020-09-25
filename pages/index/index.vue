<template>
	<view>

		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">首页</block>
		</cu-custom>

		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
			<!--  @init="mescrollInit" @down="downCallback" @up="upCallback"为固定值,不可删改(与mescroll-mixins保持一致) 
			:down="downOption" :up="upOption" 绝大部分情况无需配置 
			:top="顶部偏移量" :bottom="底部偏移量" :topbar="状态栏" :safearea="安全区" (常用)
			字节跳动小程序 ref="mescrollRef" 必须配置 
			此处支持写入原生组件 -->


			<view class="goods-item shadow-warp" v-for="(item,index) in list" :key="index" @click="goDetail(item._id)">

				<image class="goods-img" mode="aspectFill" :src="item.imgList[0].imgurl"></image>
				<view class="goods-info flex flex-direction justify-between">
					<view class="goods-title">
						{{item.title}}
					</view>
					<view class="goods-content">
						{{item.content}}
					</view>
					<view class="flex align-center">
						<view class="goods-price">
							{{item.price}}
						</view>
						<uni-tag :text="item.isCode?'卡密':'虚拟商品'" type="default" size="small"></uni-tag>
						<uni-tag :text="item.isCode?item.number?'库存:'+item.number:'售空':'库存充足'" type="default" size="small"></uni-tag>
					</view>
					<view class="goods-other text-gray flex justify-around ">
						<view><text class="cuIcon-appreciatefill"></text> {{item.love_num}}</view>
						<view><text class="cuIcon-messagefill"></text> {{item.comment_num}}</view>
						<view><text class="cuIcon-attentionfill"></text> {{item.view_num}}</view>
					</view>
				</view>
			</view>


			<!-- <view class="cu-card case isCard">
				<view class="cu-item shadow" v-for="(item,index) in list" :key="index" @click="goDetail(item._id)">
					<view class="image image-hidden">
						<image class="sglist-imglist-img imgBorder" mode="widthFix" :src="item.imgList[0].imgurl"></image>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{item.title}}</text></view>
					</view>
					<view class="flex align-center padding-sm">
						<view class="price margin-right-sm">
							{{item.price}}
						</view>
						<view class="text-cut text-sm" style="width:100%;">
							{{item.content}}
						</view>
					</view>
					<view class="content flex-sub">
						<view class="text-gray flex justify-around padding-bottom">
							<view><text class="cuIcon-appreciatefill"></text> {{item.love_num}}</view>
							<view><text class="cuIcon-messagefill"></text> {{item.comment_num}}</view>
							<view><text class="cuIcon-attentionfill"></text> {{item.view_num}}</view>
						</view>
					</view>
				</view>
			</view> -->
		</mescroll-body>
		<m-footer tab="home"></m-footer>
	</view>
</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import mFooter from "@/components/footer.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			mFooter
		},
		data() {
			return {
				list: [],
				upOption: {
					page: {
						num: 0,
						size: 6,
						time: null
					},
					noMoreSize: 6
				},
				response: ''
			}
		},
		onLoad: function() {

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
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 设置为4

				var that = this;
				uniCloud.callFunction({
					name: "bbs_topic",
					data: {
						cloudAction: "index",
						params: {
							start: (pageNum - 1) * pageSize,
							limit: pageSize
						}
					},
					success(response) {
						// console.log(result)
						let res = response.result.data
						let curPageData = res.list
						let curPageLen = res.list.length
						let totalSize = res.total

						//设置列表数据
						if (page.num == 1) that.list = []; //如果是第一页需手动置空列表
						that.list = that.list.concat(curPageData); //追加新数据					
						// 请求成功,隐藏加载状态
						that.mescroll.endBySize(curPageLen, totalSize)
					},
					fail() {
						//  请求失败,隐藏加载状态
						that.mescroll.endErr()
					}
				})
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
			goDetail: function(id) {
				uni.navigateTo({
					url: "../../bbs/topic/show?id=" + id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.goods-price {
		color: #ff4c00;
		font-size: 35rpx;
		font-weight: 500;
		margin-right: 20rpx;
	}

	.goods-price::before {
		content: "￥";
		font-size: 20rpx;
		font-weight: 400;
	}

	.goods-item {
		display: flex;
		flex-shrink: 0;
		margin: 20rpx;
		border-radius: 20rpx;
	}

	.goods-img {
		width: 250rpx;
		height: 250rpx;
		overflow: hidden;
		margin-right: 20rpx;
		border-radius: 20rpx;
		box-shadow: 10;
	}

	.goods-info {
		width: 420rpx;
		padding-top: 10rpx;
	}


	.goods-item {
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 10rpx;
	}

	.goods-title {
		font-size: 30rpx;
	}

	.goods-content {
		font-size: 22rpx;
		color: #9a9a9a;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.goods-other{
		margin-top: 30rpx;
	}
</style>
