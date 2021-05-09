<template>
  <v-card outlined elevation="10">
    <v-card-text>
      <h2>Bluetooth is {{ this.btActive }}</h2>
    </v-card-text>
    <v-card-actions>
    <v-btn @click='init()' v-if="!this.getID" block :color="this.getAccent">
      Connect
    </v-btn>
    <v-btn @click='disconnect()' v-if="this.getID" block color="grey">
      Disconnect
    </v-btn>
    <!-- <v-btn @click='serve()' :disabled='!this.getID'>
      Connect and Serve
    </v-btn> -->
    </v-card-actions>
  </v-card>

</template>

<script>
import { bleInit, bleServe, bleDC } from './bleHandlers.js'

export default {
  name: 'ble',
  computed: {
    getAccent () {
      return this.$store.state.accent
    },
    btActive () {
      if (this.getID) {
        return 'connected!'
      } else {
        return 'disActive.'
      }
    }
  },
  methods: {
    init () {
      bleInit()
    },
    serve () {
      bleServe()
    },
    disconnect () {
      bleDC()
      this.$store.dispatch('setData', ['deviceID', 0])
    },
    isActive (device = 'sprofiler') { // defaults to sprofiler, if called with device param filled, checks for connected device by that name. (e.g. scale)
      return this.$store.state.activeDevices[device]
    }
  }
}

</script>
