<template>
    <PageLayoutWithPlayer>
      <template #content >
          <BannerComponent/>
          <ProfilePicComponent/>
          <ProfileNav/>
          <div class="flex flex-col-reverse sm:flex-row ">
            <InformationCard/>
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
  import BannerComponent from       '@/components/user_profile_component/BannerComponent.vue'
  import ProfilePicComponent from   '@/components/user_profile_component/ProfilePicComponent.vue'
  import ProfileNav from            '@/components/user_profile_component/ProfileNav.vue'
  import InformationCard from       '@/components/user_profile_component/IntroductionCard.vue'
  import PostForm from              '@/components/user_profile_component/PostForm.vue'
import CardsCarousel from           '@/components/user_profile_component/CardsCarousel.vue'
  import TopChartComponent from     '@/components/user_profile_component/TopChartComponent.vue'

  </script>
  
  <script>
  
  
  </script>