<template>
	<div class="goods">
		<!-- 菜单列表 -->
		<div class="menu-wrapper" ref="menuScroll">
			<ul>
				<li class="menu-item">
					<a href="javascript:void(0)" @click.prevent.stop="locate($event, 0)" :class="{'current': currentIndex === 0}">
						<span class="img" :style='"background-image:url("+specialMenu.tag_icon+")"' v-if="specialMenu.tag_icon"></span>
						<!-- <span class="img" :src="fn" v-if="specialMenu.tag_icon"></span> -->
						<!-- <img :src="specialMenu.tag_icon" v-if="specialMenu.tag_icon"> -->
						<span>{{ specialMenu.tag_name }}</span>
					</a>
				</li>
				<li class="menu-item" v-for="(item, index) in menuTags" :key="index">
					<a href="javascript:void(0)" @click.prevent.stop="locate($event, index+1)" :class="{'current': currentIndex === index + 1}">
						<!-- <img :src="item.icon" v-if="item.icon"> -->
						<span class="img" :style='"background-image:url("+item.icon+")"' v-if="item.icon"></span>
						<span>{{ item.name }}</span>
						<i class="num" v-show="foodCount(item.spus)">{{ foodCount(item.spus) }}</i>
					</a>
				</li>
			</ul>
		</div>
		<!-- 食物列表 -->
		<div class="foods-wrapper" ref="foodsScrolls">
			<ul>
				<li class="specialList foodhook">
					<div v-for="(item,index) in specialMenu.operation_source_list" :key="index">
					 <img :src="item.pic_url" @load="imgLoad(index)">
					</div>
				</li>
				<li v-for="(item,index) in menuTags" :key="index" class="food-list foodhook">
				  <h3 class="title">{{item.name}}</h3>
				  <ul>
				    <li v-for="(food,index) in item.spus" :key="index" @click="showView(food)" class="food-item">
				      <div class="icon" :style='"background-image:url("+food.picture+")"'></div>
				      <div class="food-content">
				        <h3 class="name">{{food.name}}</h3>
				        <p class="desc" v-if="food.description">{{food.description}}</p>
				        <div class="extra">
				          <span class="saled">{{food.month_saled_content}}</span>
				          <span class="praise">{{food.praise_content}}</span>
				        </div>
				        <img class="product" v-if="food.product_label_picture" :src="food.product_label_picture" alt="">
				        <p class="price">
				          <span class="text">&yen;{{food.min_price}}</span>
				          <span class="unit">/{{food.unit}}</span>
				        </p>
				      </div>
				      <div class="cartcontrol-wrapper">
				      	<cartcontrol :food="food"/><!-- 上面循环中的变量food -->
				      </div>
				      <!-- <div class="cartcontrol-wrapper">
				        <app-cart-control :food="food"></app-cart-control>
				      </div> -->
				    </li>
				  </ul>
				</li>
			</ul>
		</div>
		<!-- 购物车 -->
		<shoppingcart :poiInfo="poiInfo" :selectedFoods="selectedFoods"/>
		<!-- 产品详情 -->
		<food-detail :food="selectedFood" ref="selected"/>
	</div>

</template>

