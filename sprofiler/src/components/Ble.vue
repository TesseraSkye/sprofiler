<template>
  <v-card>
    <!-- <v-card-title>Bluetooth {{ this.btActive }}</v-card-title> -->
    <template v-if="this.isDebug">
      <v-card-text><h4>active devices:</h4></v-card-text>
      <v-card-text :key='device' v-for="device in this.getDevices">{{device}}</v-card-text>
    </template>
    <!-- <v-divider class="my-2"/> -->
    <v-tabs background-color="262626" :color="this.getAccent" centered v-model="tab" class="mb-5">
      <v-tab v-for="(item, key) in this.deviceTree" :key="key">{{ key }}</v-tab>
    </v-tabs>
    <!-- <v-divider class="my-2"/> -->
    <v-tabs-items v-model="tab">
      <v-tab-item class="pa-2" v-for="(family, key) in this.cleanDeviceTree" :key="key">
        <v-card class="pa-2 my-4" shaped color="#262626" :key="key" v-for="(item, key) in family">
          <v-card-title>{{ item.friendly }}<i>{{!!getID(key) ? "..... active!" : ""}}</i></v-card-title>
          <v-card-subtitle>{{item.description}}</v-card-subtitle>
          <v-card-actions>
            <v-btn block v-if="!getID(key)" elevation=4 :color="getAccent" @click="serve(key)">Connect</v-btn>
            <v-btn block v-if="!!getID(key)" elevation=4 :color="getAccent" @click="disconnect(key)">Disonnect</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <br>
    <br>
  </v-card>

</template>

<script>
import { bleInit, bleServe, bleDC } from './bleHandlers.js'

export default {
  name: 'ble',
  data () {
    return {
      tab: 'profiler'
    }
  },
  computed: {
    getAccent () {
      return this.$store.state.accent
    },
    isLive () {
      const d = this.getDevices
      return !(d && Object.keys(d).length === 0 && d.constructor === Object)
    },
    getDevices () {
      return this.$store.state.activeDevices
    },
    btActive () {
      if (this.islive) {
        return 'data found!'
      } else {
        return 'inactive.'
      }
    },
    isDebug () {
      return this.$store.state.debug
    },
    deviceTree () {
      // console.log(this.$store.state.deviceTree)
      return this.$store.state.deviceTree
    },
    cleanDeviceTree () {
      const cdt = this.deviceTree
      for (const fam in cdt) {
        delete (cdt[fam].axisID)
      }
      // console.warn(cdt)
      return cdt
    }
  },
  methods: {
    init () {
      bleInit()
    },
    serve (device) {
      // console.warn(device)
      bleServe(device)
      // setTimeout(() => { this.$router.push('/dash') }, 220)
    },
    disconnect (name) {
      bleDC(name)
      if (name) { this.$store.dispatch('removeData', ['activeDevices', [name]]) } else { this.$store.dispatch('setData', ['activeDevices', {}]) } // if no name, dc all
      setTimeout(() => { this.$router.push('/dash') }, 220)
    },
    getID (name) { // checks for connected at name. (e.g. 'acaia')
      return this.$store.state.activeDevices[name]
    },
    setConOverlay (status) {
      this.connectionOverlay = status
    }
  }
}

</script>
