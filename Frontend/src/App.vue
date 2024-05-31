<template>
  <Sidebar/>
  <MobileMenuBar/>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue';
import MobileMenuBar from './components/MobileMenuBar.vue';
</script>


<style scoped>


</style>
