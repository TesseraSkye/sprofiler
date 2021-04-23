<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card elevation="10" outlined>
          <v-card-title>
            <h1>Welcome!</h1>
          </v-card-title>
          <v-card-text>
            <h2>To get started, head over to the <i>Settings</i> tab and connect to your Sprofiler.</h2>
          </v-card-text>
          <v-card-actions>
            <v-btn to='/settings'>
              Let's go ->
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="10" outlined>
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
// @ is an alias to /src
export default {
  name: 'dashboard',
  components: {
  }
}
</script>
