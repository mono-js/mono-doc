import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _ba1e0522 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



const scrollBehavior = () => false


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _ba1e0522,
			name: "index"
		}
    ],
    fallback: false
  })
}
