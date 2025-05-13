<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />

  <router-view /> <!-- Ici s'affichera Machine.vue ou autre -->

  <Footer />
</template>

<style scoped></style>
