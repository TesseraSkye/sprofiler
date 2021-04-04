<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <v-bottom-navigation v-model="value" color="orange">
      <v-btn value="dashboard" href="/">
        <span>Dashboard</span>

        <v-icon>mdi-view-dashboard-variant</v-icon>
      </v-btn>

      <v-btn value="live" href="/live">
        <span>Live</span>

        <v-icon>mdi-chart-bell-curve</v-icon>
      </v-btn>

      <v-btn value="history" href="/history">
        <span>History</span>

        <v-icon>mdi-clock</v-icon>
      </v-btn>

      <v-btn value="settings" href="/settings">
        <span>Settings</span>

        <v-icon>mdi-cog</v-icon>
      </v-btn>
  </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  })
}
</script>
