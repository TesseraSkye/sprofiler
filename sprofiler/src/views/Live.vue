<template>
  <v-container>
    <v-row v-if="(!this.hasActiveDevices)" class="mt-2">
      <v-col>
        <v-card shaped color="#262626" elevation="10">
          <v-card-title>
            <h2>Hey!</h2>
          </v-card-title>
          <v-card-text>
            <h4>To use the live data feature, you'll need to connect to a device in the settings tab.</h4>
          </v-card-text>
          <v-card-actions class="px-4">
            <v-btn block class="my-4" :color="this.getAccent" to='/settings'>
              Take me there ->
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="this.hasActiveDevices || this.isDebug">
      <v-col cols=12>
        <v-btn :disabled='!this.hasActiveData' :color="this.getAccent" block class="mb-2" to="/save-shot">{{this.hasActiveData ? "Save" : "Waiting for data..."}}</v-btn>
        <!-- <br> -->
        <chart-handler :live="true" :data='this.activeData' :size="[['lg', 'md'], ['', '-sm']]"/>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="this.hasActiveData || this.isDebug">
      <v-col>
        <v-btn @click="this.resetActiveData" :disabled='!this.hasActiveData' color="red" block>Clear</v-btn>
        <br>
        <br>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import ChartHandler from '../components/ChartHandler.vue'
import { bleServe, bleStop } from '../components/bleHandlers.js'

export default {
  name: 'live',
  components: {
    ChartHandler
  },
  data () {
    return {
      saveDialog: false
    }
  },
  mounted () {
    if (this.hasActiveDevices) {
      for (const device in this.activeDevices) {
        console.error('starting ble at ' + device)
        setTimeout(() => { this.serveBLE(device) }, 200)
      }
    }
  },
  computed: {
    getOverlayData () {
      const overlay = this.$store.state.shotHistory[this.getOverlayUUID] || {
        data: [[], []]
      }
      return {
        pressure: overlay.data
      }
    },
    getOverlayUUID () {
      const data = this.$store.state.overlayUUID || 0 // this might cause issues, but shouldn't
      return data
    },
    isDebug () {
      return this.$store.state.debug
    },
    getAccent () {
      return this.$store.state.accent
    },
    activeData () {
      return this.$store.state.activeData
    },
    hasActiveData () {
      const ad = this.$store.state.activeData // !! casts return as a bool
      return (!(ad && Object.keys(ad).length === 0 && ad.constructor === Object)) // is it truthy, is 0 length, and is an object
    },
    hasActiveDevices () {
      const ad = this.$store.state.activeDevices // !! casts return as a bool
      return (!(ad && Object.keys(ad).length === 0 && ad.constructor === Object)) // is it truthy, is 0 length, and is an object
    },
    activeDevices () {
      const devices = this.$store.state.activeDevices
      // console.error('Active Devices = ' + devices)
      return devices
    }
  },
  methods: {
    serveBLE (name) {
      bleServe(name)
    },
    stopBLE (name) {
      bleStop(name)
    },
    resetActiveData () {
      this.$store.dispatch('setData', ['activeData', {}])
      this.$store.dispatch('setData', ['overlayUUID', ''])
      setTimeout(() => { this.$router.push('/') }, 50)
    }
  }
}

</script>
