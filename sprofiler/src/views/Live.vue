<template>
  <v-container>
    <v-row >
      <v-col cols=12>
        <line-chart :chart-data='activePressureArray' :key='rerenderKey' class="chart-lg"/>
      </v-col>
      <v-col cols=12 align-self="center">
        <v-btn @click='this.forceRerender' class="mx-1">scan</v-btn>
        <v-btn @click='this.resetPressure' class="mx-1">reset</v-btn>
        <v-btn @click='this.serveBLE' :disabled='!this.getID' class="mx-1">Go!</v-btn>
        <v-btn @click='this.stopBLE' :disabled='!this.getID' class="mx-1">Stop</v-btn>
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
    this.fillChart()
  },
  methods: {
    serveBLE () {
      bleServe()
    },
    stopBLE () {
      bleStop()
    },
    resetPressure () {
      this.$store.dispatch('putData', ['pressureArray', [[0, 0], ['0', '0']]])
      this.rerender()
    },
    rerender () {
      this.rerenderKey += 1
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
    }
  }
}

</script>

<style scoped>
.chart-md {
  height: 86vh;
}
.chart-lg {
  height: 60vh;
}
</style>
