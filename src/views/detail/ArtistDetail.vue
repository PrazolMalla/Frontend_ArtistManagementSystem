<template>
  <PageLayoutWithPlayer>
    <template #content>
      <BannerComponent :userBanner="user.img_cover" />
      <ProfilePicComponent :userImg="user.img_profile" />
      <ProfileNav />
      <div class="flex flex-col-reverse sm:flex-row gap-5 w-[77vw]">
        <InformationCard :userData="user" />
        <LatestRelease :artistId="user.id" />
      </div>
      <div class="flex flex-col-reverse lg:flex-row gap-5">
        <TopChartComponent :artistId="user.id" />
        <CardsCarousel :artistId="user.id" />
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
import LatestRelease from '@/components/detail_page/artist_detail/LatestRelease.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import Artist from '../explore/Artist.vue'

const user = ref({})

const route = useRoute()
const queryParams = route.params.id
const fetchUserData = async () => {
  console.log(queryParams)
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/user/get/' + queryParams, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    user.value = response.data
    console.log(user)
  } catch (error) {
    console.error('Failed to fetch user data:', error)
  }
}

onMounted(() => {
  fetchUserData()
})
</script>
