

<template>
  <PageLayout>
    <template #content>
      <div v-if="is_blur"
          class="fixed top-16 bggradientpopup w-screen h-screen z-40 flex flex-col justify-center gap-10 items-center"
        ></div>
      <AddAlbum v-if="is_OpenAdd" @close="toggleCloseAdd" />
      <ManageConfirmDialogue v-if="is_OpenDelete" actionQuestion="Do yo want to delete XYZ?" actionConfirm="Confirm Delete" @close="toggleCloseDelete" />
      <EditAlbum  v-if="is_OpenEdit" @close="toggleCloseEdit" />
      <ManageConfirmDialogue v-if="is_OpenRestore" actionQuestion="Do yo want to restore XYZ?" actionConfirm="Confirm Restore" @close="toggleCloseRestore" />
       <!-- <ManageConfirmDialogue v-if="is_OpenHide" actionQuestion="Do yo want to Hide XYZ?" actionConfirm="Confirm Hide" @close="toggleCloseHide" />
       <ManageConfirmDialogue v-if="is_OpenDisable" actionQuestion="Do yo want to Disable XYZ?" actionConfirm="Confirm Disable" @close="toggleCloseDisable" /> -->
      

      <div class="text-primary-text-color flex flex-col gap-2 w-full">
        <div class="flex h-screen">
          <div class="flex-1 mt-5">
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-3xl font-bold">All Albums</h1>
              <div class="flex items-center space-x-4">
                <div
                  class="hidden md:flex lg:w-[15vw] h-10 my-4 justify-between border border-primary-text-color rounded-full"
                >
                  <input
                    type="text"
                    class="text-sm border-none w-full p-2 bg-transparent focus:outline-none text-xsm text-primary-text-color placeholder:text-primary-text-color hidden sm:flex"
                    placeholder="Search Album..."
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
                  Add Album
                </button>
              </div>
            </div>

            <div class="flex flex-col justify-between">
              <div
                class="hidden sm:flex flex-row bg-transparent"
              >
                <div class="w-3/6  font-semibold">Name</div>
                <div class="flex  w-full justify-around items-center">


                <div class="font-semibold">Hide</div>
                <div class="font-semibold">Disable</div>
                <div class="font-semibold">Restore</div>
                <div class="font-semibold">Edit</div>
                <div class="font-semibold">Delete</div>
                </div>
              </div>
              <div
                v-for="album in albums"
                :key="album.name"
                class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color"
              >
                <router-link  :to="`/album/${album.id}`" class="flex items-center w-3/6  ">
                  <img
                    :src="`http://127.0.0.1:8000${album.img_profile}`"
                    alt="Album image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ album.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ album.artist }}</div>

                      <div class="text-sm sm:text-base">{{ album.album }}</div>
                    </div>
                  </div>
                </router-link>
                <div
                  class="flex w-full justify-around flex-row bg-transparent sm:hidden border-b border-b-primary-text-color"
                >
                  <p>Hide</p>
                  <p>Disable</p>
                  <p>Restore</p>
                  <p>Edit</p>
                  <p>Delete</p>
                </div>
                <div class="flex w-full justify-around items-center">
                
                    
                          <label class="relative inline-flex cursor-pointer items-center">
                          <input id="switch-2" type="checkbox" class="peer sr-only" />
                          <label for="switch-2" class="hidden"></label>
                          <div
                          class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                          ></div>
                          </label>
                          <label class="relative inline-flex cursor-pointer items-center">
                          <input id="switch-2" type="checkbox" class="peer sr-only" />
                          <label for="switch-2" class="hidden"></label>
                          <div
                          class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                          ></div>
                          </label>

                    <!-- <div v-if="true">
                      <div @click="toggleOpenHide" v-if="true" class="border border-secondary-color  rounded bg-secondary-color hover:text-secondary-color hover:bg-transparent text-sm p-1 text-dark-primary-color">Hide</div>
                      <div v-if="false" class="border  border-secondary-color  rounded bg-transparent text-sm p-1 text-secondary-colo">Show</div>
                    </div>

                    <div v-if="true">
                      <div @click="toggleOpenDisable" v-if="true" class="border border-secondary-color  rounded bg-secondary-color hover:text-secondary-color hover:bg-transparent text-sm p-1 text-dark-primary-color">Disable</div>
                      <div v-if="false" class="border  border-secondary-color  rounded bg-transparent text-sm p-1 text-secondary-colo">Enable</div>
                    </div> -->


                    <div v-if="true">
                      <div @click="toggleOpenRestore" v-if="true" class="border border-secondary-color  rounded bg-secondary-color hover:text-secondary-color hover:bg-transparent text-sm p-1 text-dark-primary-color">Restore</div>
                      <div v-if="false" class="border  border-secondary-color  rounded bg-transparent text-sm p-1 text-secondary-colo">Restored</div>
                    </div>
                    
                    <v-icon class=" cursor-pointer"
                      @click="toggleOpenEdit"
                      name="fa-regular-edit"
                      fill="#00b166"
                      scale="1.5"
                    ></v-icon>
                    <v-icon class=" cursor-pointer"
                      @click="toggleOpenDelete"
                      name="fa-regular-trash-alt"
                      fill="#ff4000"
                      scale="1.5"
                    ></v-icon>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </PageLayout>
</template>

<script setup>
import AddAlbum from '@/components/manage/album/AddAlbum.vue'
import EditAlbum from '@/components/manage/album/EditAlbum.vue'
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'

import { ref, onMounted } from 'vue'
import axios from 'axios'
const albums = ref([])
const is_blur = ref(false)
const is_OpenAdd = ref(false)
const is_OpenEdit = ref(false)
const is_OpenDelete = ref(false)
const is_OpenRestore = ref(false)
// const is_OpenHide = ref(false)
// const is_OpenDisable = ref(false)

function toggleOpenAdd() {
  is_OpenAdd.value = true
  is_blur.value = true
}
function toggleCloseAdd() {
  is_OpenAdd.value = false
  is_blur.value = false
}
function toggleOpenEdit() {
  is_OpenEdit.value = true
  is_blur.value = true
}
function toggleCloseEdit() {
  is_OpenEdit.value = false
  is_blur.value = false
}
function toggleOpenDelete() {
  is_OpenDelete.value = true
  is_blur.value = true
}
function toggleCloseDelete() {
  is_OpenDelete.value = false
  is_blur.value = false
}


function toggleOpenRestore() {
  is_OpenRestore.value = true
  is_blur.value = true
}
function toggleCloseRestore() {
  is_OpenRestore.value = false
  is_blur.value = false
}


// function toggleOpenHide() {
//   is_OpenHide.value = true
//   is_blur.value = true
// }
// function toggleCloseHide() {
//   is_OpenHide.value = false
//   is_blur.value = false
// }


// function toggleOpenDisable() {
//   is_OpenDisable.value = true
//   is_blur.value = true
// }
// function toggleCloseDisable() {
//   is_OpenDisable.value = false
//   is_blur.value = false
// }


const fetchAlbums = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/album/get/')
    const data = response.data
    albums.value = data
  } catch (error) {
    console.error('Error fetching albums:', error)
  }
}

onMounted(fetchAlbums)

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
