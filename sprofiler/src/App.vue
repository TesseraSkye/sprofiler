<template>
  <v-app>
    <v-banner v-if="this.isDebug" color="red">DEBUG MODE IS ENABLED</v-banner>
    <v-main>
      <router-view transition='fade-transition'/>
    </v-main>
    <v-bottom-navigation shift fixed background-color="#272727" grow mandatory :color="this.getAccent">

        <v-btn x-large value="Dashboard" to="/">
          <span>Dashboard</span>
          <v-icon>mdi-view-dashboard-variant</v-icon>
        </v-btn>

        <v-btn x-large value="Live"  to="/live">
          <span>Live</span>
          <v-icon>mdi-chart-bell-curve</v-icon>
        </v-btn>

        <v-btn x-large value="History"  to="/history">
          <span>History</span>
          <v-icon>mdi-clock</v-icon>
        </v-btn>

        <v-btn x-large value="Settings"  to="/settings">
          <span>Settings</span>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  computed: {
    getAccent () {
      return this.$store.state.accent
    },
    isDebug () {
      return this.$store.state.debug
    }
  },
  methods: {
  }
}
</script>
