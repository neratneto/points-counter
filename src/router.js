import Vue from 'vue'
import Router from 'vue-router'
import Somador from './views/Somador.vue'
import Truco from './views/Truco.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/somador'
  }, {
    path: '/somador',
    name: 'somador',
    component: Somador
  }, {
    path: '/truco',
    name: 'truco',
    component: Truco
  }]
})
