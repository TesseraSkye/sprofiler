<template>
  <v-card outlined elevation="10">
    <v-card-text>
      <h2>BLE Options:</h2>
    </v-card-text>
    <v-card-actions>
    <v-btn @click='bleInit()'>
      Start BLE
    </v-btn>
    <v-btn @click='bleServe()' :disabled='!getDeviceID'>
      Connect and Serve
    </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import { BleClient } from '@capacitor-community/bluetooth-le'

const sproService = 'd43d1e53-4fb6-4907-9f4e-1237e5a39971'
const pressureChar = '50739418-766d-46f5-9670-f5ef11392f3b'
export default {
  name: 'ble',
  computed: {
    getDeviceID () {
      return this.$store.state.bleSettings.deviceID
    }
  },
  methods: {
    bleInit () {
      async function main () {
        try {
          await BleClient.initialize()

          const device = await BleClient.requestDevice({
            services: [sproService]
          })
          this.$store.dispatch('setDeviceID', device.deviceId)
        } catch (error) {
          console.error(error)
        }
      }
      main()
    },
    bleServe () {
      const deviceID = this.getDeviceID()
      async function main () {
        try {
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

          setTimeout(async () => {
            await BleClient.stopNotifications(
              deviceID,
              sproService,
              pressureChar
            )
            await BleClient.disconnect(deviceID)
            console.log('disconnected from device', deviceID)
          }, 10000)
        } catch (error) {
          console.error(error)
        }
        function BTDataHandler (value) {
          return value.getUint32()
        }
      }
      main()
    }
  }
}

</script>
