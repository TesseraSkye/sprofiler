import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Live from '../views/Live.vue'
import History from '../views/History.vue'
import Settings from '../views/Settings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },

  {
    path: '/live',
    name: 'Live',
    component: Live
  },

  {
    path: '/history',
    name: 'History',
    component: History
  },

  {
    path: '/settings',
    name: 'Settings',
    component: Settings
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
