<template>
    <PageLayoutWithPlayer>
      <template #content >
        <div class="sm:ml-[25vw] lg:ml-[15vw] px-8 lg:px-16 mt-20 text-slate-300 flex flex-col gap-2">
        <div class="flex lg:flex-row flex-col">
          <MusicSingleImage/>
          <LyricsComponent/>
        </div>
        <div class="flex flex-col-reverse lg:flex-row gap-5">
              <CommentComponent/>
              <CardsCarousel/>
        </div>
        </div>
          
  
    </template>
    </PageLayoutWithPlayer>
  </template>
  
  <script setup>
  import MusicSingleImage from '@/components/MusicSingleImage.vue'
  import LyricsComponent from '@/components/LyricsComponent.vue'
  import CardsCarousel from '../components/CardsCarousel.vue'
  import CommentComponent from '../components/CommentsComponent.vue'
  
  </script>
  
  <script>
  
  
  </script>