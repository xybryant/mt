<template>
	<!-- 要写background-image，不能写background，不然下面的css样式不生效 -->
	<div class="header" :style='"background-image:url("+poiInfo.head_pic_url+")"'>
	<!-- <div class="header"> -->
		<div class="top-wrapper">
			<div class="back-wrapper">
				<span class="icon-arrow_lift"></span>
			</div>
			<form class="search-wrapper">
				<span class="search-icon"></span>
				<input type="text" name="" class="search-bar" placeholder="搜索店内商品">
			</form>
			<div class="more-wrapper">
				<a href="javascript:void(0)">拼单</a>
				<!-- <a class="spelling-bt" href="#">拼单</a> -->
				<div class="more-bt">
					<i class="s-radius"></i>
					<i class="s-radius"></i>
					<i class="s-radius"></i>
				</div>
			</div>
		</div>
		<!-- <div class="bg" :style="head_pic_url">
		</div> -->
		<div class="content-wrapper">
			<div class="icon" :style='"background-image:url("+poiInfo.pic_url+")"'>
			</div>
			<div class="name">
				<h3 v-cloak>{{ poiInfo.name }}</h3>
			</div>
			<div class="collect">
				<img src="../../static/images/star.png" alt="">
				<span>收藏</span>
			</div>
		</div>
    <div class="notes-wrapper clearfix" v-if="poiInfo.discounts2">
    	<p class="left">
    		<img class="icon" :src="poiInfo.discounts2[0].icon_url" />
    		<span class="text">{{poiInfo.discounts2[0].info}}</span>
    	</p>
			<div class="detail" @click="showNotes">
				<span>{{poiInfo.discounts2.length}}个活动</span>
				<span class="icon-keyboard_arrow_right arrow"></span>
			</div>
		</div> 
		<!-- 活动页面 -->
		<transition name="notes">
			<div class="notes-detail" v-if="isShowNotes">
				<div class="main-wrapper" :style='"background-image:url("+poiInfo.poi_back_pic_url+")"'>
				  <div class="icon" :style='"background-image:url("+poiInfo.pic_url+")"'></div>
				  <h3 class="name">{{poiInfo.name}}</h3>
				  <!-- 星级评价 -->
				  <div class="score">
				    <app-star :score="poiInfo.wm_poi_score"></app-star>
				    <span>{{poiInfo.wm_poi_score}}</span>
				  </div>

				  <p class="tip">
				    {{poiInfo.min_price_tip}} <i>|</i> {{poiInfo.shipping_fee_tip}} <i>|</i> {{poiInfo.delivery_time_tip}}
				  </p>

				  <p class="time">
				    配送时间: {{poiInfo.shipping_time}}
				  </p>
					<div class="line">
						
					</div>
				  <div class="discounts" v-if="poiInfo.discounts2">
				    <p>
				      <img :src="poiInfo.discounts2[0].icon_url" />
				      <span>{{poiInfo.discounts2[0].info}}</span>
				    </p>
				  </div>
				</div>

				<!-- 关闭内容容器 -->
				<div class="close-btn">
				  <span class="icon-close" @click="closeNotes"></span>
				</div>
			</div>
		</transition>
		
	</div>
</template>

<script>
	import Star from './Star'
	export default {
		name: 'app-header',
		components: {
			'app-star': Star
		},
		props: ['poiInfo'],
		data() {
		 return {
		 	isShowNotes: false
		 }
		},
		created () {
			
		},
		methods: {
			showNotes () {
				this.isShowNotes = !this.isShowNotes
			},
			closeNotes () {
				this.isShowNotes = !this.isShowNotes
			}
			/*head_pic_url () {
				return {
					backgroundImage: "url(" + this.poiInfo.head_pic_url + ")",
				  backgroundRepeat: "no-repeat",
				  backgroundSize: "100% 137%",
				  backgroundPosition: "center -12px"
				}
			}*/
		},
		computed: {
			head_pic_url () {
				//return "background:url("+this.poiInfo.head_pic_url+")"
				return "background-image: url(" + this.poiInfo.head_pic_url + ");"
				/*return {
				  backgroundImage: "url(" + this.poiInfo.head_pic_url + ")",
				  backgroundRepeat: "no-repeat",
				  backgroundSize: "100% 137%",
				  backgroundPosition: "center -12px"
			  }*/
			}
		}
	}
</script>

