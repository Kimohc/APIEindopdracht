<template>
<div>
  <my-header></my-header>
  <my-main></my-main>
  <my-footer></my-footer>
</div>
</template>
<script>
import '/src/app.css';
import MyHeader from '/src/components/Header.vue';
import MyMain from '/src/components/Main.vue';
import MyFooter from '/src/components/Footer.vue';
export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'my-header': MyHeader,
    'my-main': MyMain,
    'my-footer': MyFooter
  },
  data() {
    return {
      title: "Hello World",
      msg: 'Welcome to Your Vue.js App',
    }

},
  methods: {
    // eslint-disable-next-line vue/no-dupe-keys
    onChanged(){
      this.msg = 'hello world'
    }
  },
  created(){
    this.onChanged()
  }

}
</script>