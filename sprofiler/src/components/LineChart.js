import { Line, mixins } from 'vue-chartjs'
export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: [],
  data: () => ({
    options: {
      animation: null,
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
