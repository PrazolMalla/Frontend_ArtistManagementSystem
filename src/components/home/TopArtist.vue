<template>
  <div class="mb-10">
    <h4 class="text-lg font-bold text-primary-text-color self-start">Top Artists</h4>
    <div class="flex overflow-y-hidden">
        <ArtistCard v-for="x in artistData" class="p-5" :artistDetail="x"/>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ArtistCard from '@/components/cards/ArtistCard.vue';

const artistData = ref([
  { id: 1, name: 'Taylor Swift', username:'taylor' },
  { id: 2, name: 'Ed Sheeran',username:'taylor'  },
  { id: 3, name: 'Beyoncé',username:'taylor'   },
  { id: 4, name: 'Drake',username:'taylor'   },
  { id: 5, name: 'Ariana Grande',username:'taylor'   },
  { id: 6, name: 'Bruno Mars',username:'taylor'   }
])
</script>

<style scoped>


.artistGradient {
  background: linear-gradient(45deg, #ff4000bb, #ece6d59d);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.artistPic{
  width: 102px;
  height: 1/1;
}

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
