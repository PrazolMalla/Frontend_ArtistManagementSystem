<template>
  <PageLayoutWithPlayer>
    <template #content>
      <div class="mt-10 text-primary-text-color flex flex-col gap-2">
        <div class="flex lg:flex-row flex-col">
          <MusicSingleImage :music="music" />
          <SongList />
        </div>
        <div class="flex flex-col-reverse lg:flex-row gap-5">
          <CommentComponent />
          <CardsCarousel :artistId="music.artist" />
        </div>
      </div>
    </template>
  </PageLayoutWithPlayer>
</template>

<script setup>
import MusicSingleImage from '@/components/detail_page/MusicSingleImage.vue'
import SongList from '@/components/detail_page/album_detail/SongList.vue'
import CardsCarousel from '@/components/detail_page/CardsCarousel.vue'
import CommentComponent from '@/components/detail_page/music_detail/CommentsComponent.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import Artist from '../explore/Artist.vue'
const music = ref({})

const route = useRoute()
const queryParams = route.params.id
const fetchData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/album/get/' + queryParams)
    music.value = response.data
  } catch (error) {
    console.error('Failed to fetch music data:', error)
  }
}
onMounted(() => {
  fetchData()
})
</script>
