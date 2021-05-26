import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Live from '../views/Live.vue'
import Library from '../views/Library.vue'
import Settings from '../views/Settings.vue'
import SaveShot from '../views/SaveShot.vue'

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
    path: '/library',
    name: 'Library',
    component: Library
  },

  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },

  {
    path: '/save-shot',
    name: 'SaveShot',
    component: SaveShot
  },

  // wildcard so that weird requests aren't unhandeled
  {
    path: '*',
    redirect: '/'
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
