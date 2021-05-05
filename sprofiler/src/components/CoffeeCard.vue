<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-header>{{this.data.name}}</v-card-header>
        <v-card-subtitle>{{this.data.origin}}</v-card-subtitle>
        <v-card-text>Roasted by {{this.data.roaster}}{{(this.data.roastDate ? (' on ' + this.data.roastDate) : '')}}</v-card-text>
        <v-divider/>
        <v-card-text>{{this.data.process}} process {{this.data.varietal}}</v-card-text>
        <v-card-text>Grown at {{this.data.elevation}}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    props: ['data']
  }
</script>