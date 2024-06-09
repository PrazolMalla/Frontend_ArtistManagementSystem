<template lang="">
  <div v-if="music">
    <h1 class="font-semibold text-2xl">{{ music.name }}</h1>
    <div class="flex gap-10 mb-4">
      <router-link :to="`/artist/${music.artist}`"  v-if="music.artist"><p>Artist : {{ music.artist_name }}</p></router-link>
      <router-link :to="`/album/${music.album}`"  v-if="music.album"><p>Album : {{ music.album_name }}</p></router-link>
   
    </div>
    <div class="flex justify-start lg:w-[30vw] w-[80vw] mt-5">
      <div class="z-20">
        <img :src="`http://127.0.0.1:8000${music.img_profile}`" alt="" class="w-[20rem]" />
      </div>
      <div class="relative z-10 lg:ml-[-12rem] lg:mt-[-3rem] mt-[-1.5rem] ml-[-7rem]">
        <div
          class="absolute lg:w-24 lg:h-24 rounded-full bg-red-50 lg:top-[9rem] lg:left-[9.5rem] lg:flex hidden overflow-hidden"
        >
          <img :src="`http://127.0.0.1:8000${music.img_profile}`" alt="" />
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
import { ref, onMounted, defineProps } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'

const props = defineProps({
  musicId: {
    type: Number,
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

const fetchMusicData = async () => {
  try {
    let response
    if (props.type === 'music') {
      response = await axios.get(`http://127.0.0.1:8000/api/music/get/${props.musicId}/`)
    } else {
      response = await axios.get(`http://127.0.0.1:8000/api/album/get/${props.musicId}/`)
    }
    music.value = response.data

    // Check if the logged-in user has liked the music
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
        `http://127.0.0.1:8000/api/music/likeunlike/${props.musicId}/`,
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
        `http://127.0.0.1:8000/api/album/likeunlike/${props.musicId}/`,
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

    $toast.success(response.data.message, {
      position: 'top-right'
    })
  } catch (error) {
    $toast.error('Failed to like/unlike music', {
      position: 'top-right'
    })
  }
}

onMounted(() => {
  store.dispatch('setLoggedInUserData').then(() => {
    fetchMusicData()
  })
})
</script>

<style scoped></style>
