<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Save your shot!</h1>
        <v-card elevation="10" outlined class="my-2">
          <LineChart class="chart-sm mt-2 mr-1" :chartData="this.shotData" />
        </v-card>
        <v-card elevation="10" outlined class="my-2">

          <v-form class="mx-2" ref="form">
            <v-text-field
              v-model="name"
              :counter="50"
              label="Nickname"
              required
            />
            <v-rating
            v-model="rating"
            class="mb-2"
            :color="this.getAccent"
            large
            half-increments
            background-color="#aaa"
            hover
            length="5"
          />
            <v-textarea v-model="notes" no-resize height="120" label="Notes"/>
            <v-btn class="my-2" @click="submit" large color="green" block>submit</v-btn>
            <br>
            <br>
            <br>
            <v-btn class="my-2" @click="clear" color="red" block>clear</v-btn>
          </v-form>
        </v-card>
        <br>
        <br>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// {
//   nickname: 'Dummy shot',
//   date: '04/22/21 : 11:07:30',
//   uuid: 'a7d9g7afdsg6j',
//   rating: 4.5,
//   favorite: false,
//   notes: 'It was pretty ok',
//   data: [[0, 0, 1, 2, 4, 6, 9, 5, 4, 3, 1, 1], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]
// }

import LineChart from '../components/LineChart.js'
export default {
  name: 'save',
  components: {
    LineChart
  },
  data () {
    return {
      name: '',
      rating: 0,
      notes: '',
      shotData: {}
    }
  },
  mounted () {
    this.fillShotData()
  },
  computed: {
    getAccent () {
      return this.$store.state.accent
    },
    getPressureArray () {
      return this.$store.state.pressureArray
    },
    getPressureData () {
      return this.$store.state.pressureArray[0]
    },
    getLabels () {
      return this.$store.state.pressureArray[1]
    },
    getDate () {
      const now = new Date()
      return now.toLocaleString('default', { month: 'short' }) + ' ' + now.getDay() + ', ' + now.getFullYear() + ' at ' + now.getHours()
    }
  },
  methods: {
    clear () {
      this.$store.dispatch('putData', ['pressureArray', [[], []]])
      this.$router.push('/')
    },
    submit () {
      console.log('sub')
      this.$store.dispatch('saveShot', {
        name: this.name,
        date: this.getDate,
        uuid: Date.now(),
        rating: this.rating,
        favourite: (this.rating >= 4.5),
        notes: this.notes,
        data: this.getPressureArray
      })
      setTimeout(() => { this.clear() }, 400)
      setTimeout(() => { this.$router.push('/history') }, 600)
    },

    fillShotData () {
      this.shotData = {
        labels: this.getLabels,
        datasets: [
          {
            label: 'pressure (bar)',
            borderColor: this.getAccent,
            pointBackgroundColor: 'dark',
            borderWidth: 2,
            pointRadius: 1,
            pointBorderColor: this.getAccent,
            backgroundColor: '#aaaaaa11',
            data: this.getPressureData
          }
        ]
      }
    }
  }
}
</script>
