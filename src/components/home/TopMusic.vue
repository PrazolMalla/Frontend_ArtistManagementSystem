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

const musicData = ref([])

const fetchSongs = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/music/get/')
    const data = response.data.slice(0,5)
    musicData.value = data
  } catch (error) {
    console.error('Error fetching songs:', error)
  }
}

onMounted(fetchSongs)

// const musicData = ref([
//   { id: 1, name: 'Music 1', album: '1', artist: '1' },
//   { id: 2, name: 'Music 2', album: '1', artist: '2' },
//   { id: 3, name: 'Music 3', album: '1', artist: '3' },
//   { id: 4, name: 'Music 4', album: '1', artist: '4' },
//   { id: 5, name: 'Music 5', album: '1', artist: '5' },
//   { id: 6, name: 'Music 6', album: '1', artist: '6' }
// ])
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
