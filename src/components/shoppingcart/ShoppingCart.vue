<template>
	<div class="shoppingcar-wrapper">
		<div class="shoppingcar">
			<div class="left-wrapper">
				<div class="logo" @click="toggle" :class="{'highlight': totalPrice !== 0}">
					<span class="icon-shopping_cart icon"></span>
					<span class="count" v-show="totalCount">{{ totalCount }}</span>
				</div>
				<div class="desc">
					<p class="price" v-show="totalPrice">
						&yen;{{ totalPrice }}
					</p>
					<p class="tip" :class="{'highlight': totalPrice !== 0}">
						另需{{ poiInfo.shipping_fee_tip }}
					</p>
				</div>
			</div>
			<div class="right-wrapper" :class="{'highlight': totalPrice !== 0}">
				<span>{{ payInfo }}</span>
			</div>
			<!-- <transition name="notes"> -->
				<div class="shoppingcar-list" v-show="cartListShow">
					<p class="list-top" v-if="poiInfo.discounts2">{{ poiInfo.discounts2[0].info }}</p>
					<div class="list-header">
						<p class="title">1号口袋</p>
						<p class="clear" @click="clearCart">
							<img src="../../../static/images/ash_bin.png">
							<span>清空购物车</span>
						</p>
					</div>
					<div class="list-content" ref="listContent">
						<ul>
							<li class="detail-list" v-for="(food, index) in selectedFoods" :key="index">
								<div class="desc">
									<div class="left">
										<p class="name">{{food.name}}</p>
										<p class="unit" v-if="food.unit">{{food.unit}}</p>
										<p class="description" v-if="!food.unit">{{food.description}}</p>
									</div>
									<div class="right">
										<p class="name">&yen;{{food.min_price}}</p>
									</div>
								</div>
								<div class="cartcontrol">
									<cartcontrol :food="food"/>
								</div>
							</li>
						</ul>
					</div>
				</div>
			<!-- </transition> -->
		</div>
		<div class="mask" @click="hideMask" v-show="cartListShow"></div>
	</div>
</template>

<script>
	import CartControl from '../shoppingcart/CartControl'
	// import BScroll from 'better-scroll'
	export default {
		name: 'shoppingcar',
		data () {
			return {
				isShow: false
			}
		},
		components: {
			'cartcontrol': CartControl
		},
		//props: ['poiInfo'],
		methods: {
			clearCart () {
				this.selectedFoods.forEach((val, index, arr) => {
					val.count = 0
				})
			},
			toggle () {
				if(!this.totalCount){
					return
				}
				this.isShow = !this.isShow
			},
			hideMask () {
				this.isShow = !this.isShow
			}
		},
		props: {
			poiInfo: {
				type: Object,
				default () {
					return {}
				}
			},
			selectedFoods: {
				type: Array,
				default () {
					return []
				}
			}
		},
		computed: {
			cartListShow () {
				if(!this.totalCount){
					this.isShow = true
					return false
				}
				let show = !this.isShow
				if(show){
					this.$nextTick(() => {
						if(!this.listContentScroll){
							this.listContentScroll = new this.BScroll(this.$refs.listContent, {
								click: true
							})
						}else{
							this.listContentScroll.refresh()
						}
					})
				}
				return show
			},
			totalCount () {
				let total = 0
				if(this.selectedFoods.length){
					this.selectedFoods.forEach((val, index, arr) => {
						total += val.count
					})
				}
				return total
			},
			totalPrice () {
				let price = 0
				if(this.selectedFoods.length){
					this.selectedFoods.forEach((val, index, arr) => {
						price += val.count * val.min_price
					})
				}
				return price
			},
			payInfo () {
				if(this.totalPrice){
					return '去结算'
				}
				return this.poiInfo.min_price_tip
			}
		}
	}
</script>

<style>
	@import url('../../../static/css/icon.css');
	.shoppingcar-wrapper {
		height: 50px;
	}
	.shoppingcar {
		position: fixed;
		z-index: 99;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		line-height: 50px;
		display: flex;
		box-sizing: border-box;
		background-color: #514f4f;
		color: #bab9b9;
		font-family: "Microsoft YaHei","Arial","宋体","Arial Narrow",sans-serif;
	}
	.left-wrapper {
		flex: 1;
	}
	.left-wrapper .logo {
		width: 50px;
		height: 50px;
		
		background: #666666;
		border-radius: 50%;
		/* position: relative;
		top: 0; 
		left: 10px;*/
		transform: translateY(-25%);
		text-align: center;
		font-size: 28px;
		color: #c4c4c4;
		position: relative;
		/*float: left;*/
	}
	.left-wrapper .logo.highlight {
		background: #FFD161;
		color: #333;
	}
	.left-wrapper div {
		float: left;
		margin-left: 10px;
	}
	.left-wrapper .logo .icon {
		/*font-size: 28px;*/
		line-height: 50px;
	}
	.left-wrapper .logo .count {
		position: absolute;
		min-width: 14px;
		height: 14px;
		border-radius: 50%;
		font-size: 10px;
		line-height: 13px;
		padding: 1px;
		background-color: #f00;
		color: #fff;
		right: 0;
		/*transform: translateX(-50%);*/
	}
	.left-wrapper .desc {

	}
	.left-wrapper .desc .tip {
		line-height: 50px;
		font-size: 12px;
		/*background-color: #fff;*/
	}
	.left-wrapper .desc .tip.highlight {
		line-height: 14px;
	}
	.left-wrapper .desc .price {
		font-size: 16px;
		/*background-color: pink;*/
		color: #fff;
		line-height: 30px;
	}
	.right-wrapper {
		flex: 0 0 110px;
		text-align: center;
		font-size: 16px;
		/*background-color: pink;*/
	}
	.right-wrapper.highlight {
		background: #FFD161;
		color: #222;
	}
	.right-wrapper.highlight span {
		/*font-weight: bold;*/
	}
	/*购物车列表*/
	.shoppingcar-list {
		position: absolute;
		width: 100%;
		line-height: 1;
		background-color: #fff;
		transform: translateY(-100%);
		z-index: -1;
		padding-bottom: 15px;
	}
	.list-top {
		height: 30px;
		text-align: center;
		font-size: 12px;
		background: #f3e6c6;
		line-height: 30px;
		color: #646158;
	}
	.list-header {
		height: 30px;
		line-height: 30px;
		background: #F3F3F3;
		font-size: 12px;
		color: #666;
	}
	.list-header .title {
		float: left;
		border-left: 4px solid #53c123;
		padding-left: 3px;
	}
	.list-header .clear {
		float: right;
		padding-right: 10px;
		font-size: 12px;
	}
	.list-header .clear img {
		height: 15px;
	}
	.list-header .clear span {

	}
	.mask {
		position: fixed;
		z-index: 88;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		/*background-color: red;*/
	}
	.list-content {
		max-height: 200px;
		overflow: hidden;
	}
	.detail-list {
		display: flex;
		align-items: center;
		padding: 5px 0;
	}
	.detail-list .desc {
		flex: 1;
		display: flex;
		align-items: center;
		font-size: 12px;

	}
	.detail-list .desc .left {
		flex: 1;
		align-items: center;
		padding-left: 8px;
	}
	.detail-list .desc .right {
		flex: 0 0 60px;
	}
	.detail-list .desc .name {
		color: #666;
		font-size: 14px;
		padding: 5px 0;
		width: 100%;
	}
	.detail-list .cartcontrol {
		flex: 0 0 80px;
	}
</style>