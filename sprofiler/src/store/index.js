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
    activeDevies: { // written by bleHandler
      // dummyDevice: '3h49t83457yth' // deviceID
    },
    // show debug tips
    debug: false,
    version: '0.3.5',
    //
    //
    // shot data
    //
    activeData: {
      // dateOBJ: {}, // this is a real, actual date object
      // date: '11:23:12 on 12/22/13',
      // uuid: 'h456h45h6k4k5g',
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
      //   time: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      //   data: {
      //     profiler: {
      //       sprofiler: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 1}, {x: 3, y: 2}, {x: 4, y: 4}, {x: 5, y: 6}, {x: 6, y: 9}, {x: 7, y: 5}, {x: 8, y: 4}, {x:9 , y: 3}, {x: 10, y: 1), {x:11 , y: 1}]
      //     },
      //     scale: {
      //       acaia: [{x: 0, y: 0.0, {x: 1, y: 0.2}, {x: 2, y: 5.1}, {x: 3, y: 12.1}, {x: 4, y: 15.7}, {x: 5, y: 19.5}, {x: 6, y: 24.1}, {x: 7, y: 28.5}, {x: 8, y: 31.2}, {x: 9, y: 32.8}, {x: 10, y: 35.3}, {x: 11, y: 37.7} ]
      //     }
      //   }
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
    addActiveData (state, data) { // data = [value, family, name]
      const val = data[0]
      const family = data[1]
      const name = data[2]
      const rtData = this.state.activeData
      if (!rtData.dateOBJ) { rtData.dateOBJ = new Date(); rtData.uuid = rtData.dateOBJ.getTime() } // returns an actual date object and sets uuid

      if (!rtData.data[family]) { rtData.data[family] = {} }
      if (!rtData.data[family][name]) { rtData.data[family][name] = {} }
      rtData.data[family][name][0].push(val) // [[data], [time]]
      // for (fam in rtData.data) {
      //   for(obj in fam) {
      //     // everty time a new entry is added and a new time is appended, duplicate previous data.
      //     // this is a bodge, but I'm not sure how to split label data
      //     obj.push(obj[obj.length() - 1])
      //   }
      // }

      const elapsed = Date.now() - rtData.date.getTime()
      rtData.data[family][name][1].push(elapsed) // [[data], [time]]
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
      setTimeout(() => { dispatch('setData', ['accent', 'cyan']) }, 20)
      setTimeout(() => { dispatch('setData', ['deviceID', 0]) }, 40)
      setTimeout(() => { dispatch('setData', ['shotHistory', {}]) }, 60)
      setTimeout(() => { dispatch('setData', ['debug', false]) }, 80)
      setTimeout(() => { dispatch('setData', ['activeData', {}]) }, 100)
      setTimeout(() => { dispatch('setData', ['coffeeHistory', {}]) }, 120)
    }

  },
  modules: {
  }
})
