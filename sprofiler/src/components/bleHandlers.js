import { BleClient } from '@capacitor-community/bluetooth-le'
import store from '../store/index.js'

import { decodeData } from './dataHandlers.js'
import * as _deviceConfig from './deviceConfig.json'

const deviceConfig = _deviceConfig.default

// data format (name, cuuid (optional))
function getUUID (name, cuuid = '') {
  // console.error('name - ' + name)
  // console.error(deviceConfig)
  const device = deviceConfig[name] || {
    suuid: 'NO DEVICE FOUND',
    characteristics: {
      read: 'NO DEVICE FOUND'
    }
  }

  // if cuuid, assume lookign for characteristic uuid, returns cUUID, error returns ""
  // if no char name, reurn service uuid, error returns ""
  return ((cuuid ? (device.characteristics[cuuid] ? device.characteristics[cuuid] : 'cUUID ERROR') : (device.suuid ? device.suuid : 'sUUID ERROR'))) // weird if / else shorthand
}

// async ble stuff
// everything runs on a JSON LUT, so all you have to pass is the family and name as an array,
// and in some cases, the characteristic you want to access

async function bleInit (name) {
  // console.error('initializing ble.....')
  const suuid = getUUID(name)
  const dispatch = store.dispatch
  async function main () {
    try {
      await BleClient.initialize()

      const device = await BleClient.requestDevice({
        services: [suuid]
      })
      console.error('adding device at ' + device.deviceId)
      dispatch('addData', ['activeDevices', [name, device.deviceId]]) // adds the name and dID, but not suuid, as that can be looked up.
    } catch (error) {
      console.error(error)
    }
  }
  main()
}
async function bleScan () {
  async function main () {
    try {
      await BleClient.initialize()
      setTimeout(async () => {
        await BleClient.stopLEScan()
        console.log('stopped scanning')
      }, 10000)
      BleClient.requestLEScan({
        // services: ['cc4a6a80-51e0-11e3-b451-0002a5d5c51b']
      }, res => {
        console.error('Device scan returned: ' + JSON.stringify(res))
      })
      // console.error(scanRes)
    } catch (error) {
      console.error('failed to scan for devices! ' + error)
    }
  }
  main()
}
async function bleStart () { // just turns ble on.
  async function main () {
    try {
      await BleClient.initialize()
    } catch (error) {
      console.error('BLE initialization failure! ' + error)
    }
  }
  main()
}
async function bleServe (name) {
  const suuid = getUUID(name)
  // console.warn('suuid = ' + suuid)
  const cuuid = getUUID(name, 'read') // get cUUID at 'read', this will do for now
  const dispatch = store.dispatch
  if (!getID(name)) { bleInit(name) }
  const deviceID = getID(name)
  // console.warn('connecting to ' + name + ' at ' + deviceID)
  async function main () {
    try {
      await BleClient.initialize()

      await BleClient.connect(deviceID)
      // console.error('connected to ' + name + ' at ' + deviceID)

      await BleClient.startNotifications(
        deviceID,
        suuid,
        cuuid,
        val => {
          console.log(
            'response at cuuid is ' + val
          )
          handleBLE(val, name)
        }
      )
    } catch (error) {
      console.error('Failed to start BLE notifications. ' + error)
    }
    function handleBLE (value, name) {
      const decoded = decodeData(value, name) // there's a good reason for not passing name first - if it gets left off, it should handle it in a default way, not an error.
      // console.error('decoded: ' + decoded)
      dispatch('addActiveData', decoded)
    }
  }
  main()
}

async function bleRead (name, cName = 'read') {
  const deviceID = getID(name)
  const suuid = getUUID(name)
  const cuuid = getUUID(name, cName)
  async function main () {
    try {
      await BleClient.read(deviceID, suuid, cuuid).then((res) => {
        console.error('BLERead Resulet is: ' + res)
      })
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
  // console.error('device list: ' + store.state.activeDevices)
  const id = store.state.activeDevices[name]
  // console.error('Getting ID of ' + name + ', saw ' + id)
  return id
}

export { bleInit, bleServe, getID, bleStop, bleDC, bleStart, getUUID, bleScan, bleRead }
