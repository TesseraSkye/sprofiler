// Functions specifically for interesting with the BLE package, drawn on by multiple classes.
// Switch for something else at some point?? Solid but too much obfuscation / under-the-hood sometimes...

// End up using console.error a lot throughout so it shows up better in debug logs

import { BleClient } from '@capacitor-community/bluetooth-le'
import store from '../store/index.js' // used for dispatch calls

import { decodeData } from './dataHandlers.js' // decoders n shit for incoming BLE. Probably should rewrite ESP-32-side BLE implementation so this isn't neccessary.
import * as _deviceConfig from './deviceConfig.json' // Config for family structure and other shit

const deviceConfig = _deviceConfig.default // aliasing out because JSON is stupid and adds an extra layer of bs when importing directly

// gets UUIDs from DC. If there isn't a CUUID alias provided, it just returns the SUUID. Ask for a CUUID by alias and it provides the full 128-bit CUUID
// data format (name, cuuid (optional))
function getUUID (name, cuuid = '') {
  // console.error('name - ' + name)
  // console.error(deviceConfig)
  const device = deviceConfig[name] || {
    suuid: 'NO DEVICE FOUND', // Shitty error handling
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
  console.error('initializing device ' + name)
  const suuid = await getUUID(name)
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
  await new Promise(resolve => setTimeout(resolve, 100))
  main()
}
async function bleScan () { // Looks for literally anything
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
async function bleServe (name) { // start up and init notifications on a specific characteristic
  const suuid = getUUID(name)
  // console.warn('suuid = ' + suuid)
  const cuuid = getUUID(name, 'read') // get cUUID at 'read', this will do for now
  const dispatch = store.dispatch
  if (!getID(name)) { bleInit(name) }
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log('Active Devices:' + JSON.stringify(store.state.activeDevices))
  const deviceID = getID(name)
  // console.warn('connecting to ' + name + ' at ' + deviceID)
  async function main () {
    try {
      await BleClient.initialize()

      await BleClient.connect(deviceID)
      // console.error('connected to ' + name + ' at ' + deviceID)

      // stupid bs to accomodate for the Decent Scale. I get why they did it, but there's gotta be a more elegant way to do it :cry:
      if (deviceConfig[name].initWrite) { await BleClient.write(deviceID, getUUID(name), getUUID(name, 'write'), deviceConfig[name].initWrite) } else {}
      await new Promise(resolve => setTimeout(resolve, 100)) // mmm yess delay yum
      if (deviceConfig[name].initWrite) { await BleClient.write(deviceID, getUUID(name), getUUID(name, 'write'), deviceConfig[name].initWrite) } else {}
      await new Promise(resolve => setTimeout(resolve, 100))
      await BleClient.startNotifications( // man I really fn hate the implementation of notifs in the library. It isn't as transparent as I'd like, and gives useless errors.
        deviceID,
        suuid,
        cuuid,
        val => {
          console.error(
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
  await new Promise(resolve => setTimeout(resolve, 100)) // We do a little waiting
  main()
}

async function bleRead (name, cName = 'read') { // one-off read a char for debug
  const deviceID = getID(name)
  const suuid = getUUID(name)
  const cuuid = getUUID(name, cName)
  console.error('dID = ' + deviceID + ', suuid = ' + suuid + ', cuuid = ' + cuuid)
  async function main () {
    try {
      await BleClient.read(deviceID, suuid, cuuid).then((res) => {
        console.error('BLERead Result at id ' + deviceID + ' is: ' + res)
      })
    } catch (error) {
      console.error(error)
    }
  }
  await new Promise(resolve => setTimeout(resolve, 100))
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

async function bleDC (name) { // literally never use this... I need to rethink my life..
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

export { bleInit, bleServe, getID, bleStop, bleDC, bleStart, getUUID, bleScan, bleRead } // It's a generic JS file so export all the stuff we want to use elsewhere
