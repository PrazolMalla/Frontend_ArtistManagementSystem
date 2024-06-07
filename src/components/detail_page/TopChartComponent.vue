<template lang="">
  <div class="mt-5 bg-light-primary-color h-[50vh] w-[80vw] p-6 lg:w-[30vw] md:h-[55vh] mb-5">
    <h1 class="mb-4 text-2xl font-semibold md:w-[60vw] text-primary-text-color">Top Chart</h1>
    <div v-for="(music, index) in musicData" :key="index">
      <RouterLink :to="'/music/' + music.id">
        <div
          class="w-[67vw] bg-transparent h-24 rounded-md md:w-[25vw] md:h-24 p-4 flex gap-5 hover:bg-secondary-color hover:text-light-primary-color text-primary-text-color cursor-pointer"
        >
          <img :src="`http://127.0.0.1:8000${music.img_profile}`" class="w-16 h-16 rounded-md" />

          <div class="flex flex-col md:flex-row md:justify-center md:gap-20 md:items-center">
            <div>
              <p class="md:text-lg font-semibold">{{ music.name }}</p>
              <p class="md:text-lg">{{ music.artist }}</p>
            </div>

            <p class="md:text-lg">{{ music.duration }}</p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, onMounted, watch } from 'vue'
import axios from 'axios'
const props = defineProps(['artistId'])
const musicData = ref([])
const fetchMusicData = async (artistId) => {
  try {
    console.log(artistId)
    const response = await axios.get('http://127.0.0.1:8000/api/music/artist/get/' + artistId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    musicData.value = response.data.splice(0, 3)
    console.log(musicData)
  } catch (error) {
    console.error('Failed to fetch music data:', error)
  }
}

onMounted(() => {
  fetchMusicData(props.artistId)
})

watch(
  () => props.artistId,
  (newArtistId) => {
    fetchMusicData(newArtistId)
  }
)
</script>
<style lang=""></style>
