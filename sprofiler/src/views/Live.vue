<template>
  <v-container>
    <v-row v-if="(!this.getID)">
      <v-col>
        <v-card elevation="2">
          <v-card-title>
            <h1>Hey!</h1>
          </v-card-title>
          <v-card-text>
            <h3>To use the profiling feature, you'll need to connect to your Sprofiler in the settings tab.</h3>
          </v-card-text>
          <v-card-actions>
            <v-btn to='/settings'>
              Take me there ->
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="this.getID || this.isDebug">
      <v-btn :disabled='!this.hasPressureData' :color="this.getAccent" block class="mb-2" to="/save">{{this.isWaiting}}</v-btn>
      <br>
      <v-col cols=12>
        <line-chart :chart-data='activePressureArray' :key='rerenderKey + 1' class="chart-lg d-flex d-sm-none"/>
        <line-chart :chart-data='activePressureArray' :key='rerenderKey' class="chart-md d-none d-sm-flex"/>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="this.getID || this.isDebug">
      <v-col>
        <v-btn @click="this.resetPressure" :disabled='!this.hasPressureData' color="red" block>Clear</v-btn>
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
      activePressureArray: {}
    }
  },
  mounted () {
    if (this.getID) { this.init() }
  },
  methods: {
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
      this.$store.dispatch('putData', ['pressureArray', [[], []]])
      setTimeout(() => { this.$router.push('/') }, 50)
    },
    rerender () {
      this.rerenderKey += 1
      if (this.rerenderKey > 50) { this.rerenderKey = 0 }
    },
    fillChart () {
      this.activePressureArray = {
        labels: this.getLabels,
        datasets: [
          {
            label: 'pressure (bar)',
            borderColor: this.getAccent,
            pointBackgroundColor: 'dark',
            borderWidth: 2,
            pointRadius: 1,
            pointBorderColor: this.getAccent,
            backgroundColor: '#aaaaaa11',
            data: this.getPressureData
          }
        ]
      }
    },
    forceRerender () {
      setInterval(() => { this.rerender() }, 200)
    }
  },
  computed: {
    isDebug () {
      return this.$store.state.debug
    },
    isWaiting () {
      if (this.hasPressureData) {
        return 'SAVE'
      } else { return 'waiting for data...' }
    },
    getAccent () {
      return this.$store.state.accent
    },
    getPressureData () {
      return this.$store.state.pressureArray[0]
    },
    getLabels () {
      return this.$store.state.pressureArray[1]
    },
    getID () {
      return this.$store.state.deviceID
    },
    hasPressureData () {
      return this.$store.state.pressureArray[0][0]
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
