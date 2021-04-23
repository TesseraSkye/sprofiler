<template>
  <v-card outlined elevation="10">
    <v-card-text>
      <h2>BLE Options:</h2>
    </v-card-text>
    <v-card-text>
      <h5>Device ID: {{this.getID}}</h5>
    </v-card-text>
    <v-card-actions>
    <v-btn @click='init()'>
      Start BLE
    </v-btn>
    <v-btn @click='serve()' :disabled='!this.getID'>
      Connect and Serve
    </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import { bleInit, bleServe } from './bleHandlers.js'

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
    }
  }
}

</script>
