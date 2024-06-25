<template>
  <div class="mb-10">
    <h2 class="text-lg font-bold text-primary-text-color self-start">Top Music</h2>
    <div class="flex gap-4 overflow-y-hidden">
      <MusicCard v-for="x in musicData" class="p-5" :musicData="x" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MusicCard from '@/components/cards/MusicCard-2.vue'
const base_url  = import.meta.env.VITE_BASE_API_URL;
const musicData = ref([])

const fetchSongs = async () => {
  try {
    const response = await axios.get(`${base_url}/api/music/get/`)
    const data = response.data.slice(0,5)
    musicData.value = data
  } catch (error) {
    console.error('Error fetching songs:', error)
  }
}

onMounted(fetchSongs)

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
