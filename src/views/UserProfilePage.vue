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
  import BannerComponent from       '@/components/detail_page/user_detail/BannerComponent.vue'
  import ProfilePicComponent from   '@/components/detail_page/user_detail/ProfilePicComponent.vue'
  import ProfileNav from            '@/components/detail_page/user_detail/ProfileNav.vue'
  import InformationCard from       '@/components/detail_page/user_detail/IntroductionCard.vue'
  import PostForm from              '@/components/detail_page/user_detail/PostForm.vue'
  import CardsCarousel from         '@/components/detail_page/CardsCarousel.vue'
  import TopChartComponent from     '@/components/detail_page/TopChartComponent.vue'

  </script>
  
  <script>
  
  
  </script>