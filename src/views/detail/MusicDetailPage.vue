<template>
  <PageLayoutWithPlayer>
    <template #content>
      <div class="mt-10 text-primary-text-color flex flex-col gap-2">
        <div class="flex lg:flex-row flex-col">
          <MusicSingleImage />
          <LyricsComponent />
        </div>
        <div class="flex flex-col-reverse lg:flex-row gap-5">
          <CommentComponent />
          <CardsCarousel />
        </div>
      </div>
    </template>
  </PageLayoutWithPlayer>
</template>

<script setup>
import MusicSingleImage from '@/components/detail_page/MusicSingleImage.vue'
import LyricsComponent from '@/components/detail_page/music_detail/LyricsComponent.vue'
import CardsCarousel from '@/components/detail_page/CardsCarousel.vue'
import CommentComponent from '@/components/detail_page/music_detail/CommentsComponent.vue'
</script>
