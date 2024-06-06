<template>
    <PageLayoutWithPlayer>
      <template #content >
          <BannerComponent :userBanner="user.img_cover"/>
          <ProfilePicComponent :userImg="user.img_profile"/>
          <ProfileNav/>
          <div class="flex flex-col-reverse sm:flex-row ">
            <InformationCard :userData="user"/>
            <PostForm/>
          </div>
          <div class="flex flex-col-reverse lg:flex-row gap-5">
            <TopChartComponent/>
            <CardsCarousel/>
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
import { ref, onMounted } from 'vue'
import axios from 'axios'

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

onMounted(() => {
  fetchUserData()
})
</script>

<script></script>
