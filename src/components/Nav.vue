<template>
	<div class="nav">
		<router-link to="/" exact class="nav-item"><span>点餐</span></router-link>
		<router-link to="/ratings" class="nav-item"><span>评价({{ commentNum }})</span></router-link>
		<!-- <router-link to="/ratings" class="nav-item"><span>评价<i>({{ ratings.comment_num }})</i></span></router-link> -->
		<router-link to="/seller" class="nav-item"><span>商家</span></router-link>
	</div>
</template>

<script>
	export default {
		name: 'app-nav',
		props: {
			commentNum: {
				type: Number,
				default: 0
			}/*,
			ratings : {
				type: Object,
				default () {
					return {}
				}
			}*/
		}
	}
</script>

<style>
	.nav{
		width: 100%;
		display: flex;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		border-bottom: 1px solid #e2e2e2;
		background-color: #fff;
	}
	.nav-item {
		flex: 1;
		text-align: center;
		color: #666;
	}
	/*.nav .active {
		color: #FFBB22;
		font-weight: bold;
	}*/
	.nav-item span {

	}
	.active span { 
		display: inline-block;
		line-height: 38px;
		color: #FFBB22;
		/*font-weight: bold;*/
		border-bottom: 2px solid #FFBB22;
	 }
</style>