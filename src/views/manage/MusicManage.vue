<template>
  <PageLayout>
    <template #content>
      <div v-if="is_OpenAdd">
              <div
          class="fixed top-16 bggradientpopup w-screen h-screen z-40 flex flex-col justify-center gap-10 items-center"
        ></div>

      <AddMusic @close="toggleCloseAdd"/>
      </div>
      



       <div v-if="is_OpenDelete">
              <div
          class="fixed top-16 bggradientpopup w-screen h-screen z-40 flex flex-col justify-center gap-10 items-center"
        ></div>

      <DeleteEdit @close="toggleCloseDelete"/>
      </div>




       <div v-if="is_OpenEdit">
              <div
          class="fixed top-16 bggradientpopup w-screen h-screen z-40 flex flex-col justify-center gap-10 items-center"
        ></div>

      <EditMusic @close="toggleCloseEdit"/>
      </div>
  
      <div class="text-primary-text-color flex flex-col gap-2 w-full border">
        <div class="flex h-screen">
          <div class="flex-1 mt-5">
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-3xl font-bold">All Songs</h1>
              <div class="flex items-center space-x-4">
                <div
                  class="hidden md:flex lg:w-[15vw] h-10 my-4 justify-between border border-primary-text-color rounded-full"
                >
                  <input
                    type="text"
                    class="text-sm border-none w-full p-2 bg-transparent focus:outline-none text-xsm text-primary-text-color placeholder:text-primary-text-color hidden sm:flex"
                    placeholder="Search Music..."
                  />
                  <v-icon
                    name="md-search"
                    fill="#302f31"
                    scale="1.5"
                    class="cursor-pointer hover:text-gray-950 mt-1 p-1"
                  />
                </div>
                <button
                  class="px-4 py-2 bg-secondary-color text-dark-primary-color rounded-full border-2 hover:bg-transparent hover:border-secondary-color hover:text-secondary-color"
                
                 @click="toggleOpenAdd"
                
                  >
                  Add Music
                </button>
              </div>
            </div>

            <div class="flex flex-col justify-between">
              <div
                class="hidden sm:flex flex-row bg-transparent border-b border-b-primary-text-color"
              >
                <div class="p-4 w-full font-semibold">Name</div>
                <div class="p-4 w-1/6 font-semibold">Hide</div>
                <div class="p-4 w-1/6 font-semibold">Disable</div>
                <div class="p-4 w-1/3 font-semibold">Actions</div>
              </div>
              <router-link>
                <div
                  v-for="song in songs"
                  :key="song.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color"
                >
                  <div class="p-4 flex items-center w-full">
                    <img
                      :src="`http://127.0.0.1:8000${song.img_profile}`"
                      alt="Song image"
                      class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                    />

                    <div>
                      <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                        {{ song.name }}
                      </div>
                        <div class="flex flex-col sm:flex-row sm:gap-2">
                          <div class="text-sm sm:text-base">{{ song.artist }}</div>

                          <div class="text-sm sm:text-base">{{ song.album }}</div>

                      </div>
                    </div>
                  </div>
                  <div
                    class="flex w-full justify-around flex-row bg-transparent sm:hidden border-b border-b-primary-text-color"
                  >
                    <p>Hide</p>
                    <p>Enable</p>
                    <p>Actions</p>
                  </div>
                  <div class="flex justify-around w-full">
                    <div class="p-4 w-1/6">
                      <label class="relative inline-flex cursor-pointer items-center">
                        <input id="switch-2" type="checkbox" class="peer sr-only" />
                        <label for="switch-2" class="hidden"></label>
                        <div
                          class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                        ></div>
                      </label>
                    </div>
                    <div class="p-4 w-1/6">
                      <label class="relative inline-flex cursor-pointer items-center">
                        <input id="switch-2" type="checkbox" class="peer sr-only" />
                        <label for="switch-2" class="hidden"></label>
                        <div
                          class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                        ></div>
                      </label>
                    </div>
                   
                    <div class="p-4 w-1/3 flex gap-6">
                      <v-icon
                      @click="toggleOpenEdit"
                        name="fa-regular-edit"
                        fill="#00b166"
                        scale="1.5"
                        class="cursor-pointer"
                      ></v-icon>
                      <v-icon
                      @click="toggleOpenDelete"
                        name="fa-regular-trash-alt"
                        fill="#ff4000"
                        scale="1.5"
                        class="cursor-pointer"
                      ></v-icon>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </template>
  </PageLayout>
</template>

<script setup>

import AddMusic from '@/components/manage/AddMusic.vue';
import EditMusic from '@/components/manage/EditMusic.vue';
import DeleteEdit from '@/components/manage/DeleteMusic.vue'

import { ref, onMounted } from 'vue'
import axios from 'axios'
const songs = ref([])

const is_OpenAdd= ref(false);
const is_OpenEdit= ref(false);
const is_OpenDelete = ref(false);

function toggleOpenAdd() {
  is_OpenAdd.value = true;
}
function toggleCloseAdd() {
  is_OpenAdd.value = false;
}
function toggleOpenEdit(){
  is_OpenEdit.value = true;

}
function toggleCloseEdit(){
  is_OpenEdit.value = false;

}
function toggleCloseDelete(){
  is_OpenDelete.value = false;

}

function toggleOpenDelete(){
  is_OpenDelete.value = true;

}


const fetchSongs = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/music/get/')
    const data = response.data
    songs.value = data
  } catch (error) {
    console.error('Error fetching songs:', error)
  }
}

onMounted(fetchSongs)

// const songs = ref([
//   {
//     name: 'Wildflowers of California',
//     artist: 'Patrick Ono',
//     album: 'Raichu',
//     releaseDate: '2 days ago',
//     image: 'https://source.unsplash.com/800x800/?portrait'
//   },
//   {
//     name: 'Night Towers',
//     artist: 'Patrick Ono',
//     album: 'Hello',
//     releaseDate: 'Jun 16, 2023',
//     image: 'https://source.unsplash.com/800x800/?portrait'
//   },
//   {
//     name: 'Winter',
//     artist: 'Patrick Ono',
//     album: 'RRR',
//     releaseDate: 'May 2, 2023',
//     image: 'https://source.unsplash.com/800x800/?portrait'
//   },
//   {
//     name: 'Just a Thought',
//     artist: 'Patrick Ono',
//     album: 'Hello',
//     releaseDate: 'Jan 24, 2023',
//     image: 'https://source.unsplash.com/800x800/?portrait'
//   },
//   {
//     name: 'Memories',
//     artist: 'Patrick Ono',
//     album: 'Nirmal',
//     releaseDate: 'Jan 6, 2023',
//     image: 'https://source.unsplash.com/800x800/?portrait'
//   }
// ])
</script>

<style scoped>
.bggradientpopup{
    background: #ffffff3f;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

}
</style>
