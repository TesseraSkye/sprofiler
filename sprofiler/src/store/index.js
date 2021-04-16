import Vue from 'vue'
import Vuex from 'vuex'

import { Plugins } from '@capacitor/core'

import { BleClient } from '@capacitor-community/bluetooth-le'

const SPROFILER_SERVICE = 'd43d1e53-4fb6-4907-9f4e-1237e5a39971'
const PRESSURE_CHARACTERISTIC = '50739418-766d-46f5-9670-f5ef11392f3b'

export async function main () {
  try {
    await BleClient.initialize()

    const device = await BleClient.requestDevice({
      services: [SPROFILER_SERVICE]
    })

    await BleClient.connect(device.deviceId)
    console.log('connected to device', device)

    const result = await BleClient.read(
      device.deviceId,
      SPROFILER_SERVICE,
      PRESSURE_CHARACTERISTIC
    )
    console.log('pressure data', result)

    await BleClient.startNotifications(
      device.deviceId,
      SPROFILER_SERVICE,
      PRESSURE_CHARACTERISTIC,
      value => {
        this.$store.dispatch('setPressure', value)
        console.log('current pressure', value)
      }
    )

    setTimeout(async () => {
      await BleClient.stopNotifications(
        device.deviceId,
        SPROFILER_SERVICE,
        PRESSURE_CHARACTERISTIC
      )
      await BleClient.disconnect(device.deviceId)
      console.log('disconnected from device', device)
    }, 10000)
  } catch (error) {
    console.error(error)
  }
}

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
    accent: 'cyan',
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

    getAccent ({ dispatch }) {
      getAccent()
        .then(res => {
          const data = res.accent
          console.log(data)
          dispatch('setAccent', data)
          return data
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  modules: {
  }
})
