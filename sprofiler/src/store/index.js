import Vue from 'vue'
import Vuex from 'vuex'

import { Plugins } from '@capacitor/core'

const { Storage } = Plugins

async function putAccent (color) {
  await Storage.set({
    key: 'accent',
    value: JSON.stringify({
      accent: color
    })
  })
}

// JSON "get" example
async function getAccent () {
  const ret = await Storage.get({ key: 'accent' })
  const accent = JSON.parse(ret.value)
  return accent
}

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
      putAccent(data)
    },
    getAccent ({ dispatch }) {
      getAccent()
        .then(res => {
          const data = res.accent
          console.log(data)
          dispatch('setAccent', data)
          return data
        })
    }
  },
  modules: {
  }
})
