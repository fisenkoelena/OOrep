<script setup>
import TopNav from './components/TopNav.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div id="app">
    <TopNav />
    <router-view />
    <AppFooter />
  </div>
</template>