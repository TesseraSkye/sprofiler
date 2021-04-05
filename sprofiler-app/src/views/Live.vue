<template>
  <v-container>
    <line-chart/>
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
