<template>
  <div class="flex flex-col items-center p-8 overflow-x-auto">
    <h2 class="text-3xl font-bold mb-4 text-secondary-color">Top Albums</h2>
    <div class="flex space-x-4">
      <div
        v-for="album in albums"
        :key="album.id"
        class="album-card bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
      >
        <div class="flex flex-col items-center p-4">
          <img
            src="https://source.unsplash.com/800x800/?portrait"
            alt="Album Image"
            class="w-56 h-56 object-cover rounded-md mb-4"
          />
          <h3 class="text-xl font-semibold text-center">{{ album.name }}</h3>
          <p class="text-gray-600">{{ album.artist }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const albums = ref([
  { id: 1, name: 'Album 1', artist: 'Artist 1' },
  { id: 2, name: 'Album 2', artist: 'Artist 2' },
  { id: 3, name: 'Album 3', artist: 'Artist 3' },
  { id: 4, name: 'Album 4', artist: 'Artist 4' },
  { id: 5, name: 'Album 5', artist: 'Artist 5' },
  { id: 6, name: 'Album 6', artist: 'Artist 6' }
])
</script>
<style scoped>
.album-card {
  @apply bg-light-primary-color rounded-lg shadow-md overflow-hidden;
  width: 18rem;
  height: 18rem;
}

.album-card img {
  @apply w-full h-full object-cover rounded-md transition-transform duration-300;
}

.album-card h3 {
  @apply text-xl font-semibold mt-4;
}

.album-card p {
  @apply text-gray-600;
}

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
