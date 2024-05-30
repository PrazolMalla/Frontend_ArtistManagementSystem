<template>
  <div class="flex flex-row">
    <Sidebar/>
    <!-- <Navbar/> -->
  </div>
  
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue';
import Navbar from './components/Navbar.vue';
</script>


<style scoped>


</style>
