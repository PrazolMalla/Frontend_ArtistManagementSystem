<template>
  <div class="md:p-8 w-full flex justify-start bg-dark-primary-color">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="card w-full bg-light-primary-color">
        <h2 class="text-xl font-bold mb-4 text-center text-primary-text-color">New Albums</h2>
        <div class="max-h-40 overflow-y-auto custom-scrollbar">
          <div
            v-for="(album, index) in newAlbums"
            :key="index"
            class="flex items-center mb-2 hover:text-button-color"
          >
            <img :src="album.albumCover" :alt="album.title" class="w-12 h-12 rounded-full mr-2" />
            <div>
              <div class="text-primary-text-color">{{ album.title }}</div>
              <div class="text-sm text-secondary-color">{{ album.artist }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-light-primary-color">
        <h2 class="text-xl font-bold mb-4 text-center text-primary-text-color">New Artists</h2>
        <div class="max-h-40 overflow-y-auto custom-scrollbar">
          <div
            v-for="(artist, index) in newArtists"
            :key="index"
            class="flex items-center mb-2 hover:text-button-color"
          >
            <img :src="artist.photo" :alt="artist.name" class="w-12 h-12 rounded-full mr-2" />
            <div>
              <div class="text-primary-text-color">{{ artist.name }}</div>
              <div class="text-sm text-secondary-color">{{ artist.stageName }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-light-primary-color">
        <h2 class="text-xl font-bold mb-4 text-center text-primary-text-color">New Bands</h2>
        <div class="max-h-40 overflow-y-auto custom-scrollbar">
          <div
            v-for="(band, index) in newBands"
            :key="index"
            class="flex items-center mb-2 hover:text-button-color"
          >
            <img :src="band.bandPhoto" :alt="band.bandName" class="w-12 h-12 rounded-full mr-2" />
            <div>
              <div class="text-primary-text-color">{{ band.bandName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const newAlbums = ref([])
const newArtists = ref([])
const newBands = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    newAlbums.value = response.data.map((user) => ({
      title: user.name,
      artist: user.username,
      albumCover: `https://i.pravatar.cc/150?u=${user.id}`
    }))
    newArtists.value = response.data.map((user) => ({
      name: user.name,
      stageName: user.username,
      photo: `https://i.pravatar.cc/150?u=${user.id}`
    }))
    newBands.value = response.data.map((user) => ({
      bandName: user.name,
      bandPhoto: `https://i.pravatar.cc/150?u=${user.id}`
    }))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<style scoped>
.card {
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  overflow: hidden;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 0.5rem;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #ece6d5;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #ff4000;
  border-radius: 1rem;
  border: 3px solid #ece6d5;
}
</style>
