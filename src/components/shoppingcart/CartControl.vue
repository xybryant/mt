<template>
		<div class="cartcontrol">
			<transition name="move">
				<span class="decrease icon-remove_circle_outline" @click.stop="decreaseCart" v-show="food.count"></span>
			</transition>
      <span class="count" v-show="food.count">{{ food.count }}</span>
      <span class="add icon-add_circle" @click.stop="increaseCart"></span>
		</div>
</template>

<script>
	export default {
		name: 'cartcontrol',
		data () {
			return {

			}
		},
		props: ['food'],
		methods: {
			decreaseCart () {
				this.food.count--
			},
			increaseCart () {
				
				if(!this.food.count){
					//console.log(this.food)
					// vue.set()两种用法
					// 一：引入全局Vue.set()
					// 二：vm.$set实例方法，这也是全局 Vue.set方法的别名,vm即this,当前实例组件
					this.$set(this.food, "count", 1)
				}else{
					this.food.count++
				}
				//console.log(this.selectedFoods)
			}
		},
		computed: {
			
		},
		created () {
			//this.menuTags.coun
		}
	}
</script>
	
<style>
	.cartcontrol {
		font-size: 0;
	}
	.cartcontrol span {
		display: inline-block;
		text-align: center;
		width: 22px;
		height: 22px;
		font-size: 22px;
		color: #b4b4b4;
	}
	.cartcontrol .decrease {

	}
	.cartcontrol .count {
		vertical-align: top;
		margin: 0 2px;
		font-size: 18px;
		line-height: 22px;
	}
	.cartcontrol .add {
		position: relative;
		color: #ffd161;
	}
	.cartcontrol .add::after {
		content: "";
		position: absolute;
		z-index: -1;
		top: 3px;
		left: 3px;
		display: block;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: #000;
	}
	.move-enter-active,.move-leave-active{
		transition: all 0.35s linear;
	}
	.move-enter,.move-leave-to{
		transform: translateX(22px) rotate(180deg);
	}
</style>