<template>
  <v-app>
    <v-main>
      <router-view transition = 'fade-transition'/>
    </v-main>
    <v-bottom-navigation grow height=52 v-model="this.$router.currentRoute.name" class="dark" mandatory color="red">

      <v-btn x-large value="Dashboard" href="/">
        <span>Dashboard</span>
        <v-icon>mdi-view-dashboard-variant</v-icon>
      </v-btn>

      <v-btn x-large value="Live"  href="/live">
        <span>Live</span>
        <v-icon>mdi-chart-bell-curve</v-icon>
      </v-btn>

      <v-btn x-large value="History"  href="/history">
        <span>History</span>
        <v-icon>mdi-clock</v-icon>
      </v-btn>

      <v-btn x-large value="Settings"  href="/settings">
        <span>Settings</span>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
  </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
}
</script>
