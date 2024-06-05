<template>
  <div class="mb-10">
    <h2 class="text-lg font-bold text-primary-text-color self-start">Top Albums</h2>
    <div class="flex gap-4 overflow-y-hidden">
      <AlbumCard v-for="x in albumData" class="p-5" :albumDetail="x" linkto="album" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AlbumCard from '../cards/AlbumCard.vue'

const albumData = ref([])
const fetchAlbums = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/album/get/')
    const data = response.data
    albumData.value = data
  } catch (error) {
    console.error('Error fetching songs:', error)
  }
}

onMounted(fetchAlbums)
</script>
<style scoped>
@media (min-width: 768px) {
  .album-card {
    width: calc(33.33% - 1rem);
  }
}

@media (min-width: 1024px) {
  .album-card {
    width: calc(25% - 1rem);
  }
}
</style>
