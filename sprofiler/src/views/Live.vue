<template>
  <v-container>
    <v-row >
      <v-btn @click='this.forceReRender'>rerender</v-btn>
      <v-col>
        <line-chart :color="getAccent" :key='reRender' :pressure="getPressure" class="chart-lg my-4"/>
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
      reRender: 0
    }
  },
  computed: {
    getAccent () {
      return this.$store.state.accent
    },
    getPressure () {
      return this.$store.state.pressure
    }
  },
  methods: {
    forceReRender () {
      this.reRender += 1
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
