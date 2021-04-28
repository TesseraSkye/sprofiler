import Vue from 'vue'
import Vuex from 'vuex'

import { Storage } from '@capacitor/storage'

async function putStorage (key, data) {
  console.log('Setting storage at ' + key)
  await Storage.set({
    key: key,
    value: JSON.stringify(data)
  })
}

async function clearStorage () {
  console.log('Clearing storage..')
  await Storage.clear()
}

async function isInit () {
  const res = await Storage.keys()
  if (res) { return false } else { return true }
}

async function getStorage (key) {
  console.log('getting storage..')
  const res = await Storage.get({ key: key })
  const out = JSON.parse(res.value)
  console.log(out)
  return out
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accent: 'white',

    // bt stuff
    deviceID: 0,
    // show debug tips
    debug: false,
    version: '0.3.1',
    //
    //
    // shot data
    tick: 0,
    pressureArray: [[], []],
    overlayUUID: '',
    shotHistory: {
      // uuid: {
      //   name: 'Dummy shot',
      //   date: '04/22/21 : 11:07:30',
      //   uuid: 'a7d9g7afdsg6j',
      //   raiting: 4.5,
      //   favorite: false,
      //   notes: 'It was pretty ok',
      //   data: [[0, 0, 1, 2, 4, 6, 9, 5, 4, 3, 1, 1], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]
      // }
    }
  },
  mutations: {
    // array is [key, data]
    setState (state, array) {
      state[array[0]] = array[1]
    },
    appendPressure (state, data) {
      state.pressureArray[0].push(data)
      state.pressureArray[1].push(state.tick / 150)
    },
    saveShot (state, data) {
      if (!this.state.shotHistory) { this.state.shotHistory = {} }
      state.shotHistory[data[0]] = data[1]
      setTimeout(() => { putStorage('shotHistory', state.shotHistory) }, 50)
    },
    removeShot (state, data) {
      delete state.shotHistory[data]
      setTimeout(() => { putStorage('shotHistory', state.shotHistory) }, 50)
    },
    incrementTick (state) {
      state.tick += 1
    }
  },
  actions: {
    // Update state from Storage

    initStorage ({ dispatch }) {
      console.log('updating state from storage..')
      if (isInit()) { dispatch('wipeStorage') } else { dispatch('getFromStorage', [['accent'], ['deviceID'], ['shotHistory']]) }
    },

    // storage related stuff
    getFromStorage ({ dispatch }, array) {
      array.forEach(item => {
        getStorage(item[0])
          .then(res => {
            dispatch('_setState', [item[0], res])
            return res
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
    },
    saveShot ({ commit }, data) {
      commit('saveShot', data)
    },
    removeShot ({ commit }, data) {
      commit('removeShot', data)
    },
    wipeStorage ({ dispatch }) {
      clearStorage()
      setTimeout(() => { dispatch('putData', ['accent', 'cyan']) }, 20)
      setTimeout(() => { dispatch('putData', ['deviceID', 0]) }, 40)
      setTimeout(() => { dispatch('putData', ['shotHistory', {}]) }, 60)
      setTimeout(() => { dispatch('putData', ['debug', false]) }, 80)
      setTimeout(() => { dispatch('putData', ['pressureArray', [[], []]]) }, 100)
    },
    incrementTick ({ commit }) {
      commit('incrementTick')
    }
  },
  modules: {
  }
})
