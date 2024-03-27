<template>
<div id="app">
  <my-header></my-header>
  <main class="dier-main">
    <h1>Beschikbare dieren:</h1>
    <div class="dier-section">
  <div v-for="dier in dieren" :key="dier.id" class="dierCard">
    <h3>{{dier.Naam}}</h3>
    <img :src="dataUrl">
    <h5>Ras: {{dier.Ras}}</h5>
    <h5 v-if="dier.Geslacht == 1">Geslacht: Man</h5>
    <h5 v-else>Geslacht: Vrouw</h5>
    <h5>Leeftijd : {{dier.Leeftijd}}</h5>
    <h5>Commentaar:</h5>
    <p>{{dier.Commentaar}}</p>
    <button>Maak een reserveringen om kennis te maken met {{dier.Naam}}</button>
  </div>
    </div>
  </main>
  <my-footer></my-footer>
</div>
</template>
<script>
import '/src/app.css';
import MyHeader from "@/components/Header.vue";
import MyFooter from "@/components/Footer.vue";
import axios from "axios";

export default {
  name: 'MyDieren',
  props: {
    order: {
      type: Number,
      default: 0
    },

    limit: {
      type: Number,
      default: 0
    },
    offset: {
      type: Number,
      default: 0
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'my-header': MyHeader,
    'my-footer': MyFooter
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      dieren : [],
    }

  },
  methods: {
    // eslint-disable-next-line vue/no-dupe-keys
    onChanged(){
      this.msg = 'hello world'
    },
    async GetDieren(){
      try {
        const response = await axios.get('http://localhost:8081/api/dieren', {
          params: {
            order: this.order || null,
            limit: this.limit || null,
            offset: this.offset || null
          }
        });
        this.dieren = response.data;
      } catch (error) {
        console.error('Error fetching dieren:', error);
      }
    },


  },
  created(){
    this.onChanged()
    this.GetDieren()
  },


}

</script>