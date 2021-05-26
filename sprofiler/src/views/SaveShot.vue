<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Save your shot!</h1>
        <v-card elevation="10" outlined class="my-2">
          <chart-handler :data='this.activeData'/>
        </v-card>
        <v-card elevation="10" outlined class="my-2">

          <v-form class="mx-2" ref="form" @submit.prevent="submit">
            <v-text-field
              v-model="activeShot.name"
              :counter="50"
              label="Nickname"
              required
            />
            <v-rating
            v-model="activeShot.rating"
            class="mb-2"
            :color="this.getAccent"
            large
            half-increments
            background-color="#aaa"
            hover
            length="5"
          />
            <v-textarea v-model="activeShot.comments" no-resize height="120" label="Comments"/>
            <v-btn class="my-2" @click="submit" large color="green" block>submit</v-btn>
            <br>
            <br>
            <br>
            <v-btn class="my-2" @click="clear; setTimeout(() => { this.$router.push('/') }, 250)" color="red" block>clear</v-btn>
          </v-form>
        </v-card>
        <br>
        <br>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// 12487893252: {
//   name: 'Dummy shot',
//   uuid: '12487893252', // uuid is dateOBJ.getTime()
//   dateOBJ: {}, // this is a real, actual date object
//   rating: 4.5,
//   favorite: false,
//   comments: 'It was pretty ok',
//   data: {
//     profiler: {
//       sprofiler: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 1}, {x: 3, y: 2}, {x: 4, y: 4}, {x: 5, y: 6}, {x: 6, y: 9}, {x: 7, y: 5}, {x: 8, y: 4}, {x:9 , y: 3}, {x: 10, y: 1), {x:11 , y: 1}]
//     },
//     scale: {
//       acaia: [{x: 0, y: 0.0, {x: 1, y: 0.2}, {x: 2, y: 5.1}, {x: 3, y: 12.1}, {x: 4, y: 15.7}, {x: 5, y: 19.5}, {x: 6, y: 24.1}, {x: 7, y: 28.5}, {x: 8, y: 31.2}, {x: 9, y: 32.8}, {x: 10, y: 35.3}, {x: 11, y: 37.7} ]
//     }
//   }
// }

import ChartHandler from '../components/ChartHandler.vue'
export default {
  name: 'save-shot',
  components: {
    ChartHandler
  },
  data () {
    return {
      activeShot: {
        // name: '',
        // uuid: '',
        // dateObj: {},
        // rating: null,
        // favorite: null,
        // comments: '',
        // data: {
        //   family: {
        //   device: []
        //   // }
        // }
      }
    }
  },
  mounted () {
    this.fillShotData()
  },
  computed: {
    getAccent () {
      return this.$store.state.accent
    },
    activeData () {
      return this.$store.state.activeData
    }
  },
  methods: {
    fillShotData () {
      this.activeShot = this.activeData
    },
    clear () {
      this.$store.dispatch('setData', ['activeData', {}])
      this.$store.dispatch('setData', ['overlayUUID', ''])
    },
    submit () {
      this.$store.dispatch('addData', ['shotHistory', [this.activeData.uuid, {
        name: this.name,
        uuid: this.activeShot.uuid,
        dateOBJ: this.activeShot.dateOBJ,
        date: this.activeShot.dateOBJ.toLocaleString(),
        rating: this.rating,
        favorite: (this.rating >= 4.5),
        notes: this.notes,
        data: this.activeShot.data
      }]])
      setTimeout(() => { this.clear() }, 200)
      setTimeout(() => { this.$router.push('/library') }, 220)
    }
  }
}
</script>
