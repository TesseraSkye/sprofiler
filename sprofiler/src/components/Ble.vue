<template>
  <v-card outlined elevation="10">
    <v-card-title>Bluetooth {{ this.btActive }}</v-card-title>
    <v-card-text v-if="this.isDebug"><h4>active devices:</h4></v-card-text>
    <v-card-text :key='device' v-for="device in this.getDevices">{{device}}</v-card-text>
    <v-card-actions>
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn :color="$parent.getAccent" block v-bind="attrs" v-on="on">Pair a device</v-btn>
        </template>
        <v-list elevation="10" outlined :color="$parent.getAccent + ' darken-2'">
            <v-list-item :key="family" v-for="family in this.getDeviceFamilies">
              <v-list-item-title>{{ family }}</v-list-item-title>
            </v-list-item>
          </v-list>
      </v-menu>
    </v-card-actions>
    <!-- <v-menu offset-y value="">
        <v-list>
          <v-list-item :key="family" v-for="family in this.getDeviceFamilies">
            <v-list-item-title>{{ family }}</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-menu> -->
    <v-fade-transition>
    <v-overlay absolute  v-if="this.connectionOverlay">
    </v-overlay>
    </v-fade-transition>
  </v-card>

</template>

<script>
import { bleInit, bleServe, bleDC } from './bleHandlers.js'

export default {
  name: 'ble',
  data () {
    return {
      connectionOverlay: false
    }
  },
  computed: {
    getAccent () {
      return this.$store.state.accent
    },
    btActive () {
      if (this.getDevices) {
        return 'data found!'
      } else {
        return 'inactive.'
      }
    },
    isDebug () {
      return this.$store.state.debug
    },
    getDevices () {
      return this.$store.state.activeDevices
    },
    getDeviceFamilies () {
      return this.$store.state.deviceFamilies
    }
  },
  methods: {
    init () {
      bleInit()
    },
    serve (device = 'sprofiler') {
      bleServe(device)
    },
    disconnect (name) {
      bleDC(name)
      if (name) { this.$store.dispatch('removeData', ['activeDevices', [name]]) } else { this.$store.dispatch('setData', ['activeDevices', {}]) } // if no name, dc all
    },
    getID (name) { // checks for connected at name. (e.g. 'acaia')
      return this.$store.state.activeDevices[name]
    },
    setConOverlay (status) {
      this.connectionOverlay = status
    }
  }
}

</script>
