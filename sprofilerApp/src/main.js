import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { StatusBar, Style } from '@capacitor/status-bar'

const setStatusBarStyleDark = async () => {
  await StatusBar.setStyle({ style: Style.Dark })
}

// Display content under transparent status bar (Android only)
StatusBar.setOverlaysWebView({ overlay: true })

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
