<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card elevation="10" outlined>
          <v-card-title>
            <h1>Welcome!</h1>
          </v-card-title>
          <v-card-text v-if="!this.getID">
            <h2>To get started, head over to the <i>Settings</i> tab and connect to your Sprofiler.</h2>
          </v-card-text>
          <v-card-text v-if="this.getID">
            <h2>Looks you still have the connection data for your Sprofiler!</h2>
          </v-card-text>
          <v-card-actions>
            <v-btn v-if="!this.getID" :color="this.getAccent" to='/settings'>
              Let's go ->
            </v-btn>
            <v-btn v-if="this.getID" :color="this.getAccent" to='/live'>
              Pull a shot ->
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="10" outlined color="red">
          <v-card-title>
            <h3>Before you go:</h3>
          </v-card-title>
          <v-card-text>
            <h4>This app is in a beta state. Expect bugs and weird behaviors.</h4>
            <h4>Message me @tesseraskye with any concerns.</h4>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'dashboard',
  components: {
  },
  methods: {
    //
  },
  computed: {
    getAccent () {
      return this.$store.state.accent
    },
    getID () {
      return this.$store.state.deviceID
    }
  }
}
</script>
