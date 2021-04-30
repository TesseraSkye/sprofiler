<template>
  <v-app>
  <v-fade-transition v-if="this.splash">
    <div id="splash" class="text-center">
      <v-scroll-x-transition>
        <v-img v-if="this.splashIcon" src="./assets/icon.png"/>
        <!-- <h1 v-if="this.splashText">SPROFILER</h1> -->
      </v-scroll-x-transition>
    </div>
  </v-fade-transition>
    <v-banner v-if="this.isDebug" color="red" class="p-fixed">DEBUG MODE IS ENABLED</v-banner>
    <v-main>
      <router-view transition='fade-transition'/>
    </v-main>
    <v-bottom-navigation elevation='24' shift fixed background-color="#272727" grow mandatory :color="this.getAccent">

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
  data () {
    return {
      splash: true,
      splashIcon: false,
      splashText: false
    }
  },
  computed: {
    getAccent () {
      return this.$store.state.accent
    },
    isDebug () {
      return this.$store.state.debug
    }
  },
  methods: {
  },
  mounted () {
    this.$store.dispatch('initStorage')
    setTimeout(() => {
      if (!this.getAccent) {
        this.$store.dispatch('wipeStorage')
      }
    }, 200)
    setTimeout(() => { this.splashIcon = true }, 500)
    setTimeout(() => { this.splashIcon = false }, 2000)
    setTimeout(() => { this.splash = false }, 2550)
  }
}
</script>

<style scoped>
.p-fixed {
  position: fixed;
  width: 100vw;
  z-index: 95;
}
#splash {
  height: 100vh;
  width: 100vw;
  position: fixed;
  background-color: black;
  z-index: 100;
}
</style>
