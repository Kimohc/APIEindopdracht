<template>
<div>
  <my-header></my-header>
  <main>
    <div class="section2">
    <div class="service-card">
    <h2>Adpoteren</h2>
      <img src="/undraw_friends_r511.svg" alt="">
      <p>Het faciliteren van adopties voor dieren die klaar zijn om een
        nieuw thuis te vinden. Dit omvat het matchen van dieren met geschikte adoptanten,
        het uitvoeren van screeningsprocedures en het verstrekken van nazorgondersteuning.</p>
    <button> <router-link to="/dieren"> Adpoteer een dier!</router-link></button>
    </div>
    <div class="service-card">
      <h2>Knippen</h2>
      <img src="/undraw_barber_-3-uel.svg" alt="">
      <p>
        Het bieden van een veilige en comfortabele omgeving voor dieren die dakloos zijn of
        uit ongeschikte situaties komen. Dit omvat voedsel, water, onderdak en medische zorg
      </p>
      <button><a href="https://trimsalonhelmond.nl/">Laat je dier knippen!</a></button>
    </div>
    <div class="service-card">
      <h2>Medische zorg</h2>
      <img src="/undraw_doctors_p6aq.svg" alt="">
      <p>
        Dierenopvangen kunnen dieren voorzien van basisgezondheidszorg, zoals vaccinaties, ontworming
        , castratie en sterilisatie, en behandeling van ziekten en verwondingen
      </p>
      <button><a href="https://mcvoordieren.nl/">Laat je dier medische checken</a></button>
    </div>

    </div>
  </main>
  <my-footer></my-footer>
</div>
</template>
<script>
import MyHeader from "@/components/Header.vue";
import MyFooter from "@/components/Footer.vue";

export default {
  name: 'MyDieren',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'my-header': MyHeader,
    'my-footer': MyFooter
  },
  data() {
    return {

    }

  },
  methods: {
    // eslint-disable-next-line vue/no-dupe-keys

  },
  created() {
  }
}
</script>