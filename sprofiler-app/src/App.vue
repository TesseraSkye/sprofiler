<template>
  <div id="app" class="bg-dark text-light vh-100">
    <b-navbar type="dark" fixed="bottom" class="bg-off-black shadow py-3">
      <!-- <router-link to="/" class="text-light"> -->
        <!-- <b-navbar-brand class="mx-4">'Sprofiler</b-navbar-brand> -->
      <!-- </router-link> -->

      <b-navbar-toggle target="navbar-toggle-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="mr-auto">
          <b-nav-item to="/">Link 1</b-nav-item>
          <b-nav-item href="/live">Link 2</b-nav-item>
        </b-navbar-nav>
    </b-collapse>

      <b-button to="settings" size="sm" class="float-right " variant="transparent">
        <b-icon-gear class="p-1 border rounded-circle border-dark bg-light grab" style="width: 22px; height: 22px;" variant="dark"/>
      </b-button>
    </b-navbar>
    <br>
    <transition name="fade" mode="out-in">
          <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'gemini',
  data () {
    return {
      //
    }
  },
  methods: {
    //
  }
  //
}
</script>

<style>
  /* CSS */

:not(input):not(textarea),
:not(input):not(textarea)::after,
:not(input):not(textarea)::before {
    -webkit-user-select: none;
    user-select: none;
    cursor: default;
}
input, button, textarea, :focus {
    outline: none;
}

  /* General Restyling */
.text-shadow-sm,
.text-shadow-small {
   text-shadow: 2px 2px 2px rgba(80, 80, 80, 0.1)
}
.text-shadow,
.text-shadow-md,
.text-shadow-medium {
   text-shadow: 4px 4px 4px rgba(80, 80, 80, 0.1)
}
.text-white {
  color: #fff;
}
.text-grey,
.text-gray {
  color: #6c757d;
}

.bg-off-black {
  background-color: #222 !important;
}

.bg-wilbur {
  background-color: rgb(62, 199, 62) !important;
}
.bg-light-pink {
  background-color: rgb(255,230,230) !important;
}
.bg-light-blue {
  background-color: rgb(230,230,255) !important;
}

.vh-75 {
  height: 75vh;
}
.vh-50 {
  height: 50vh;
}
.vh-25 {
  height: 25vh;
}
.vh-10 {
  height: 10vh;
}

.inverted {
  filter: invert(100%);
}

.text-center {
  text-align: center;
}

.fit-fill {
  object-fit: fill;
}
.fit-contain {
  object-fit: contain;
}
.fit-cover {
  object-fit: cover;
}
.fit-scale-down {
  object-fit: scale-down;
}
.fit-none {
  object-fit: none;
}
::placeholder {
  color: #f8f9fa !important;
  opacity: 1 !important;
}
input:active,
input:focus,
button:active,
button:focus {
  box-shadow: none !important;
}

a{
  text-decoration: none !important;
}

/* Transition Styling */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.75s;
}
.slide-up-enter, .slide-up-leave-to {
  transform: translateY(-100vh);
}

.custom-enter,
.custom-enter-active {
  transition-duration: 1s;
  transition-property: opacity transform;
  transition-timing-function: ease;
  opacity: 0;
  transform: translateY(-2vh);
}
.custom-leave,
.custom-leave-active {
  transition-duration: 1s;
  transition-property: opacity transform;
  transition-timing-function: ease;
  opacity: 0;
  transform: translateY(2vh);
}

/* .slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  transition-duration: 2s;
  transition-property: transform;
  transition-timing-function: ease-in-out;
  overflow: hidden;
}

.slide-up-enter,
.slide-down-leave-active {
  transform: translate(0, 100vh);
}

.slide-up-leave-active,
.slide-down-enter {
  transform: translate(0, -100vh);
} */

/* hovers */
.hover-light {
  background-color: #343a40 !important;
  color: #f8f9fa !important;
}
.hover-light:hover {
  background-color: #f8f9fa !important;
  color: #343a40 !important;
}
.hover-invert:hover {
  filter: invert(100%);
}

</style>
