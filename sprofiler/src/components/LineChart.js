import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['data'],
  data: () => ({
    options: {
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}
