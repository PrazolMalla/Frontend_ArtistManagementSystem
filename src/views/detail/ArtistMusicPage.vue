<template>
  <div class="mt-12 flex gap-2 flex-wrap justify-start w-[80vw] ml-[-2rem]">
    <MusicCard
      v-for="music in musicData"
      :key="music.id"
      :musicData="music"
      :user="user"
      linkto="music"
    />
  </div>
</template>

<script setup>
import MusicCard from '@/components/cards/MusicCard.vue'
import { ref, onMounted, watch, onUnmounted } from 'vue'

import store from '@/store/store'
import axios from 'axios'
import { useRoute } from 'vue-router'

const user = ref({})
const base_url  = import.meta.env.VITE_BASE_API_URL;

const route = useRoute()
const queryParams = route.params.id
const fetchUserData = async () => {
  console.log(queryParams)
  try {
    const response = await axios.get(`${base_url}/api/user/get/` + queryParams, {
      headers: {}
    })
    user.value = response.data
    console.log(user.value)
  } catch (error) {
    console.error('Failed to fetch user data:', error)
  }
}

const musicData = ref([])
const fetchMusicData = async () => {
  try {
    console.log(queryParams)
    const response = await axios.get(`${base_url}/api/music/artist/get/` + queryParams)
    musicData.value = response.data
    console.log(musicData.value)
  } catch (error) {
    console.error('Failed to fetch music data:', error)
  }
}

onMounted(() => {
  fetchUserData()
  fetchMusicData()
  if (user.value.theme)
    store.dispatch('setThemeColor', {
      bgColor: user.value.theme.darkPrimaryColor,
      textColor: user.value.theme?.secondaryColor,
      sidebarBgColor: user.value.theme?.darkPrimaryColor
    })
})

watch(user, (newValue) => {
  if (newValue.theme?.secondaryColor)
    store.dispatch('setThemeColor', {
      bgColor: newValue.theme?.darkPrimaryColor,
      textColor: newValue.theme?.secondaryColor,
      sidebarBgColor: newValue.theme?.darkPrimaryColor
    })
})
onUnmounted(() => {
  store.dispatch('setThemeColor', {
    bgColor: '#f6f3eb',
    textColor: ' #302f31',
    sidebarBgColor: '#ECE6D5'
  })
})
</script>
