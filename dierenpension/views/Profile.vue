<template>
  <div>
    <my-header></my-header>
    <main class="dier-main">
      <h2>Profielpagina</h2>
      <div v-for="accounts in Accounts" :key="accounts.Gebruiker_Id" class="dierCard">
        <h3>Naam: {{ accounts.Naam }}</h3>
        <h5>Gebruikersnaam: {{ accounts.Gebruikersnaam }}</h5>
        <h5>Wachtwoord: {{ accounts.Wachtwoord }}</h5>
        <h5>Rol: {{ accounts.Rol }}</h5>
        <h2>Reserveringen</h2>
        <div v-for="reservering in Reserveringen" :key="reservering.Reservering_Id">
          <div class="reservering-card" >
            <h5>{{ reservering.Reservering_Id }}</h5>
            <h5>{{ getDierNaam(reservering.Dier_Id) }}</h5>
            <button @click="annuleerReservering(reservering.Reservering_Id)">Annuleer reservering</button>
          </div>
        </div>

      </div>
      <div v-if="isEmpty">
        <h2>Geen reserveringen geplaatst</h2>
      </div>
    </main>
    <my-footer></my-footer>
  </div>
</template>
<script>
import '/src/app.css';
import MyHeader from '/src/components/Header.vue';
import MyFooter from '/src/components/Footer.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'my-header': MyHeader,
    'my-footer': MyFooter
  },
  data() {
    return {
      LoggedIn: false,
      Accounts: [],
      Reserveringen: [],
      Dieren: [],
      isEmpty:  false,
    }
  },
  mounted() {
    this.LoggedIn = this.$store.getters.getLoggedIn
    this.Accounts = this.$store.getters.getAccount
    this.getAccountReserveringen()
    this.getAlleDieren()

  },
  methods: {
    async getAccountReserveringen() {
      for(let account of this.Accounts) {
        const check = await axios.get(`http://localhost:8081/api/reservering/${account.Gebruiker_Id}/isEmpty`)
        this.isEmpty = check.data.isEmpty
      }
      if(this.isEmpty){
        this.Reserveringen = []
        return
      }

      for (let account of this.Accounts) {
        const response = await axios.get(`http://localhost:8081/api/gebruiker/${account.Gebruiker_Id}/dieren`)
        this.Reserveringen = response.data

      }
    },
    async getAlleDieren() {
      const response = await axios.get('http://localhost:8081/api/dieren')
      this.Dieren = response.data
    },
    getDierNaam(dierId) {
      const dier = this.Dieren.find(dier => dier.Dier_Id === dierId);
      return dier ? dier.Naam : 'Dier not found';
    },
    annuleerReservering(reserveringId) {
      axios.delete(`http://localhost:8081/api/reservering/${reserveringId}`).then(() => {
        this.getAccountReserveringen(); // Fetch reservations after deletion
      }).catch(error => {
        console.error('Error deleting reservation:', error);
      });
    }
    },
  created() {
    console.log(this.$store.getters.getLoggedIn)

  }
}
</script>