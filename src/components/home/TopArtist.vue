<template>
  <div class="flex flex-col items-center p-8 overflow-x-hidden">
    <h2 class="text-3xl font-bold mb-4 text-secondary-color">Top Artists</h2>
    <div class="flex space-x-4">
      <div
        v-for="artist in artists"
        :key="artist.id"
        class="artist-card w-[18rem] transform hover:scale-105 transition-transform duration-300"
      >
        <div class="flex flex-col gap-2  items-center p-4 overflow-x-hidden">
          <div
            class="w-52 h-52  rounded-full flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            <img
              src="https://source.unsplash.com/800x800/?portrait"
              alt="Artist Image"
              class="w-48 h-48 rounded-full object-cover border-none bg-secondary-color z-10"
            />
          </div>

          <h3 class="text-xl font-semibold text-center">{{ artist.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const artists = ref([
  { id: 1, name: 'Taylor Swift' },
  { id: 2, name: 'Ed Sheeran' },
  { id: 3, name: 'Beyoncé' },
  { id: 4, name: 'Drake' },
  { id: 5, name: 'Ariana Grande' },
  { id: 6, name: 'Bruno Mars' }
])
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
