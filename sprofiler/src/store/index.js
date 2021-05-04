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
    accent: '',

    // bt stuff
    deviceID: 0,
    // show debug tips
    debug: false,
    version: '0.3.5',
    //
    //
    // shot data
    tick: 0,
    pressureArray: [[], []],
    overlayUUID: '',
    shotHistory: {
      // a7d9g7afdsg6j: {
      //   name: 'Dummy shot',
      //   date: '04/22/21 : 11:07:30',
      //   uuid: 'a7d9g7afdsg6j',
      //   raiting: 4.5,
      //   favorite: false,
      //   comments: 'It was pretty ok',
      //   data: [[0, 0, 1, 2, 4, 6, 9, 5, 4, 3, 1, 1], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]
      // }
    },
    coffeeHistory: {
      // sdf7g68dsfg8s: {
      //   name: 'Halo Beriti',
      //   origin: 'etheopia',
      //   process: 'natural',
      //   roaster: 'bespoken (OR)'
      //   date: '05/02/21 : 09:51:30',
      //   uuid: 'sdf7g68dsfg8s',
      //   raiting: 4
      //   favorite: true
      //   comments: '',
      //   tastingNotes: 'Very fruity, quite sweet',
      //   tastingTags: "blueberries, sugar"
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
      state.pressureArray[1].push((Math.round(state.tick * 20)) / 100) // weird math to give 2 decimal point precition while dividing by 5
    },
    addData (state, data) { // data = [stateName, [uuid, data]]
      const name = data[0]
      const _data = data[1]
      if (!this.state[name]) { this.state[name] = {} }
      state[name][_data[0]] = _data[1]
      setTimeout(() => { putStorage(name, state[name]) }, 50)
    },
    removeData (state, data) {
      const name = data[0]
      const _data = data[1]
      delete state[data[0]][_data[0]]
      setTimeout(() => { putStorage(name, state[name]) }, 50)
    },
    incrementTick (state) {
      state.tick += 1
    }
  },
  actions: {
    // Update state from Storage

    initStorage ({ dispatch }) {
      console.log('updating state from storage..')
      dispatch('getFromStorage', [['accent'], ['deviceID'], ['shotHistory'], ['coffeeHistory']])
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

    setData ({ dispatch }, array) {
      dispatch('_setState', array)
      putStorage(array[0], array[1])
    },

    appendRTPressure ({ commit, dispatch }, data) {
      commit('appendPressure', data)
      if (new Date().getSeconds() % 2 === 0) { dispatch('setData', ['pressureArray', this.state.pressureArray]) }
    },
    addData ({ commit }, data) {
      commit('addData', data)
    },
    removeData ({ commit }, data) {
      commit('removeData', data)
    },
    wipeStorage ({ dispatch }) {
      clearStorage()
      setTimeout(() => { dispatch('setData', ['accent', 'cyan']) }, 20)
      setTimeout(() => { dispatch('setData', ['deviceID', 0]) }, 40)
      setTimeout(() => { dispatch('setData', ['shotHistory', {}]) }, 60)
      setTimeout(() => { dispatch('setData', ['debug', false]) }, 80)
      setTimeout(() => { dispatch('setData', ['pressureArray', [[], []]]) }, 100)
      setTimeout(() => { dispatch('setData', ['coffeeHistory', {}]) }, 120)
    },
    incrementTick ({ commit }) {
      commit('incrementTick')
    }

  },
  modules: {
  }
})
