import Vue from 'vue'
import Vuex from 'vuex'

import { Storage } from '@capacitor/storage'
// import { forEach } from 'core-js/core/array'

async function putStorage (key, data) {
  // console.log(key + ' ' + data)
  await Storage.set({
    key: key,
    value: data
  })
}

// JSON "get" example
async function getStorage (key) {
  const res = await Storage.get({ key: key })
  console.log(res)
  const data = JSON.parse(res.value)
  return data
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accent: 'white',
    pressureArray: [[], []],
    pressureThresh: 35,
    // bt stuff
    deviceID: 0
  },
  mutations: {
    // array is [key, data]
    setState (state, array) {
      state[array[0]] = array[1]
    },
    appendPressure (state, data) {
      const date = new Date()
      const now = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      state.pressureArray[0].push(data)
      state.pressureArray[1].push(now)
    }
  },
  actions: {
    // Update state from Storage

    initStorage ({ dispatch }) {
      console.log('updating state from storage..')
      dispatch('getFromStorage', [['accent'], ['deviceID']])
    },

    // storage related stuff
    getFromStorage ({ dispatch }, array) {
      array.forEach(item => {
        getStorage(item[0])
          .then(res => {
            console.log(res + 'aaaaa')
            const data = res || 0
            dispatch('_setState', [item[0], data])
            return data
          })
          .catch(err => {
            console.error(err)
          })
      })
    },

    // array is [key, data]
    _setState ({ commit }, array) {
      console.log('setting state with ' + array)
      commit('setState', array)
    },

    putData ({ dispatch }, array) {
      dispatch('_setState', array)
      putStorage(array[0], array[1])
    },

    appendRTPressure ({ commit, dispatch }, data) {
      commit('appendPressure', data)
      if (new Date().getSeconds() % 2 === 0) { dispatch('putData', ['pressureArray', this.state.pressureArray]) }
    }
  },
  modules: {
  }
})
