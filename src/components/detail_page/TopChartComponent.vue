<template lang="">
  <div
    class="rounded-md  bg-light-primary-color p-6 lg:w-[30vw]  mb-5"
    :style="{
      backgroundColor: hexWithOpacity(`${user?.theme?.darkPrimaryColor}`, 0.5),
      boxShadow: user.theme ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
      backdropFilter: user.theme ? 'blur(4.9px)' : 'none',
      color: `${user?.theme?.secondaryColor}`
    }"
  >
    <h1 class="text-md font-semibold">Top Chart</h1>
    <div class="flex flex-row flex-wrap gap-5 flex-shrink-0">
      <RouterLink v-for="(music, index) in musicData" :key="index" :to="'/music/' + music.id" class="flex-grow lg:w-full bg-transparent rounded-md p-2 flex  gap-2  hover:bg-secondary-color hover:text-light-primary-color cursor-pointer ">
       
          <img :src="`${base_url}${music.img_profile}`" class="w-12 h-12 rounded-md" />

          <div class="flex flex-col md:flex-row md:justify-center gap-5 md:items-center">
            <div>
              <p class="text-sm font-semibold">{{ music.name }}</p>
              <p class="text-xs">{{ music.artist_name }}</p>
            </div>
        </div>
      </RouterLink>
  </div>
  </div>
</template>
<script setup>
const base_url = import.meta.env.VITE_BASE_API_URL;
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
    const response = await axios.get(`${base_url}/api/music/artist/get/` + artistId)
    musicData.value = response.data.splice(0, 3)
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
<style lang=""></style>
