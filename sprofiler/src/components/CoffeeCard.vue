<template>
  <v-row>
    <v-col>
      <v-card shaped elevation="10" color="#262626">
        <v-card-title><h3>{{this.data.name}}</h3></v-card-title>
        <v-divider class="mb-2" />
        <v-chip :key="i" v-for="i in this.data.tastingTags" class="ml-4 my-2" :color="accent" >{{i}}</v-chip>
        <v-rating
        v-if="this.data.rating"
          class="ml-4"
            :color="this.accent"
            dense
            background-color="#aaa"
            half-increments
            readonly
            hover
            length="5"
            :value="this.data.rating"
          />
        <v-card-text>
          <h4>
            {{this.data.process ? this.data.process + ' process' : ''}}
            {{this.data.varietals ? multiFormat(this.data.varietals) : ''}}
            {{this.data.origins ? ' grown in ' + multiFormat(this.data.origins) : ''}}
            {{this.data.elevation ? 'at ' + this.data.elevation + ' masl': ''}}
          </h4>
          <br>
          <h4>Roasted by {{this.data.roaster}} {{(this.data.roastDate ? (' on ' + this.data.roastDate) : '')}}</h4>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// formData: {
//   name: '',
//   origins: [],
//   varietals: [],
//   process: '',
//   elevation: 0,
//   roaster: '',
//   roastDate: '',
//   dateOBJ: {},
//   uuid: '',
//   brewingNotes: '',
//   tastingNotes: '',
//   tastingTags: []
// }
export default {
  props: ['data'],
  computed: {
    accent () {
      return this.$store.state.accent
    }
  },
  methods: {
    multiFormat (arr) {
      const len = arr.length
      let str = ''
      for (const i in arr) {
        str += arr[i]
        if (i < len - 3) { str += ',' }
        if (i > len - 3 && i < len - 1 && len > 2) { str += ',' }
        if (i > len - 3 && i < len - 1) { str += ' and' }
        str += ' '
      }
      return str
    }
  }
}
</script>
