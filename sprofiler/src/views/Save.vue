<template>
  <v-container>
    <v-row>
      <v-col>
        <LineChart :chartData="this.shotData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LineChart from '../components/LineChart.js'
export default {
  name: 'save',
  components: {
    LineChart
  },
  data () {
    return {
      shotData: {}
    }
  },
  mounted () {
    this.fillShotData()
  },
  computed: {
    getAccent () {
      return this.$store.state.accent
    },
    getChartData () {
      return this.$store.state.pressureArray[0]
    },
    getLabels () {
      return this.$store.state.pressureArray[1]
    }
  },
  methods: {
    fillShotData () {
      this.shotData = {
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
            data: this.getChartData
          }
        ]
      }
    }
  }
}
</script>
