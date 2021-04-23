<template>
  <v-row>
      <v-col>
        <v-card elevation="10" outlined>
          <v-card-title>
            <h3>{{this.data.nickname}}</h3>
          </v-card-title>
          <v-rating
          class="ml-4"
            :color="this.getAccent"
            dense
            background-color="#aaa"
            readonly
            hover
            length="5"
            :value="this.data.raiting"
          />
          <v-card-text>
            <h4>Note: {{this.data.notes}}</h4>
            <h4>Pulled on {{this.data.date}}</h4>
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
