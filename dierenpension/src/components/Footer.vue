<template>
  <footer>

    <ul>
      Services
      <li> <router-link to="/dieren?limit=3&offset=0"> Adpoteer</router-link></li>
      <li><a href="#">Steun een asiel</a></li>
      <li> <router-link to="/inloggen"> Inloggen</router-link></li>
      <li> <router-link to="/inloggen"> Registreren</router-link></li>
      <li><a href="#">Meld je aan voor onze nieuwsbrief</a></li>
    </ul>

    <ul>
      Dieren
     <li> <router-link to="/dieren?order=2&limit=3&offset=0">Honden </router-link>   </li>
      <li><router-link to="/dieren?order=1&limit=3&offset=0">Katten </router-link></li>
      <li><router-link to="/dieren?overige=3,4,5,6,7&limit=3&offset=0">Overige </router-link></li>
    </ul>


    <ul>
      FAQ
      <li v-for="(faq, index) in faqs" :key="index">
        <h4 @click="toggleActive(index)">{{ faq.question }}</h4>
        <p v-show="faq.isActive" class="List-content">{{ faq.answer }}</p>
      </li>
    </ul>
    <ul>
      Over Ons
      <li><a href="#">Locatie &amp; Openingstijden: Ma-Vri 8-17, Za & Zon gesloten</a></li>
      <li><a href="#">Telefoonnummer: +316547353</a></li>
    </ul>


  </footer>
</template>
<script>
export default {
  name: 'MyFooter',

  data() {
    return {
      title: 'My Component',
      message: 'This is my custom Vue component!',
      faqs: [
        { question: 'Hoe kan ik een dier adopteren?', answer: 'U kunt onze beschikbare dieren bekijken op onze website en vervolgens contact met ons opnemen om een afspraak te maken voor een kennismaking.', isActive: false },
        { question: 'Wat zijn de adoptie voorwaarden?', answer: 'Onze adoptievoorwaarden variëren per dier, maar over het algemeen vereisen we een huisbezoek, een adoptiecontract en een adoptiebijdrage om de zorgkosten te helpen dekken.', isActive: false },
        { question: 'Wat is inbegrepen bij de adoptiekosten?', answer: 'De adoptiekosten dekken doorgaans de basisvaccinaties, ontworming, castratie/sterilisatie en een microchip voor identificatie van het dier.', isActive: false }
      ]
    };
  },
  methods: {
    toggleActive(index) {
      this.faqs.forEach((faq, i) => {
        if (i === index) {
          faq.isActive = !faq.isActive;
        } else {
          faq.isActive = false; // Sluit alle andere items
        }
      });
    }
  }
};
</script>