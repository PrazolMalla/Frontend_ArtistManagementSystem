<template lang="">
  <div
    class="mt-10 w-[80vw] h-24 bg-light-primary-color border-none px-5 pt-2 md:w-[22rem] md:h-[7rem] md:mt-20 lg:mt-24 lg:w-[50vw] lg:h-[10rem] lg:p-4 rounded-md"
  >
    <h1 class="font-semibold text-primary-text-color lg:text-lg">Latest Release</h1>
    <div class="flex flex-row gap-5">
      <div class="" v-for="(recent, index) in recentSongs" :key="index">
        <!-- <img
          :src="`http://127.0.0.1:8000${recent.img_profile}`"
          alt=""
          class="lg:w-20 lg:h-20 sm:w-16 sm:h-16 h-20 w-20 hover:border-4 mt-4 hover:cursor-pointer hover:border-secondary-color rounded-md"
        /> -->
        <RouterLink :to="'/music/' + recent.id">
          <div class="flex items-center gap-2">
            <img
              :src="`http://127.0.0.1:8000${recent.img_profile}`"
              alt=""
              class="lg:w-20 lg:h-20 sm:w-16 sm:h-16 h-20 w-20 hover:border-4 mt-4 hover:cursor-pointer hover:border-secondary-color rounded-md"
            />

            <div class="mt-6">
              <h1 class="text-lg font-semibold">{{ recent.name }}</h1>
              <h1 class="text-sm">{{ recent.release_at }}</h1>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, onMounted, watch } from 'vue'
import axios from 'axios'
const props = defineProps(['artistId'])
const recentSongs = ref([])
const fetchMusicData = async (artistId) => {
  try {
    console.log(artistId)
    const response = await axios.get('http://127.0.0.1:8000/api/music/artist/get/' + artistId, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    recentSongs.value = response.data.splice(0, 3).map((song) => {
      return {
        ...song,
        release_at: new Date(song.release_at).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      }
    })
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
