import Vue from 'vue';
import App from '/views/App.vue';
import router from './router'; // Import the router instance
import store from './store'; // Import the store instance

new Vue({
  el: '#app',
  router, // Use the router instance
  store,
  render: h => h(App)
});