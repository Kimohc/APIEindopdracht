<template>
<div>
  <my-header></my-header>
  <main class="section3">
  <div class="login-card">
    <h2>Login</h2>
    <form action="">
    <input type="text" required v-model="LoginGebruikersnaam">
    <input type="password" required v-model="LoginWachtwoord">
      <input type="submit" value="Login" >
    </form>
  </div>
    <div class="login-card2">
        <h2>Registreer</h2>
      <input type="text" required v-model="Naam">
      <input type="text" required v-model="RegistreerGebruikersnaam">
      <input type="password" required v-model="RegistreerWachtwoord">
        <button type="submit" value="Registreer" @click="Registreer">Registreer</button>
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
      const response = await axios.get('http://localhost:8081/api/login', {
        Gebruikersnaam: this.LoginGebruikersnaam,
        Wachtwoord: this.LoginWachtwoord
      });
      console.log(response);
      console.log("ingelogd")
    }
  },
  created() {
  }
}
</script>