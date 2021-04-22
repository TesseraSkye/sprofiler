<template>
  <v-container>
    <v-row align-content="center">
      <v-col class="text-center" cols=12>
        <h1>Settings</h1>
        <h5>version 0.0.1</h5>
        <h5>Trans Rights</h5>
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
              <v-btn color="white" :small="isAccent('white')" fab x-small class = "mx-2 my-4" @click="setAccent('white')"/>
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
        <Ble/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Ble from '../components/Ble.vue'
export default {
  name: 'settings',
  components: {
    Ble
  },
  computed: {
    getAccent () {
      return this.$store.state.accent
    }
  },
  methods: {
    setAccent (data) {
      this.$store.dispatch('putData', ['accent', data])
    },
    isAccent (color) {
      return this.getAccent === color
    }
  }
}
</script>
