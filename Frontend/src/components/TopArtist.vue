<template>
  <div class="flex flex-col items-center p-8 overflow-x-auto">
    <h2 class="text-3xl font-bold mb-4 text-white">Top Artists</h2>
    <div class="flex space-x-4">
      <div
        v-for="artist in artists"
        :key="artist.id"
        class="artist-card w-[18rem] bg-light-primary-color rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
      >
        <div class="flex flex-col items-center p-4">
          <img :src="artistImage" alt="Artist Image" class="w-56 h-56 rounded-full object-cover mb-4 border-8   bg-gradient-to-r from-light-primary-color to-secondary-color" />

          <h3 class="text-xl font-semibold text-center">{{ artist.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import artistImage from '../../src/assets/ariana.jpg'; 

const artists = ref([
  { id: 1, name: 'Taylor Swift' },
  { id: 2, name: 'Ed Sheeran' },
  { id: 3, name: 'Beyoncé' },
  { id: 4, name: 'Drake' },
  { id: 5, name: 'Ariana Grande' },
  { id: 6, name: 'Bruno Mars' },  
]);
</script>

<style scoped>
/* .artist-card {
  @apply bg-light-primary-color rounded-lg shadow-md overflow-hidden;
  width: 18rem; 
  height: fit-content; 
} */

/* .artist-card img {
  @apply  object-cover transition-transform duration-300 ;
} */

/* .artist-card h3 {
  @apply text-xl font-semibold mt-4; 
} */

/* .artist-card {
  width: calc(50% - 1rem); 
  max-width: 18rem; 
  height: fit-content;
} */

/* .artist-card img {
  width: 100%;
  height: auto;
} */

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
