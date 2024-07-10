<template lang="">
  <div v-if="music">
    <h1 class="font-semibold text-lg text-primary-text-color">{{ music.name }}</h1>
    <div class="flex gap-10 mb-4">
      <router-link :to="`/artist/${music.artist}`" v-if="music.artist"
        ><p class="text-primary-text-color text-sm">Artist : <span class="hover:underline">{{ music.artist_name }}</span></p></router-link
      >
      <router-link :to="`/album/${music.album}`" v-if="music.album"
        ><p class="text-primary-text-color text-sm">Album :  <span class="hover:underline">{{ music.album_name }}</span></p></router-link
      >
    </div>
    <div class="flex justify-start lg:w-[30vw] w-[80vw]">
      <div class="z-10">
        <img :src="`${base_url}${music.img_profile}`" alt="" class="w-[20rem] rounded-lg" />
      </div>
      <div class="relative  lg:ml-[-12rem] ml-[-7rem]">
        <div
          class="absolute lg:w-24 lg:h-24 rounded-full bg-red-50 lg:top-[9rem] lg:left-[9.5rem] lg:flex hidden overflow-hidden"
        >
          <img :src="`${base_url}${music.img_profile}`" alt="" />
        </div>
        <img src="../../assets/images/musiccassette.png" alt="" class="w-[25rem] mt-2" />
      </div>
    </div>
    <div class="items-center gap-2 mt-[-1rem]">
      <button
        @click="toggleLikeMusic"
        class="flex items-center gap-1 mt-4 text-sm text-secondary-color hover:underline"
      >
        <v-icon
          :name="music.liked ? 'bi-suit-heart-fill' : 'bi-suit-heart'"
          :fill="music.liked ? '#ff4000' : '#302f31'"
          scale="1.5"
          class="cursor-pointer"
        />
        {{ music.total_likes }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'

const base_url = import.meta.env.VITE_BASE_API_URL
const props = defineProps({
  musicId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const store = useStore()
const music = ref(null)
const $toast = useToast()

const fetchMusicData = async (id) => {
  try {
    let response
    if (props.type === 'music') {
      response = await axios.get(`${base_url}/api/music/get/${id}/`)
    } else {
      response = await axios.get(`${base_url}/api/album/get/${id}/`)
    }
    music.value = response.data

    const userData = store.getters.getLoggedInUserData
    if (userData && response.data.likes.some((like) => like.user.id === userData.id)) {
      music.value.liked = true
    } else {
      music.value.liked = false
    }
  } catch (error) {
    $toast.error('Failed to fetch music data', {
      position: 'top-right'
    })
  }
}

const toggleLikeMusic = async () => {
  try {
    let response
    if (props.type === 'music') {
      response = await axios.post(
        `${base_url}/api/music/likeunlike/${props.musicId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json'
          }
        }
      )
    } else {
      response = await axios.post(
        `${base_url}/api/album/likeunlike/${props.musicId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json'
          }
        }
      )
    }

    music.value.liked = !music.value.liked
    music.value.total_likes += music.value.liked ? 1 : -1

  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchMusicData(props.musicId)
})

watch(
  () => props.musicId,
  (newMusicId) => {
    fetchMusicData(newMusicId)
  }
)
</script>

<style scoped></style>
