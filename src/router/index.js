import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [
	{
		path: '/',
		name: 'layout',
		component: resolve => require(['@/layout'], resolve),
		redirect: '/dashboard',
		children: [
			{
				path: '/dashboard',
				name: 'dashboard',
				component: resolve => require(['@/dashboard'], resolve)
			}
		]
	}, {
		path: '*',
		redirect: '/'
	}, {
		path: '/login',
		name: 'login',
		component: resolve => require(['@/login'], resolve)
	}
];

const router = new Router({
	mode: 'history',
	routes: routes
})

export default router

