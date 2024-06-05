<template>
  <div class="flex flex-col items-center p-8 overflow-x-hidden">
    <h2 class="text-3xl font-bold mb-4 text-secondary-color">Top Artists</h2>
    <div class="flex space-x-4">
      <div
        v-for="artist in artists"
        :key="artist.id"
        class="artist-card w-[18rem] transform hover:scale-105 transition-transform duration-300"
      >
        <div class="flex flex-col gap-2 items-center p-4 overflow-x-hidden">
          <div
            class="w-52 h-52 rounded-full flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            <img
              :src="`http://127.0.0.1:8000${artist.img_profile}`"
              alt="Artist Image"
              class="w-48 h-48 rounded-full object-cover border-none bg-secondary-color z-10"
            />
          </div>
          <h3 class="text-xl font-semibold text-center">{{ artist.username }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const artists = ref([])

const fetchArtists = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/artist/get/')
    const data = await response.json()
    artists.value = data.map(artist => ({
      id: artist.id,
      username: artist.username,
      img_profile: artist.img_profile
    }))
  } catch (error) {
    console.error('Error fetching artists:', error)
  }
}

onMounted(fetchArtists)
</script>

<style scoped>
@media (min-width: 768px) {
  .artist-card {
    width: calc(33.33% - 1rem);
  }
}

@media (min-width: 1024px) {
  .artist-card {
    width: calc(25% - 1rem);
  }
}
</style>
