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
  import BannerComponent from '../components/BannerComponent.vue'
  import ProfilePicComponent from '../components/ProfilePicComponent.vue'
  import ProfileNav from '../components/ProfileNav.vue'
  import InformationCard from '../components/IntroductionCard.vue'
  import PostForm from '../components/PostForm.vue'
  import CardsCarousel from '../components/CardsCarousel.vue'
  import TopChartComponent from '../components/TopChartComponent.vue'
  import PageLayoutWithPlayer from './PageLayoutWithPlayer.vue'
  </script>
  
  <script>
  
  
  </script>