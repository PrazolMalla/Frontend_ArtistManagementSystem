<template>
  <div class="flex justify-end mr-16 bg-light-primary-color">
    <div class="card">
      <h2 class="text-xl font-bold mb-4">New Albums</h2>
      <div class="max-h-64 overflow-y-auto">
        <div v-for="(album, index) in newAlbums" :key="index" class="flex items-center mb-2 hover:text-button-color">
          <img :src="album.albumCover" :alt="album.title" class="w-12 h-12 rounded-full mr-2">
          <div>
            <div>{{ album.title }}</div>
            <div class="text-sm text-gray-500">{{ album.artist }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const newAlbums = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    newAlbums.value = response.data.map(user => ({
      title: user.name,
      artist: user.username,
      albumCover: `https://i.pravatar.cc/150?u=${user.id}`
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<style scoped>
.card {
  
  padding: 1.5rem;
  border-radius: 0.5rem;
  color: white;
  width: 20rem; /* Adjust width as needed */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
