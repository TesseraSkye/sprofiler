<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-center mt-4">Welcome!</h1>
        <!-- <v-divider class="ma-1"/> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card v-if="false" shaped outlined elevation="20" class="pa-2">
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
    <v-row justify="center">
      <v-col cols=11 md=6>
        <v-card shaped color="#262626" elevation="10" class="pa-2">
          <v-card-title v-if="!this.isActive"><h3>Set up your 'spro.</h3></v-card-title>
          <v-card-title v-if="!!this.isActive"><h3>Time to make 'spro.</h3></v-card-title>
          <v-card-text v-if="!this.isActive">
            <h4>To get started, head over to the connections tab in settings.</h4>
          </v-card-text>
          <v-card-text v-if="!!this.isActive">
            <h4>You're ready to go!</h4>
          </v-card-text>
          <v-card-actions>
            <v-btn large block v-if="!this.isActive" :color="this.getAccent" to='/settings'>
              Let's go ->
            </v-btn>
            <v-btn large block v-if="!!this.isActive" :color="this.getAccent" to='/live'>
              Pull a shot ->
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols=11 md=6>
        <v-card shaped color="#262626" elevation="10" class="pa-2">
          <v-card-title>
            <h3>New coffee?</h3>
          </v-card-title>
          <v-card-text>
            <h4>Add it to the history books.</h4>
          </v-card-text>
          <v-card-actions>
            <v-btn large block :color="this.getAccent" :to="{ path: 'library', query: { tab: 'coffee' }}">Take me there -></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <br>
    <h1 class="text-center"><v-icon large>mdi-chevron-down</v-icon></h1>
    <br>
    <v-row justify="center">
      <v-col cols=11 md=6>
        <v-card shaped color="#262626" elevation="10" class="pa-2">
          <v-card-title>
            <h3>We have a roadmap!</h3>
          </v-card-title>
          <v-card-text>
            <h4>To explore what we have planned, check our Trello.</h4>
          </v-card-text>
          <v-card-actions>
            <v-btn large block :color="this.getAccent" href="https://trello.com/b/ME1z05LE/sprofiler">Show me the future</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols=11 md=6>
        <v-card shaped color="#262626" elevation="10" class="pa-2">
          <v-card-title>
            <h3>Get in contact.</h3>
          </v-card-title>
          <v-card-text>
            <h4>Submit a bug report or feature request on our Github!</h4>
          </v-card-text>
          <v-card-actions>
            <v-btn large block :color="this.getAccent" href="https://github.com/tesseraskye/sprofiler">Git involved</v-btn>
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
