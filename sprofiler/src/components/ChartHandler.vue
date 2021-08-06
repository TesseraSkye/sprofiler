<template>
  <v-row class="px-2">
    <v-col v-if="!this.live" cols=12>
      <line-chart :chartData='this.chartData' :options="this.chartOptions" :class="'chart-' + this.size[0][0]"/>
    </v-col>
    <v-col v-if="this.live" cols=12>
      <line-chart :chartData='this.chartData' :options="this.chartOptions" :key='rerenderKey' :class="'chart-' + this.size[0][1] + ' d' + this.size[1][0] + '-none ' + 'd' + this.size[1][1] + '-flex'"/>
      <line-chart :chartData='this.chartData' :options="this.chartOptions" :key='rerenderKey+5' :class="'chart-' + this.size[0][0] + ' d' + this.size[1][0] + '-flex' + ' d' + this.size[1][1] + '-none'"/>
    </v-col>
  </v-row>
</template>

<script>
import LineChart from './LineChart.js'

export default {
  props: {
    data: {},
    live: {
      default: false
    },
    size: {
      default: () => { return [['sm']] }
    },
    sleek: {
      default: false
    },
    overlayData: {
      default: false
    }
  },
  name: 'chart-handler',
  data: () => ({
    chartData: {}, // shouldn't need to have labels, as they are now included
    chartOptions: {},
    rerenderKey: 0
  }),
  components: {
    'line-chart': LineChart
  },
  mounted () {
    if (this.live) {
      this.forceRerender()
    } else {
      this.rerender()
    }
  },
  computed: {
    getRawAccent () {
      return this.$store.state.accentRaw || [0, 100, 50]
    }
  },
  methods: {
    rerender () {
      this.rerenderKey += 1
      if (this.rerenderKey > 50) { this.rerenderKey = 0 }
      this.chartData = this.rebuildData()[0]
      this.chartOptions = this.rebuildData()[1]
    },
    newTheme (count) {
      let mTheme = Array.from(this.getRawAccent, x => x)
      let _count = count * 30
      _count = (mTheme[0] + _count) % 360
      mTheme = [_count, this.getRawAccent[1], this.getRawAccent[2]]
      // console.warn(mTheme)
      return mTheme
    },
    forceRerender () {
      setInterval(() => { this.rerender() }, 200)
    },
    rebuildData () {
      let count = 0
      const rOptions = {
        // parsing: false,
        animation: null,
        layout: {
          padding: 12
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: []
        }
      }
      const sortedLabels = (this.data.labels ? this.data.labels : []).concat((this.overlayData.labels ? this.overlayData.labels : []))
      sortedLabels.sort((a, b) => a - b)
      const rData = {
        labels: sortedLabels,
        datasets: []
      }
      const sets = {}
      sets.activeData = this.data.data || {}
      if (Object.keys(this.overlayData).length !== 0 && this.overlayData.constructor === Object) { sets.overlayData = this.overlayData.data }
      // console.log(sets)
      for (const set in sets) {
        // console.error(this.data.data)
        for (const family in sets[set]) {
          // console.warn(sets[set][family])
          const dType = sets[set][family].axisID
          const dTypeUC = dType.charAt(0).toUpperCase() + dType.slice(1)
          // console.warn('y' + dTypeUC)
          rOptions.scales.yAxes.push({
            // type: 'linear',
            id: 'y' + dTypeUC,
            axis: 'y',
            position: 'right',
            display: !this.sleek
          })
          for (const device in sets[set][family]) {
            if (!(device === 'axisID')) {
              // console.warn(device)
              const cData = {
                label: '',
                borderColor: '',
                pointBackgroundColor: 'dark',
                borderWidth: 2,
                pointRadius: 0,
                pointBorderColor: '',
                backgroundColor: '#aaaaaa11',
                yAxisID: '',
                data: []
              }
              const newCol = this.newTheme(count)
              cData.label = device + ' (overlay)'
              cData.borderColor = `hsl(${newCol[0]}, ${newCol[1]}%, ${newCol[2]}%)`
              if (set === 'overlayData') { cData.borderColor = `hsl(${newCol[0]}, 10%, ${newCol[2]}%)` }
              cData.pointBorderColor = `hsl(${newCol[0]}, ${newCol[1]}%, ${newCol[2]}%)`
              if (set === 'overlayData') { cData.pointBorderColor = `hsl(${newCol[0]}, 10%, ${newCol[2]}%)` }
              cData.data = sets[set][family][device]
              cData.yAxisID = 'y' + dTypeUC
              rData.datasets.push(cData)
              count += 1
            }
          }
        }
      }
      if (count > 1) { rOptions.legend.display = true }
      if (this.size[0][0] === 'xs') { rOptions.legend.display = false }
      if (this.sleek) { rOptions.legend.display = false }
      return [rData, rOptions]
    }
  }
}
</script>
<style>
/* chart styling */
.chart-lg {
  height: 70vh;
}
.chart-md {
  height: 45vh;
}
.chart-sm {
  height: 30vh;
  width: 80vw;
}
.chart-xs {
  height: 15vh;
  width: 25vw;
}
</style>
