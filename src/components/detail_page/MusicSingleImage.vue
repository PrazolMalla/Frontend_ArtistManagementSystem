<template lang="">
  <div>
    <h1 class="font-semibold text-2xl">{{ music.name }}</h1>
    <div class="flex gap-10 mb-4">
      <router-link :to="`/artist/${music.artist}`"  v-if="music.artist"><p>Artist : {{ music.artist_name }}</p></router-link>
      <router-link :to="`/album/${music.album}`"  v-if="music.album"><p>Album : {{ music.album_name }}</p></router-link>
   
    </div>
    <div class="flex justify-start lg:w-[30vw] w-[80vw] mt-5">
      <div class="z-20">
        <img :src="`http://127.0.0.1:8000${music.img_profile}`" alt="" class="w-[20rem]" />
      </div>
      <div class="relative z-10 lg:ml-[-12rem] lg:mt-[-3rem] mt-[-1.5rem] ml-[-7rem]">
        <div
          class="absolute lg:w-24 lg:h-24 rounded-full bg-red-50 lg:top-[9rem] lg:left-[9.5rem] lg:flex hidden overflow-hidden"
        >
          <img :src="`http://127.0.0.1:8000${music.img_profile}`" alt="" />
        </div>
        <img src="../../assets/images/musiccassette.png" alt="" class="w-[25rem] mt-2" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  music: {
    type: Object,
    required: true
  }
})
</script>
<style lang=""></style>
