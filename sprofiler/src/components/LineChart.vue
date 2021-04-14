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
            xAxes: [ {
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
    mounted () {
      this.renderChart({
        datasets: [
          {
            label: 'pressure (bar)',
            borderColor: '#249EBF',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: 'transparent'
          }
        ]
      }, this.options)
    }
  }
</script>
