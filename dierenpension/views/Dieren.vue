<template>
<div id="app" class="modal-vue">
  <my-header ></my-header>
  <main class="dier-main">

    <h1>Beschikbare dieren:</h1>
    <div class="overlay" v-if="showModal" @click="showModal = false"></div>

    <div class="modal" v-if="showModal">
      <div v-for="accounts in Account" :key="accounts.Gebruiker_Id">
        <button class="close" @click="showModal = false"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="currentColor" /></svg></button>
        <h3>{{ selectedDier.Naam }}</h3>
        <h5>Ras: {{ selectedDier.Ras }}</h5>
        <p v-if="selectedDier.Aandoeningen">Aandoeningen: {{selectedDier.Aandoeningen}}</p>
        <p v-else>Aandoeningen: Geen aandoeningen</p>
        <button class="reserve" @click="MaakReservatie(selectedDier, accounts)">Maak reservatie aan</button>
      </div>
    </div>
    <div class="dier-section">

  <div v-for="dier in dieren" :key="dier.Dier_Id" class="dierCard">
    <h3>{{dier.Naam}}</h3>
    <h5>Ras: {{dier.Ras}}</h5>
    <h5 v-if="dier.Geslacht == 1">Geslacht: Man</h5>
    <h5 v-else>Geslacht: Vrouw</h5>
    <h5>Leeftijd : {{dier.Leeftijd}}</h5>
    <h5>Commentaar:</h5>
    <p>{{dier.Commentaar}}</p>
    <div v-if="dier.Foto">
    <img :src="dier.Foto">
    </div>
    <div v-else>
      <h2>Geen afbeelding beschikbaar</h2>
    </div>
    <button @click="showModals(dier)">Maak een reserveringen om kennis te maken met {{dier.Naam}}</button>
  </div>

      <div class="arrows" v-if="alleDieren.length > 3">
        <svg @click="goBack"  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.64872 7.72528L0.398926 11.9608L4.63443 16.2105L6.05103 14.7987L4.23673 12.9783L16.1027 13.019L19.3585 16.2747L23.6011 12.0321L19.3585 7.78945L16.1289 11.019L4.21801 10.9782L6.06055 9.14188L4.64872 7.72528ZM17.9443 12.0321L19.3585 10.6179L20.7727 12.0321L19.3585 13.4463L17.9443 12.0321Z" fill="currentColor" /></svg>
        <svg @click="goNext" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.9865 11.9929L18.7511 16.2426L17.3345 14.8308L19.1488 13.0104L7.0314 13.0519L7.04038 15.0507L1.04044 15.0777L1.01349 9.07773L7.01343 9.05079L7.02242 11.0519L19.1674 11.0103L17.3249 9.17398L18.7367 7.75739L22.9865 11.9929ZM3.02245 11.0687L3.03143 13.0687L5.03141 13.0597L5.02243 11.0597L3.02245 11.0687Z" fill="currentColor" /></svg>
      </div>
      <div v-else>
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
      isEmpty: false,
      Offset: 0,
      alleDieren: [],
    }

  },

  methods: {
    // eslint-disable-next-line vue/no-dupe-keys
    async GetAlleDieren(){
      try {
        const response = await axios.get('http://localhost:8081/api/dieren', {
          params:{
            order: this.order || null,
            overige: this.overige || null
          }
        })

        this.alleDieren = response.data
        console.log(this.alleDieren.length)
      } catch (error) {
        console.error('Error fetching dieren:', error);
      }
    },
    async GetDieren(){

      try {
        const response = await axios.get('http://localhost:8081/api/dieren', {
          params: {
            order: this.order || null,
            limit: this.limit || null,
            offset: this.Offset || null,
            overige: this.overige || null
          }
        });
        this.dieren = response.data;

      } catch (error) {
        console.error('Error fetching dieren:', error);
      }
    },
    goNext(){
      if(this.Offset > this.alleDieren.length - 4){
        alert("Geen dieren meer beschikbaar")
        return
      }
      this.Offset += 3
      this.GetDieren()
      console.log(this.Offset)
      console.log(this.alleDieren.length)
    },
    goBack(){
      if(this.Offset < 1){
        alert("Geen dieren meer beschikbaar")
        return
      }
      this.Offset -= 3
      this.GetDieren()
    },

    showModals(d){
      if(!this.isEmpty){
        this.getReservaties();
        console.log(this.Reserveringen)
      }
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
      async checkReservaties()
      {
        const response = await axios.get('http://localhost:8081/api/reserveringen/isEmpty')
        this.isEmpty = response.data.isEmpty
        console.log(this.isEmpty)

      }
  },
  created(){
    this.GetDieren()
    this.checkReservaties()
    this.GetAlleDieren()
  },

  mounted() {
    this.LoggedIn = this.$store.getters.getLoggedIn
    this.Account = this.$store.getters.getAccount

  },

}

</script>