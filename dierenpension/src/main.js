import Vue from 'vue';
import App from '/views/App.vue';
import router from './router'; // Import the router instance

new Vue({
  el: '#app',
  router, // Use the router instance
  render: h => h(App)
});