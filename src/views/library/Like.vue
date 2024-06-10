<!-- <template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-semibold mb-4">Liked Songs</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="px-4 py-2">Artist</th>
                <th class="px-4 py-2">Name</th>
                <th class="px-4 py-2">Profile Image</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="song in likedSongs" :key="song.id" class="border-b border-gray-200">
                <td class="px-4 py-2">{{ song.artist_name }}</td>
                <td class="px-4 py-2">{{ song.name }}</td>
                <td class="px-4 py-2"><img :src="song.img_profile" alt="Profile Image" class="w-12 h-12 md:w-16 md:h-16 rounded-lg"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      likedSongs: []
    };
  },
  created() {
    this.fetchLikedSongs();
  },
  methods: {
    async fetchLikedSongs() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/liked/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json'
          }
        });
        this.likedSongs = response.data.map(song => ({
          artist_name: song.artist_name,
          name: song.name,
          img_profile: song.img_profile
        }));
      } catch (error) {
        console.error('Error fetching liked songs:', error);
      }
    }
  }
};
</script>

<style>
/* Add your styles here if needed */
</style> -->

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
                v-for="likedmusic in likedMusics"
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

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </PageLayout>
</template>

<script setup>
import AddAlbum from '@/components/manage/album/AddAlbum.vue'
import EditAlbum from '@/components/manage/album/EditAlbum.vue'
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'
import { useToast } from 'vue-toast-notification'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

const $toast = useToast()
const store = useStore()
const likedMusics = ref([])

const fetchLikedSongs = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/user/liked/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    console.log(response.data)
    const userData = store.getters.getLoggedInUserData

    likedMusics.value = response.data.map(music => {
      if (userData && music.likes.some(like => like.user.id === userData.id)) {
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