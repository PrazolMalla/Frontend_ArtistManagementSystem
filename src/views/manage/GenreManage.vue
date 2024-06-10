<template>
  <PageLayout>
    <template #content>
      <div
        v-if="is_blur"
        class="fixed top-16 bggradientpopup w-screen h-screen z-40 flex flex-col justify-center gap-10 items-center"
      ></div>
      <AddGenre v-if="is_OpenAdd" @close="toggleCloseAdd"/>
      <div class="text-primary-text-color flex flex-col gap-2 w-full">
        <div class="flex h-screen">
          <div class="flex-1 mt-5">
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-lg sm:text-3xl font-bold">All Genre</h1>
              <div class="flex items-center space-x-4">
                <div class="hidden md:flex lg:w-[15vw] h-10 my-4 justify-between border border-primary-text-color rounded-full" >
                  <input
                    type="text"
                    class="text-sm border-none w-full p-2 bg-transparent focus:outline-none text-xsm text-primary-text-color placeholder:text-primary-text-color hidden sm:flex"
                    placeholder="Search Genre..."
                  />
                  <v-icon
                    name="md-search"
                    fill="#302f31"
                    scale="1.5"
                    class="cursor-pointer hover:text-gray-950 mt-1 p-1"
                  />
                </div>
                <button class="px-4 py-2 bg-secondary-color text-dark-primary-color rounded-full border-2 hover:bg-transparent hover:border-secondary-color hover:text-secondary-color"  @click="toggleOpenAdd" >
                  Add Genre
                </button>
              </div>
            </div>

            <div class="flex flex-col justify-between">
              <div class="hidden sm:flex flex-row bg-transparent border-b border-b-primary-text-color py-2" >
                <div class="w-3/6 font-semibold">Name</div>
              </div>
              <div  v-for="genre in genreData"  :key="genre.name"  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                <router-link :to="`/genre`" class="flex items-center w-3/6">
                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ genre.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base text-slate-600">{{ genre.weather }}</div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>


  </PageLayout>
</template>

<script setup>
import AddGenre from '@/components/manage/genre/AddGenre.vue'

import store from '@/store/store'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()

const is_blur = ref(false)
const is_OpenAdd = ref(false)
const genreData = ref([])

function toggleOpenAdd() {
  is_OpenAdd.value = true
  is_blur.value = true
}
function toggleCloseAdd() {
  is_OpenAdd.value = false
  is_blur.value = false
//   fetchMusics()
}
const userData = computed(() => store.getters.getLoggedInUserData)


const getGenre = async () => {
   await axios
      .get('http://127.0.0.1:8000/api/genre/get/')
      .then((response) => {
        console.log(response.data)
        genreData.value = response.data
      })
      .catch((error) => {
        console.error(error)
      })
  }

onMounted(() =>{
  getGenre()
})
</script>

<style scoped>
.bggradientpopup {
  background: #ffffff3f;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
