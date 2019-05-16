<template>
	<div class="seller" ref="seller">
		<div class="seller-wrapper">
			<div class="seller-info">
				<div class="address">
					<p class="left">{{ seller.address }}</p>
					<p class="right"><a href="tel:18820939833"></a></p>
				</div>
				<div class="pics" ref="pics" v-if="seller.poi_env">
					<ul class="pic-wrapper">
						<li class="pic-item" v-for="(item, index) in seller.poi_env.thumbnails_url_list" :key="index">
							<img :src="item">
						</li>
					</ul>
				</div>
			</div>
			<div class="tip">
				<p class="deliverys">配送服务： {{ seller.app_delivery_tip }}</p>
				<p class="posttime">配送时间： {{ seller.shipping_time }}</p>
			</div>
			<split/>
			<div class="seller-server">
				<div class="servers">
					<span class="sort">商家服务</span>
					<p class="server-item" v-for="(item, index) in seller.poi_service" :key="index">
						<img :src="item.icon">
						<span>{{ item.content }}</span>
					</p>
				</div>
			</div>
			<split/>
			<div class="discount">
				<div class="dis-item" v-for="(item, index) in seller.discounts2" :key="index">
					<div class="icon">
						<img :src="item.icon_url"/>
					</div>
					<p class="text">{{ item.info }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Split from './Split'
	// import BScroll from 'better-scroll'
	export default {
		name: 'seller',
		data () {
			return {
				seller: {}
			}
		},
		components: {
			'split': Split
		},
		created () {
			fetch('/api/seller')
			  .then(res => {
			    return res.json()
			  }).then(datas => {
			    if(datas.code == 0){
			    	this.seller = datas.data
			    	this.$nextTick(() => {
			    		if(this.seller.poi_env.thumbnails_url_list){
			    			new this.BScroll(this.$refs.pics, {
			    				click: true,
			    				scrollX: true,
			    				scrollY: false
			    			})
			    		}
			    		new this.BScroll(this.$refs.seller,{
			    			click: true
			    		})
			    	})
			    }
			  })
		}
	}
</script>

<style>
	.seller {
		height: 100%;
		font-size: 14px;
		color: #333;
		overflow: hidden;
	}
	.seller-wrapper {
		padding: 20px 0 20px 10px;
	}
	.address {
		display: flex;
		align-items: center;
	}
	.address .left {
		flex: 1;
		padding: 8px 0 8px 24px ;
		background: url('../../static/images/address.png') no-repeat left center;
		background-size: 14px 16px;
		line-height: 1.5;
	}
	.address .right {
		flex: 0 0 60px;
		height: 30px;
		box-sizing: border-box;
		background: url('../../static/images/phone.png') no-repeat center;
		background-size: 18px 18px;
	}
	.address .right a {
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	.pics {
		position: relative;
		width:100%;
		height:120px;
		overflow:hidden;
		margin: 13px 0;
	}
	.pics .pic-wrapper {
		white-space: nowrap;
		width: auto;
		position: absolute;
	}
	.pics .pic-item {
		display: inline-block;
		/*line-height: 35px;*/
		height:120px;
		/*background-color: pink;*/
		margin-right: 8px;
	}
	.pics .pic-item img {
		height: 100%;
	}
	.tip {

	}
	.tip p {
		padding: 10px 0 10px 24px;
	}
	.tip .deliverys {
		background: url('../../static/images/delivery.png') no-repeat left center;
		background-size: 14px 16px;
	}
	.tip .posttime {
		background: url('../../static/images/time.png') no-repeat left center;
		background-size: 15px 15px;
		line-height: 1.5;
		padding-right: 10px;
	}
	.seller-server {

	}
	.seller-server .servers {
		padding: 10px 0 10px 24px;
		background: url('../../static/images/server.png') no-repeat left center;
		background-size: 15px 15px;
	}
	.seller-server .servers .sort {
		margin-right: 13px;
	}
	.seller-server .server-item {
		display: inline-block;
	}
	.seller-server .server-item img {
		width: 15px;
		vertical-align: top;
	}
	.dis-item {
		display: flex;
	}
	.dis-item .icon {
		flex: 0 0 24px;
		padding-top: 3px;
	}
	.dis-item .icon img {
		width: 15px;
	}
	.dis-item .text {
		flex: 1;
		padding-right: 16px;
		line-height: 1.5;
	}
</style>