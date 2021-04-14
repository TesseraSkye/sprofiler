<script>
import { Line } from 'vue-chartjs'
import 'chartjs-plugin-streaming'

export default {
  extends: Line,
  props: {
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
              onRefresh: function (chart) {
                chart.data.datasets.forEach(function (dataset) {
                  dataset.data.push({
                    x: Date.now(),
                    y: Math.random()
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
  },

  computed: {
    getAccent () {
      this.$store.dispatch('getAccent')
      return this.$store.state.accent
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
  }
}
</script>
