<template>
  <div class="mb-10 z-0">
    <h2 class="text-lg font-bold text-primary-text-color self-start">Top Albums</h2>
    <div class="flex overflow-y-hidden overflow-x-visible no-scrollbar w-[100%]">
      <swiper
        :slidesPerView="computedSlidesPerViewLg"
        :centeredSlides="false"
        :spaceBetween="10"
        :grabCursor="true"
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
        :slidesPerView="computedSlidesPerViewMd"
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
        :slidesPerView="computedSlidesPerViewSm"
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
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import AlbumCard from '../cards/AlbumCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
const base_url  = import.meta.env.VITE_BASE_API_URL;
import 'swiper/css'

import 'swiper/css/pagination'

import { Autoplay, Pagination } from 'swiper/modules'

const albumData = ref([])
const fetchAlbums = async () => {
  try {
    const response = await axios.get(`${base_url}/api/album/get/`)
    const data = response.data.splice(0, 10)
    albumData.value = data
  } catch (error) {
    console.error('Error fetching songs:', error)
  }
}

onMounted(fetchAlbums)
const modules = [Autoplay, Pagination]

const computedSlidesPerViewLg = computed(() => {
  return Math.min(albumData.value.length, 4)
})

const computedSlidesPerViewMd = computed(() => {
  return Math.min(albumData.value.length, 2)
})

const computedSlidesPerViewSm = computed(() => {
  return Math.min(albumData.value.length, 1)
})
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
