<template>
  <v-card outlined elevation="10">
    <v-card-title>Bluetooth {{ this.btActive }}</v-card-title>
    <v-card-text>active devices:</v-card-text>
    <v-card-text :key='device' v-for="device in this.getID">{{device}}</v-card-text>
    <v-card-actions>
      <v-btn :v-model="bleSettings" >Connection Options</v-btn>
      <v-fade-transition>
        <v-overlay>
          <v-btn>pair profiler</v-btn>
          <v-btn disabled>pair scale</v-btn>
          <v-btn disabled>pair endpoint</v-btn>
        </v-overlay>
      </v-fade-transition>
    <v-btn @click="init('sprofiler')" v-if="!this.getID" block :color="this.getAccent">
      <!-- switch when scale! -->
      connect a profiler
    </v-btn>
    <v-btn @click='disconnect()' v-if="this.getID" block color="grey">
      clear active devices
    </v-btn>
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
        return 'data found!'
      } else {
        return 'inactive.'
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
    disconnect (name) {
      bleDC(name)
      if(name) { this.$store.dispatch('removeData', ['activeDevices', [name]]) } else { this.$store.dispatch('setData', ['activeDevices', {}])} // if no name, dc all
    },
    getID (name) { // checks for connected at name. (e.g. 'acaia')
      const aD = this.$store.state.activeDevices
      return name ? ad[name] : ad // can be used as "are there active devices" with truthyness
    }
  }
}

</script>
