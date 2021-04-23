<template>
  <v-row>
      <v-col>
        <v-card elevation="10" outlined>
          <v-card-title>
            <h3>{{this.data.nickname}}</h3>
          </v-card-title>
          <v-card-text>
            <h4>{{this.data.date}}</h4>
            <h4>ID: {{this.data.uuid}}</h4>
          </v-card-text>
          <LineChart class="chart-sm" :chartData="this.shotData"/>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
import LineChart from './LineChart.js'
export default {
  name: 'shot-card',
  props: ['data'],
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
  methods: {
    fillShotData () {
      this.shotData = {
        labels: this.data.data[1],
        datasets: [
          {
            label: 'pressure (bar)',
            borderColor: this.getAccent,
            pointBackgroundColor: 'dark',
            borderWidth: 2,
            pointRadius: 1,
            pointBorderColor: this.getAccent,
            backgroundColor: '#aaaaaa11',
            data: this.data.data[0]
          }
        ]
      }
    }
  },
  computed: {
    getAccent () {
      return this.$store.state.accent
    }
  }
}
</script>
<style scoped>
.chart-sm {
  height: 20vh;
}
</style>
