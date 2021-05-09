import { BleClient } from '@capacitor-community/bluetooth-le'
import store from '../store/index.js'

import { decodeData } from './dataHandlers.js'
import * as bleUUID from './bleUUID.json'

// uses a friendly name to lookup the family and name
function getData (name) {
  let data
  for (const family in bleUUID) {
    const d = bleUUID[family][name]
    if (d) { data = d; break }
  }
  return data
}

// data format [family, name, charName (optional)]
function getUUID (data) {
  const family = data[0]
  const name = data[1]
  const charName = data[2] || ''
  const device = bleUUID[family][name]

  // if charName, assume lookign for characteristic uuid, returns cUUID, error returns ""
  // if no char name, reurn service uuid, error returns ""
  return ((charName ? (device[charName] ? device[charName] : '') : (device.sUUID ? device.sUUID : ''))) // weird if / else shorthand
}

// async ble stuff
// everything runs on a JSON LUT, so all you have to pass is the family and name as an array,
// and in some cases, the characteristic you want to access

async function bleInit (name) {
  const data = getData(name)
  const serviceUUID = getUUID(data)
  const dispatch = store.dispatch
  async function main () {
    try {
      await BleClient.initialize()

      const device = await BleClient.requestDevice({
        services: [serviceUUID]
      })

      dispatch('addData', ['activeDevices', [data[1], device.deviceId]]) // adds the name but not uuid or dID data, as that can be looked up.
    } catch (error) {
      console.error(error)
    }
  }
  main()
}
async function bleStart () {
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
  const data = getData(name)
  const serviceUUID = getUUID(data)
  const characteristicUUID = getUUID([data[0], data[1], 'read']) // get cUUID at 'read'
  const deviceID = isActive(data[1])
  const dispatch = store.dispatch
  console.log(deviceID)
  async function main () {
    try {
      await BleClient.initialize()

      await BleClient.connect(deviceID)
      console.log('connected to device', deviceID)

      await BleClient.startNotifications(
        deviceID,
        serviceUUID,
        characteristicUUID,
        value => {
          console.log(
            'characteristic val: ' + value
          )
          btDataHandler(value, name)
        }
      )
    } catch (error) {
      console.error(error)
    }
    function btDataHandler (value, name) {
      // let out = value.getUint32(0, true) // uses little endians
      // out = out / 1000
      console.log(value)
      const decoded = decodeData(value, name) // [value, type, name]
      dispatch('addActiveData', decoded)
    }
  }
  main()
}

async function bleStop (deviceID, serviceUUID, characteristicUUID) {
  async function main () {
    try {
      await BleClient.stopNotifications(
        deviceID,
        serviceUUID,
        characteristicUUID
      )
    } catch (error) {
      console.error(error)
    }
  }
  main()
}

async function bleDC (deviceID) {
  async function main () {
    try {
      await BleClient.disconnect(deviceID)
      console.log('disActive from device' + deviceID)
    } catch (error) {
      console.error(error)
    }
  }
  main()
}

function isActive (device = 'sprofiler') { // defaults to sprofiler, if called with device param filled, checks for connected device by that name. (e.g. scale)
  return this.$store.state.activeDevices[device]
}

export { bleInit, bleServe, isActive, bleStop, bleDC, bleStart, getUUID }
