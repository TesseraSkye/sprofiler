import { BleClient } from '@capacitor-community/bluetooth-le'
import store from '../store/index.js'

const sproService = 'd43d1e53-4fb6-4907-9f4e-1237e5a39971'
const pressureChar = '50739418-766d-46f5-9670-f5ef11392f3b'

async function bleInit () {
  const dispatch = store.dispatch
  async function main () {
    try {
      await BleClient.initialize()

      const device = await BleClient.requestDevice({
        services: [sproService]
      })
      console.log(JSON.stringify(device))
      dispatch('putData', ['deviceID', device.deviceId])
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
async function bleServe () {
  const dispatch = store.dispatch
  const deviceID = getDeviceID()
  console.log(deviceID)
  async function main () {
    try {
      await BleClient.initialize()

      await BleClient.connect(deviceID)
      console.log('connected to device', deviceID)

      await BleClient.startNotifications(
        deviceID,
        sproService,
        pressureChar,
        value => {
          console.log('current pressure: ' + BTDataHandler(value))
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

async function bleStop () {
  const deviceID = getDeviceID()
  async function main () {
    try {
      await BleClient.stopNotifications(
        deviceID,
        sproService,
        pressureChar
      )
    } catch (error) {
      console.error(error)
    }
  }
  main()
}

async function bleDC () {
  const deviceID = getDeviceID()
  async function main () {
    try {
      await BleClient.disconnect(deviceID)
      console.log('disconnected from device', deviceID)
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
