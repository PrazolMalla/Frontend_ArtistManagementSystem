<template>
  <PageLayoutWithPlayer>
    <template #content>
      <div
        class="ml-[-4rem] mt-[-4rem] z-10 absolute w-full h-[100%]"
        :style="{
          backgroundImage: `url(http://127.0.0.1:8000${user?.theme?.img_profile})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }"
      ></div>
      <div
        class="ml-[-4rem] mt-[-4rem] absolute bgThemeGlass z-20 h-[100%] w-full opacity-80 p-2 backdrop-blur-3xl filter"
        :style="{ backgroundColor: user?.theme?.darkPrimaryColor }"
      ></div>
      <div class="z-30">
        <BannerComponent :userBanner="user.img_cover" />
        <ProfilePicComponent :userImg="user.img_profile" />
        <ProfileNav :user="user" />
        <div class="flex flex-col-reverse sm:flex-row gap-5 w-[77vw]">
          <InformationCard :userData="user" />
          <PostForm :user="user" />
        </div>
        <div class="flex flex-col-reverse lg:flex-row gap-5">
          <TopChartComponent :user="user" />
          <CardsCarousel :artistId="user.id" :user="user" />
        </div>
      </div>
    </template>
  </PageLayoutWithPlayer>
</template>

<script setup>
import BannerComponent from '@/components/detail_page/user_detail/BannerComponent.vue'
import ProfilePicComponent from '@/components/detail_page/user_detail/ProfilePicComponent.vue'
import ProfileNav from '@/components/detail_page/user_detail/ProfileNav.vue'
import InformationCard from '@/components/detail_page/user_detail/IntroductionCard.vue'
import PostForm from '@/components/detail_page/user_detail/PostForm.vue'
import CardsCarousel from '@/components/detail_page/CardsCarousel.vue'
import TopChartComponent from '@/components/detail_page/TopChartComponent.vue'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import axios from 'axios'
import Artist from './explore/Artist.vue'
import store from '@/store/store'
const user = ref({})

const fetchUserData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/user/login-user/', {
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
  if (user.value.theme)
    store.dispatch('setThemeColor', {
      bgColor: user.value.theme.darkPrimaryColor,
      textColor: user.value.theme?.secondaryColor
    })
  console.log(user)
})
watch(user, (newValue) => {
  if (newValue.theme?.secondaryColor)
    store.dispatch('setThemeColor', {
      bgColor: newValue.theme?.darkPrimaryColor,
      textColor: newValue.theme?.secondaryColor
    })
})
onUnmounted(() => {
  store.dispatch('setThemeColor', { bgColor: '#f6f3eb', textColor: ' #302f31' })
})
</script>
