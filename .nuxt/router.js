import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _be47df76 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



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
			component: _be47df76,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
