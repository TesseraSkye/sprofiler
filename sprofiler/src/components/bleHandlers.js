import { BleClient } from '@capacitor-community/bluetooth-le'
import store from '../store/index.js'

import { decodeData } from './dataHandlers.js'
import * as _deviceConfig from './deviceConfig.json'

const deviceConfig = _deviceConfig.default

// data format (name, cuuid (optional))
function getUUID (name, cuuid = '') {
  const device = deviceConfig[name] || {}

  // if cuuid, assume lookign for characteristic uuid, returns cUUID, error returns ""
  // if no char name, reurn service uuid, error returns ""
  return ((cuuid ? (device[cuuid] ? device[cuuid] : '') : (device.suuid ? device.suuid : ''))) // weird if / else shorthand
}

// async ble stuff
// everything runs on a JSON LUT, so all you have to pass is the family and name as an array,
// and in some cases, the characteristic you want to access

async function bleInit (name) {
  const serviceUUID = getUUID(name)
  const dispatch = store.dispatch
  async function main () {
    try {
      await BleClient.initialize()

      const device = await BleClient.requestDevice({
        services: [serviceUUID]
      })

      dispatch('addData', ['activeDevices', [name, device.deviceId]]) // adds the name but not uuid, as that can be looked up.
    } catch (error) {
      console.error(error)
    }
  }
  main()
}
async function bleStart () { // just turns ble on.
  async function main () {
    try {
      await BleClient.initialize()
    } catch (error) {
      console.error(error)
    }
  }
  main()
}
async function bleServe (name) {
  const suuid = getUUID(name)
  const cuuid = getUUID(name, 'read') // get cUUID at 'read', this will do for now
  const deviceID = getID(name)
  const dispatch = store.dispatch
  console.warn('connecting to ' + name + ' at ' + deviceID)
  async function main () {
    try {
      await BleClient.initialize()

      await BleClient.connect(deviceID)
      console.log('connected to ' + name + ' at ' + deviceID)

      await BleClient.startNotifications(
        deviceID,
        suuid,
        cuuid,
        value => {
          console.log(
            'response at cuuid is ' + value
          )
          const decoded = decodeData(value, name) // there's a good reason for not passing name first - if it gets left off, it should handle it in a default way, not an error.
          dispatch('addActiveData', decoded)
        }
      )
    } catch (error) {
      console.error(error)
    }
  }
  main()
}

async function bleStop (name, cName = 'read') { // fine for now
  const deviceID = getID(name)
  const suuid = getUUID(name)
  const cuuid = getUUID(name, cName)
  async function main () {
    try {
      await BleClient.stopNotifications(
        deviceID,
        suuid,
        cuuid
      )
    } catch (error) {
      console.error(error)
    }
  }
  main()
}

async function bleDC (name) {
  const deviceID = getID(name)
  async function main () {
    try {
      await BleClient.disconnect(deviceID)
      console.log('disconnected from ' + name + ' at ' + deviceID)
    } catch (error) {
      console.error(error)
    }
  }
  main()
}

function getID (name) { // checks for connected at name. (e.g. 'acaia')
  return store.state.activeDevices[name]
}

export { bleInit, bleServe, getID, bleStop, bleDC, bleStart, getUUID }
