<template>
   <div class="mb-10">

     <h2 class="text-lg font-bold  text-primary-text-color self-start">Top Albums</h2>
    <div class="flex gap-4 overflow-y-hidden">
         <AlbumCard v-for="x in albumData" class="p-5 " :albumData="x" linkto="album"/>
    </div>
   </div>
</template>

<script setup>
import { ref } from 'vue'
import AlbumCard from '../cards/AlbumCard.vue';
const albumData = ref([
  { id: 1, name: 'Album 1', artist: 'Artist 1' },
  { id: 2, name: 'Album 2', artist: 'Artist 2' },
  { id: 3, name: 'Album 3', artist: 'Artist 3' },
  { id: 4, name: 'Album 4', artist: 'Artist 4' },
  { id: 5, name: 'Album 5', artist: 'Artist 5' },
  { id: 6, name: 'Album 6', artist: 'Artist 6' }
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
