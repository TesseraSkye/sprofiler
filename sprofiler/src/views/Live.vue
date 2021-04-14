<template>
  <v-container class = 'vh-100'>
    <v-row>
      <v-col class="text-center">
        <h1>Live Pressure Data</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col flex>
        <line-chart class="cht"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import LineChart from '../components/LineChart.vue'

export default {
  name: 'live',
  components: {
    LineChart
  },
  data () {
    return {
    }
  }
}
</script>
