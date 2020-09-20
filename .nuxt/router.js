import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _341cd1a9 = () => interopDefault(import('../pages/image-game-editor.vue' /* webpackChunkName: "pages/image-game-editor" */))
const _0ed5b8f0 = () => interopDefault(import('../pages/image-game-play.vue' /* webpackChunkName: "pages/image-game-play" */))
const _07f11e80 = () => interopDefault(import('../pages/lou-niver.vue' /* webpackChunkName: "pages/lou-niver" */))
const _084c0de6 = () => interopDefault(import('../pages/tranca.vue' /* webpackChunkName: "pages/tranca" */))
const _a613ec54 = () => interopDefault(import('../pages/truco.vue' /* webpackChunkName: "pages/truco" */))
const _2f1f26c5 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/image-game-editor",
    component: _341cd1a9,
    name: "image-game-editor"
  }, {
    path: "/image-game-play",
    component: _0ed5b8f0,
    name: "image-game-play"
  }, {
    path: "/lou-niver",
    component: _07f11e80,
    name: "lou-niver"
  }, {
    path: "/tranca",
    component: _084c0de6,
    name: "tranca"
  }, {
    path: "/truco",
    component: _a613ec54,
    name: "truco"
  }, {
    path: "/",
    component: _2f1f26c5,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
