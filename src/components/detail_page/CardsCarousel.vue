<!-- <template>
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


    <swiper-slide class="lg:mb-14 mb-4 mt-1" v-for="x in musicData" >
        <MusicCard :musicData="x" />
      </swiper-slide> 
    </swiper>
  </div>
</template> -->

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
      <!-- <swiper-slide class="lg:mb-14 mb-4 mt-1"><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide><swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide><swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide> -->

      <swiper-slide class="lg:mb-14 mb-4 mt-1" v-for="x in musicData">
        <MusicCard :musicData="x" />
      </swiper-slide>
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
      <!-- <swiper-slide class="mb-14"><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide><swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide><swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide> -->

      <swiper-slide class="lg:mb-14 mb-4 mt-1" v-for="x in musicData">
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
      <!-- <swiper-slide class="mb-14"><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide><swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide><swiper-slide><MusicCard /></swiper-slide>
      <swiper-slide><MusicCard /></swiper-slide> -->

      <swiper-slide class="lg:mb-14 mb-4 mt-1" v-for="x in musicData">
        <MusicCard :musicData="x" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'

import 'swiper/css/pagination'

import { Autoplay, Pagination } from 'swiper/modules'
import MusicCard from '@/components/cards/MusicCard.vue'
import { ref, defineProps, onMounted, watch } from 'vue'
import axios from 'axios'
const props = defineProps(['artistId'])
const musicData = ref([])
const modules = [Autoplay, Pagination]
const fetchMusicData = async (artistId) => {
  try {
    console.log(artistId)
    const response = await axios.get('http://127.0.0.1:8000/api/music/artist/get/' + artistId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    musicData.value = response.data
    console.log(musicData)
  } catch (error) {
    console.error('Failed to fetch music data:', error)
  }
}

onMounted(() => {
  fetchMusicData(props.artistId)
})

watch(
  () => props.artistId,
  (newArtistId) => {
    fetchMusicData(newArtistId)
  }
)
</script>
<style>
.swiper-pagination-bullet {
  background-color: #ff516d !important;
}
</style>
