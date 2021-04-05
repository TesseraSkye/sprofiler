<script>
import { Line } from 'vue-chartjs'
import 'chartjs-plugin-streaming'

export default {
  extends: Line,
  mounted () {
    this.renderChart({
      datasets: [{
        label: 'Dataset 1',
        borderColor: '#a8f',
        backgroundColor: '#fad',
        innerGlowWidth: 100,
        innerGlowColor: '#0ff',
        lineTension: 0.5
      }]
    }, {
      scales: {
        xAxes: [{
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
      }
    })
  }
}
</script>
