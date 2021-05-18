<template>
  <v-row>
    <v-col cols=12>
      <line-chart :chart-data='chartData' :key='rerenderKey+(keyOffset ? keyOffset : 0)' :class="size ? size : 'chart-sm'"/>
    </v-col>
  </v-row>
</template>

<script>

    // data format
    // data: {
    //   profiler: {
    //     axisID: 'pressure',
    //     sprofiler: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 1}, {x: 3, y: 2}, {x: 4, y: 4}, {x: 5, y: 6}, {x: 6, y: 9}, {x: 7, y: 5}, {x: 8, y: 4}, {x:9 , y: 3}, {x: 10, y: 1}, {x:11 , y: 1}]
    //   },
    //   scale: {
    //     axisID: 'weight',
    //     acaia: [{x: 0, y: 0.0}, {x: 1, y: 0.2}, {x: 2, y: 5.1}, {x: 3, y: 12.1}, {x: 4, y: 15.7}, {x: 5, y: 19.5}, {x: 6, y: 24.1}, {x: 7, y: 28.5}, {x: 8, y: 31.2}, {x: 9, y: 32.8}, {x: 10, y: 35.3}, {x: 11, y: 37.7} ]
    //   }
    // }

import LineChart from './LineChart.js'

export default {
  props: ['data', 'live', 'size', 'keyOffset'],
  name: 'chart-handler',
  data: () => ({
    chartData: [], // shouldn't need to have labels, as they are now included
    rerenderKey: 0,
    rawTheme: []
  }),
  componets: {
    LineChart
  },
  mounted () {
    if (live) {
      this.forceRerender()
    }
    rawTheme = this.getRawAccent
  },
  computed: {
    getRawAccent () {
      return this.$store.state.accentRaw
    },
    rebuiltData () {
      let rData = []

      for (const family in data.data) {
        for (const device in family) {
          let cData = {
            label: '',
            borderColor: '',
            pointBackgroundColor: 'dark',
            borderWidth: 2,
            pointRadius: 0,
            pointBorderColor: '',
            backgroundColor: '#aaaaaa11',
            data: [],
            yAxisID: ''
          }
          const newCol = this.newTheme()
          cData[label] = device
          cData[borderColor] = newCol
          cData[pointBorderColor] = newCol
          cData[data] = family[device],
          cData[yAxisID] = family.axisID
          rData.push(cData)
        }
      }
      return rData
    }
  },
  methods: {
    rerender () {
      this.rerenderKey += 1
      if (this.rerenderKey > 50) { this.rerenderKey = 0 }
      this.chartData = rebuiltData
    },
    newTheme () {
      let mTheme = this.rawTheme.map(x => x)
      rawTheme[0] = (rawTheme[0] + 20) % 360
      return mTheme
    },
    forceRerender () {
      setInterval(() => { this.rerender() }, 200)
    } 
  }
}
</script>