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
async function readAccent () {
  const ret = await Storage.get({ key: 'accent' })
  const accent = JSON.parse(ret.value)
  return accent
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accent: 'white',
    pressure: 9
  },
  mutations: {
    setAccent (state, data) {
      state.accent = data
    },
    setPressure (state, data) {
      state.pressure = data
    }
  },
  actions: {
    setAccent ({ commit }, data) {
      commit('setAccent', data)
      putAccent(data)
    },
    setpressure ({ commit }, data) {
      commit('setPressure', data)
    },

    // Update state from Storage

    updateStorage ({ dispatch }) {
      console.log('updating state from storage..')
      dispatch('readAccent')
    },

    readAccent ({ dispatch }) {
      readAccent()
        .then(res => {
          const data = res.accent
          console.log(data)
          dispatch('setAccent', data)
          // return data
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  modules: {
  }
})
