<template>
<div>
  <my-header :logged-in="LoggedIn" :account="Account"></my-header>
  <main class="section3">
  <div class="login-card">
    <h2>Login</h2>
    <input type="text" required v-model="LoginGebruikersnaam">
    <input type="password" required v-model="LoginWachtwoord">
      <button @click="Login">Login</button>
  </div>
    <div class="login-card2">
        <h2>Registreer</h2>
      <input type="text" required v-model="Naam">
      <input type="text" required v-model="RegistreerGebruikersnaam">
      <input type="password" required v-model="RegistreerWachtwoord">
        <button  @click="Registreer">Registreer</button>
    </div>
  </main>
  <my-footer></my-footer>
</div>
</template>
<script>
import MyHeader from "@/components/Header.vue";
import MyFooter from "@/components/Footer.vue";
import axios from "axios";
export default {
  name: 'MyDieren',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'my-header': MyHeader,
    'my-footer': MyFooter
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      Naam: '',
      RegistreerGebruikersnaam: '',
      RegistreerWachtwoord: '',
      LoginGebruikersnaam:'',
      LoginWachtwoord:'',
      Account: {},
      LoggedIn: false,

    }

  },
  methods: {
    async Registreer(){
      const response = await axios.post('http://localhost:8081/api/gebruikers', {
        Naam: this.Naam,
        Gebruikersnaam: this.RegistreerGebruikersnaam,
        Wachtwoord: this.RegistreerWachtwoord,
        Rol: 1
      });
      console.log(response);
    },
    async Login(){
      const response = await axios.post('http://localhost:8081/api/login', {
        Gebruikersnaam: this.LoginGebruikersnaam,
        Wachtwoord: this.LoginWachtwoord
      });
      this.Account = response.data;
      console.log(response);
      console.log(this.Account)
      if(response){
        alert('U bent ingelogd')
        this.$store.commit('setLoggedIn', true);
        this.$store.commit('setAccount', this.Account);
        this.$router.push('/');

        console.log(this.$store.state.loggedIn);
        console.log(this.$store.state.account);
      }
    }

  },
  mounted() {
    this.LoggedIn = this.$store.getters.getLoggedIn
    this.Account = this.$store.getters.getAccount
  },
  created() {

  },

}
</script>