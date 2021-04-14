<template>
  <v-container>
    <v-row >
      <v-col>
        <line-chart class="chart-lg my-4"/>
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

<style scoped>
.chart-md {
  height: 86vh;
}
.chart-lg {
  height: 76vh;
}
</style>
