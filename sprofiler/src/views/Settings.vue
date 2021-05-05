<template>
  <v-container>
    <v-row align-content="center">
      <v-col class="text-center" cols=12>
        <h1>Settings</h1>
        <h5>{{this.getVersion}}</h5>
        <h5>Trans Rights</h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Ble/>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="6">
        <v-card outlined elevation="10">
          <v-card-text>
            <h2>Accent Color:</h2>
          </v-card-text>
          <v-row>
            <v-col cols=3 align-self="center">
              <v-btn color="cyan" :small="isAccent('cyan')" fab x-small class = "mx-2 my-4" @click="setAccent('cyan')"/>
            </v-col>
            <v-col cols=3 align-self="center">
              <v-btn color="pink" :small="isAccent('pink')" fab x-small class = "mx-2 my-4" @click="setAccent('pink')"/>
            </v-col>
            <v-col cols=3 align-self="center">
              <v-btn color="green" :small="isAccent('green')" fab x-small class = "mx-2 my-4" @click="setAccent('green')"/>
            </v-col>
            <v-col cols=3 align-self="center">
              <v-btn color="orange" :small="isAccent('orange')" fab x-small class = "mx-2 my-4" @click="setAccent('orange')"/>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn v-if="!this.isDebug" @click="setDebug(true)" color="grey" block>SHOW DEBUG</v-btn>
        <v-btn v-if="this.isDebug" color="blue" @click="setDebug(false)"  block>HIDE DEBUG</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="this.isDebug">
      <v-col sm="12" md="6">
        <v-card outlined elevation="10">
          <v-card-text>
            <h2>Debugging Data:</h2>
            <!-- <h4>pressure data {{this.$store.state.pressureArray}}</h4> -->
            <h4>BLE Device ID: {{this.isConnected}}</h4>
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
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
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
      dialog: false
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
    }
  },
  methods: {
    isConnected (device) { // defaults to sprofiler, if called with device param filled, checks for connected device by that name. (e.g. scale)
    const _device = (device ? device : 'sprofiler')
    return this.$store.state.connectedDevices[_device]
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
    override () {
      this.$store.dispatch('setData', ['pressureArray', [[1, 9, 5, 2], [0, 1, 2, 3]]])
      this.$store.dispatch('setData', ['shotHistory',
        {
          dummy: {
            name: 'Dummy shot 1',
            date: 'Jan 1, 2021 at 00:00',
            uuid: 'dummy',
            raiting: 4.5,
            favorite: false,
            notes: 'It was pretty ok',
            data: [[0, 0, 1, 2, 4, 6, 9, 5, 4, 3, 1, 1], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]
          }
        }
      ])
      this.$store.dispatch('setData', ['deviceID', 1])
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
