<template>
	<div class="star">
		<span v-for="(itemClass, index) in itemClasses" :key="index" class="item" :class="itemClass">
			
		</span>
	</div>
</template>

<script>
	// 星星的长
	const LEN = 5
	// 星星的状态 
	const ON = 'on'
	const HALF = 'half'
	const OFF = 'off'
	export default {
		name: 'app-star',
		props: ['score'],
		computed: {
			itemClasses () {
				//let num = 0.5
				let result = []
				//let score = Math.floor(this.score * 2) / 2
				//let score = Math.floor(this.score)
				// 半星
				//let isHalf = num % 1 !== 0
				let isHalf = this.score % 1 !== 0
				// 全星个数
				//let onAll = parseInt(num)
				let onAll = parseInt(this.score)
				// 遍历全星个数
				for(let i=0; i<onAll; i++){
					result.push(ON)
				}
				// 补全半星
				if(isHalf){
					result.push(HALF)
				}
				// 补齐星星个数-5
				while(result.length < LEN){
					result.push(OFF)
				}
				return result
			}
		}
	}
</script>

<style>
	.star {
		display: inline-block;
		font-size: 0;
	}
	.star .item{
		display: inline-block;
		width: 10px;
		height: 10px;
		margin-right: 3px;
		background-repeat: no-repeat;
		background-size: 10px 10px;
	}
	/* 三种图片类型*/
	.star .on{
		background-image: url(../../static/images/star24_on@2x.png);
	}
	.star .half{
		background-image: url(../../static/images/star24_half@2x.png);
	}
	.star .off{
		background-image: url(../../static/images/star24_off@2x.png);
	}
</style>