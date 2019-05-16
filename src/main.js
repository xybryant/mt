// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import BScroll from 'better-scroll'
//console.log(Vue)
Vue.use(VueRouter)
Vue.prototype.BScroll = BScroll
const routers = new VueRouter({
	routes: router, // 抽离路由配置
	mode: 'history',
	linkActiveClass: 'active'
})
Vue.filter('dateFormat', function(data, pattern='yyyy-mm-dd'){
	const time = new Date(data);
	let y = time.getFullYear();
	//ES6方法，补全字符串
	//String.prototype.padStart(mexLengh, fillString)
	//String.prototype.padEnd(mexLengh, fillString)
	let m = (time.getMonth() + 1).toString().padStart(2, '0');
	let d = time.getDate().toString().padStart(2, '0');
	if(pattern && pattern.toLowerCase() === 'yyyy-mm-dd'){
		//return `${y}-${m}-${d}`;
		return `${y}.${m}.${d}`;
	}else{
		let hh = time.getHours().toString().padStart(2, '0');
		let mm = time.getMinutes().toString().padStart(2, '0');
		let ss = time.getSeconds().toString().padStart(2, '0');
		return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
	}
});
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router: routers
})
