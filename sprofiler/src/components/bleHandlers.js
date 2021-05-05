import { BleClient } from '@capacitor-community/bluetooth-le'
import store from '../store/index.js'

const bleUUID = JSON.parse(require('./bleUUID.json'))

// data format [type, name, charName (optional)]
function getUUID (data) {
  const type = data[0]
  const name = data[1]
  const charName = data[2] || ''
  const device = bleUUID[type][name]

  // if charName, assume lookign for characteristic uuid, returns cUUID, error returns ""
  // if no char name, reurn service uuid, error returns ""
  return ((charName ? (device[charName] ? device[charName] : '') : (device.sUUID ? device.sUUID : ''))) // weird if / else shorthand
}

// async ble stuff
// everything runs on a JSON LUT, so all you have to pass is the type and name as an array,
// and in some cases, the characteristic you want to access

async function bleInit (data) {
  const serviceUUID = getUUID([data[0], data[1]]) // recast to new array to prevent characteristic from muddying result
  const characteristicUUID = getUUID([data[0], data[1]], 'read') // get cUUID at 'read'
  const dispatch = store.dispatch
  async function main () {
    try {
      await BleClient.initialize()

      const device = await BleClient.requestDevice({
        services: [serviceUUID]
      })

      dispatch('addData', ['activeDevices', [data[1], device.deviceId ]]) // adds the name but not uuid or dID data, as that can be looked up.
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
async function bleServe (data) {
  const serviceUUID = getUUID([data[0], data[1]]) // recast to new array to prevent characteristic from muddying result
  const characteristicUUID = getUUID([data[0], data[1]], 'read') // get cUUID at 'read'
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
          btDataHandler(name, value)
        }
      )
    } catch (error) {
      console.error(error)
    }
    function btDataHandler (value) {
      let out = value.getUint32(0, true) // uses little endians
      out = out / 1000
      console.log(out)
      dispatch('incrementTick')
      dispatch('appendRTPressure', out)
      return out
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

function isActive(device) { // defaults to sprofiler, if called with device param filled, checks for connected device by that name. (e.g. scale)
  const _device = (device ? device : 'sprofiler')
  return this.$store.state.activeDevices[_device]
}

export { bleInit, bleServe, isActive, bleStop, bleDC, bleStart, getUUID }
