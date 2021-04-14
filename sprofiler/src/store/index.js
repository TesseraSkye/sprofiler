import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accent: 'cyan'
  },
  mutations: {
    setAccent (state, data) {
      state.accent = data
    }
  },
  actions: {
    setAccent ({ commit }, data) {
      commit('setAccent', data)
    }
  },
  modules: {
  }
})
