<template>
  <div class="flex flex-col items-center p-8 overflow-x-auto">
    <h2 class="text-xl font-bold mb-4 text-secondary-color">Top Albums</h2>
    <div class="pl-[30vw] flex gap-4">
      <RouterLink :to="'album/'+ album.id"
        v-for="album in albums"
        :key="album.id"
        class="album-card p-2 transform hover:scale-105 transition-transform duration-300 bg-light-primary-color rounded-lg shadow-md o"
      >
        <div class="flex flex-col items-center ">
            <div class="flex justify-start lg:w-[15vw] w-[40vw]"> 
              <div class="z-20">
                <img
                  src="../../assets/images/album-cover-design-template-05a138f43b181c728e956968786fdf7d_screen.jpg"
                  alt=""
                  class="w-[10rem]" 
                />
              </div>
              <div class="relative z-10 lg:ml-[-6rem] lg:mt-[-1.5rem] mt-[-0.75rem] ml-[-3.5rem]"> 
                <div
                  class="absolute lg:w-12 lg:h-12 rounded-full bg-red-50 lg:top-[4.5rem] lg:left-[4.75rem] lg:flex hidden overflow-hidden" 
                >
                  <img
                    src="../../assets/images/album-cover-design-template-05a138f43b181c728e956968786fdf7d_screen.jpg"
                    alt=""
                  />
                </div>
                <img src="../../assets/images/musiccassette.png" alt="" class="w-[12.5rem]" /> 
              </div>
            </div>

      
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
