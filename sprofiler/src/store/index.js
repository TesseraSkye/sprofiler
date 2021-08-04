import Vue from 'vue'
import Vuex from 'vuex'

import { Storage } from '@capacitor/storage'

import * as _deviceConfig from '../components/deviceConfig.json'
const deviceConfig = _deviceConfig.default

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
  // console.log(out)
  return out
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: '0.4.0',
    accent: '',
    accentRaw: [],
    // preset accents
    accentPresets: {
      cyan: [187, 100, 42],
      pink: [340, 82, 52],
      green: [122, 39, 49],
      deepOrange: [14, 100, 57]
    },

    // types of devices registered
    deviceTree: {}, // initialized at boot

    // bt stuff
    activeDevices: { // written by bleHandler
      // dummyDevice: '3h49t83457yth' // deviceID
    },
    // show debug tips
    debug: false,
    //
    //
    // shot data
    //
    activeData: {
      // dateOBJ: {}, // this is a real, actual date object
      // date: '11:23:12 on 12/22/13',
      // uuid: 'h456h45h6k4k5g',
      // labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      // data: {
      //   profiler: {
      //     sprofiler: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 1}, {x: 3, y: 2}, {x: 4, y: 4}, {x: 5, y: 6}, {x: 6, y: 9}, {x: 7, y: 5}, {x: 8, y: 4}, {x:9 , y: 3}, {x: 10, y: 1}, {x:11 , y: 1}]
      //   },
      //   scale: {
      //     acaia: [{x: 0, y: 0.0}, {x: 1, y: 0.2}, {x: 2, y: 5.1}, {x: 3, y: 12.1}, {x: 4, y: 15.7}, {x: 5, y: 19.5}, {x: 6, y: 24.1}, {x: 7, y: 28.5}, {x: 8, y: 31.2}, {x: 9, y: 32.8}, {x: 10, y: 35.3}, {x: 11, y: 37.7} ]
      //   }
      // }
    },
    overlayUUID: '',
    shotHistory: {
      // a7d9g7afdsg6j: {
      //   name: 'Dummy shot',
      //   dateOBJ: {}, // this is a real, actual date object
      //   uuid: 'a7d9g7afdsg6j',
      //   raiting: 4.5,
      //   favorite: false,
      //   comments: 'It was pretty ok',
      //   data: {
      //     profiler: {
      //       axisID: 'pressure',
      //       sprofiler: [{x: 0, pressure: 0}, {x: 1, pressure: 0}, {x: 2, pressure: 1}, {x: 3, pressure: 2}, {x: 4, pressure: 4}, {x: 5, pressure: 6}, {x: 6, pressure: 9}, {x: 7, pressure: 5}, {x: 8, pressure: 4}, {x:9 , pressure: 3}, {x: 10, pressure: 1}, {x:11 , pressure: 1}]
      //     },
      //     scale: {
      //       axisID: 'weight',
      //       acaia: [{x: 0, weight: 0.0}, {x: 1, weight: 0.2}, {x: 2, weight: 5.1}, {x: 3, weight: 12.1}, {x: 4, weight: 15.7}, {x: 5, weight: 19.5}, {x: 6, weight: 24.1}, {x: 7, weight: 28.5}, {x: 8, weight: 31.2}, {x: 9, weight: 32.8}, {x: 10, weight: 35.3}, {x: 11, weight: 37.7} ]
      //     }
      //   }
      // }
    },
    coffeeHistory: {
      // 1628086737987: {
      //   name: 'Wild & Wonderful',
      //   rating: 3.5,
      //   origins: ['etheopia'],
      //   varietals: ['ruiru-11', 'sl-28'],
      //   process: 'washed',
      //   elevation: 0,
      //   roaster: 'Khrat Coffee',
      //   roastDate: '2021-08-27',
      //   dateOBJ: '2021-08-04T14:18:57.987Z',
      //   uuid: 1628086737987,
      //   brewingNotes: 'Solid cup, brew at 1:14 on 35',
      //   tastingTags: ['white grape', 'jasmine']
      // }
    },
    tags: {
      origins: [],
      varietals: [],
      processes: ['washed', 'honey', 'natural', 'anaerobic', 'mixed', '?'],
      tastingTags: []
    }
  },
  mutations: {
    // array is [key, data]
    setState (state, array) {
      state[array[0]] = array[1]
    },
    addActiveData (state, data) { // data = [value, family, name]
      const val = data[0]
      const name = data[1]
      const family = deviceConfig[name].family
      const rtData = state.activeData

      if (!rtData.dateOBJ) { rtData.dateOBJ = new Date(); rtData.uuid = rtData.dateOBJ.getTime() } // returns an actual date object and sets uuid
      if (!rtData.data) { rtData.data = {} }
      if (!rtData.data[family]) { rtData.data[family] = {} }
      if (!rtData.data[family][name]) { rtData.data[family][name] = [] }
      if (!rtData.labels) { rtData.labels = [] }

      rtData.data[family].axisID = deviceConfig[name].dataType
      const elapsed = (Math.trunc(Date.now() - rtData.dateOBJ.getTime()) / 10) / 100
      const arr = {}
      arr.x = elapsed
      arr.y = val
      rtData.data[family][name].push(arr)
      rtData.labels.push(elapsed)
    },
    addData (state, data) { // data = [stateName, [name, data]]
      const name = data[0]
      const _data = data[1]
      if (!this.state[name]) { this.state[name] = {} }
      state[name][_data[0]] = _data[1]
      setTimeout(() => { putStorage(name, state[name]) }, 50)
    },
    removeData (state, data) { // data = [stateName, [name, data]]
      const name = data[0]
      const _data = data[1]
      delete state[data[0]][_data[0]]
      setTimeout(() => { putStorage(name, state[name]) }, 50)
    },
    setupDeviceConfig (state) {
      // get device config, sort based on family, recast to new array.

      let newDC = {}
      newDC = {} // this just forces a compiler error to go away. It want's a const, but that would break the conditional assignments.
      for (const device in deviceConfig) {
        // console.log(device)
        const family = deviceConfig[device].family
        if (!newDC[family]) { newDC[family] = {} }
        if (!newDC[family][device]) { newDC[family][device] = {} }
        console.log('looking for device' + device)
        newDC[family][device].description = deviceConfig[device].description
        newDC[family].axisID = deviceConfig[device].dataType || 'ERROR'
        newDC[family][device].friendly = deviceConfig[device].friendly
      }
      state.deviceTree = newDC
    }
  },
  actions: {
    // Update state from Storage

    initStorage ({ dispatch }) {
      console.log('updating state from storage..')
      dispatch('getFromStorage', [
        ['accent'],
        ['accentRaw'],
        ['activeDevices'],
        // ['activeData'],
        ['shotHistory'],
        ['coffeeHistory'],
        ['tags']
      ])
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

    addActiveData ({ commit }, data) {
      commit('addActiveData', data)
      if (new Date().getSeconds() % 4 === 0) { putStorage('activeData', this.state.activeData) }
    },
    addData ({ commit }, data) {
      commit('addData', data)
    },
    removeData ({ commit }, data) {
      commit('removeData', data)
    },
    wipeStorage ({ dispatch }) {
      clearStorage()
      setTimeout(() => { dispatch('setData', ['debug', false]) }, 20)
      setTimeout(() => { dispatch('setData', ['accentRaw', [187, 100, 42]]) }, 40)
      setTimeout(() => { dispatch('setData', ['accent', 'hsl(187, 100%, 42%)']) }, 60)
      setTimeout(() => { dispatch('setData', ['activeDevices', {}]) }, 80)
      setTimeout(() => { dispatch('setData', ['activeData', {}]) }, 100)
      setTimeout(() => { dispatch('setData', ['shotHistory', {}]) }, 120)
      setTimeout(() => { dispatch('setData', ['coffeeHistory', {}]) }, 140)
      setTimeout(() => { dispatch('setData', ['tags', { origins: [], varietals: [], processes: ['washed', 'honey', 'natural', 'anaerobic', 'mixed', '?'], tastingTags: [] }]) }, 160)
    },
    setupDeviceConfig ({ commit }) {
      commit('setupDeviceConfig')
    }

  },
  modules: {
  }
})
