<template>
  <div
    class="p-2 transform hover:scale-105 transition-transform duration-300 bg-light-primary-color rounded-lg shadow-md"
  >
    <div class="flex flex-col items-center gap-2">
      <RouterLink :to="'/music/' + musicData.id">
        <img :src="musicImage" alt="" class="rounded-lg sm:w-64 h-16 sm:h-48"
      /></RouterLink>
      <div class="flex justify-between w-full items-center">
        <div class="flex flex-col">
          <RouterLink
            :to="'/music/' + musicData.id"
            class="text-md text-primary-text-color font-semibold text-center"
            >{{ musicData.name }}</RouterLink
          >

          <div class="flex flex-col gap-2">
            <RouterLink
              :to="'/artist/' + musicData.artist"
              class="text-sm text-primary-text-color opacity-50 hover:underline"
              >{{ musicData.artist_name }}</RouterLink
            >

            <RouterLink
              :to="'/album/' + musicData.album"
              class="text-sm text-primary-text-color opacity-50 hover:underline"
              >{{ musicData.album_name }}</RouterLink
            >
          </div>
        </div>

        <!-- <v-icon
          name="md-playcircleoutline-round"
          @click="playMusic"
          fill="#302f31"
          scale="1.5"
          class="cursor-pointer"
        /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const base_url  = import.meta.env.VITE_BASE_API_URL;
const props = defineProps({
   musicData:{
    type:Object,
   } 
  })

const musicImage = computed(() => `${base_url}${props.musicData?.img_profile}`);
function playMusic() {
  this.$store.dispatch('setMusicPlayer', this.musicData)
  console.log(this.musicData)
}


</script>
<style scoped>
@media (min-width: 768px) {
  .album-card {
    width: calc(33.33% - 1rem);
  }
}

@media (min-width: 1024px) {
  .album-card {
    width: calc(25% - 1rem);
  }
}
</style>
