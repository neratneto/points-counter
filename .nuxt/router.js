import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ea49cf86 = () => interopDefault(import('../pages/image-game-editor.vue' /* webpackChunkName: "pages/image-game-editor" */))
const _e846d6f8 = () => interopDefault(import('../pages/image-game-play.vue' /* webpackChunkName: "pages/image-game-play" */))
const _0fef8b54 = () => interopDefault(import('../pages/lou-niver.vue' /* webpackChunkName: "pages/lou-niver" */))
const _01bfffc1 = () => interopDefault(import('../pages/old_index.vue' /* webpackChunkName: "pages/old_index" */))
const _03381bd2 = () => interopDefault(import('../pages/tranca.vue' /* webpackChunkName: "pages/tranca" */))
const _32cae32c = () => interopDefault(import('../pages/truco.vue' /* webpackChunkName: "pages/truco" */))
const _68c3ab59 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/image-game-editor",
    component: _ea49cf86,
    name: "image-game-editor"
  }, {
    path: "/image-game-play",
    component: _e846d6f8,
    name: "image-game-play"
  }, {
    path: "/lou-niver",
    component: _0fef8b54,
    name: "lou-niver"
  }, {
    path: "/old_index",
    component: _01bfffc1,
    name: "old_index"
  }, {
    path: "/tranca",
    component: _03381bd2,
    name: "tranca"
  }, {
    path: "/truco",
    component: _32cae32c,
    name: "truco"
  }, {
    path: "/",
    component: _68c3ab59,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
