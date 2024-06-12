<template>
  <PageLayout>
    <template #content>
      <div
        v-if="is_blur"
        class="fixed top-16 bggradientpopup w-screen h-screen z-40 flex flex-col justify-between gap-10 items-center"
      ></div>
      <AddMusic v-if="is_OpenAdd" @close="toggleCloseAdd" :albums="albums" :genreData="genreData" />
      <ManageConfirmDialogue
        v-if="is_OpenDelete"
        actionQuestion="Do yo want to delete XYZ?"
        actionConfirm="Confirm Delete"
        @confirm="confirmDelete"
        @close="toggleCloseDelete"
      />

      <EditMusic v-if="is_OpenEdit" :musicId="editMusicId" :albums="albums" :genreData="genreData" @close="toggleCloseEdit" />
      <ManageConfirmDialogue
        v-if="is_OpenRestore"
        actionQuestion="Do yo want to restore XYZ?"
        actionConfirm="Confirm Restore"
        @close="toggleCloseRestore"
        @confirm="confirmRestore"
      />
     
      <div class="text-primary-text-color flex flex-col gap-2 w-full">
        <div class="flex h-screen">
          <div class="flex-1 mt-5">
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-lg sm:text-3xl font-bold"  v-if="!is_deletedShown">All Musics</h1>
              <h1 class="text-lg sm:text-3xl font-bold" v-else>All Deleted Musics</h1>
              <div class="flex items-center space-x-4">
                <div v-if="!is_deletedShown" @click="showDeletedList" class="border text-sm bg-secondary-color text-dark-primary-color  p-2 rounded-md hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none"> Show Deleted</div>
               <div v-if="is_deletedShown" @click="showAllList" class="border text-sm bg-secondary-color text-dark-primary-color  p-2 rounded-md hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none">Show All</div>
                <div class="hidden md:flex lg:w-[15vw] h-10 my-4 justify-between border border-primary-text-color rounded-full" >
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
                <button   v-if="userData.is_artist" class="px-4 py-2 bg-secondary-color text-dark-primary-color rounded-full border-2 hover:bg-transparent hover:border-secondary-color hover:text-secondary-color"  @click="toggleOpenAdd" >
                  Add Music
                </button>
              </div>
            </div>

            <div class="flex flex-col justify-between">
              <div class="hidden sm:flex flex-row bg-transparent border-b border-b-primary-text-color py-2" >
                <div class="w-3/6 font-semibold">Name</div>
                <div class="flex w-full justify-around items-center">
                  <div class="font-semibold" v-if="userData.is_artist  & !is_deletedShown">Hide</div>
                  <div class="font-semibold" v-if="userData.is_staff & !is_deletedShown">Disable</div>
                  <div class="font-semibold" v-if="is_deletedShown">Restore</div>
                  <div class="font-semibold" v-if="userData.is_artist  & !is_deletedShown ">Edit</div>
                  <div class="font-semibold" v-if="userData.is_artist  & !is_deletedShown">Delete</div>
                </div>
              </div>



              <div v-if="!is_deletedShown"  v-for="music in musics"  :key="music.name"  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                <router-link :to="`/music/${music.id}`" class="flex items-center w-3/6">
                  <img :src="`http://127.0.0.1:8000${music.img_profile}`"  alt="Music image" class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ music.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ music.artist_name }}</div>

                      <div class="text-sm sm:text-base">{{ music.album_name }}</div>
                    </div>
                  </div>
                </router-link>
                <div class="flex w-full justify-around flex-row bg-transparent  sm:hidden border-b border-b-primary-text-color" >
                  <p v-if="userData.is_artist">Hide</p>
                  <p v-if="userData.is_staff ">Disable</p>
                  <p v-if="userData.is_artist">Edit</p>
                  <p v-if="userData.is_artist">Delete</p>
                </div>
                <div class="flex w-full  justify-evenly items-center ">
                  <label v-if="userData.is_artist"
                  class="relative inline-flex cursor-pointer items-center">
                    <input
                      v-if="userData.is_artist"
                      :id="'hideswitch-' + music.id"
                      type="checkbox"
                      v-model="music.is_hidden"
                      @change="toggleHideMusic(music)"
                      class="peer sr-only"
                    />
                    <label :for="'hideswitch-' + music.id" class="hidden"></label>
                    <div
                      class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                    ></div>
                  </label>

                  <label  v-if="userData.is_staff"  class="relative inline-flex cursor-pointer items-center"  >
                    <input :id="'disableswitch-' + music.id"  type="checkbox"  v-model="music.is_disabled"  @change="toggleDisableMusic(music)" class="peer sr-only"  />
                    <label :for="'disableswitch-' + music.id" class="hidden"></label>
                    <div class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"></div>
                  </label>
                  <div>
                  </div>
                  <v-icon v-if="userData.is_artist"  class="cursor-pointer"  name="fa-regular-edit" @click="toggleOpenEdit(music.id)"  fill="#00b166" scale="1.5"></v-icon>
                  <v-icon v-if="userData.is_artist" class="cursor-pointer"  @click="toggleOpenDelete(music.id)" name="fa-regular-trash-alt" fill="#ff4000" scale="1.5"></v-icon>
                </div>
              </div>



              
              <div v-else v-for="delmusic in deletedMusics"  :key="delmusic.name" class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                  <div class="flex items-center w-3/6">
                  <img :src="`http://127.0.0.1:8000${delmusic.img_profile}`"  alt="Music image" class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ delmusic.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ delmusic.artist }}</div>
                      <div class="text-sm sm:text-base">{{ delmusic.album }}</div>
                    </div>
                  </div>
                </div>
                <div class="flex w-full justify-around flex-row bg-transparentborder-b border-b-primary-text-color" >
                  <div @click="toggleOpenRestore(delmusic.id)" class="border border-secondary-color rounded bg-secondary-color hover:text-secondary-color hover:bg-transparent text-sm p-1 text-dark-primary-color" >
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
import AddMusic from '@/components/manage/music/AddMusic.vue'
import EditMusic from '@/components/manage/music/EditMusic.vue'
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'

