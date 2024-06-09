<template>
  <PageLayout>
    <template #content>
      <div
        v-if="is_blur"
        class="fixed top-16 bggradientpopup w-screen h-screen z-40 flex flex-col justify-center gap-10 items-center"
      ></div>
      <AddAlbum v-if="is_OpenAdd" @close="toggleCloseAdd" />
      <ManageConfirmDialogue
        v-if="is_OpenDelete"
        actionQuestion="Do yo want to delete XYZ?"
        actionConfirm="Confirm Delete"
        @close="toggleCloseDelete"
        @confirm="confirmDelete"
      />
      <EditAlbum v-if="is_OpenEdit" :albumId="editAlbumId" @close="toggleCloseEdit" />
      <ManageConfirmDialogue
        v-if="is_OpenRestore"
        actionQuestion="Do yo want to restore XYZ?"
        actionConfirm="Confirm Restore"
        @close="toggleCloseRestore"
      />
      <!-- <ManageConfirmDialogue v-if="is_OpenHide" actionQuestion="Do yo want to Hide XYZ?" actionConfirm="Confirm Hide" @close="toggleCloseHide" />
       <ManageConfirmDialogue v-if="is_OpenDisable" actionQuestion="Do yo want to Disable XYZ?" actionConfirm="Confirm Disable" @close="toggleCloseDisable" /> -->

      <div class="text-primary-text-color flex flex-col gap-2 w-full">
        <div class="flex h-screen">
          <div class="flex-1 mt-5">
            <div class="flex items-center justify-between mb-6">


              <h1 class="text-lg sm:text-3xl font-bold"  v-if="!is_deletedShown">All Albums</h1>
              <h1 class="text-lg sm:text-3xl font-bold" v-else>All Deleted Albums</h1>
              <div class="flex items-center space-x-4">
                 <div v-if="!is_deletedShown" @click="showDeletedList" class="border text-sm bg-secondary-color text-dark-primary-color  p-2 rounded-md hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none"> Show Deleted</div>
               <div v-if="is_deletedShown" @click="showAllList" class="border text-sm bg-secondary-color text-dark-primary-color  p-2 rounded-md hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none">Show All</div>
                
                <div class="hidden md:flex lg:w-[15vw] h-10 my-4 justify-between border border-primary-text-color rounded-full">
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
                <button    v-if="userData.is_artist"
                  class="px-4 py-2 bg-secondary-color text-dark-primary-color rounded-full border-2 hover:bg-transparent hover:border-secondary-color hover:text-secondary-color"
                  @click="toggleOpenAdd"
                >
                  Add Album
                </button>
              </div>
            </div>

            <div class="flex flex-col justify-between">
              <div
                class="hidden sm:flex flex-row bg-transparent border-b border-b-primary-text-color"
              >
                <div class="w-3/6 font-semibold">Name</div>
                <div class="flex w-full justify-around items-center">
                  <div class="font-semibold" v-if="userData.is_artist   & !is_deletedShown">Hide</div>
                  <div class="font-semibold" v-if="userData.is_staff   & !is_deletedShown">Disable</div>
                  <div class="font-semibold" v-if="is_deletedShown">Restore</div>
                  <div class="font-semibold" v-if="userData.is_artist   & !is_deletedShown">Edit</div>
                  <div class="font-semibold" v-if="userData.is_artist   & !is_deletedShown">Delete</div>
                </div>
              </div>
              <div v-if="!is_deletedShown"
                v-for="album in albums"
                :key="album.name"
                class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                <router-link :to="`/album/${album.id}`" class="flex items-center w-3/6">
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
                  <p v-if="userData.is_artist">Hide</p>
                  <p v-if="userData.is_staff">Disable</p>
                  <p v-if="userData.is_artist">Edit</p>
                  <p v-if="userData.is_artist">Delete</p>
                </div>
                <div class="flex w-full justify-around items-center">
                  <label
                    v-if="userData.is_artist"
                    class="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      :id="'hideswitch-' + album.id"
                      type="checkbox"
                      v-model="album.is_hidden"
                      @change="toggleHideAlbum(album)"
                      class="peer sr-only"
                    />
                    <label :for="'hideswitch-' + album.id" class="hidden"></label>
                    <div
                      class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                    ></div>
                  </label>
                  <label
                    v-if="userData.is_staff"
                    class="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      :id="'disableswitch-' + album.id"
                      type="checkbox"
                      v-model="album.is_disabled"
                      @change="toggleDisableAlbum(album)"
                      class="peer sr-only"
                    />
                    <label :for="'disableswitch-' + album.id" class="hidden"></label>
                    <div
                      class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                    ></div>
                  </label>
                  <v-icon v-if="userData.is_artist"
                    class="cursor-pointer"
                    @click="toggleOpenEdit(album)"
                    name="fa-regular-edit"
                    fill="#00b166"
                    scale="1.5"
                  ></v-icon>
                  <v-icon v-if="userData.is_artist"
                    class="cursor-pointer"
                    @click="toggleOpenDelete(album.id)"
                    name="fa-regular-trash-alt"
                    fill="#ff4000"
                    scale="1.5"
                  ></v-icon>
                </div>
               </div>

               <div v-else
                v-for="deletedalbum in deletedAlbums"
                :key="deletedalbum.name"
                class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                <div class="flex items-center w-3/6">
                  <img
                    :src="`http://127.0.0.1:8000${deletedalbum.img_profile}`"
                    alt="Album image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />
                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ deletedalbum.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ deletedalbum.artist }}</div>

                      <div class="text-sm sm:text-base">{{ deletedalbum.album }}</div>
                    </div>
                  </div>
                </div>
                <div class="flex w-full justify-around items-center">
                    <div  @click="toggleOpenRestore" class="border border-secondary-color rounded bg-secondary-color hover:text-secondary-color hover:bg-transparent text-sm p-1 text-dark-primary-color" >
                      Restore
                    </div>
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
import { useToast } from 'vue-toast-notification'
import store from '@/store/store'