<style>
	@import url('../../static/css/icon.css');
	.header{ 
		height: 130px;
		padding-top: 20px;
		font-size: 14px;
		color: #fff;
		/*background: cyan;*/
    background-size: 100% 137%;
		background-position: center -12px;
	 }
	 /* .bg {
	 		position: absolute;
	 		top: 0;
	 		width: 100%;
	 		height: 150px;
	 		background-size: 100% 135%;
	 			background-position: center -12px;
	 } */
	 .top-wrapper {
	 	height: 31px;
	 	position: relative;
	 }
	 .back-wrapper, .more-wrapper {
	 		height: 100%;
			position: absolute;
			top: 0;
			z-index: 1;
			width: 50px;
			line-height: 31px;
			/*background-color: red;*/
			text-align: center;
	 }
	 .back-wrapper {
	 		/*background-color: red;*/
	 }
	 .back-wrapper span {
	 		vertical-align: middle
	 }
	 .search-wrapper {
	 		/*position: relative;*/
	 		height: 100%;
	 		padding: 0 100px 0 50px;
	 		line-height: 31px;
	 		/*background-color: #ccc;*/
	 }
	 .search-icon {
	 	position: absolute;
	 	width: 28px;
	 	height: 100%;
	 	background: url('../../static/images/search.png') no-repeat 9px center;
	 	background-size: 14px 14px;
	 }
	 .search-wrapper input {
	 		height: 27px;
	 		width: 100%;
	 		box-sizing: border-box;
	 		border: 0;
	 		outline: none;
	 		border-radius: 17px;
	 		padding: 0 0 0 28px;
	 		background-color: rgba(255,255,255,.7);
	 }
	 .search-icon {
		position: absolute;

	 }
	 .more-wrapper {
	 	width: 100px;
	 	right: 0;
	 	/*background-color: pink;*/
	 }
	 .more-wrapper a {
	 	color: #fff;
	 	padding: 2px 5px;
	 	border: 1px solid #fff;
		border-radius: 3px;
	 }
	 .more-bt {
	 	display: inline-block;
	 	position: relative;
	 	top: -2px;
	 	margin-left: 9px;
	 }
	 .s-radius {
	 	width: 3px;
	 	height: 3px;
	 	border-radius: 50%;
	 	border: 1px solid white;
	 	display: inline-block;
	 	/*float: left;*/
	 	/*margin-right: 1px;*/
	 }
	 .content-wrapper {
	 	height: 50px;
	 	padding: 15px 20px 0 10px;
	 	/*line-height: 50px;*/
	 }
	 .content-wrapper div {
			/*display: inline-block;*/
			float: left;
	 }
	 .content-wrapper .icon { 
			width: 50px;
			height: 50px;
			background-size: 135% 100%;
			background-position: center;
			border-radius: 5px;
	 }
	 .content-wrapper .name {
	 	line-height: 50px;
	 	margin-left: 8px;
	 }
	 .content-wrapper .name h3 {
	 	font-weight: bold;
	 	letter-spacing: 2px;
	 }
	 .content-wrapper .collect {
	 	float: right;
	 	font-size: 0;
	 	width: 25px;
	 /*	height: 100%;
	 	line-height: 50px;*/
	 }
	 .collect span {
	 	font-size: 12px;
	 }
	 .collect img {
	 		width: 20px;
	 		height: 20px;
	 		margin:0 0 4px 2px;
	 }
	 .notes-wrapper {
		padding: 10px 10px 0;
		height: 16px;
		line-height: 16px;
	 }
	.notes-wrapper .left {
		float: left;
		font-size: 0;
	}
	@media (max-width: 374px) {
		.notes-wrapper .left {
			width: 230px;
			-webkit-line-clamp: 1;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	}
	.notes-wrapper .left img {
		width: 16px;
		margin-right: 3px;
	}
	.notes-wrapper .left .text {
		font-size: 12px;
		vertical-align: top;
	}
	.notes-wrapper .detail {
		float: right;
		height: 16px;
		font-size: 12px;
	}
	.detail .arrow {
		vertical-align: middle;
		/*position: relative;
		top: 2px;*/
		/*font-size: 14px;*/
	}
	/*公告详情*/
	.notes-detail{
		position: absolute;
		z-index: 66;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 50px 20px 125px;
		box-sizing: border-box;
		text-align: center;
		font-size: 12px;
		color: ;
	}
	.notes-detail .main-wrapper {
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
		border-radius: 10px;
		box-sizing: border-box;
	}
	.main-wrapper h3 {
		/*font-weight: bold;*/
		font-family: "Microsoft YaHei","Arial","宋体",HELVETICA,"Arial Narrow",sans-serif;
		font-size: 14px;
		letter-spacing: 2px;
		margin-top: 13px;
	}
	.score {
		margin: 8px 0;
	}
	.score span {

	}
	.main-wrapper p {
		color: #bababc;
		margin: 10px 0;
	}
	.main-wrapper .line {
		width: 90%;
		margin: 15px auto;
		height: 2px;
		background: #a3a3a5;
	}
	.notes-detail .icon {
		width: 60px;
		height: 60px;
		background-size: 135% 100%;
		background-position: center;
		border-radius: 5px;
		display: inline-block;
		margin-top: 50px;
	}
	.tip i {
		margin: 0 3px;
	}
	.discounts {
		font-size: 0;
	}
	.discounts img { 
		width: 16px;
		height: 16px;
		margin-right: 3px;
	}
	.discounts span {
		color: #fff;
		font-size: 12px;
		vertical-align: middle;
	}
	.close-btn {
		display: inline-block;
		margin-top: 11px;
	}
	.close-btn span {
		width: 40px;
		height: 40px;
		line-height: 40px;
		border-radius: 50%;
		font-size: 14px;
		color: #fff;
		display: inline-block;
		background: rgba(118, 118, 118, 0.7);
		border: 1px solid rgba(140, 140, 140, 0.9);
	}
	/* 动画效果 */ 
	 .notes-enter-active,
	.notes-leave-active {
	  transition: 0.8s opacity;
	}
	
	.notes-enter,
	.notes-leave-to {
	  opacity: 0;
	}
	
	.notes-enter-to,
	.notes-leave {
	  opacity: 1;
	} 
</style>