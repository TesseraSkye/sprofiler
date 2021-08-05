<template>
  <v-container>
    <v-row class="pt-4">
      <v-col>
        <v-tabs v-model="page" :color="this.accent" centered>
      <v-tab>Shots</v-tab>
      <v-tab>Coffees</v-tab>
    </v-tabs>
      </v-col>
    </v-row>
    <v-slide-x-transition leave-absolute hide-on-leave mode="out-in">
      <v-row v-if="page === 1" class="px-4">
        <v-col>
          <v-btn to="/add-coffee" elevation="10" block :color="this.accent">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-slide-x-transition>
    <v-row>
      <v-col>
        <v-tabs-items v-model="page" class="px-4">
          <v-tab-item class="pb-4">
            <!-- Shots -->
            <shot-card class="my-4" :data="getStateData('shotHistory')[shot]" :key="shot" v-for="shot in this.sortedShots"/>
            <v-btn block :color="this.accent" v-if="!this.sortedShots[0] && !this.hasActiveDevices" to="/settings">Connect a device</v-btn>
            <v-btn block :color="this.accent" v-if="!this.sortedShots[0] && this.hasActiveDevices" to="/live">Pull a Shot</v-btn>
          </v-tab-item>
          <v-tab-item>
            <!-- Coffee -->
            <coffee-card class="my-4" :data="getStateData('coffeeHistory')[shot]" :key="shot" v-for="shot in this.sortedCoffees"/>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
    <br>
    <br>
  </v-container>
</template>

<script>
import ShotCard from '../components/ShotCard.vue'
import CoffeeCard from '../components/CoffeeCard.vue'
export default {
  name: 'library',
  data: () => ({
    page: 0,
    destination: '',
    saveDialog: false
  }),
  components: {
    ShotCard,
    CoffeeCard
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      this.destination = from.meta.destination
      next()
    })
  },
  computed: {
    accent () {
      return this.$store.state.accent
    },
    routePage () {
      return 1
    },
    sortedShots () {
      return Object.keys(this.getStateData('shotHistory')).sort((a, b) => b - a)
    },
    sortedCoffees () {
      return Object.keys(this.getStateData('coffeeHistory')).sort((a, b) => b - a)
    },
    hasActiveDevices () {
      const ad = this.$store.state.activeDevices // !! casts return as a bool
      return (!(ad && Object.keys(ad).length === 0 && ad.constructor === Object)) // is it truthy, is 0 length, and is an object
    }
  },
  methods: {
    getStateData (name) {
      return this.$store.state[name]
    }
  }
}
</script>
