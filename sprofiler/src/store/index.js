import Vue from 'vue'
import Vuex from 'vuex'

import { Plugins } from '@capacitor/core'
// import { forEach } from 'core-js/core/array'

const { Storage } = Plugins

async function putData (key, data) {
  await Storage.set({
    key: key,
    value: JSON.stringify({
      [data]: key
    })
  })
}

// JSON "get" example
async function getData (key) {
  const ret = await Storage.get({ key: key })
  const data = JSON.parse(ret.value)
  return data
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accent: 'white',
    pressure: 0,
    // bt stuff
    deviceID: 0
  },
  mutations: {
    // array is [key, data]
    setState (state, [array]) {
      state[array[0]] = array[1]
    }
  },
  actions: {
    // Update state from Storage

    initStorage ({ dispatch }) {
      console.log('updating state from storage..')
      dispatch('getFromStorage', ['accent', 'pressure', 'deviceID'])
    },

    // storage related stuff
    getFromStorage ({ commit }, array) {
      array.forEach(item => {
        getData(item)
          .then(res => {
            const data = res[item]
            console.log(data)
            commit('setState', item, data)
            // return data
          })
          .catch(err => {
            console.error(err)
          })
      })
    },

    pushToStorage (item) {
      putData(item, this.state[item])
    },

    // array is [key, data]
    setState ({ commit }, array) {
      commit('setState', array)
    }
  },
  modules: {
  }
})
