<template>
	<div class="ratings" ref="ratingsview">
		<div class="ratings-wrapper">
			<div class="seller-score">
				<div class="pack">
					<div class="scores">
						<p class="score">{{ ratings.comment_score }}</p>
						<p class="">商家评分</p>
					</div>
					<div class="level">
						<p class="">
							<span>口味</span>
							<!-- <span>{{ ratings.food_score }}</span> -->
							<app-star :score="ratings.food_score"/>
						</p>
						<p class="">
							<span>包装</span>
							<app-star :score="ratings.pack_score"/>
						</p>
					</div>
					
				</div>
				<div class="delivery">
					<p class="post">{{ ratings.delivery_score }}</p>
					<p>配送评分</p>
				</div>
			</div>
			<split/>
			<div class="rating-list">
				<ul class="select-item" v-if="ratings.tab">
					<li class="item" :class="{'selected': types==='all'}" @click="selectType('all')"><span>{{ ratings.tab[0].comment_score_title }}</span></li>
					<li class="item" :class="{'selected': types==='pic'}" @click="selectType('pic')"><span>{{ ratings.tab[1].comment_score_title }}</span></li>
					<li class="item" :class="{'selected': types==='comment'}" @click="selectType('comment')">
						<img v-show="types === 'comment'" src="../../static/images/icon_sub_tab_dp_highlighted@2x.png">
						<img v-show="types !== 'comment'" src="../../static/images/icon_sub_tab_dp_normal@2x.png">
						<span>{{ ratings.tab[2].comment_score_title }}</span>
					</li>
				</ul>
				<div class="labels">
					<span class="item" v-for="(item, index) in ratings.labels" :key="index">
						{{ item.content }}{{ item.label_count }}
					</span>
				</div>
			</div>
			<div class="ratings">
				<ul>
					<li class="ratings-item" v-for="(item, index) in showSelected" :key="index">
						<div class="user">
							<img :src="item.user_pic_url" v-if="item.user_pic_url" alt="">
							<img src="../../static/images/anonymity.png" v-if="!item.user_pic_url" alt="">
						</div>
						<div class="comment">
							<p class="user-time">
								<span class="username">{{ item.user_name }}</span>
								<span class="time">{{ item.comment_time*1000 | dateFormat() }}</span>
							</p>
							<p class="userscore">
								<span>评分</span>
								<app-star :score="item.order_comment_score"/>
							</p>
							<p class="text">{{ item.comment }}</p>
							<div class="img" v-if="types==='pic'" v-for="(pic, index) in item.comment_pics" :key="index">
								<img :src="pic.thumbnail_url" alt="">
							</div>
						</div>
						
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Split from './Split'
	import Star from './Star'
	// import BScroll from 'better-scroll'
	export default {
		name: 'ratings',
		components: {
			'split': Split,
			'app-star': Star
		},
		data () {
			return {
				ratings: {},
				types: 'all'
			}
		},
		methods: {
			selectType (type) {
				this.types = type
				//console.log(this.showSelected)
			}
		},
		created () {
			fetch('/api/ratings')
			  .then(res => {
			    return res.json()
			  }).then(datas => {
			    if(datas.code == 0){
			    	this.ratings = datas.data
			    	this.$nextTick(() => {
			    		if(!this.scroll){
			    			this.scroll = new this.BScroll(this.$refs.ratingsview, {
			    				click: true
			    				// scrollbar: true
			    			})
			    		}else{
			    			this.scroll.refresh()
			    		}
			    	})
			    }
			  })
		},
		computed: {
			showSelected () {
				if(this.types === 'all'){
					return this.ratings.comments
				}else if(this.types === 'pic'){
					let arr = []
					this.ratings.comments.forEach((val, index, array) => {
						if(val.comment_pics.length){
							arr.push(val)
						}
					});
					return arr
				}else{
					return this.ratings.comments_dp.comments
				}
			}
		}
	}
</script>

<style>
	.ratings {
		/*max-height: 110%;*/
		height: 100%;
		overflow: hidden;
	}
	.seller-score {
		display: flex;
		align-items: center;
		padding: 20px 10px;
		font-size: 13px;
		color: #9d9d9d;
	}
	.seller-score p {
		margin:8px 0;
	}
	.pack {
		flex: 1;
		display: flex;
		align-items: center;
	}
	.pack .scores {
		flex: 0 0 80px;
		text-align: center;
		margin-right: 13px;
	}
	.pack .scores .score {
		font-size: 20px;
		font-weight: bold;
		color: #ffb000;
	}
	.pack .level {
		flex: 1;
	}
	.delivery {
		flex: 0 0 100px;
		text-align: center;
		border-left: 1px solid #ccc;
	}
	.delivery .post {
		font-size: 16px;
		color: #666;
	}
	.rating-list { 
		padding: 13px;
	}
	.select-item {
		display: flex;
		text-align: center;
		border: 1px solid #FFB000;
		color: #FFB000;
		border-radius: 3px;
		font-size: 14px;
	}
	.select-item .item {
		flex: 1;
		border-right: 1px solid #FFB000;
		padding: 13px 0;
	}
	.select-item .item.selected {
		background-color: #FFB000;
		color: #333;
	}
	.select-item .item:last-child {
		border-right: none;
	}
	.select-item img {
		height: 14px;
	}
	.labels {
		margin: 24px 0;
		font-size: 13px;
		color: #999;
		/*text-align: center;*/
	}
	.labels .item {
		display: inline-block;
		background-color: #f2f2f2;
		padding: 3px 5px;
		margin: 0 10px 5px 0;
		border-radius: 3px;
	}
	.ratings .bscroll-indicator{
		background-color: rgba(0, 0, 0, 0.3)!important;
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
	.ratings-item .userscore {
		font-size: 12px;
		color: #9d9d9d;
		margin-top: 8px;
	}
	.ratings-item .comment{
		flex: 1;
		color: #333;
		padding: 0 10px;
	}
	.ratings-item .comment .user-time {
		line-height: 16px;
		overflow: hidden;
		padding-right: 10px;
	}
	.ratings-item .user-time .username {
		float: left;
	}
	.ratings-item .user-time .time {
		float: right;
		color: #9d9d9d;
		font-size: 12px;
	}
	.ratings-item .comment .text {
		font-size: 12px;
		line-height: 1.8;
		margin: 8px 0;
	}
	.ratings-item .img img {
		width: 50%;
	}
</style>