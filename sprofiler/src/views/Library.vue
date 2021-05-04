<template>
  <v-container>
    <v-tabs v-model="page" :background-color="this.getAccent" color="white" centered dark>
      <v-tab v-for="tab in this.tabs" :key="tab.key">
        {{tab.longName}}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="page">
      <v-tab-item v-for="tab in this.tabs" :key="tab.key">
        <v-card>
          <v-card-title>
            {{tab.longName}}
          </v-card-title>
          <v-card-text>
            {{tab.flavorText}}
          </v-card-text>
        </v-card>
        <CardList :listDataLink="tab.stateVar" :cardName="tab.componentName" />
      </v-tab-item>
    </v-tabs-items>
    <br>
    <br>
  </v-container>
</template>

<script>
import CardList from '../components/CardList.vue'
export default {
  name: 'library',
  data: () => ({
    page: null,
    tabs: [
      {
        key: 'history',
        componentName: 'ShotCard',
        longName: 'Shot History',
        stateVar: 'shotHistory',
        flavorText: 'Here, you can relive your past glory'
      }
    ]
  }),
  components: {
    CardList
  },
  computed: {
    getAccent () {
      return this.$store.state.accent
    }
  }
}
</script>
