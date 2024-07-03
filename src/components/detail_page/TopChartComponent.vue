<template lang="">
  <div
    class="mt-5 bg-light-primary-color h-[50vh] w-[80vw] p-6 lg:w-[30vw] md:h-[55vh] mb-5"
    :style="{
      backgroundColor: hexWithOpacity(`${user?.theme?.darkPrimaryColor}`, 0.5),
      boxShadow: user.theme ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
      backdropFilter: user.theme ? 'blur(4.9px)' : 'none',
      color: `${user?.theme?.secondaryColor}`
    }"
  >
    <h1 class="mb-4 text-2xl font-semibold md:w-[60vw]">Top Chart</h1>
    <div v-for="(music, index) in musicData" :key="index">
      <RouterLink :to="'/music/' + music.id">
        <div
          class="w-[67vw] bg-transparent h-24 rounded-md md:w-[25vw] md:h-24 p-4 flex gap-5 hover:bg-secondary-color hover:text-light-primary-color cursor-pointer"
        >
          <img :src="`${base_url}${music.img_profile}`" class="w-16 h-16 rounded-md" />

          <div class="flex flex-col md:flex-row md:justify-center md:gap-20 md:items-center">
            <div>
              <p class="md:text-lg font-semibold">{{ music.name }}</p>
              <p class="md:text-lg">{{ music.artist }}</p>
            </div>

            <p class="md:text-lg">{{ music.duration }}</p>
          </div>
        </div>
    </div>
    </div>
</template>
<script setup>
const base_url  = import.meta.env.VITE_BASE_API_URL;
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
const musicData = ref([])
const fetchMusicData = async (artistId) => {
  try {
    console.log(artistId)
    const response = await axios.get(`${base_url}/api/music/artist/get/` + artistId)
    musicData.value = response.data.splice(0, 3)
    console.log(musicData)
  } catch (error) {
    console.error('Failed to fetch music data:', error)
  }
}

function hexWithOpacity(hex, opacity) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase()
  return `${hex}${alpha}`
}



watch(
  () => props.user.id,
  (newArtistId) => {
    fetchMusicData(newArtistId)
  }
)
</script>
<style lang="">
    
</style>