<template>
  <v-container>
    <v-row v-if="(!this.isActive)">
      <v-col>
        <v-card elevation="2">
          <v-card-title>
            <h1>Hey!</h1>
          </v-card-title>
          <v-card-text>
            <h3>To use the live data feature, you'll need to connect to a device in the settings tab.</h3>
          </v-card-text>
          <v-card-actions>
            <v-btn to='/settings'>
              Take me there ->
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="this.isActive || this.isDebug">
      <v-btn :disabled='!this.hasActiveData' :color="this.getAccent" block class="mb-2" to="/save">{{this.hasActiveData ? "Save" : "Waiting for data..."}}</v-btn>
      <br>
      <v-col cols=12>
        <line-chart :chart-data='chartData' :key='rerenderKey + 5' class="chart-lg d-flex d-sm-none"/>
        <line-chart :chart-data='chartData' :key='rerenderKey' class="chart-md d-none d-sm-flex"/>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="this.isActive || this.isDebug">
      <v-col>
        <v-btn @click="this.resetActiveData" :disabled='!this.hasActiveData' color="red" block>Clear</v-btn>
        <br>
        <br>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import LineChart from '../components/LineChart.js'
import { bleServe, bleStop } from '../components/bleHandlers.js'

export default {
  name: 'live',
  components: {
    LineChart
  },
  data () {
    return {
      rerenderKey: 0,
      activeData: {},
      chartData: {}
    }
  },
  mounted () {
    if (this.isConnected) { this.init() }
  },
  methods: {
    isConnected (device = 'sprofiler') { // defaults to sprofiler, if called with device param filled, checks for connected device by that name. (e.g. acaia, etc)
      return this.$store.state.activeDevices[device]
    },
    init () {
      this.fillChart()
      this.forceRerender()
      this.serveBLE()
    },
    serveBLE () {
      this.forceRerender()
      bleServe()
    },
    stopBLE () {
      bleStop()
    },
    resetPressure () {
      this.$store.dispatch('setData', ['activeData', {}])
      this.$store.dispatch('setData', ['overlayUUID', ''])
      setTimeout(() => { this.$router.push('/') }, 50)
    },
    rerender () {
      this.rerenderKey += 1
      this.chartData.labels = this.getLabels // potential bug fix for chart overlap issues
      if (this.rerenderKey > 50) { this.rerenderKey = 0 }
    },
    fillChart () { // parametrically create new datasets & charts based on connected devices
      this.chartData = {
        labels: this.getLabels,
        datasets: [
          // {
          //   label: 'Active Pressure',
          //   borderColor: this.getAccent,
          //   pointBackgroundColor: 'dark',
          //   borderWidth: 2,
          //   pointRadius: 0,
          //   pointBorderColor: this.getAccent,
          //   backgroundColor: '#aaaaaa11',
          //   data: this.getActiveData.pressure,
          //   yAxisID: 'pressure'
          // }
        ]
      }

      // build a slot for each device that's registered. If it doesn't have data, it won't show up anyway.

      for(device in this.getActiveDevices) {
        let builtData = {
          //   label: 'Active Pressure',
          //   borderColor: this.getAccent,
          //   pointBackgroundColor: 'dark',
          //   borderWidth: 2,
          //   pointRadius: 0,
          //   pointBorderColor: this.getAccent,
          //   backgroundColor: '#aaaaaa11',
          //   data: this.getActiveData.pressure,
          //   yAxisID: 'pressure'
        }
        this.chartData.datasets.push()
      }
    },
    forceRerender () {
      setInterval(() => { this.rerender() }, 200)
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
    getPressureData () {
      return this.$store.state.Data[0]
    },
    getLabelData () {
      return this.$store.state.Data[1]
    },
    getLabels () {
      // if (this.getOverlayData[1]) {
      const comp = this.getOverlayData[1].length > this.getLabelData.length
      if (comp) {
        return this.getOverlayData[1]
      } else { return this.getLabelData }
    },
    hasActiveData () {
      return !!this.$store.state.activeData.data // !! casts return as a bool
    },
    getActiveDevices () {
      return this.$store.state.activeDevices
    }
  }
}

</script>
<style>
/* chart styling */
.chart-lg {
  height: 75vh;
}
.chart-md {
  height: 50vh;
}
.chart-sm {
  height: 30vh;
  width: 90vw;
}
</style>
