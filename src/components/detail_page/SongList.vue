<template lang="">
  <div>
    <div class="w-[50vw] h-[24rem] flex flex-col gap-2 items-start">
        <div v-if="description">
          <h1 class="text-md font-semibold  mb">Description</h1>
          <TextTruncate :text="description" class="text-xs"  length="100"/>
        </div>
      
     <div class="mt-4">
       <h1 class="text-lg text-primary-text-color font-semibold ">Musics</h1>
        <p class="text-xs text-primary-text-color  opacity-95">{{ songs.length }} Musics</p>
     </div>

      <div class="overflow-y-scroll w-[40vw] h-[40vh]">
        <div
          class="bg-transparent w-[30vw]  rounded-lg px-4 text-primary-text-color first-letter mt-4 hover:bg-secondary-color hover:text-dark-primary-color cursor-pointer"
          v-for="(music, index) in songs"
          :key="index"
        >
          <router-link :to="`/music/${music.id}`">
            <div class="flex items-center justify-between py-2">
              <div class="flex gap-4 items-center justify-center">
                <p class="font-semibold text-md">{{ index + 1 }}</p>
                 <img :src="`${base_url}${music.img_profile}`" class="w-12 h-12 rounded-md" />
                 <div>
                  <p class="text-sm font-semibold">{{ music.name }}</p>
                  <p class="text-xs">{{ music.artist_name }}</p>
                </div>
              </div>
              <p>{{ music.duration }}</p>
            </div>
            
          </router-link>

          
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import TextTruncate from '@/components/buttons/TextTruncate.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const base_url = import.meta.env.VITE_BASE_API_URL
const props = defineProps({
  musicId: {
    type: Number,
    required: true
  },
  description: {
    type: String

  }
})
const songs = ref([])
const fetchMusicData = async () => {
  try {
    const response = await axios.get(`${base_url}/api/music/get/album/${props.musicId}`)
    songs.value = response.data
  } catch (error) {
    console.error('Failed to fetch songs data:', error)
  }
}

onMounted(() => {
  fetchMusicData()

})
</script>
<style lang=""></style>
