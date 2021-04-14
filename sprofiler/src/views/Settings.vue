<template>
  <v-container>
    <v-row>
      <v-col class="text-center" cols=12>
        <h1>Settings</h1>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text>
            <h2>Accent Color:</h2>
          </v-card-text>
          <v-btn color="cyan" icon @click="setAccent('cyan')">
              <v-icon>mdi-circle</v-icon>
          </v-btn>
          <v-btn color="red" icon @click="setAccent('red')">
              <v-icon>mdi-circle</v-icon>
          </v-btn>

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
    }
  }
}
</script>
