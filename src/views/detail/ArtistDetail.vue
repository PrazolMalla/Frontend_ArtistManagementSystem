<template>
  <PageLayoutWithPlayer>
    <template #content>
      <div
        class="ml-[-4rem] mt-[-4rem] z-10 absolute w-full min-h-screen h-[100%]"
        :style="{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }"
      ></div>
      <div
        class="ml-[-4rem] mt-[-4rem] absolute bgThemeGlass z-20 w-full min-h-screen h-[100%] opacity-80 p-2 backdrop-blur-3xl filter"
        :style="{ backgroundColor: user?.theme?.darkPrimaryColor, opacity: user?.theme?.opacity }"
      ></div>
      <div class="z-30">
        <BannerComponent :userBanner="user.img_cover" />
        <ProfilePicComponent :userImg="user.img_profile" />
        <ProfileNav :user="user" />
        <RouterView></RouterView>
      </div>
    </template>
  </PageLayoutWithPlayer>
</template>

<script setup>
import BannerComponent from '@/components/detail_page/user_detail/BannerComponent.vue'
import ProfilePicComponent from '@/components/detail_page/user_detail/ProfilePicComponent.vue'
import ProfileNav from '@/components/detail_page/user_detail/ProfileNav.vue'
import InformationCard from '@/components/detail_page/user_detail/IntroductionCard.vue'
import CardsCarousel from '@/components/detail_page/CardsCarousel.vue'
import TopChartComponent from '@/components/detail_page/TopChartComponent.vue'
import LatestRelease from '@/components/detail_page/artist_detail/LatestRelease.vue'
import { ref, onMounted, watch, onUnmounted } from 'vue'

import store from '@/store/store'
import axios from 'axios'
import { useRoute } from 'vue-router'
const user = ref({})
const base_url  = import.meta.env.VITE_BASE_API_URL;
const backgroundImage =  ref({})


const route = useRoute()
const queryParams = route.params.id
const fetchUserData = async () => {
  console.log(queryParams)
  try {
    const response = await axios.get(`${base_url}/api/user/get/` + queryParams, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    user.value = response.data
    console.log(user.value)
  } catch (error) {
    console.error('Failed to fetch user data:', error)
  }
}

onMounted(() => {
  fetchUserData()
  if (user.value.theme){
    store.dispatch('setThemeColor', {
      bgColor: user.value.theme.darkPrimaryColor,
      textColor: user.value.theme?.secondaryColor,
      sidebarBgColor: user.value.theme?.darkPrimaryColor
    })

    backgroundImage.value = `${base_url}${user?.value.theme?.img_profile}`
  }
})

watch(user, (newValue) => {
  if (newValue.theme?.secondaryColor){
    store.dispatch('setThemeColor', {
      bgColor: newValue.theme?.darkPrimaryColor,
      textColor: newValue.theme?.secondaryColor,
      sidebarBgColor: newValue.theme?.darkPrimaryColor
    })
  
    backgroundImage.value = `${base_url}${user?.value.theme?.img_profile}`
  }
})
onUnmounted(() => {
  store.dispatch('setThemeColor', {
    bgColor: '#f6f3eb',
    textColor: ' #302f31',
    sidebarBgColor: '#ECE6D5'
  })
})
</script>
