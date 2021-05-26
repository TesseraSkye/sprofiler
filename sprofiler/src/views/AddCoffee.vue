<template>
  <v-container>
      <v-row>
        <v-col>
          <v-card elevation="10" outlined class="my-2">
          <!-- <v-card-title>
            <h2>Add a new coffee!</h2>
          </v-card-title>
          <v-divider/> -->
            <v-form class="mx-2" ref="form" @submit.prevent="submit">
              <v-text-field
                v-model="formData.name"
                :counter="50"
                label="Name"
                required
              />
              <v-rating
              v-model="formData.rating"
              class="mb-2"
              :color="this.getAccent"
              large
              half-increments
              background-color="#aaa"
              hover
              length="5"
            />
              <v-textarea v-model="formData.comments" no-resize height="120" label="Comments"/>
              <v-btn class="my-2" @click="submit" large color="green" block>submit</v-btn>
              <br>
              <br>
              <br>
              <v-btn class="my-2" @click="clear; setTimeout(() => { this.$router.push('/') }, 250)" color="red" block>clear</v-btn>
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
//   roastLocation: 'Oregon',
//   roastDate: '04/25/21',
//   date: '05/02/21 : 09:51:30',
//   uuid: 'sdf7g68dsfg8s',
//   rating: 4,
//   favorite: true,
//   comments: '',
//   tastingNotes: 'Very fruity, quite sweet',
//   tastingTags: 'blueberries, sugar'
// }

export default {
  data () {
    return {
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
  }
}
</script>
