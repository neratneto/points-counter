import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _713f4c3d = () => interopDefault(import('../pages/lou-niver.vue' /* webpackChunkName: "pages/lou-niver" */))
const _5e25a8ee = () => interopDefault(import('../pages/tranca.vue' /* webpackChunkName: "pages/tranca" */))
const _468da85a = () => interopDefault(import('../pages/truco.vue' /* webpackChunkName: "pages/truco" */))
const _5ee248c2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/lou-niver",
    component: _713f4c3d,
    name: "lou-niver"
  }, {
    path: "/tranca",
    component: _5e25a8ee,
    name: "tranca"
  }, {
    path: "/truco",
    component: _468da85a,
    name: "truco"
  }, {
    path: "/",
    component: _5ee248c2,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