import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
const $toast = useToast()
const access_token = localStorage.getItem('access_token')
const userData = computed(() => store.getters.getLoggedInUserData)
const albums = ref([])
const is_deletedShown = ref(false)
const deletedAlbums = ref([])
const is_blur = ref(false)
const is_OpenAdd = ref(false)
const is_OpenEdit = ref(false)
const is_OpenDelete = ref(false)
const is_OpenRestore = ref(false)
let toDeleteValue = 0
// const is_OpenHide = ref(false)
// const is_OpenDisable = ref(false)

const editAlbumId = ref(null)
function toggleOpenAdd() {
  is_OpenAdd.value = true
  is_blur.value = true
}
function toggleCloseAdd() {
  is_OpenAdd.value = false
  is_blur.value = false
}
function toggleOpenEdit(album) {
  is_OpenEdit.value = true
  is_blur.value = true
  editAlbumId.value = album.id
}
function toggleCloseEdit() {
  is_OpenEdit.value = false
  is_blur.value = false
}
function toggleOpenDelete(deletevalue) {
  is_OpenDelete.value = true
  is_blur.value = true
  toDeleteValue = deletevalue
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

const showDeletedList = async () => {
    is_deletedShown.value = true
}
const showAllList = async () => {
 is_deletedShown.value = false
}

const fetchAlbums = async () => {
  try {
    let data
    if (!userData.value.is_artist) {
      const response = await axios.get('http://127.0.0.1:8000/api/album/get/')
      data = response.data
    } else {
      const response = await axios.get('http://127.0.0.1:8000/api/album/get/loggedin/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      data = response.data
    }
    albums.value = data
  } catch (error) {
    console.error('Error fetching albums:', error)
  }
}


const fetchDeletedAlbum = async () => {
  try {
    let data
    if (!userData.value.is_staff & userData.value.is_artist) {
      const response = await axios.get( 'http://127.0.0.1:8000/api/album/get/loggedin/deleted/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      data = response.data
    } else {
      const response = await axios.get('http://127.0.0.1:8000/api/album/get/deleted/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })

      data = response.data
    }
    deletedAlbums.value = data
  } catch (error) {
    console.error('Error fetching Album:', error)
  }
}


const toggleHideAlbum = async (album) => {
  const originalIsHidden = !album.is_hidden
  const newIsHidden = !originalIsHidden
  const action = newIsHidden ? 'hide' : 'unhide'

  const requestUrl = `http://127.0.0.1:8000/api/album/${action}/${album.id}/`

  try {
    await axios.delete(requestUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    $toast.success(`Album will be ${newIsHidden ? 'hidden' : 'visible'} to public`)
  } catch (error) {
    console.error(error)
    $toast.error(`Error occur while making album ${newIsHidden ? 'hidden' : 'visible'}`)
    album.is_hidden = originalIsHidden
  }
}
const toggleDisableAlbum = async (album) => {
  const originalIsDisabled = !album.is_disabled
  const newIsDisabled = !originalIsDisabled
  const action = newIsDisabled ? 'disable' : 'enable'

  const requestUrl = `http://127.0.0.1:8000/api/album/${action}/${album.id}/`

  try {
    await axios.delete(requestUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    $toast.success(`Album is made ${newIsDisabled ? 'disable' : 'enable'}`)
  } catch (error) {
    console.error(error)
    $toast.error(`Error occur while making album ${newIsDisabled ? 'disable' : 'enable'}`)
    album.is_disabled = originalIsDisabled
  }
}
function confirmDelete() {
  axios({
    method: 'delete',
    url: `http://127.0.0.1:8000/api/album/delete/${toDeleteValue}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      albums.value = albums.value.filter((album) => album.id !== toDeleteValue)
      $toast.success('Album is deleted', {
        position: 'top-right'
      })
      console.log(response)
      if (response.status === 200) {
        is_OpenDelete.value = false
        is_blur.value = false
      }
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}


onMounted(() =>{
  fetchAlbums()
  fetchDeletedAlbum()
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
