import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Live from '../views/Live.vue'
import History from '../views/History.vue'
import Settings from '../views/Settings.vue'
import Save from '../views/Save.vue'

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

  {
    path: '/save',
    name: 'Save',
    component: Save
  },

  // wildcard so that weird requests aren't unhandeled
  {
    path: '*',
    redirect: '/',
    meta: { transitionType: 'fade' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to, from) => {
  // stuff to do after each route
  //
})

export default router
