import Vue from 'vue'
// @ts-ignore
import App from './App.vue'
import router from './router'
import store from './store'

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')


front.send("hello from front");

front.on("hello from back", function(msg){
	console.log(msg);
	$('#msg').html(msg);
});
