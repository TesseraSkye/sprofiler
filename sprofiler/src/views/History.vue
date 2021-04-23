<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card elevation="2">
          <v-card-title>
            <h1>Shot History</h1>
          </v-card-title>
          <v-card-text>
            <h3>Here, you can relive your past glory.</h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <shot-card :data='shot' :key='shot.uuid' v-for="shot in shotList" />
  </v-container>
</template>

<script>
import ShotCard from '../components/ShotCard.vue'
export default {
  name: 'history',
  components: {
    ShotCard
  },
  computed: {
    shotList () {
      return this.$store.state.shotHistory
    }
  }
}
</script>
