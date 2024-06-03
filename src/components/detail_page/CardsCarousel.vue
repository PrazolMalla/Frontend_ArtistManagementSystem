<template>
  <div class="mt-5 lg:w-[46vw] h-[60vh] overflow-x-visible no-scrollbar w-[80vw] lg:h-[55vh] bg-light-primary-color p-5 rounded-sm md:w-[65vw]">

  <h1 class=" mb-4 text-2xl font-semibold">Top Music</h1>
  <swiper
    :slidesPerView="3"
    :centeredSlides="false"
    :spaceBetween="5"
    :grabCursor="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper lg:ml-[-1rem] lg:flex md:ml-0 hidden "
  >
    <swiper-slide class="lg:mb-14 mb-4 mt-1" ><MusicCard/></swiper-slide >
    <swiper-slide><MusicCard/></swiper-slide><swiper-slide><MusicCard/></swiper-slide>
    <swiper-slide><MusicCard/></swiper-slide>
    <swiper-slide><MusicCard/></swiper-slide>
    <swiper-slide><MusicCard/></swiper-slide><swiper-slide><MusicCard/></swiper-slide>
    <swiper-slide><MusicCard/></swiper-slide>
  
  
  </swiper>
  <swiper
    :slidesPerView="1"
    :centeredSlides="false"
    :spaceBetween="5"
    :grabCursor="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper lg:ml-[-3rem] sm:flex md:ml-0 md:hidden"
  >
    <swiper-slide class="mb-14"><MusicCard/></swiper-slide >
    <swiper-slide><MusicCard/></swiper-slide><swiper-slide><MusicCard/></swiper-slide>
    <swiper-slide><MusicCard/></swiper-slide>
    <swiper-slide><MusicCard/></swiper-slide>
    <swiper-slide><MusicCard/></swiper-slide><swiper-slide><MusicCard/></swiper-slide>
    <swiper-slide><MusicCard/></swiper-slide>
  
  
  </swiper>
  <swiper
    :slidesPerView="2"
    :centeredSlides="false"
    :spaceBetween="5"
    :grabCursor="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper lg:ml-[-3rem] md:flex md:ml-0 hidden lg:hidden"
  >
    <swiper-slide class="mb-14"><MusicCard/></swiper-slide >
    <swiper-slide><MusicCard/></swiper-slide><swiper-slide><MusicCard/></swiper-slide>
    <swiper-slide><MusicCard/></swiper-slide>
    <swiper-slide><MusicCard/></swiper-slide>
    <swiper-slide><MusicCard/></swiper-slide><swiper-slide><MusicCard/></swiper-slide>
    <swiper-slide><MusicCard/></swiper-slide>
  
  
  </swiper>
</div>
</template>
<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';

  import 'swiper/css';

  import 'swiper/css/pagination';

  import { Pagination } from 'swiper/modules';
  import MusicCard from '@/components/cards/card_item/MusicCard.vue';

  export default {
    components: {
      Swiper,
      SwiperSlide,
      MusicCard,
    },
    setup() {
      return {
        modules: [Pagination],
      };
    },
  };
</script>
<style >
  .swiper-pagination-bullet{
    background-color: #FF516D  !important;
  }
</style>