<script>
	// import BScroll from 'better-scroll'
	import ShoppingCart from './shoppingcart/ShoppingCart'
	import CartControl from './shoppingcart/CartControl'
	import FoodDetail from './FoodDetail'
	export default {
		name: 'goods',
		components: {
			'shoppingcart': ShoppingCart,
			'cartcontrol': CartControl,
			'food-detail': FoodDetail
		},
		data () {
			return {
				specialMenu: {},
				poiInfo: {},
				menuTags: [],
				foodsElements: [],
				foodsEleHeight: [],
				imgLength: 0,
				count: 0, // 判断图片是否全部加载完毕
				foodsScroll: {},
				menuScroll: {},
				scrollY: 0,
				selectedFood: {}
			}
		},
		methods:{
			showView (food) {
				this.selectedFood = food
				// 调用子组件方法
				this.$refs.selected.show()
			},
			foodCount (spus) {
				let num = 0
				spus.forEach((val, index, arr) => {
					if(val.count){
						num += val.count
					}
				})
				return num
			},
			locate (e, index) { // 菜单和食物列表定位
				// console.log(index)
				let menuEle = e.currentTarget.parentElement
				let foodsEle = this.foodsElements[index]
				//console.log(e.currentTarget.parentElement)
				this.menuScroll.scrollToElement(menuEle, 500, null, null, 'ease-in')
				this.foodsScroll.scrollToElement(foodsEle, 500, null, null, 'ease-in')
			},
			imgLoad (index) {
				this.count++
				if(this.count == this.imgLength){ // 证明所有图片已经加载完，可拿到最的后的clientHeight
					this.calcHeight()
				}
				//if(index == this.imgLength){
					//this.$options.methods.calcHeight.bind(this)()
					//this.calcHeight()
				//}
			},
			initScroll () {
				//this.menuScroll = new BScroll(this.$refs.menuScroll, {
				this.menuScroll = new this.BScroll(this.$refs.menuScroll, {
					click: true,
					// scrollbar: true
				})
				this.foodsScroll = new this.BScroll(this.$refs.foodsScrolls, {
					probeType:3,
					click: true,
					scrollbar: true
				})
				// better-scroll 自带监听事件
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y))
					//console.log(this.scrollY)
					//console.log(this.currentIndex)
				})
			},
			calcHeight () {
				this.foodsEleHeight = []
				//this.foodsElements = this.$refs.foodsScrolls.querySelectorAll('.foodhook')
				this.foodsElements = document.querySelectorAll('.foodhook')
				//this.foodsElements = this.$refs.foodsScrolls.getElementsByClassName("foodhook")
				//let foodsElements = this.$refs.foodsScroll.getElementsByClassName('foodhook')
				let height = 0
				this.foodsEleHeight.push(height)
				for(let i=0,len = this.foodsElements.length; i<len; i++){
					height += this.foodsElements[i].clientHeight
					this.foodsEleHeight.push(height)
				}
				//console.log(this.foodsEleHeight)
				//console.log(this.foodsElements)
			}
		},
		created () {
		  fetch('/api/goods')
		    .then(res => {
		      return res.json()
		    }).then(data => {
		      //console.log(data)
		      if(data.code === 0){
		        //this.poiInfo = data.data.poi_info
		        //console.log(this.poiInfo.head_pic_url)
		        this.specialMenu = data.data.container_operation_source
		        this.imgLength = this.specialMenu.operation_source_list.length
		        this.menuTags = data.data.food_spu_tags
		        this.poiInfo = data.data.poi_info
		        this.$nextTick(() => {
		        	this.initScroll()
		        	this.calcHeight()
		        	//console.log(this.currentIndex)
		        })
		      }
		    })

		},
		computed: {
			fnnn(){
				return "background-image:url("+this.specialMenu.tag_icon+")"
			},
			currentIndex () {
				for(let i=0, len=this.foodsEleHeight.length; i<len; i++){
					// 获取商品所在范围
					let h1 = this.foodsEleHeight[i]
					let h2 = this.foodsEleHeight[i+1]
					// h2可不作空验证，因为scrollY肯定在最后一个高度之前,所以不会走i = 10
					//if( !h2 || (this.scrollY >= h1 && this.scrollY < h2) ){
					 if( this.scrollY >= h1 && this.scrollY < h2 ){
						return i
					}
				}
				return 0 // 基本不会出现，除非this.foodsEleHeight.length没循环完
			},
			selectedFoods () {
				let foods = []
				this.menuTags.forEach((val, index, arr) => {
					val.spus.forEach((food, index, arr) => {
						if(food.count > 0){
							foods.push(food)
						}
					})
				})
				return foods
			}
		}
	}
</script>

