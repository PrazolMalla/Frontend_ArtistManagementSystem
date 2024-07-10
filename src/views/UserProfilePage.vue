<template>
  <PageLayoutWithPlayer>
    <template #content>

      <div class="ml-[-20px]  sm:ml-[-4rem] mt-[-4rem] z-0 absolute w-screen sm:w-full h-[100%]" :style="{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }"></div>
      <div class="  ml-[-20px] sm:ml-[-4rem] mt-[-4rem] absolute  z-0 h-[100%] w-[100vw] sm:w-full opacity-80 p-2 "
        :style="{ backgroundColor: user?.theme?.darkPrimaryColor }"></div>
      <div class="relative z-0  h-auto">
        <ProfilePicComponent :userImg="user.img_profile" />
        <BannerComponent :userBanner="user.img_cover" />
      </div>

      <div class="flex flex-col-reverse lg:flex-row gap-5 mt-5">
        <InformationCard :userData="user" />
        <CardsCarousel :artistId="user?.id" :user="user" />
      </div>
    </template>
  </PageLayoutWithPlayer>
</template>

<script setup>
import BannerComponent from '@/components/detail_page/user_detail/BannerComponent.vue'
import ProfilePicComponent from '@/components/detail_page/user_detail/ProfilePicComponent.vue'
import InformationCard from '@/components/detail_page/user_detail/IntroductionCard.vue'
import CardsCarousel from '@/components/detail_page/CardsCarousel.vue'
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import axios from 'axios'
import store from '@/store/store'
const user = ref([])
const base_url = import.meta.env.VITE_BASE_API_URL;
const backgroundImage = ref({})

const fetchUserData = async () => {
  try {
    const response = await axios.get(`${base_url}/api/user/login-user/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    user.value = response.data
  } catch (error) {
    console.error('Failed to fetch user data:', error)
  }
}

onMounted(async () => {
  await fetchUserData()
  if (user.value.theme) {
    store.dispatch('setThemeColor', {
      bgColor: user.value.theme.darkPrimaryColor,
      textColor: user.value.theme?.secondaryColor,
      sidebarBgColor: user.value.theme?.darkPrimaryColor
    })
    backgroundImage.value = `${base_url}${user?.value.theme?.img_profile}`
  }
})
watch(user, (newValue) => {

  if (newValue.theme?.secondaryColor) {
    store.dispatch('setThemeColor', {
      bgColor: newValue.theme?.darkPrimaryColor,
      textColor: newValue.theme?.secondaryColor,
      sidebarBgColor: newValue.theme?.darkPrimaryColor,
    })
    backgroundImage.value = `${base_url}${user?.value.theme?.img_profile}`
  }
}
)
onUnmounted(() => {
  store.dispatch('setThemeColor', {
    bgColor: '#f6f3eb',
    textColor: ' #302f31',
    sidebarBgColor: '#ECE6D5'
  })
})
</script>