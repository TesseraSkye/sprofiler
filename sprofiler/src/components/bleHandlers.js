import { BleClient } from '@capacitor-community/bluetooth-le'
import store from '../store/index.js'

const bleUUID = JSON.parse(require('./blueUUID.json'))

async function bleInit (serviceUUID) {
  const dispatch = store.dispatch
  async function main () {
    try {
      await BleClient.initialize()

      const device = await BleClient.requestDevice({
        services: [serviceUUID]
      })
      console.log(JSON.stringify(device))
      dispatch('setData', ['deviceID', device.deviceId])
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
async function bleServe (deviceID, serviceUUID, characteristicUUID) {
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
            btDataHandler(value)
        }
      )
    } catch (error) {
      console.error(error)
    }
    function BTDataHandler (value) {
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
      console.log('disconnected from device' + deviceID)
    } catch (error) {
      console.error(error)
    }
  }
  main()
}

function getDeviceID () {
  console.log('fetching deviceID..')
  return store.state.deviceID
}

export { bleInit, bleServe, getDeviceID, bleStop, bleDC, bleStart }
