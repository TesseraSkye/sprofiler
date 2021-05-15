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
    page: 'Shots'
  }),
  components: {
    ShotCard,
    CoffeeCard
  },
  computed: {
    getAccent () {
      return this.$store.state.accent
    }
  },
  methods: {
    getStateData (name) {
      return this.$store.state[name]
    }
  }
}
</script>
