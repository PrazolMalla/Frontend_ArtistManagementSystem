<template>
    <div class="bg-secondary-color p-4 pl-16 text-white rounded w-96">
      <h2 class="text-xl font-bold mb-4">New Artists</h2>
      <div class="max-h-64 overflow-y-auto">
        <div v-for="(artist, index) in newArtists" :key="index" class="flex items-center mb-2  hover:text-button-color">
          <img :src="artist.photo" :alt="artist.name" class="w-12 h-12 rounded-full mr-2">
          <div>
            <div>{{ artist.name }}</div>
            <div class="text-sm text-gray-500">{{ artist.stageName }}</div>
          </div>
        </div>
      </div>
    </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const newArtists = ref([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      newArtists.value = response.data.map(user => ({
        name: user.name,
        stageName: user.username,
        photo: `https://i.pravatar.cc/150?u=${user.id}`
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  </script>
  
  