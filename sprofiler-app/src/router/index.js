import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Settings from '../views/Settings.vue'
import Live from '../views/Live.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dash',
    name: 'Dashboard',
    component: Dashboard
  },

  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },

  {
    path: '/live',
    name: 'Live',
    component: Live
  },

  // wildcard so that weird requests aren't unhandeled
  {
    path: '*',
    redirect: '/dash',
    meta: { transitionType: 'fade' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
