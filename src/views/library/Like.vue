->

<template>
  <PageLayout>
    <template #content>
      <div class="text-primary-text-color flex flex-col gap-2 w-full">
        <div class="flex h-screen">
          <div class="flex-1 mt-5">
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-lg sm:text-3xl font-bold">All Liked Music</h1>
              <div class="flex items-center space-x-4">
                <!-- <div  @click="showDeletedList" class="border text-sm bg-secondary-color text-dark-primary-color  p-2 rounded-md hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none"> Show Deleted</div>
                  <div @click="showAllList" class="border text-sm bg-secondary-color text-dark-primary-color  p-2 rounded-md hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none">Show All</div> -->
              </div>
            </div>

            <div class="flex flex-col justify-between">
              <div
                class="hidden sm:flex flex-row bg-transparent border-b border-b-primary-text-color"
              >
                <div class="w-3/6 font-semibold">Name</div>
                <div class="flex w-full justify-around items-center">
                  <div class="font-semibold">Like</div>
                </div>
              </div>
              <div
                v-for="(likedmusic, index) in likedMusics"
                :key="likedmusic.name"
                class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2"
              >
                <router-link :to="`/music/${likedmusic.id}`" class="flex items-center w-3/6">
                  <img
                    :src="likedmusic.img_profile"
                    alt="Album image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ likedmusic.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ likedmusic.artist_name }}</div>
                    </div>
                  </div>
                </router-link>
                <div class="items-center mt-[-1rem] ml-[11.5rem]">
                  <button
                    @click="toggleLikeMusic(likedmusic.id, index)"
                    class="flex items-center gap-1 mt-4 text-sm text-secondary-color hover:underline"
                  >
                    <v-icon
                      :name="likedmusic.liked ? 'bi-suit-heart-fill' : 'bi-suit-heart'"
                      :fill="likedmusic.liked ? '#ff4000' : '#302f31'"
                      scale="1.5"
                      class="cursor-pointer"
                    />
                    {{ likedmusic.total_likes }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </PageLayout>
</template>

<script setup>
import { useToast } from 'vue-toast-notification'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
const base_url  = import.meta.env.VITE_BASE_API_URL;

const $toast = useToast()
const store = useStore()
const likedMusics = ref([])

const fetchLikedSongs = async () => {
  try {
    const response = await axios.get(`${base_url}/api/user/liked/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    console.log(response.data)
    const userData = store.getters.getLoggedInUserData

    likedMusics.value = response.data.map((music) => {
      if (userData && music.likes.some((like) => like.user.id === userData.id)) {
        return { ...music, liked: true }
      } else {
        return { ...music, liked: false }
      }
    })
  } catch (error) {
    console.error('Error fetching albums:', error)
    $toast.error('Failed to fetch liked songs', {
      position: 'top-right'
    })
  }
}

onMounted(() => {
  fetchLikedSongs()
})

const toggleLikeMusic = async (id, index) => {
  try {
    const response = await axios.post(
      `${base_url}/api/music/likeunlike/${id}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const likedMusic = likedMusics.value[index]

    likedMusic.liked = !likedMusic.liked
    likedMusic.total_likes += likedMusic.liked ? 1 : -1

    $toast.success(response.data.message, {
      position: 'top-right'
    })
  } catch (error) {
    $toast.error('Failed to like/unlike music', {
      position: 'top-right'
    })
  }
}
</script>

<style scoped>
.bggradientpopup {
  background: #ffffff3f;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
