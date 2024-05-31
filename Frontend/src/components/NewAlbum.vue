<template>
  <div class="bg-secondary-color p-4 pl-16 text-white rounded w-96">
    <h2 class="text-xl font-bold mb-4">New Albums</h2>
    <div class="max-h-64 overflow-y-auto">
      <div v-for="(album, index) in newAlbums" :key="index" class="flex items-center mb-2  hover:text-button-color">
        <img :src="album.albumCover" :alt="album.title" class="w-12 h-12 rounded-full mr-2">
        <div>
          <div>{{ album.title }}</div>
          <div class="text-sm text-gray-500">{{ album.artist }}</div>
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
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos?albumId=1');
    newAlbums.value = response.data.map(album => ({
      title: album.title,
      artist: album.title,
      albumCover: album.url
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>
