<template>
	<transition name="transition">
		<div class="foodview" v-show="isShow" ref="foodview">
			<div class="view-wrapper">
				<div class="detail">
					<div class="img-wrapper">
						<span class="icon-close abs close" @click="hide"></span>
						<img class="img" :src="food.picture">
						<img class="abs share" src="../../static/images/share.png">
						<img class="abs more" src="../../static/images/more.png">
					</div>
					<div class="desc-wrapper">
						<div class="left">
							<p class="name">{{ food.name }}</p>
							<p class="saled">{{ food.month_saled_content }}</p>
							<p>
								<span class="price">&yen;{{ food.min_price }}</span>
								<span>/{{ food.unit }}</span>
							</p>
						</div>
						<div class="right">
							<cartcontrol :food="food"/>
							<span class="size" @click="add" v-show="!food.count || food.count == 0">选规格</span>
						</div>
					</div>
				</div>
				<split/>
				<div class="rating-wrapper">
					<div class="title">
						<div class="left" v-if="food.rating">
							<span>{{ food.rating.title }}</span>
							<span> ({{ food.rating.like_ratio_desc }} <i class="">{{ food.rating.like_ratio }}</i>)</span>
						</div>
						<div class="right" v-if="food.rating">
							<span class="text">{{ food.rating.snd_title }}</span> 
							<span class="icon icon-keyboard_arrow_right"></span> 
						</div>
					</div>
					<div class="ratings">
						<ul v-if="food.rating">
							<li class="ratings-item" v-for="(item, index) in food.rating.comment_list" :key="index">
								<div class="user">
									<img :src="item.user_icon" v-if="item.user_icon" alt="">
									<img src="../../static/images/anonymity.png" v-if="!item.user_icon" alt="">
								</div>
								<div class="comment">
									<p class="user-time">
										<span class="username">{{ item.user_name }}</span>
										<span class="time">{{ item.comment_time }}</span>
									</p>
									<p class="text">{{ item.comment_content }}</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import CartControl from './shoppingcart/CartControl'
	import Split from './Split'
	// import BScroll from 'better-scroll'
	export default {
		name: 'foodview',
		components: {
			'cartcontrol': CartControl,
			'split': Split
		},
		props: {
			food: {
				type: Object
			}
		},
		data () {
			return {
				isShow: false
			}
		},
		methods: {
			show () {
				this.isShow = !this.isShow
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll = new this.BScroll(this.$refs.foodview, {
							click: true
						})
					}else{
						this.scroll.refresh()
					}
				})
			},
			hide () {
				this.isShow = !this.isShow
			},
			add () {
				this.$set(this.food, "count", 1)
			}
		}
	}
</script>

<style>
	/*动画*/
	.transition-enter-active, .transition-leave-active {
	  transition: 0.7s transform;
	}
	.transition-enter, .transition-leave-to {
	  transform: translateX(100%);
	}
	.foodview {
		position: fixed;
		width: 100%;
		/*height: 100%;*/
		bottom: 50px;
		left: 0;
		top: 0;
		z-index: 98;
		background-color: #fff;
	}
	.img-wrapper {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
		top: 0;
		left: 0;
	}
	.img-wrapper .img {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.img-wrapper .abs {
		position: fixed;
		top: 10px;
		width: 30px;
		height: 30px;
	}
	.img-wrapper .close {
		left: 10px;
		background-color: #7f7f7f;
		color: #fff;
		font-size: 20px;
		border-radius: 50%;
		line-height: 30px;
		text-align: center;
		z-index: 1;
	}
	.img-wrapper .more {
		right: 10px;
	}
	.img-wrapper .share {
		right: 50px;
	}
	.desc-wrapper {
		display: flex;
		align-items: center;
		margin-top: 24px;
	}
	.desc-wrapper .left {
		flex: 1;
		padding-left: 17px;
		font-size: 12px;
		color: #9d9d9d;
	}
	.desc-wrapper .left .name {
		font-size: 14px;
		color: #333;
	}
	.desc-wrapper .left .saled {
		margin: 8px 0;
	}
	.desc-wrapper .left .price {
		font-size: 16px;
		color: #FB4E44;
	}
	.desc-wrapper .right {
		flex: 0 0 80px;
		height: 30px;
		position: relative;
		text-align: right;
		padding-right: 20px;
	}
	.desc-wrapper .right .size {
		display: inline-block;
		position: absolute;
		right: 20px;
		top: -4px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border-radius: 30px;
		padding: 0 11px;
		color: #333;
		font-size: 14px;
		background-color: #ffd161;
	}
	.rating-wrapper .title {
		font-size: 14px;
		line-height: 24px;
		padding: 0 10px 10px;
		overflow: hidden;
	}
	.rating-wrapper .title .left {
		float: left;
		color: #333;
	}
	.rating-wrapper .title i {
		color: #f00;
	}
	.rating-wrapper .title .right {
		float: right;
		color: #9d9d9d;
	}
	.rating-wrapper .title .icon {
		vertical-align: middle;
	}
	.ratings-item {
		display: flex;
		font-size: 14px;
		margin-bottom: 10px;
		/*align-items: center;*/
	}
	.ratings-item .user{
		flex: 0 0 50px;
		box-sizing: border-box;
		padding-left: 10px;
	}
	.ratings-item .user img{
		width: 100%;
		border-radius: 50%;
	}
	.ratings-item .comment{
		flex: 1;
		color: #333;
		padding: 0 10px;
	}
	.ratings-item .comment .user-time {
		line-height: 16px;
		overflow: hidden;
	}
	.ratings-item .user-time .username {
		float: left;
	}
	.ratings-item .user-time .time {
		float: right;
		color: #9d9d9d;
	}
	.ratings-item .comment .text {
		font-size: 12px;
		line-height: 1.8;
		margin: 8px 0;
	}

</style>