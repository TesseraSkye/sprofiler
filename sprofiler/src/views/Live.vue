<template>
  <v-container>
    <v-row >
      <v-btn @click='this.forceReRender'>rerender</v-btn>
      <v-col>
        <line-chart :chart-data='activePressureArray' :key='reRender' class="chart-lg my-4"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import LineChart from '../components/LineChart.js'

export default {
  name: 'live',
  components: {
    LineChart
  },
  data () {
    return {
      reRender: 0,
      activePressureArray: null
    }
  },
  mounted () {
    this.fillChart()
  },
  methods: {
    fillChart () {
      this.activePressureArray = {
        labels: this.getLabels,
        datasets: [
          {
            label: 'pressure (bar)',
            borderColor: '#fff',
            pointBackgroundColor: 'dark',
            borderWidth: 2,
            pointBorderColor: '#fff',
            backgroundColor: '#aaaaaa11',
            data: this.getPressureData
          }
        ]
      }
    },
    forceReRender () {
      this.reRender += 1
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
    }
  }
}

</script>

<style scoped>
.chart-md {
  height: 86vh;
}
.chart-lg {
  height: 76vh;
}
</style>
