<template>
  <div class="flex flex-col items-center p-8 overflow-x-auto">
    <h2 class="text-xl font-bold mb-4 text-secondary-color">Top Albums</h2>
    <div class="flex space-x-4">
      <RouterLink :to="'album/'+ artist.id"
        v-for="album in albums"
        :key="album.id"
        class="album-card p-2 transform hover:scale-105 transition-transform duration-300 bg-light-primary-color rounded-lg shadow-md overflow-hidden"
      >
        <div class="flex flex-col items-center ">
          <img
            src="https://source.unsplash.com/800x800/?portrait"
            alt="Album Image"
            class="object-cover rounded-md w-full h-full transition-transform duration-300"
          />
          <h3 class="text-md font-semibold text-center  mt-4">{{ album.name }}</h3>
          <p class="text-sm text-gray-600">{{ album.artist }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const albums = ref([
  { id: 1, name: 'Music 1', artist: 'Artist 1' },
  { id: 2, name: 'Music 2', artist: 'Artist 2' },
  { id: 3, name: 'Music 3', artist: 'Artist 3' },
  { id: 4, name: 'Music 4', artist: 'Artist 4' },
  { id: 5, name: 'Music 5', artist: 'Artist 5' },
  { id: 6, name: 'Music 6', artist: 'Artist 6' }
])
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
