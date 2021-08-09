<template>
  <v-col cols=12 sm=6>
    <v-card @click="this.toggleOverlay" width=85vw shaped elevation="10" color="#262626">
      <v-card-title :class="[this.overlay ? 'blur' : '']">
        <h3>{{this.data.name}}</h3>
      </v-card-title>
      <v-card-subtitle :class="[this.overlay ? 'blur' : '']">{{this.data.date}}</v-card-subtitle>
      <chart-handler sleek="true" :size="(this.$vuetify.breakpoint.smAndUp) ? [['xs']] : [['sm']]" :class="[this.overlay ? 'blur' : '']" :data='this.data'/>
      <v-fade-transition>
        <v-overlay
            class="zh-90"
            v-if="this.overlay"
            absolute
            opacity=0.4
            :color="`hsl(${this.accentRaw[0]}, ${this.accentRaw[1] * 0.3}%, ${this.accentRaw[2] * 0.5}%)`">
          <v-card-text>
            <h4>{{this.data.notes}}</h4>
          </v-card-text>
          <v-rating
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
          <br>
          <v-btn @click="this.compare" class="mx-2" :color="this.accent">Compare</v-btn>
          <v-btn @click="setDialog(true)" class="mx-2" color="red">Remove</v-btn>
        </v-overlay>
      </v-fade-transition>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline red">
            Erase Shot?
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
</template>

<script>
import ChartHandler from './ChartHandler.vue'
export default {
  name: 'shot-card',
  props: ['data'],
  components: {
    ChartHandler
  },
  data () {
    return {
      shotData: {},
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
    compare () {
      this.$store.dispatch('setData', ['overlayUUID', this.data.uuid])
      setTimeout(() => { this.$router.push('/live') }, 200)
    },
    remove () {
      this.dialog = false
      this.$store.dispatch('removeData', ['shotHistory', [this.data.uuid]])
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
