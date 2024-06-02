<template>
    <PageLayout>
      <template #content >
        <div class="sm:ml-[25vw] lg:ml-[15vw] sm:px-16 px-8 mt-20 text-slate-300 flex flex-col">
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
         
        </div>
    </template>
    </PageLayout>
  </template>
  
  <script setup>
  import BannerComponent from '../components/BannerComponent.vue'
  import ProfilePicComponent from '../components/ProfilePicComponent.vue'
  import ProfileNav from '../components/ProfileNav.vue'
  import InformationCard from '../components/IntroductionCard.vue'
  import PostForm from '../components/PostForm.vue'
  import CardsCarousel from '../components/CardsCarousel.vue'
  import TopChartComponent from '../components/TopChartComponent.vue'
  // import MusicCard from '../components/MusicCard.vue'
  </script>
  
  <script>
  
  
  </script>