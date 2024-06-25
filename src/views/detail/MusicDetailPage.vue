<template>
  <PageLayoutWithPlayer>
    <template #content>
      <div class="mt-10 text-primary-text-color flex flex-col gap-2">
        <div class="flex lg:flex-row flex-col">
          <MusicSingleImage :musicId="route.params.id" :type="type" />
          <LyricsComponent :musicLyrics="music.lyrics" />
        </div>
        <div class="flex flex-col-reverse lg:flex-row gap-5">
          <CommentComponent />
          <CardsCarousel :artistId="music.artist" :user="user" />
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
import { useRoute,useRouter} from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { useToast } from 'vue-toast-notification'
const toast = useToast()
const music = ref({})
const type = ref('music')
const route = useRoute()
const router = useRouter()
const fetchMusicData = async (id) => {
  try {
    const response = await axios.get(`${base_url}/api/music/get/${id}`, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    const referrer = document.referrer
    if (referrer) {
        router.go(-1)
        toast.error('This music is disabled.')
      } else {
        router.push('/') 
        toast.error('This music is disabled.')
      }
    music.value = response.data
  } catch (error) {
    console.error('Failed to fetch music data:', error)
  }
}

onMounted(() => {
  fetchMusicData(route.params.id)
})

watch(
  () => route.params.id,
  (newId) => {
    fetchMusicData(newId)
  }
)
</script>