import store from '@/store/store'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()
const musics = ref([])
const deletedMusics = ref([])
const albums = ref([])
const access_token = localStorage.getItem('access_token')
const is_blur = ref(false)
const is_OpenAdd = ref(false)
const is_OpenEdit = ref(false)
const is_OpenDelete = ref(false)
const is_OpenRestore = ref(false)
const is_deletedShown = ref(false)
const genreData = ref([])
let toDeleteValue = 0
let toRestoreValue = 0

const editMusicId = ref(null)

function toggleOpenAdd() {
  fetchAlbums()
  getGenre()
  is_OpenAdd.value = true
  is_blur.value = true
}
function toggleCloseAdd() {
  is_OpenAdd.value = false
  is_blur.value = false
  fetchMusics()
}
function toggleOpenEdit(music) {
  is_OpenEdit.value = true
  is_blur.value = true
  editMusicId.value = music
}
function toggleCloseEdit() {
  is_OpenEdit.value = false
  is_blur.value = false

  fetchMusics()
}
function toggleOpenDelete(deleteId) {
  is_OpenDelete.value = true
  is_blur.value = true
  toDeleteValue = deleteId
}
function toggleCloseDelete() {
  is_OpenDelete.value = false
  is_blur.value = false
}

function toggleOpenRestore(restoreId) {
  is_OpenRestore.value = true
  is_blur.value = true
  toRestoreValue = restoreId
}
function toggleCloseRestore() {
  is_OpenRestore.value = false
  is_blur.value = false
}

const userData = computed(() => store.getters.getLoggedInUserData)

  const toggleHideMusic = async (music) => {
  const originalIsHidden = !music.is_hidden
  const newIsHidden = !originalIsHidden
  const action = newIsHidden ? 'hide' : 'unhide'

  const requestUrl = `http://127.0.0.1:8000/api/music/${action}/${music.id}/`

  try {
    await axios.delete(requestUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    $toast.success(`Music will be ${newIsHidden ? 'hidden' : 'visible'} to public`)
  } catch (error) {
    console.error(error)
    $toast.error(`Error occur while making music ${newIsHidden ? 'hidden' : 'visible'}`)
    music.is_hidden = originalIsHidden
  }
}

const toggleDisableMusic = async (music) => {
  const originalIsDisabled = !music.is_disabled
  const newIsDisabled = !originalIsDisabled
  const action = newIsDisabled ? 'disable' : 'enable'

  const requestUrl = `http://127.0.0.1:8000/api/music/${action}/${music.id}/`

  try {
    await axios.delete(requestUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    $toast.success(`Music is made ${newIsDisabled ? 'disable' : 'enable'}`)
  } catch (error) {
    console.error(error)
    $toast.error(`Error occur while making music ${newIsDisabled ? 'disable' : 'enable'}`)
    music.is_disabled = originalIsDisabled
  }
}

const showDeletedList = async () => {
    is_deletedShown.value = true
}
const showAllList = async () => {
 is_deletedShown.value = false
}

const fetchMusics = async () => {
  try {
    let data
    if (!userData.value.is_artist) {
      const response = await axios.get('http://127.0.0.1:8000/api/music/get/')
      data = response.data
    } else {
      const response = await axios.get('http://127.0.0.1:8000/api/music/get/loggedin/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })

      data = response.data
    }
    musics.value = data
  } catch (error) {
    console.error('Error fetching musics:', error)
  }
}

const fetchDeletedMusics = async () => {
  try {
    let data
    if (!userData.value.is_staff & userData.value.is_artist) {
      const response = await axios.get( 'http://127.0.0.1:8000/api/music/get/loggedin/deleted/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      data = response.data
    } else {
      const response = await axios.get('http://127.0.0.1:8000/api/music/get/deleted/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })

      data = response.data
    }
    deletedMusics.value = data
  } catch (error) {
    console.error('Error fetching musics:', error)
  }
}

function confirmDelete() {
  axios({
    method: 'delete',
    url: `http://127.0.0.1:8000/api/music/delete/${toDeleteValue}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      musics.value = musics.value.filter((music) => music.id !== toDeleteValue)
      $toast.success('Music is deleted', {
        position: 'top-right'
      })
      if (response.status === 200) {
        is_OpenDelete.value = false
        is_blur.value = false
      }
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}

function confirmRestore() {
  axios({
    method: 'delete',
    url: `http://127.0.0.1:8000/api/music/recover/${toRestoreValue}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      deletedMusics.value = deletedMusics.value.filter((deletedMusics) => deletedMusics.id !== toRestoreValue)
      $toast.success('Music is Restored', {
        position: 'top-right'
      })
      console.log(response)
      if (response.status === 200) {
        is_OpenRestore.value = false
        is_blur.value = false
      }
    })
    .catch((err) => {
      console.log(err.response.data)
    })
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
      console.log(response.data,"here we goo")
      data = response.data
    }
    albums.value = data
  } catch (error) {
    console.error('Error fetching albums:', error)
  }
}

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
  fetchMusics()
  fetchDeletedMusics()
  
})
</script>

<style scoped>

</style>
