<template>
  <v-row>
      <v-col>
        <v-card @click="this.toggleOverlay" elevation="10">
          <v-card-title>
            <h3>{{this.data.name}}</h3>
          </v-card-title>
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
          <v-card-text>
            <h4>Note: {{this.data.notes || "none"}}</h4>
            <h4>Pulled on {{this.data.date}}</h4>
          </v-card-text>
          <chart-handler :data='this.data'/>
          <v-fade-transition>
            <v-overlay
                class="zh-90"
                v-if="this.overlay"
                absolute :color="this.getAccent + ' lighten-2'">
                <v-btn @click="this.compare" class="mx-2" :color="this.getAccent">Compare</v-btn>
                <v-btn @click="setDialog(true)" class="mx-2" color="red">Remove</v-btn>
              </v-overlay>
          </v-fade-transition>
          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="headline red">
                Erase Shot?
              </v-card-title>

              <v-card-text class="my-2">
                Are you sure you want to do this? This action can not be undone.
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="remove()"
                >
                  Sure
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
import ChartHandler from './ChartHandler.vue'
export default {
  name: 'shot-card',
  props: ['data'],
  components: {
    ChartHandler
  },
  data () {
    return {
      shotData: {},
      overlay: false,
      dialog: false
    }
  },
  computed: {
    getAccent () {
      return this.$store.state.accent
    }
  },
  methods: {
    compare () {
      this.$store.dispatch('setData', ['overlayUUID', this.data.uuid])
      setTimeout(() => { this.$router.push('/live') }, 200)
    },
    remove () {
      this.dialog = false
      this.$store.dispatch('removeData', ['shotHistory', [this.data.uuid]])
      setTimeout(() => { this.$router.push('/') }, 200)
    },
    setDialog (bool) {
      this.dialog = bool
    },
    toggleOverlay () {
      if (this.overlay === true) { this.overlay = false } else { this.overlay = true }
    }
  }
}
</script>
