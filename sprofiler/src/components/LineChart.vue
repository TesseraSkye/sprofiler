<script>
import { Line } from 'vue-chartjs'
import 'chartjs-plugin-streaming'

export default {
  extends: Line,
  props: {
  },
  computed: {
    getAccent () {
      this.$store.dispatch('getAccent')
      return this.$store.state.accent
    },
    getPressure () {
      return this.$store.state.pressure
    }
  },

  mounted () {
    this.renderChart({
      datasets: [
        {
          label: 'pressure (bar)',
          borderColor: this.getAccent,
          pointBackgroundColor: 'dark',
          borderWidth: 2,
          pointBorderColor: this.getAccent,
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
                    y: this.getPressure
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
