
import Goods from './components/Goods'
import Ratings from './components/Ratings'
//import Seller from './components/Seller'
import Seller from '@/components/Seller' //@代表src根目录,webpack中设置的
const router = [
	{ path: '/', component: Goods },
	// { path: '/goods', component: Goods },
	{ path: '/ratings', component: Ratings, name: 'ratingsLink' },
	{ path: '/seller', component: Seller, name: 'sellerLink' },
	{ path: '*', redirect: '/' } //路由地址错误跳转到主页
]
export default router