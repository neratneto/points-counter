import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _78c5a400 = () => interopDefault(import('../pages/tranca.vue' /* webpackChunkName: "pages/tranca" */))
const _05590308 = () => interopDefault(import('../pages/truco.vue' /* webpackChunkName: "pages/truco" */))
const _7f7c9b6b = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/tranca",
    component: _78c5a400,
    name: "tranca"
  }, {
    path: "/truco",
    component: _05590308,
    name: "truco"
  }, {
    path: "/",
    component: _7f7c9b6b,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
