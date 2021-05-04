<template>
    <component :is="cardComponent" :data="getStateData(this.listDataLink)"/>
    <!-- <h2>aaa</h2> -->
</template>

<script>

function loadCard (card) {
  return {
    [card]: () => import(`./ShotCard.vue`)
  }
}

export default {
  props: ['listDataLink', 'cardName'],
  componets: {
    'card-component': loadCard(this.cardName)
  },
  methods: {
    getStateData (data) {
      return this.$store.state[data]
    }
  }
}
</script>
