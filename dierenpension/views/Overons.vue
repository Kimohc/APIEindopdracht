<template>
<div>
  <my-header></my-header>
  <main>Overonspagina</main>
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
      msg: 'Welcome to Your Vue.js App',

    }

  },
  methods: {

  },
  created() {
    this.onChanged()
    this.GetDieren()
  }
}
</script>