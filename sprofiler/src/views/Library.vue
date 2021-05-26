<template>
  <v-container>
    <v-row>
      <v-col>
        <v-tabs v-model="page" :color="this.getAccent" centered>
      <v-tab>Shots</v-tab>
      <v-tab>Coffees</v-tab>
    </v-tabs>
      </v-col>
    </v-row>
    <v-slide-x-transition leave-absolute hide-on-leave mode="out-in">
      <v-row v-if="page === 1">
        <v-col>
          <v-btn to="/save-coffee" elevation="10" block :color="this.getAccent">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-slide-x-transition>
    <v-row>
      <v-col>
        <v-tabs-items v-model="page">
          <v-tab-item>
            <!-- Shots -->
            <shot-card :data="shot" :key="shot.uuid" v-for="shot in this.getStateData('shotHistory')"/>
          </v-tab-item>
          <v-tab-item>
            <!-- Coffee -->
            <coffee-card :data="coffee" :key="coffee.uuid" v-for="coffee in this.getStateData('coffeeHistory')" />
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
    page: 0
  }),
  components: {
    ShotCard,
    CoffeeCard
  },
  computed: {
    getAccent () {
      return this.$store.state.accent
    },
    routePage () {
      return 1
    }
  },
  methods: {
    getStateData (name) {
      return this.$store.state[name]
    }
  }
}
</script>
