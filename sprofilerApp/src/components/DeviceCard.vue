<template>
  <v-col cols=12 sm=6>
    <v-card elevation=10 class="pa-2" shaped color="#262626">
      <v-card-title>{{ this.data.friendly }}<i>{{!!getID(name) ? "..... active!" : ""}}</i></v-card-title>
      <v-card-subtitle>{{this.data.description}}</v-card-subtitle>
      <v-card-actions>
        <v-btn large block v-if="!getID(name)" elevation=4 :color="this.accent" @click="serve(name)">Connect</v-btn>
        <v-btn large block v-if="!!getID(name)" elevation=4 :color="this.accent" @click="disconnect(name)">Disconnect</v-btn>
      </v-card-actions>
      <v-btn large v-if="isDebug" @click="read(name)" light class="mx-2 my-4">read char</v-btn>
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
    </v-card>
  </v-col>
</template>

<script>
import { bleInit, bleServe, bleDC, bleRead } from './bleHandlers.js'
export default {
  name: 'device-card',
  props: ['data', 'name'],
  data () {
    return {
      overlay: false
      // dialog: false
    }
  },
  computed: {
    accent () {
      return this.$store.state.accent
    },
    accentRaw () {
      return this.$store.state.accentRaw
    },
    isLive () {
      const d = this.getDevices
      return !(d && Object.keys(d).length === 0 && d.constructor === Object)
    },
    isDebug () {
      return this.$store.state.debug
    }
  },
  methods: {
    init () {
      bleInit()
    },
    serve (device) {
      console.warn(device)
      bleServe(device)
      setTimeout(() => { this.$router.push('/dash') }, 120)
      setTimeout(() => { this.$router.push('/dash') }, 125)
    },
    read (device) {
      bleRead(device)
    },
    disconnect (name) {
      bleDC(name)
      if (name) { this.$store.dispatch('removeData', ['activeDevices', [name]]) } else { this.$store.dispatch('setData', ['activeDevices', {}]) } // if no name, dc all
      setTimeout(() => { this.$router.push('/dash') }, 120)
      setTimeout(() => { this.$router.push('/settings') }, 122)
    },
    getID (name) { // checks for connected at name. (e.g. 'acaia')
      return this.$store.state.activeDevices[name]
    },
    // setConOverlay (status) {
    //   this.connectionOverlay = status
    // },
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