<style>
	.goods {
		position: absolute;
		top: 0;
		bottom: 50px;
		left: 0;
		width: 100%;
		/*height: 100%;*/
	}
	.menu-wrapper {
		width: 80px;
		height: 100%;
		float: left;
		/*background-color: #f4f4f4;*/
		background-color: #f2f2f2;
		overflow: hidden;
	}
	.menu-wrapper ul {
		border-right:1px solid #e2e2e2;
		border-top:1px solid #e2e2e2;
		box-sizing: border-box;
		/*background-color: #f2f2f2;*/
	}
	.menu-item {
		height: 45px;
		/*font-size: 0;*/
		text-align: center;
	}
	.menu-item.current {
		background-color: #fff;
	}
	.menu-item a {
		display: block;
		box-sizing: border-box;
		height: 100%;
		line-height: 44px;
		padding: 0 3px;
		border-bottom:1px solid #e2e2e2; 
		/* overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap; */
		position: relative;
		color: #444;
		-webkit-line-clamp: 1;
		display: -webkit-box;
		/*! autoprefixer: off */
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.menu-item a.current {
		background-color: #fff;
		color: #222;
	}
	.menu-item span {
		/*display: inline-block;*/
		font-size: 13px;
		vertical-align: middle;
	}
	.menu-item .num {
		position: absolute;
		min-width: 14px;
		height: 14px;
		border-radius: 50%;
		font-size: 10px;
		line-height: 14px;
		/*padding: 1px;*/
		background-color: #f00;
		color: #fff;
		right: 2px;
		top: 2px;
		text-align: center;
	}
	.menu-item .img {
		display: inline-block;
		width: 15px;
		height: 15px;
		background-size: 15px 15px;
	}
	.menu-item img {
		/*display: inline-block;*/
		width: 15px;
		height: 15px;
		/*background-size: 50% 50%;
		background-position: center;*/
		/*margin-right: 2px;*/
	}
	.foods-wrapper {
		height: 100%;
		margin-left: 80px;
		overflow: hidden;
		/*background-color: cyan;*/
	}
	.foods-wrapper .bscroll-indicator{
		background-color: rgba(0, 0, 0, 0.2)!important;
	}
	.specialList {
		padding: 11px 11px 0;
	}
	.specialList img {
		width: 100%;
		margin-bottom: 11px;
		border-radius: 5px;
	}
	.food-list {
		padding: 11px 15px 11px 11px;
	}
	.food-list .title {
		height: 13px;
		font-size: 13px;
		background: url(../../static/images/btn_yellow_highlighted@2x.png) no-repeat left center;
		background-size: 2px 10px;
		padding-left: 7px;
		margin-bottom: 12px;
	}
	.food-item {
		display: flex;
		margin-bottom: 25px;
	  position: relative;
	  /*background-color: #eee;*/
	}
	.food-item  .icon{
		/*position: absolute;
		top: 50%;
		transform: translateY(-50%);*/
		flex: 0 0 63px;
		background-position: center;
		background-size: 120% 100%;
		background-repeat: no-repeat;
		margin-right: 11px;
		/*height: 75px;*/
	}
	.food-content{
		flex: 1;
	}
	.food-content .name {
		font-size: 14px;
		letter-spacing: 1px;
		line-height: 21px;
		color: #333;
		/*margin-bottom: 10px;*/
		padding-right: 8px;
	}
	.food-content .desc {
		font-size: 10px;
		line-height: 19px;
		color: #bfbfbf;
		margin: 8px 0;
		padding-right: 5px;
		-webkit-line-clamp: 1;
		display: -webkit-box;
		/*! autoprefixer: off */
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.food-content .extra {
		font-size: 10px;
		color: #BFBFBF;
		margin: 8px 0;
	}
	.food-item .extra .saled {
		margin-right: 14px;
	}
	.food-content .product {
		height: 15px;
		margin-bottom: 6px;
	}
	.food-content .price {
		font-size: 0;
	}
	.food-content .price .text {
		font-size: 14px;
		color: #fb4e44;
	}
	.food-content .price .unit {
		font-size: 12px;
		color: #BFBFBF;
	}
	/*购物车加减控件*/
	.cartcontrol-wrapper {
		position: absolute;
		right: 0;
		/*top: 50%;
		transform: translateY(-50%);*/
		bottom: 0;
	}
</style>