<template>
<div id="app" class="modal-vue">
  <my-header></my-header>
  <main class="dier-main">
    <h1>Beschikbare dieren:</h1>
    <div class="dier-section">
  <div v-for="dier in dieren" :key="dier.Dier_Id" class="dierCard">


    <h3>{{dier.Naam}}</h3>
    <h5>Ras: {{dier.Ras}}</h5>
    <h5 v-if="dier.Geslacht == 1">Geslacht: Man</h5>
    <h5 v-else>Geslacht: Vrouw</h5>
    <h5>Leeftijd : {{dier.Leeftijd}}</h5>
    <h5>Commentaar:</h5>
    <p>{{dier.Commentaar}}</p>
    <button @click="showModals(dier)">Maak een reserveringen om kennis te maken met {{dier.Naam}}</button>
  </div>

    </div>
    <div class="overlay" v-if="showModal" @click="showModal = false"></div>

    <div class="modal" v-if="showModal">
      <div v-for="accounts in Account" :key="accounts.Gebruiker_Id">
      <button class="close" @click="showModal = false">x</button>
      <h3>{{ selectedDier.Naam }}</h3>

      <button @click="MaakReservatie(selectedDier, accounts)">Maak reservatie aan</button>
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
    },
    overige:{
      type: String,
      default: null
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
      showModal: false,
      selectedDier: null,
      LoggedIn: false,
      Account: {},
      Reserveringen: [],
    }

  },

  methods: {
    // eslint-disable-next-line vue/no-dupe-keys
    async GetDieren(){
      try {
        const response = await axios.get('http://localhost:8081/api/dieren', {
          params: {
            order: this.order || null,
            limit: this.limit || null,
            offset: this.offset || null,
            overige: this.overige || null
          }
        });
        this.dieren = response.data;
        console.log(this.overige)
        console.log(this.order)

      } catch (error) {
        console.error('Error fetching dieren:', error);
      }
    },
    showModals(d){
      console.log(this.LoggedIn)
      if(!this.LoggedIn){
        alert("Je moet ingelogd zijn om een reservering te maken")
        return
      }
      this.selectedDier = d;
      this.showModal = true;
    },



    async MaakReservatie(dier, account){

      for (let reservering of this.Reserveringen) {
        if (reservering.Dier_Id === dier.Dier_Id) {
          alert('Dit dier is al geserveerd')
          this.showModal = false
          return
        }
        console.log(reservering)
      }
        const response = await axios.post('http://localhost:8081/api/reserveringen', {
    Voornaam: account.Naam,
    Gebruiker_Id: account.Gebruiker_Id,
    Dier_Id: dier.Dier_Id,
  })
  console.log(response)
  alert('Reservatie aangemaakt')
      this.showModal = false

    },
    async getReservaties(){

        const response = await axios.get('http://localhost:8081/api/reserveringen')
        this.Reserveringen = response.data
        console.log(this.Reserveringen)

    },
  },
  created(){
    this.GetDieren()
    this.getReservaties()

  },

  mounted() {
    this.LoggedIn = this.$store.getters.getLoggedIn
    this.Account = this.$store.getters.getAccount
  },

}

</script>