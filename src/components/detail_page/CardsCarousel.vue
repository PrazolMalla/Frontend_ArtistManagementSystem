<template>
  <div
    class="mt-5 lg:w-[46vw] h-[60vh] overflow-x-visible no-scrollbar w-[80vw] lg:h-[55vh] bg-light-primary-color p-5 rounded-sm md:w-[65vw]"
  >
    <h1 class="mb-4 text-2xl font-semibold text-primary-text-color">Top Music</h1>
    <swiper
      :slidesPerView="3"
      :centeredSlides="false"
      :spaceBetween="5"
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
      <swiper-slide class="lg:mb-14 mb-4 mt-1"><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide><swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide><swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide>
    </swiper>
    <swiper
      :slidesPerView="1"
      :centeredSlides="false"
      :spaceBetween="5"
      :grabCursor="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false
      }"
      :pagination="{
        clickable: true
      }"
      :modules="modules"
      class="mySwiper lg:ml-[-3rem] sm:flex md:ml-0 md:hidden"
    >
      <swiper-slide v-for="x in musicData" >
        <MusicCard :musicData="x" />
      </swiper-slide>
    </swiper>
    <swiper
      :slidesPerView="2"
      :centeredSlides="false"
      :spaceBetween="5"
      :grabCursor="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false
      }"
      :pagination="{
        clickable: true
      }"
      :modules="modules"
      class="mySwiper lg:ml-[-3rem] md:flex md:ml-0 hidden lg:hidden"
    >


    <swiper-slide class="lg:mb-14 mb-4 mt-1"><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide><swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide><swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide>


      <!-- <swiper-slide v-for="x in musicData" >
        <MusicCard :musicData="x" />
      </swiper-slide> -->
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'

import 'swiper/css/pagination'

import { Autoplay, Pagination } from 'swiper/modules'
import MusicCard from '@/components/cards/MusicCard.vue'

export default {
  components: {
    Swiper,
    SwiperSlide,
    MusicCard
  },
  data(){
    return {
      musicData:[
        { id: 1, name: 'Music 1', album: 'Album 1', artist: 'Artist 1' },
        { id: 2, name: 'Music 2', album: 'Album 1', artist: 'Artist 2' },
        { id: 3, name: 'Music 3', album: 'Album 1', artist: 'Artist 3' },
        { id: 4, name: 'Music 4', album: 'Album 1', artist: 'Artist 4' },
        { id: 5, name: 'Music 5', album: 'Album 1', artist: 'Artist 5' },
        { id: 6, name: 'Music 6', album: 'Album 1', artist: 'Artist 6' }
      ]
    }
  },
  setup() {
    return {
      modules: [Autoplay, Pagination]
    }
  }
}
</script>
<style>
.swiper-pagination-bullet {
  background-color: #ff516d !important;
}
</style>
