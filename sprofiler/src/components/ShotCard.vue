<template>
  <v-row>
      <v-col>
        <v-card @click="this.toggleOverlay" shaped elevation="10" color="#262626">
          <v-card-title>
            <h3>{{this.data.name}}</h3>
          </v-card-title>
          <v-card-subtitle>{{this.data.date}}</v-card-subtitle>
          <chart-handler sleek="true" :class="[this.overlay ? 'blur' : '']" :data='this.data'/>
          <v-fade-transition>
            <v-overlay
                class="zh-90"
                v-if="this.overlay"
                absolute
                opacity=0.3
                :color="this.getAccent">
              <v-card-text>
                <h4>Note: {{this.data.notes || "none"}}</h4>
              </v-card-text>
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
              <br>
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
    },
    getAccentRaw () {
      return this.$store.state.accentRaw
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
<style>
.blur {
  filter: blur(3px);
}
</style>
