<script>
import { Line } from 'vue-chartjs'
import 'chartjs-plugin-streaming'

// import { Plugins } from '@capacitor/core'

// const { Storage } = Plugins

// async function getAccentStorage () {
//   const ret = await Storage.get({ key: 'accent' })
//   const accent = JSON.parse(ret.value)
//   return accent
// }

export default {
  extends: Line,
  props: ['color', 'pressure'],
  computed: {

  },

  mounted () {
    this.renderChart({
      datasets: [
        {
          label: 'pressure (bar)',
          borderColor: this.color,
          pointBackgroundColor: 'dark',
          borderWidth: 2,
          pointBorderColor: this.color,
          backgroundColor: '#aaaaaa11'
        }
      ]
    }, this.options)
  },

  data () {
    return {
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            },
            type: 'realtime',
            realtime: {
              onRefresh: (chart) => {
                chart.data.datasets.forEach((dataset) => {
                  dataset.data.push({
                    x: Date.now(),
                    y: this.pressure
                  })
                })
              },
              delay: 2000
            }
          }]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>
