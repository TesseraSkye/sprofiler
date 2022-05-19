<template>
  <v-row>
    <!-- <v-card-title>Bluetooth {{ this.btActive }}</v-card-title> -->
    <template v-if="this.isDebug">
      <v-card class="vw-100" elevation=10 shaped color="#262626">
        <v-card-text><h4>active devices:</h4></v-card-text>
        <v-card-text :key='device' v-for="device in this.getDevices">{{device}}</v-card-text>
        <v-btn large @click="scan()" light class="mx-2">Scan for devices</v-btn>
      </v-card>
    </template>
    <!-- <v-divider class="my-2"/> -->
    <v-tabs background-color="262626" :color="this.getAccent" centered v-model="tab" class="mb-5 my-4">
      <v-tab v-for="(item, key) in this.deviceTree" :key="key">{{ key }}</v-tab>
    </v-tabs>
    <!-- <v-divider class="my-2"/> -->
      <v-tabs-items v-model="tab" class="vw-100">
        <v-tab-item class="px-2" v-for="(family, key) in this.cleanDeviceTree" :key="key">
          <device-card :key="key" v-for="(item, key) in family" :data="item" :name="key" />
        </v-tab-item>
      </v-tabs-items>
      <br>
      <br>
  </v-row>

</template>

<script>

// Ble.vue - container for device cards & creates family structures

import { bleScan } from './bleHandlers.js'
import DeviceCard from './DeviceCard.vue'
export default {
  name: 'ble',
  components: {
    'device-card': DeviceCard
  },
  data () {
    return {
      tab: 'profiler'
    }
  },
  computed: {
    getAccent () {
      return this.$store.state.accent
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
    },
    isDebug () {
      return this.$store.state.debug
    }
  },
  methods: {
    scan () {
      bleScan()
    }
  }
}

</script>
