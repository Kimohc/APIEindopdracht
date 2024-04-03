<template>
<main class="section1">
  <div class="card">
    <h2>Honden</h2>
    <img src="/undraw_dog_c7i6.svg" alt="">
    <button><router-link to="/dieren?order=2">Zie honden </router-link></button>
  </div>
  <div class="card">
    <h2>Katten</h2>
    <img src="/undraw_cat_epte.svg" alt="">
    <button><router-link to="/dieren?order=1"> Zie katten</router-link></button>
  </div>
  <div class="card">
    <h2>Overige</h2>
    <img src="/undraw_fish_bowl_uu88.svg" alt="fdsf">
   <button><router-link to="/dieren?overige=3,4,5,6,7"> Zie overige dieren </router-link></button>
  </div>
</main>
</template>
<script>
import '/src/app.css';
export default {
  name: 'MyMain',
  data() {
    return {
      title: 'My Main',
      message: 'This is my custom Vue component!',
      props: [],
    };
  },
};
</script>
<style>

</style>
