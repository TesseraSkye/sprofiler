<template>
  <v-container>
      <v-row align-content="center">
        <v-col class="text-center" cols=12>
          <v-btn @click="incDBC()" color ="transparent">
            <h1>Settings</h1>
          </v-btn>
          <h5>{{this.getVersion}}</h5>
          <h5>Trans Rights</h5>
        </v-col>
      </v-row>
    <br>
    <v-row>
      <v-col>
        <v-tabs v-model="page" centered :color="this.getAccent">
          <v-tab>
            <v-icon>mdi-wifi</v-icon>
          </v-tab>
          <v-tab>
            <v-icon>mdi-palette</v-icon>
          </v-tab>
          <v-tab v-if="this.isDebug">
            <v-icon>mdi-code-json</v-icon>
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-tabs-items v-model="page">
          <v-tab-item>
            <!-- <v-row>
              <v-col> -->
                <Ble/>
              <!-- </v-col>
            </v-row> -->
          </v-tab-item>
          <v-tab-item>
            <!-- <v-row>
              <v-col sm="12" md="6"> -->
                <v-card outlined elevation="10">
                  <v-card-text>
                    <h2>Accent Color:</h2>
                  </v-card-text>
                  <v-divider/>
                  <v-row>
                    <v-col :key='accent' v-for="accent in getAccentPresets" align-self="center">
                      <v-btn :color="accent" :small="isAccent(accent)" fab x-small class="mx-2 my-4" @click="setAccent(accent)" />
                    </v-col>
                  </v-row>
                </v-card>
              <!-- </v-col>
            </v-row> -->
          </v-tab-item>
          <v-tab-item>
            <!-- <v-row>
              <v-col sm="12" md="6"> -->
                <v-card color="red darken-2" outlined elevation="10">
                  <v-card-title>USE CAUTION.</v-card-title>
                  <v-spacer/>
                  <v-spacer/>
                  <v-divider/>
                  <v-card-text>
                    <h2>Debugging Data:</h2>
                    <!-- <h4>pressure data {{this.$store.state.pressureArray}}</h4> -->
                    <h4>BLE Device ID: {{this.isActive}}</h4>
                    <h4>State: {{this.getState}}</h4>
                    <v-btn @click="this.override" class="my-2" color="orange">OVERRIDE STATE</v-btn>
                    <br>
                    <v-btn @click="setDialog(true)" color="red">WIPE ALL DATA!!</v-btn>
                  </v-card-text>
                </v-card>
                <br>
                <br>
                  <v-dialog v-model="dialog" width="500">
                    <v-card>
                      <v-card-title class="headline red">
                        Erase all data?
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
                          @click="wipeStorage"
                        >
                          Sure
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
              <!-- </v-col>
            </v-row> -->
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import Ble from '../components/Ble.vue'
import { bleDC } from '../components/bleHandlers.js'
export default {
  name: 'settings',
  data () {
    return {
      dialog: false,
      page: 'connection',
      debugCounter: 0
    }
  },
  components: {
    Ble
  },
  computed: {
    getState () {
      return this.$store.state
    },
    getAccent () {
      return this.$store.state.accent
    },
    getVersion () {
      return this.$store.state.version
    },
    isDebug () {
      return this.$store.state.debug
    },
    getAccentPresets () {
      return this.$store.state.accentPresets
    }
  },
  methods: {
    isActive (device = 'sprofiler') { // defaults to sprofiler, if called with device param filled, checks for connected device by that name. (e.g. scale)
      return this.$store.state.activeDevices[device]
    },
    setDialog (bool) {
      this.dialog = bool
    },
    setAccent (data) {
      this.$store.dispatch('setData', ['accent', data])
    },
    isAccent (color) {
      return this.getAccent === color
    },
    setDebug (bool) {
      this.$store.dispatch('setData', ['debug', bool])
    },
    incDBC () {
      this.debugCounter += 1
      if (this.debugCounter >= 5) {
        console.warn('ENTERING DEBUG MODE')
        this.debugCounter = 0
        this.$store.dispatch('setData', ['debug', !this.isDebug])
      }
    },
    override () {
      this.$store.dispatch('setData', ['activeData', {
        date: '04/22/21 : 11:07:30',
        uuid: 'h456h45h6k4k5g',
        data: {
          profiler: {
            sprofiler: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 2 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 9 }, { x: 7, y: 5 }, { x: 8, y: 4 }, { x: 9, y: 3 }, { x: 10, y: 1 }, { x: 11, y: 1 }]
          },
          scale: {
            acaia: [{ x: 0, y: 0.0 }, { x: 1, y: 0.2 }, { x: 2, y: 5.1 }, { x: 3, y: 12.1 }, { x: 4, y: 15.7 }, { x: 5, y: 19.5 }, { x: 6, y: 24.1 }, { x: 7, y: 28.5 }, { x: 8, y: 31.2 }, { x: 9, y: 32.8 }, { x: 10, y: 35.3 }, { x: 11, y: 37.7 }]
          }
        }
      }])
      this.$store.dispatch('setData', ['shotHistory', {
        dummy: {
          name: 'Dummy shot 1',
          date: 'Jan 1, 2021 at 00:00',
          uuid: 'dummy',
          raiting: 4.5,
          favorite: false,
          notes: 'It was pretty ok',
          data: [[0, 0, 1, 2, 4, 6, 9, 5, 4, 3, 1, 1], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]
        }
      }])
      this.$store.dispatch('setData', ['coffeeHistory', {
        sdf7g68dsfg8s: {
          name: 'Halo Beriti',
          origin: 'etheopia',
          varietal: 'heirloom',
          process: 'natural',
          elevation: '1600m',
          roaster: 'Bespoken Coffee',
          roastLocation: 'Oregon',
          roastDate: '04/25/21',
          date: '05/02/21 : 09:51:30',
          uuid: 'sdf7g68dsfg8s',
          rating: 4,
          favorite: true,
          comments: '',
          tastingNotes: 'Very fruity, quite sweet',
          tastingTags: 'blueberries, sugar'
        }
      }])
      this.$store.dispatch('setData', ['activeDevices', {
        acaia: 'jaesfdo4jtt3'
      }])
      this.$store.dispatch('setData', ['overlayUUID', 'dummy'])
    },
    wipeStorage () {
      this.dialog = false
      this.$store.dispatch('wipeStorage')
      setTimeout(() => { bleDC() }, 250)
      setTimeout(() => { this.$router.push('/') }, 300)
    }
  }
}
</script>
