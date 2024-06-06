<template>
  <PageLayoutWithPlayer>
    <template #content>
      <div class="mt-10 text-primary-text-color flex flex-col gap-2">
        <div class="flex lg:flex-row flex-col">
          <MusicSingleImage :music="music" />
          <LyricsComponent :musicLyrics="music.lyrics" />
        </div>
        <div class="flex flex-col-reverse lg:flex-row gap-5">
          <CommentComponent />
          <CardsCarousel />
        </div>
      </div>
    </template>
  </PageLayoutWithPlayer>
</template>

<script setup>
import MusicSingleImage from '@/components/detail_page/MusicSingleImage.vue'
import LyricsComponent from '@/components/detail_page/music_detail/LyricsComponent.vue'
import CardsCarousel from '@/components/detail_page/CardsCarousel.vue'
import CommentComponent from '@/components/detail_page/music_detail/CommentsComponent.vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
const music = ref({})

const route = useRoute()
const queryParams = route.params.id
const fetchMusicData = async () => {
  console.log(queryParams)
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/music/get/' + queryParams, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    music.value = response.data
  } catch (error) {
    console.error('Failed to fetch music data:', error)
  }
}

onMounted(() => {
  fetchMusicData()
})
</script>
