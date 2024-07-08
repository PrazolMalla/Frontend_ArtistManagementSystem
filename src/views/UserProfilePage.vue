<template>
  <PageLayoutWithPlayer>
    <template #content>
      
      <div
        class="ml-[-20px]  sm:ml-[-4rem] mt-[-4rem] z-0 absolute w-screen sm:w-full h-[100%]"
        :style="{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }"
      ></div>
      <div
        class="ml-[-20px] sm:ml-[-4rem] mt-[-4rem] absolute bgThemeGlass z-0 h-[100%] w-[100vw] sm:w-full opacity-80 p-2 backdrop-blur-3xl filter"
        :style="{ backgroundColor: user?.theme?.darkPrimaryColor }"
      ></div>
      <div class="z-0">
        <BannerComponent :userBanner="user.img_cover" />
        <ProfilePicComponent :userImg="user.img_profile" />
        <div
          class="absolute top-44 w-[80vw] h-12 md:w-[60vw] bg-light-primary-color lg:top-[22rem] lg:h-20 lg:w-[77vw] flex gap-5 pl-24 justify-center items-center lg:justify-start lg:pl-52"
          :style="{
            backgroundColor: `${user?.theme?.darkPrimaryColor}`
          }"
        ></div>
        <!-- <ProfileNav :user="user" /> -->
        <div class="flex flex-col-reverse sm:flex-row gap-5 w-[77vw]">
          <InformationCard :userData="user" />
          <!-- <PostForm :user="user" /> -->
        </div>
        <div class="flex flex-col-reverse lg:flex-row gap-5">
          <TopChartComponent :user="user" />
          <CardsCarousel :artistId="user?.id" :user="user" />
        </div>
      </div>
    </template>
  </PageLayoutWithPlayer>
</template>

<script setup>
import BannerComponent from '@/components/detail_page/user_detail/BannerComponent.vue'
import ProfilePicComponent from '@/components/detail_page/user_detail/ProfilePicComponent.vue'
import InformationCard from '@/components/detail_page/user_detail/IntroductionCard.vue'
import PostForm from '@/components/detail_page/user_detail/PostForm.vue'
import CardsCarousel from '@/components/detail_page/CardsCarousel.vue'
import TopChartComponent from '@/components/detail_page/TopChartComponent.vue'
import { ref, onMounted, onUnmounted, watch, computed} from 'vue'
import axios from 'axios'
import store from '@/store/store'
const user = ref({})
const base_url  = import.meta.env.VITE_BASE_API_URL;
const backgroundImage =  ref({})

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
