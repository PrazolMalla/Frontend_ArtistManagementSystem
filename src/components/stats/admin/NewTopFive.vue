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
            <img :src="album.img_profile" :alt="album.title" class="w-12 h-12 rounded-full mr-2" />
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
        <h2 class="text-xl font-bold mb-4 text-center text-primary-text-color">New Songs</h2>
        <div class="max-h-40 overflow-y-auto custom-scrollbar">
          <div
            v-for="(song, index) in newMusic"
            :key="index"
            class="flex items-center mb-2 hover:text-button-color"
          >
            <img :src="song.img_profile" :alt="song.title" class="w-12 h-12 rounded-full mr-2" />
            <div>
              <div class="text-primary-text-color">{{ song.title }}</div>
              <div class="text-sm text-secondary-color">{{ song.artist }}</div>
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
const newMusic = ref([])

onMounted(async () => {
  try {
    const artistResponse = await axios.get('http://127.0.0.1:8000/api/user/newly-joined-artists/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      }
    })
    newArtists.value = artistResponse.data.map((artist) => ({
      name: artist.firstname + ' ' + artist.lastname,
      // stageName: artist.username,
      photo: artist.img_profile 
    }))

    const albumResponse = await axios.get('http://127.0.0.1:8000/api/user/newly-joined-album/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      }
    })
    newAlbums.value = albumResponse.data.map((album) => ({
      title: album.name,
      artist: album.artist.username,
      img_profile: album.img_profile
    }))

    const musicResponse = await axios.get('http://127.0.0.1:8000/api/user/newly-joined-music/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      }
    })
    newMusic.value = musicResponse.data.map((music) => ({
      title: music.name,
      artist: music.artist.username,
      img_profile: music.img_profile
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
