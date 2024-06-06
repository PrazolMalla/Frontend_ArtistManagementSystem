<template>
  <div class="mb-10">
    <h2 class="text-lg font-bold text-primary-text-color self-start">Top Albums</h2>
    <div class="flex gap-4 overflow-y-hidden">
      <swiper
        :slidesPerView="4"
        :centeredSlides="false"
        :spaceBetween="10"
        :grabCursor="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false
        }"
        :pagination="{
          clickable: true
        }"
        :modules="modules"
        class="mySwiper lg:ml-[-1rem] lg:flex md:ml-0 hidden"
      >
        <swiper-slide class="lg:mb-14 mb-4 mt-1" v-for="x in albumData">
          <AlbumCard class="p-5" :albumDetail="x" linkto="album" />
        </swiper-slide>
      </swiper>
      <swiper
        :slidesPerView="2"
        :centeredSlides="false"
        :spaceBetween="10"
        :grabCursor="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false
        }"
        :pagination="{
          clickable: true
        }"
        :modules="modules"
        class="mySwiper lg:ml-[-1rem] md:flex md:ml-0 lg:hidden hidden"
      >
        <swiper-slide class="lg:mb-14 mb-8 mt-1" v-for="x in albumData">
          <AlbumCard class="p-5" :albumDetail="x" linkto="album" />
        </swiper-slide>
      </swiper>
      <swiper
        :slidesPerView="1"
        :centeredSlides="false"
        :spaceBetween="10"
        :grabCursor="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false
        }"
        :pagination="{
          clickable: true
        }"
        :modules="modules"
        class="mySwiper lg:ml-[-1rem] flex md:ml-0 lg:hidden md:hidden"
      >
        <swiper-slide class="lg:mb-14 mb-8 mt-1" v-for="x in albumData">
          <AlbumCard class="p-5" :albumDetail="x" linkto="album" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AlbumCard from '../cards/AlbumCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'

import 'swiper/css/pagination'

import { Autoplay, Pagination } from 'swiper/modules'

const albumData = ref([])
const fetchAlbums = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/album/get/')
    const data = response.data
    albumData.value = data
  } catch (error) {
    console.error('Error fetching songs:', error)
  }
}

onMounted(fetchAlbums)
const modules = [Autoplay, Pagination]
</script>
<style scoped>
/* @media (min-width: 768px) {
  .album-card {
    width: calc(33.33% - 1rem);
  }
}

@media (min-width: 1024px) {
  .album-card {
    width: calc(25% - 1rem);
  }
} */
</style>
