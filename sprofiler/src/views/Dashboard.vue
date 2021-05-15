<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-center mt-4">Welcome!</h1>
        <v-divider class="ma-4"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="10" outlined :color="this.getAccent + ' darken-4'">
          <v-card-title>
            <h3>Before you go...</h3>
          </v-card-title>
          <v-card-text>
            <h4>This app is in a beta state. Expect bugs and weird behaviors.</h4>
            <h4>Don't hesitate to open issues on github.</h4>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="10" outlined>
          <v-card-title><h3>Time to make 'spro.</h3></v-card-title>
          <v-card-text v-if="!this.isActive">
            <h4>To get started, head over to the connections tab in settings.</h4>
          </v-card-text>
          <v-card-text v-if="!!this.isActive">
            <h4>Looks we can still connect you.</h4>
          </v-card-text>
          <v-card-actions>
            <v-btn block v-if="!this.isActive" :color="this.getAccent" to='/settings'>
              Let's go ->
            </v-btn>
            <v-btn block v-if="!!this.isActive" :color="this.getAccent" to='/live'>
              Pull a shot ->
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="10" outlined>
          <v-card-title>
            <h3>New coffee?</h3>
          </v-card-title>
          <v-card-text>
            <h4>Add it to the history books.</h4>
          </v-card-text>
          <v-card-actions>
            <v-btn block :color="this.getAccent" to="/library">Take me there -></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider class="mt-2 mb-4"/>
        <v-card elevation="10" outlined>
          <v-card-title>
            <h3>We have a roadmap!</h3>
          </v-card-title>
          <v-card-text>
            <h4>To explore what we have planned, check our Trello.</h4>
          </v-card-text>
          <v-card-actions>
            <v-btn block :color="this.getAccent" href="https://trello.com/b/ME1z05LE/sprofiler">Show me the future</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider class="mt-2 mb-4"/>
        <v-card elevation="10" outlined>
          <v-card-title>
            <h3>Find a bug?</h3>
          </v-card-title>
          <v-card-text>
            <h4>We'd love to hear from you. Submit a bug report, feature request, or PR on our Github!</h4>
          </v-card-text>
          <v-card-actions>
            <v-btn block :color="this.getAccent" href="https://github.com/tesseraskye/sprofiler">Git involved</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <br>
    <br>
    <br>
  </v-container>
</template>

<script>
export default {
  name: 'dashboard',
  components: {
  },
  computed: {
    isActive () { // defaults to sprofiler, if called with device param filled, checks for connected device by that name. (e.g. scale)
      const d = this.$store.state.activeDevices
      return !(d && Object.keys(d).length === 0 && d.constructor === Object)
    },
    getAccent () {
      return this.$store.state.accent
    }
  }
}
</script>
