<template>
  <div class="mb-10">
    <h4 class="text-lg font-bold text-primary-text-color self-start">Top Artists</h4>
    <div class="flex overflow-y-hidden">
      <ArtistCard v-for="x in artistData"  :artistData="x" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ArtistCard from '@/components/cards/ArtistCard.vue'
const base_url  = import.meta.env.VITE_BASE_API_URL;
const artistData = ref([])

const fetchArtists = async () => {
  try {
    const response = await fetch(`${base_url}/api/artist/get/`)
    const data = await response.json()
    artistData.value = data.map((artist) => ({
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
.artistGradient {
  background: linear-gradient(45deg, #ff4000bb, #ece6d59d);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.artistPic {
  width:20px;
  height: 1/1;
}

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
