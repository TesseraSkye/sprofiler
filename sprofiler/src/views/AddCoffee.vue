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
                :color="this.accent"
                label="Name"
                required
              />
              <v-combobox v-model="formData.origins" :items="this.tags.origins" multiple chips :color="this.accent" deletable-chips :delimiters="[',', '.']" hide-no-data label='origin' />
              <v-combobox v-model="formData.varietals" :items="this.tags.varietals" multiple chips :color="this.accent" deletable-chips :delimiters="[',', '.']" hide-no-data label='varietal' />
              <v-combobox v-model="formData.process" :items="this.tags.processes" :color="this.accent" clearable hide-no-data label='process' />
              <v-slider v-model="formData.elevation" label="elevation" class="mt-2" :color="this.accent" min=0 max=4000 step="100" thumb-label />
              <v-divider class="my-4"/>
              <v-rating
                v-model="formData.rating"
                large
                dense
                :color="this.accent"
                background-color="#aaa"
                half-increments
                hover
                length="5"
                />
              <v-combobox v-model="formData.tastingTags" :items="this.tags.tastingTags" multiple chips :color="this.accent" deletable-chips :delimiters="[',', '.']" hide-no-data label='tastes of..' />
              <v-text-field
                v-model="formData.roaster"
                :color="this.accent"
                label="Roaster"
                required
              />
              <v-date-picker v-model="formData.roastDate" :color="this.accent" landscape no-title class="mb-4"/>
              <v-textarea v-model="formData.brewingNotes" :color="this.accent" no-resize height="120" label="Brewing Notes"/>
              <v-btn class="my-2" @click="submit" large :color="this.accent" block>submit</v-btn>
              <br>
              <v-btn class="my-2" @click="clear; setTimeout(() => { this.$router.push('/') }, 250)" color="#333" block>cancel</v-btn>
            </v-form>
          </v-card>
          <br>
          <br>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>

// 1628086737987: {
//   name: 'Wild & Wonderful',
//   rating: 3.5,
//   origins: ['etheopia'],
//   varietals: ['ruiru-11', 'sl-28'],
//   process: 'washed',
//   elevation: 0,
//   roaster: 'Khrat Coffee',
//   roastDate: '2021-08-27',
//   dateOBJ: '2021-08-04T14:18:57.987Z',
//   uuid: 1628086737987,
//   brewingNotes: 'Solid cup, brew at 1:14 on 35',
//   tastingTags: ['white grape', 'jasmine']
// }

export default {

  data () {
    return {
      fieldList: ['name'],
      formData: { // everything should be arrays so that the tag system works on everything
        name: '',
        origins: [],
        varietals: [],
        process: '',
        elevation: 0,
        roaster: '',
        roastDate: '',
        dateOBJ: {},
        uuid: '',
        brewingNotes: '',
        tastingTags: []
      }
    }
  },
  computed: {
    tags () {
      return this.$store.state.tags || { origins: [], varietals: [], processes: [], tastingTags: [] }
    },
    accent () {
      return this.$store.state.accent
    }
  },
  methods: {
    submit () {
      this.formData.dateOBJ = new Date()
      this.formData.uuid = this.formData.dateOBJ.getTime()
      this.$store.dispatch('addData', ['coffeeHistory', [this.formData.uuid, this.formData]])
      setTimeout(() => { this.$router.push('/library') }, 250)
    },
    clear () {
      this.$router.push('/library')
    }
  }
}
</script>
