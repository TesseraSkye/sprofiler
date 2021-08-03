<template>
  <v-row>
    <v-col>
      <v-card shaped elevation="10" color="#262626">
        <v-card-title><h3>{{this.data.name}}</h3></v-card-title>
        <v-card-subtitle>{{this.data.origin}}</v-card-subtitle>
        <v-rating
          class="ml-4"
            :color="this.getAccent"
            dense
            background-color="#aaa"
            half-increments
            readonly
            hover
            length="5"
            :value="this.data.rating"
          />
        <v-card-text><h4>{{this.data.process}} process {{this.data.varietal}} grown at {{this.data.elevation}}</h4></v-card-text>
        <v-card-text><h4>Roasted by {{this.data.roaster}} in {{this.data.roastLocation }}{{(this.data.roastDate ? (' on ' + this.data.roastDate) : '')}}</h4></v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    getAccent () {
      return this.$store.state.accent
    }
  }
}
</script>
