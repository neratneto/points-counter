import Vue from 'vue'
import Router from 'vue-router'
import Canastra from './views/Canastra.vue'
import Truco from './views/Truco.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/canastra',
    name: 'canastra',
    component: Canastra
  }, {
    path: '/truco',
    name: 'truco',
    component: Truco
  }]
})
