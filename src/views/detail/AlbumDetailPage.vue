<template>
  <PageLayoutWithPlayer>
    <template #content>
      <div class="mt-10 text-primary-text-color flex flex-col gap-2">
        <div class="flex lg:flex-row flex-col">
          <MusicSingleImage :musicId="route.params.id" type="album" />
          <SongList :musicId="parseInt(route.params.id)" />
        </div>
        <div class="flex flex-col-reverse lg:flex-row gap-5">
          <CommentComponent />
          <CardsCarousel :artistId="album.artist" />
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
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
const base_url  = import.meta.env.VITE_BASE_API_URL;

const album = ref({})
const route = useRoute()
const router = useRouter()

const fetchAlbumData = async (id) => {
  try {
    const response = await axios.get(`${base_url}/api/album/get/${id}`)
    
    const referrer = document.referrer
    if (referrer && response.data.is_disabled ) {
          router.go(-1)
          toast.error('This album is disabled.')
    } else if(!referrer && response.data.is_disabled) {
        router.push('/') 
        toast.error('This album is disabled.')
    }
    else{
      album.value = response.data
    }
    
  } catch (error) {
    console.error('Failed to fetch album data:', error)
  }
}

onMounted(() => {
  fetchAlbumData(route.params.id)
})

watch(
  () => route.params.id,
  (newId) => {
    fetchAlbumData(newId)
  }
)
</script>
