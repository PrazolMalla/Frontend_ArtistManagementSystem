<template>
    <div class="w-full h-screen bg-dark-primary-color flex">
      <AdminStats class="w-3/4" /> 
      <AdminData class="w-1/4" />   
    </div>
  </template>
  
  <script>
  import AdminData from '@/components/AdminData.vue';
  import AdminStats from '@/components/AdminStats.vue';
  
  export default {
    name: 'AdminPage',
    components: {
      AdminData,
      AdminStats
    },
  }
  </script>
  
  <style scoped>

  </style>