<template>
  <v-app id="app">
    <v-fade-transition>
      <div v-if="this.splash" id="splash" class="text-center">
        <v-scroll-x-transition class="vw-100">
          <v-img v-if="this.splashIcon" max-width="100vh" src="./assets/icon.png"/>
        </v-scroll-x-transition>
      </div>
    </v-fade-transition>
    <v-banner v-if="this.isDebug" color="red" class="p-fixed">DEBUG MODE IS ENABLED</v-banner>
    <v-main>
      <v-slide-x-transition mode="out-in">
        <router-view/>
      </v-slide-x-transition>
    </v-main>
    <v-bottom-navigation elevation='24' class="zh-95" shift fixed background-color="#272727" grow mandatory :color="this.getAccent">

        <v-btn x-large value="Dashboard" to="/">
          <span>Dashboard</span>
          <v-icon>mdi-view-dashboard-variant</v-icon>
        </v-btn>

        <v-btn x-large value="Live"  to="/live">
          <span>Live</span>
          <v-icon>mdi-chart-bell-curve</v-icon>
        </v-btn>

        <v-btn x-large value="Library"  to="/library">
          <span>Library</span>
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
    this.$store.dispatch('setupDeviceConfig')
  }
}
</script>

<style>
/* Styles */
.zh-95 {
  z-index: 95 !important;
}
.zh-90 {
  z-index: 90;
}
.zh-85 {
  z-index: 85;
}

.p-fixed {
  position: fixed;
  width: 100vw;
  z-index: 95;
}

.vw-100 {
  width: 100vw;
}
</style>

<style>
#app {
  background-color: #1e1e1e;
}
#splash {
  height: 100vh;
  width: 100vw;
  position: fixed;
  background-color: #1e1e1e;
  z-index: 100;
}
.v-card--link:focus::before {
  opacity: 0;
}
.justify-self-center {
  justify-self: center;
}
</style>
