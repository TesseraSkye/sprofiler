<template>
  <v-card outlined elevation="10">
    <v-card-text>
      <h2>Bluetooth Settings:</h2>
    </v-card-text>
    <v-card-actions>
    <v-btn @click='init()'>
      Connect
    </v-btn>
    <v-btn @click='disconnect()' :disabled='!this.getID'>
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
    getID () {
      return this.$store.state.deviceID
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
      this.$store.dispatch('putData', ['deviceID', 0])
    }
  }
}

</script>
