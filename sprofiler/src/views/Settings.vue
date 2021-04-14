<template>
  <v-container>
    <v-row align-content="center">
      <v-col class="text-center" cols=12>
        <h1>Settings</h1>
      </v-col>
      <v-col sm="12" md="6">
        <v-card outlined elevation="10">
          <v-card-text>
            <h2>Accent Color:</h2>
          </v-card-text>
          <v-row>
            <v-col align-self="center">
              <v-btn color="cyan" :small="isAccent('cyan')" fab x-small class = "mx-2 my-4" @click="setAccent('cyan')"/>
            </v-col>
            <v-col align-self="center">
              <v-btn color="red" :small="isAccent('red')" fab x-small class = "mx-2 my-4" @click="setAccent('red')"/>
            </v-col>
            <v-col align-self="center">
              <v-btn color="green" :small="isAccent('green')" fab x-small class = "mx-2 my-4" @click="setAccent('green')"/>
            </v-col>
            <v-col align-self="center">
              <v-btn color="white" :small="isAccent('white')" fab x-small class = "mx-2 my-4" @click="setAccent('white')"/>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'settings',
  components: {
  },
  methods: {
    setAccent (data) {
      this.$store.dispatch('setAccent', data)
    },
    isAccent (color) {
      return this.$store.state.accent == color
    }
  },
  computed: {
    
  }
}
</script>
