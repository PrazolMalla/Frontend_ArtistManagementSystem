<template>
  <div class="flex flex-col items-center p-8 overflow-x-hidden w-full">
    <h4 class="text-xl font-bold mb-4 text-secondary-color">Top Artists</h4>
    <div class="flex space-x-4">
      <RouterLink :to="'artist/'+ artist.id" 
        v-for="artist in artists"
        :key="artist.id"
        class="artist-card w-[14rem] transform hover:scale-105 transition-transform duration-300 cursor-pointer"
      >
        <div class="flex flex-col gap-2  items-center p-4 overflow-x-hidden">
          <div
            class="w-28 h-28  rounded-full flex justify-center items-center artistGradient" >
            <img
              src="https://source.unsplash.com/800x800/?portrait"
              alt="Artist Image"
              class="artistPic rounded-full object-cover border-none bg-secondary-color z-10"
            />
          </div>
          <div class="text-center">
          <h3 class="text-md font-semibold text-center">{{ artist.name }}</h3>
          <p class="text-sm text-gray-600">@{{ artist.username }}</p>

          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const artists = ref([
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
