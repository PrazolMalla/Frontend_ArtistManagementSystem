<template lang="">
  <div
    class="mt-10 w-[80vw] h-24 bg-light-primary-color border-none px-5 pt-2 md:w-[22rem] md:h-[7rem] md:mt-20 lg:mt-24 lg:w-[50vw] lg:h-[10rem] lg:p-4 rounded-md"
  >
    <h1 class="font-semibold text-primary-text-color lg:text-lg">Latest Release</h1>
    <div class="flex flex-row gap-5">
      <div class="flex items-center gap-2" v-for="(recent, index) in recentSongs" :key="index">
        <!-- <img
          :src="`http://127.0.0.1:8000${recent.img_profile}`"
          alt=""
          class="lg:w-20 lg:h-20 sm:w-16 sm:h-16 h-20 w-20 hover:border-4 mt-4 hover:cursor-pointer hover:border-secondary-color rounded-md"
        /> -->
        <img
          src="https://source.unsplash.com/800x800/?portrait"
          alt=""
          class="lg:w-20 lg:h-20 sm:w-16 sm:h-16 h-20 w-20 hover:border-4 mt-4 hover:cursor-pointer hover:border-secondary-color rounded-md"
        />

        <div class="mt-6">
          <h1 class="text-lg font-semibold">{{ recent.name }}</h1>
          <h1 class="text-lg">{{ recent.release_at }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const recentSongs = ref([
  {
    img_profile: '',
    name: 'Aunseka Tara',
    release_at: '25 April 2001'
  },
  {
    img_profile: '',
    name: 'Timro Pratikshya',
    release_at: '2 October 2001'
  },
  {
    img_profile: '',
    name: 'Timro Pratikshya ',
    release_at: '2 October 2001'
  }
])
</script>
<style lang=""></style>
