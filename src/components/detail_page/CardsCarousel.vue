<template>
  <div
    class="mt-5 lg:w-[46vw] h-[60vh] overflow-x-visible no-scrollbar w-[80vw] lg:h-[55vh] bg-light-primary-color p-5 rounded-sm md:w-[65vw] text-primary-text-color"
    :style="{
      backgroundColor: hexWithOpacity(`${user?.theme?.darkPrimaryColor}`, 0.5),
      boxShadow: user?.theme ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
      backdropFilter: user?.theme ? 'blur(4.9px)' : 'none',
      color: `${user?.theme?.secondaryColor}`
    }"
  >
    <h1 class="mb-4 text-2xl font-semibold">Top Music</h1>
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
      <swiper-slide class="lg:mb-14 mb-4 mt-1" v-for="x in musicData">
        <MusicCard :musicData="x" :user="user" />
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
      <swiper-slide class="lg:mb-14 mb-4 mt-1" v-for="x in musicData">
        <MusicCard :musicData="x" :user="user" />
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
      <swiper-slide class="lg:mb-14 mb-4 mt-1" v-for="x in musicData">
        <MusicCard :musicData="x" :user="user" />
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
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  artistId: {}
})
const musicData = ref([])
const modules = [Autoplay, Pagination]
const fetchMusicData = async (artistId) => {
  try {
    console.log(artistId)
    const response = await axios.get('http://127.0.0.1:8000/api/music/artist/get/' + artistId)
    musicData.value = response.data
    console.log(musicData)
  } catch (error) {
    console.error('Failed to fetch music data:', error)
  }
}

onMounted(() => {
  fetchMusicData(props.artistId)
})

function hexWithOpacity(hex, opacity) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase()
  return `${hex}${alpha}`
}

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
