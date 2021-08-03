<template>
  <v-container>
      <v-row>
        <v-col>
          <v-card elevation="10" shaped color="#262626" class="pa-4">
          <v-card-title>
            <h2>Add a new coffee!</h2>
          </v-card-title>
            <v-form class="mx-2" ref="form" @submit.prevent="submit">
              <v-text-field
                v-model="formData.name"
                label="Name"
                required
              />
              <v-text-field
                v-model="formData.roaster"
                label="Roaster"
                required
              />
              <v-date-picker v-model="formData.roastDate" :color="this.accent" landscape no-title class="mb-4"/>
              <v-autocomplete v-model="formData.origin"
              :items="['e','ees']"
              rounded multiple chips
              dense
              deletable-chips
              :item-color="this.accent"
              :color="this.accent"
              hide-no-data
              filled
              hide-selected
              label='origin'
              />
              <v-autocomplete v-model="formData.varietal"
              :items="['e','ees']"
              rounded multiple chips
              dense
              deletable-chips
              :item-color="this.accent"
              :color="this.accent"
              hide-no-data
              filled
              hide-selected
              label='varietal'
              />
              <v-autocomplete v-model="formData.process"
              :items="['e','ees']"
              rounded multiple chips
              dense
              deletable-chips
              :item-color="this.accent"
              :color="this.accent"
              hide-no-data
              filled
              hide-selected
              label='process'
              />
              <v-slider v-model="elevation" label="elevation" min='0' max='5000' step='100' />
              <v-autocomplete v-model="formData.flavors"
              :items="['e','ees']"
              rounded multiple chips
              dense
              deletable-chips
              :item-color="this.accent"
              :color="this.accent"
              hide-no-data
              filled
              hide-selected
              label='flavors'
              />
              <v-textarea v-model="formData.notes" no-resize height="120" label="Brewing Notes"/>
              <v-btn class="my-2" @click="submit" large :color="this.accent" block>submit</v-btn>
              <br>
              <br>
              <br>
              <v-btn class="my-2" @click="clear; setTimeout(() => { this.$router.push('/') }, 250)" color="#333" block>clear</v-btn>
            </v-form>
          </v-card>
          <br>
          <br>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>

// sdf7g68dsfg8s: {
//   name: 'Halo Beriti',
//   origin: 'etheopia',
//   varietal: 'heirloom',
//   process: 'natural',
//   elevation: '1600m',
//   roaster: 'Bespoken',
//   roastDate: '04/25/21',
//   date: '05/02/21 : 09:51:30',
//   uuid: 'sdf7g68dsfg8s',
//   rating: 4,
//   favorite: true,
//   brewNotes: 'Very fruity, quite sweet',
//   tastingTags: 'blueberries, sugar'
// }

export default {

  data () {
    return {
      fieldList: ['name'],
      formData: { // everything should be arrays so that the tag system works on everything
        name: '',
        origin: [],
        varietal: [],
        process: [],
        elevation: [],
        roaster: [],
        roastLocation: [],
        roastDate: [],
        dateOBJ: {},
        date: '',
        uuid: '',
        rating: null,
        favourite: null,
        comments: '',
        tastingNotes: '',
        tastingTags: []
      }
    }
  },
  computed: {
    tags () {
      return this.$store.state.tags
    },
    accent () {
      return this.$store.state.accent
    }
  },
  methods: {
    //
  }
}
</script>
