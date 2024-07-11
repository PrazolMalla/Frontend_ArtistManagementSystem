<template>
  <div class="flex items-start justify-between mt-16 w-full flex-wrap sm:flex-row gap-5 ">
    <InformationCard :userData="user" />
    <LatestRelease :user="user" />
  </div>
  <div class="mt-5 flex flex-col-reverse lg:flex-row gap-5">
    <TopChartComponent :user="user" />
    <CardsCarousel :artistId="user.id" :user="user" />
  </div>
</template>

<script setup>
import InformationCard from '@/components/detail_page/user_detail/IntroductionCard.vue'
import CardsCarousel from '@/components/detail_page/CardsCarousel.vue'
import TopChartComponent from '@/components/detail_page/TopChartComponent.vue'
import LatestRelease from '@/components/detail_page/LatestRelease.vue'
import { ref, onMounted, watch, onUnmounted } from 'vue'

import store from '@/store/store'
import axios from 'axios'
import { useRoute } from 'vue-router'

const user = ref({})
const base_url = import.meta.env.VITE_BASE_API_URL;

const route = useRoute()
const queryParams = route.params.id
const fetchUserData = async () => {
  try {
    const response = await axios.get(`${base_url}/api/user/get/` + queryParams)
    user.value = response.data
  } catch (error) {
    console.error('Failed to fetch user data:', error)
  }
}

onMounted(() => {
  fetchUserData()
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
