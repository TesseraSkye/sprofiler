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
            <v-btn large block class="my-4" :color="this.accent" to='/settings'>
              Take me there ->
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="this.hasActiveDevices || this.isDebug">
      <v-col cols=12>
        <v-card @click="toggleState('overlay')" shaped elevation="10" color="#262626" class="pa-2">
            <chart-handler :sleek="this.uiData.saveDialog" :class="[(this.uiData.overlay || !this.hasActiveData) ? 'blur' : '']" :live="true" :data='this.activeData' :overlayData="this.overlayData" :size="[['lg', 'md'], ['', '-sm']]"/>
          <v-fade-transition>
            <v-overlay
              class="zh-90"
              v-if="this.uiData.overlay || !this.hasActiveData"
              absolute
              opacity=0.4
              :color="`hsl(${this.accentRaw[0]}, ${this.accentRaw[1] * 0}%, ${this.accentRaw[2] * 0.5}%)`">
              <v-btn large :disabled="!this.hasActiveData" block class="mx-2 my-4" :color="this.accent" to="/save-shot">{{this.hasActiveData ? "Save" : "Waiting for data..."}}</v-btn>
              <br>
              <v-btn large class="mx-2 my-4" block v-if="this.hasActiveData" :color="this.accent" @click="toggleState('saveDialog')">Toggle data view</v-btn>
              <br>
              <v-btn large @click="resetActiveData()" v-if="this.hasActiveData " block :disabled='!this.hasActiveData' class="mx-2 my-4" color="#262626">Clear</v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="this.hasActiveData || this.isDebug">
      <v-col>
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
      uiData: {
        overlay: false,
        saveDialog: false
      },
      showData: false
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
    overlayData () {
      const overlay = this.$store.state.shotHistory[this.overlayUUID] || {}
      // console.warn(overlay)
      return overlay
    },
    overlayUUID () {
      const data = this.$store.state.overlayUUID || 0 // this might cause issues, but shouldn't
      return data
    },
    isDebug () {
      return this.$store.state.debug
    },
    accent () {
      return this.$store.state.accent
    },
    accentRaw () {
      return this.$store.state.accentRaw
    },
    activeData () {
      return this.$store.state.activeData
    },
    hasActiveData () {
      return (!(this.$store.state.activeData && Object.keys(this.$store.state.activeData).length === 0 && this.$store.state.activeData.constructor === Object)) // is it truthy, is 0 length, and is an object
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
    },
    toggleState (data) {
      // console.log(this.uiData[data])
      if (this.uiData[data] === true) { this.uiData[data] = false } else { this.uiData[data] = true }
    }
  }
}

</script>

<style scoped>
.blur {
  filter: blur(2px);
}
.v-card--link:focus::before {
  opacity: 0;
}
</style>
