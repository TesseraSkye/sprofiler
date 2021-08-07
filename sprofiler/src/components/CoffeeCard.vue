<template>
  <v-row>
    <v-col>
      <v-card @click="this.toggleOverlay" shaped elevation="10" color="#262626">
        <v-card-title><h3>{{this.data.name}}</h3></v-card-title>
        <v-divider class="mb-2" />
        <v-chip :class="[overlay ? 'blur' : '']" :key="i" v-for="i in this.data.tastingTags" class="ml-4 my-2" :color="accent" >{{i}}</v-chip>
        <v-rating
          :class="[overlay ? 'blur' : '']"
          v-if="this.data.rating"
          class="ml-4"
          :color="this.accent"
          dense
          background-color="#aaa"
          half-increments
          readonly
          hover
          length="5"
          :value="this.data.rating"
          />
        <v-card-text :class="[overlay ? 'blur' : '']">
          <h4>
            {{this.data.process ? this.data.process + ' process' : ''}}
            {{this.data.varietals ? multiFormat(this.data.varietals) : ''}}
            {{this.data.origins ? ' grown in ' + multiFormat(this.data.origins) : ''}}
            {{this.data.elevation ? 'at ' + this.data.elevation + ' masl': ''}}
          </h4>
          <br>
          <h4>Roasted by {{this.data.roaster}} {{(this.data.roastDate ? (' on ' + this.data.roastDate) : '')}}</h4>
        </v-card-text>
        <v-fade-transition>
          <v-overlay
            class="zh-90"
            v-if="this.overlay"
            absolute
            opacity=0.4
            :color="`hsl(${this.accentRaw[0]}, ${this.accentRaw[1] * 0.3}%, ${this.accentRaw[2] * 0.5}%)`">
            <v-card-text>
              <h4>{{this.data.brewingNotes}}</h4>
            </v-card-text>
            <br>
            <br>
            <v-btn @click="setDialog(true)" class="mx-2" block color="red">Remove</v-btn>
          </v-overlay>
        </v-fade-transition>
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline red">
              Erase Coffee?
            </v-card-title>

            <v-card-text class="my-2">
              Are you sure you want to do this? This action can not be undone.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="remove()"
              >
                Sure
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// formData: {
//   name: '',
//   origins: [],
//   varietals: [],
//   process: '',
//   elevation: 0,
//   roaster: '',
//   roastDate: '',
//   dateOBJ: {},
//   uuid: '',
//   brewingNotes: '',
//   tastingTags: []
// }
export default {
  props: ['data'],
  data () {
    return {
      overlay: false,
      dialog: false
    }
  },
  computed: {
    accent () {
      return this.$store.state.accent
    },
    accentRaw () {
      return this.$store.state.accentRaw
    }
  },
  methods: {
    multiFormat (arr) {
      const len = arr.length
      let str = ''
      for (const i in arr) {
        str += arr[i]
        if (i < len - 3) { str += ',' }
        if (i > len - 3 && i < len - 1 && len > 2) { str += ',' }
        if (i > len - 3 && i < len - 1) { str += ' and' }
        str += ' '
      }
      return str
    },
    remove () {
      this.dialog = false
      this.$store.dispatch('removeData', ['coffeeHistory', [this.data.uuid]])
      setTimeout(() => { this.$router.push('/') }, 200)
    },
    setDialog (bool) {
      this.dialog = bool
    },
    toggleOverlay () {
      if (this.overlay === true) { this.overlay = false } else { this.overlay = true }
    }
  }
}
</script>
<style>
.blur {
  filter: blur(2px);
}
.v-card--link:focus::before {
  opacity: 0;
}
</style>
