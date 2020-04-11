import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0e0e79b1 = () => interopDefault(import('../pages/tranca.vue' /* webpackChunkName: "pages/tranca" */))
const _c6bd0eaa = () => interopDefault(import('../pages/truco.vue' /* webpackChunkName: "pages/truco" */))
const _1eca959a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/tranca",
    component: _0e0e79b1,
    name: "tranca"
  }, {
    path: "/truco",
    component: _c6bd0eaa,
    name: "truco"
  }, {
    path: "/",
    component: _1eca959a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
