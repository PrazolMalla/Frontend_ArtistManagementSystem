<template>
  <div
    class="p-2 max-w-38 flex-grow-0 transform hover:scale-105 transition-transform duration-300 bg-light-primary-color bg-opacity-45 rounded-lg shadow-md">
    <div class="flex flex-col items-center gap-2">
      <RouterLink :to="'/music/' + musicData.id">
        <img :src="musicImage" alt="" class="rounded-lg w-36 h-36" />
      </RouterLink>
      <div class="flex justify-between w-full items-center">
        <div class="flex flex-col text-primary-text-color  items-start ">
          <RouterLink :to="'/music/' + musicData.id" class="text-sm font-semibold text-center hover:underline">
            {{ musicData.name }}
          </RouterLink>
          <div class="flex gap-2 justify-center">
            <RouterLink :to="'/artist/' + musicData.artist" class="text-xs opacity-50 hover:underline">
              {{ musicData?.artist_name }}
            </RouterLink>
            <div v-if="musicData?.album" class="text-xs">|</div>
            <RouterLink :to="'/album/' + musicData?.album" class="text-xs opacity-50 hover:underline">
              {{ musicData.album_name }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const base_url = import.meta.env.VITE_BASE_API_URL;
const props = defineProps({
  musicData: {
    type: Object,
  }
})

const musicImage = computed(() => `${base_url}${props.musicData?.img_profile}`);
function playMusic() {
  this.$store.dispatch('setMusicPlayer', this.musicData)

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
