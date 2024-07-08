<template>


  <RouterLink :to="'artist/' + artistData.id"
    class="transform hover:scale-105 transition-transform duration-300 cursor-pointer">
    <div class="flex flex-col gap-2 items-center p-4 overflow-x-hidden">
      <div
        class="w-28 h-28 bg-cover rounded-full relative border overflow-hidden hover:border-2 cursor-pointer border-secondary-color"
        :style="{
          backgroundImage: `url(${artistDataImg})`, backgroundSize: 'cover'
        }"></div>

      <p class="text-xs text-center text-gray-600">@{{ artistData.username }}</p>

    </div>
  </RouterLink>
</template>
<script setup>
import { computed } from 'vue';
const base_url = import.meta.env.VITE_BASE_API_URL;
const props = defineProps({
  artistData: {
    type: Object
  }
})
const artistDataImg = computed(() => `${base_url}${props.artistData?.img_profile}`);



</script>

<style scoped>

@media (min-width: 768px) {
  .artist-card {
    width: calc(33.33% - 1rem);
  }
}

@media (min-width: 1024px) {
  .artist-card {
    width: calc(25% - 1rem);
  }
}
</style>
