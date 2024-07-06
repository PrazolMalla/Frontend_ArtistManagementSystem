<template>
  <PageLayout>
    <template #content>
      <div
        v-if="is_blur"
        class="fixed top-16 bggradientpopup ml-[-3rem] w-screen h-screen z-40 flex flex-col justify-between gap-10 items-center"
      ></div>
      <AddMusic v-if="is_OpenAdd" @close="toggleCloseAdd" />
      <ManageConfirmDialogue
        v-if="is_OpenDelete"
        :actionQuestion="`Do yoy want to delete ${itemName}?`"
        actionConfirm="Confirm Delete"
        @close="toggleCloseDelete"
        @confirm="confirmDelete"
      />
      <EditMusic v-if="is_OpenEdit" :musicId="editMusicId" @close="toggleCloseEdit" />
      <ManageConfirmDialogue
        v-if="is_OpenRestore"
        :actionQuestion="`Do you want to restore ${itemName}?`"
        actionConfirm="Confirm Restore"
        @close="toggleCloseRestore"

        @confirm="confirmRestore"
      />
      <!-- <ManageConfirmDialogue v-if="is_OpenHide" actionQuestion="Do yo want to Hide XYZ?" actionConfirm="Confirm Hide" @close="toggleCloseHide" />
       <ManageConfirmDialogue v-if="is_OpenDisable" actionQuestion="Do yo want to Disable XYZ?" actionConfirm="Confirm Disable" @close="toggleCloseDisable" /> -->

      <div class="text-primary-text-color flex flex-col gap-2 w-full">
        <div class="flex h-screen">
          <div class="flex-1 mt-5">
            <div class="flex items-center justify-between mb-6">


                <h1 class="text-lg sm:text-3xl font-bold">

                    All
                    <span v-if="is_tabShown=='deleted'">Deleted</span>
                    <span  v-if="is_tabShown=='disabled'">Disabled</span>
                    <span v-if="is_tabShown=='hidden'">Hidden</span>
                    Musics
                </h1>


              <div class="flex items-center space-x-4">

                <div v-if="is_tabShown!='deleted' && userData.is_artist" @click="showDeletedList" class="border text-xs bg-secondary-color text-dark-primary-color px-2 p-1 rounded-md hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none">Deleted</div>
               <div v-if="is_tabShown!='disabled' && userData.is_staff" @click="showDisabledList" class="border text-xs bg-secondary-color text-dark-primary-color px-2  p-1 rounded-md hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none">Disabled</div>
              <div v-if="is_tabShown!='hidden' && userData.is_artist" @click="showHiddenList" class="border text-xs bg-secondary-color text-dark-primary-color px-2  p-1 rounded-md hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none">Hidden</div>
              
               <div v-if="is_tabShown!='all'" @click="showAllList" class="border text-xs bg-secondary-color text-dark-primary-color px-2  p-1 rounded-md hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none">All</div>
    
                <div class="hidden md:flex lg:w-[15vw] h-10 my-4 justify-between border border-primary-text-color rounded-full">
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
                <button    v-if="userData.is_artist"
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
                <div class="w-3/6 font-semibold">Name</div>
                <div class="flex w-full justify-around items-center">
                  <div class="font-semibold" v-if="userData.is_artist   & is_tabShown=='all'">Hide</div>
                  <div class="font-semibold" v-if="userData.is_staff   & is_tabShown=='all'">Disable</div>
                  <div class="font-semibold" v-if="is_tabShown=='deleted'">Restore</div>
                  <div class="font-semibold" v-if="is_tabShown=='disabled'">Disable</div>
                  <div class="font-semibold" v-if="is_tabShown=='hidden'">Hide</div>
                  <div class="font-semibold" v-if="userData.is_artist   & is_tabShown=='all'">Edit</div>
                  <div class="font-semibold" v-if="userData.is_artist   & is_tabShown=='all'">Delete</div>
                </div>
              </div>

              <div v-if="is_tabShown=='all'"
                v-for="music in musics"
                :key="music.name"
                class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                
                <router-link v-if="!music.is_disabled" :to="`/music/${music.id}`" class="flex items-center w-3/6">
                  <img
                    :src="`${base_url}${music.img_profile}`"
                    alt="Music image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ music.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ music.artist_name }}</div>

                    </div>
                  </div>
                </router-link>
                <div v-else class="flex  items-center w-3/6">
                   <img
                    :src="`${base_url}${music.img_profile}`"
                    alt="Music image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ music.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ music.artist_name }}</div>

                    </div>
                  </div>
                </div>

                <div
                  class="flex w-full justify-around flex-row bg-transparent sm:hidden border-b border-b-primary-text-color"
                >
                  <p v-if="userData.is_artist">Hide</p>
                  <p v-if="userData.is_staff">Disable</p>
                  <p v-if="userData.is_artist">Edit</p>
                  <p v-if="userData.is_artist">Delete</p>
                </div>
                <div class="flex w-full  justify-around items-center">
                  <label
                    v-if="userData.is_artist"
                    class="relative inline-flex cursor-pointer items-center"
                  >
                    <input
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
                  <label
                    v-if="userData.is_staff"
                    class="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      :id="'disableswitch-' + music.id"
                      type="checkbox"
                      v-model="music.is_disabled"
                      @change="toggleDisableMusic(music)"
                      class="peer sr-only"
                    />
                    <label :for="'disableswitch-' + music.id" class="hidden"></label>
                    <div
                      class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                    ></div>
                  </label>
                  <v-icon v-if="userData.is_artist"
                    class="cursor-pointer"
                    @click="toggleOpenEdit(music)"
                    name="fa-regular-edit"
                    fill="#00b166"
                    scale="1.5"
                  ></v-icon>
                  <v-icon v-if="userData.is_artist"
                    class="cursor-pointer"
                    @click="toggleOpenDelete(music)"
                    name="fa-regular-trash-alt"
                    fill="#ff4000"
                    scale="1.5"
                  ></v-icon>
                </div>
               </div>




               <div v-if="is_tabShown=='hidden'"
                v-for="hiddenmusic in hiddenMusics"
                :key="hiddenmusic.name"
                class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                
                <router-link v-if="!hiddenmusic.is_disabled" :to="`/music/${music.id}`" class="flex items-center w-3/6">
                  <img
                    :src="`${base_url}${hiddenmusic.img_profile}`"
                    alt="Music image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ hiddenmusic.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ hiddenmusic.artist_name }}</div>

                    </div>
                  </div>
                </router-link>
                <div v-else class="flex  items-center w-3/6">
                   <img
                    :src="`${base_url}${hiddenmusic.img_profile}`"
                    alt="Music image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ hiddenmusic.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ hiddenmusic.artist_name }}</div>

                    </div>
                  </div>
                </div>
                <div class="flex w-full justify-around items-center">
                    <label
                    class="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      :id="'hideswitch-' + hiddenmusic.id"
                      type="checkbox"
                      v-model="hiddenmusic.is_hidden"
                      @change="toggleHideMusic(hiddenmusic)"
                      class="peer sr-only"
                    />
                    <label :for="'hideswitch-' + hiddenmusic.id" class="hidden"></label>
                    <div
                      class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                    ></div>
                  </label>
                </div>
               </div>



               <div v-if="is_tabShown=='disabled'"
                v-for="disabledmusic in disabledMusics"
                :key="disabledmusic.name"
                class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                <div class="flex items-center w-3/6">
                  <img
                    :src="`${base_url}${disabledmusic.img_profile}`"
                    alt="Music image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />
                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ disabledmusic.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ disabledmusic.artist }}</div>

                      <div class="text-sm sm:text-base">{{ disabledmusic.music }}</div>
                    </div>
                  </div>
                </div>
                <div class="flex w-full justify-around items-center">
                   <label
                    class="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      :id="'disableswitch-' + disabledmusic.id"
                      type="checkbox"
                      v-model="disabledmusic.is_disabled"
                      @change="toggleDisableMusic(disabledmusic)"
                      class="peer sr-only"
                    />
                    <label :for="'disableswitch-' + disabledmusic.id" class="hidden"></label>
                    <div
                      class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                    ></div>
                  </label>
                </div>
               </div>



               <div v-if="is_tabShown=='deleted'"
                v-for="deletedmusic in deletedMusics"
                :key="deletedmusic.name"
                class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
               
                <router-link v-if="!deletedmusic.is_disabled" :to="`/music/${deletedmusic.id}`" class="flex items-center w-3/6">
                  <img
                    :src="`${base_url}${deletedmusic.img_profile}`"
                    alt="Music image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ deletedmusic.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ deletedmusic.artist_name }}</div>

                    </div>
                  </div>
                </router-link>
                <div v-else class="flex  items-center w-3/6">
                   <img
                    :src="`${base_url}${deletedmusic.img_profile}`"
                    alt="Music image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ deletedmusic.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ deletedmusic.artist_name }}</div>

                    </div>
                  </div>
                </div>
                <div class="flex w-full justify-around items-center">
                    <div  @click="toggleOpenRestore(deletedmusic)" class="border border-secondary-color rounded bg-secondary-color hover:text-secondary-color hover:bg-transparent text-sm p-1 text-dark-primary-color" >
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
import { useToast } from 'vue-toast-notification'
import store from '@/store/store'
const base_url  = import.meta.env.VITE_BASE_API_URL;

import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
const $toast = useToast()
const access_token = localStorage.getItem('access_token')
const userData = computed(() => store.getters.getLoggedInUserData)
const musics = ref([])
const is_tabShown = ref("all")
const deletedMusics = ref([])
const disabledMusics = ref([])
const hiddenMusics = ref([])
const is_blur = ref(false)
const is_OpenAdd = ref(false)
const is_OpenEdit = ref(false)
const is_OpenDelete = ref(false)
const is_OpenRestore = ref(false)
let toDeleteValue = 0
let toRestoreValue = 0
const itemName=ref()

const editMusicId = ref(null)
function toggleOpenAdd() {
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
  editMusicId.value = music.id
  
}
function toggleCloseEdit() {
  is_OpenEdit.value = false
  is_blur.value = false
  fetchMusics()
}
function toggleOpenDelete(deletevalue) {
  is_OpenDelete.value = true
  is_blur.value = true
  toDeleteValue = deletevalue.id
  itemName.value=deletevalue.name
  fetchDeletedMusic()
  
}
function toggleCloseDelete() {
  is_OpenDelete.value = false
  is_blur.value = false
}

function toggleOpenRestore(restore) {
  is_OpenRestore.value = true
  is_blur.value = true
  toRestoreValue = restore.id
  itemName.value=restore.name
}
function toggleCloseRestore() {
  is_OpenRestore.value = false
  is_blur.value = false
}

const showDeletedList =  () => {
  is_tabShown.value = "deleted"
  fetchDeletedMusic()
}

const showDisabledList =  () => {
  is_tabShown.value = "disabled"
  fetchDisabledMusic()
}
const showAllList =  () => {
  is_tabShown.value = "all"
  fetchMusics()
}


const showHiddenList =  () => {

  is_tabShown.value = "hidden"
  fetchHiddenMusic()
}

const fetchMusics = async () => {
  try {
    let data
    if (!userData.value.is_artist) {
      const response = await axios.get(`${base_url}/api/music/admin/get/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      data = response.data
    } else {
      const response = await axios.get(`${base_url}/api/music/get/loggedin/`, {
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


const fetchDeletedMusic = async () => {
  try {
      const response = await axios.get( `${base_url}/api/music/get/deleted/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
    deletedMusics.value = response.data
  } catch (error) {
    console.error('Error fetching Music:', error)
  }
}



const fetchDisabledMusic = async () => {
  try {
      const response = await axios.get(`${base_url}/api/music/get/disabled/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
    disabledMusics.value = response.data
  } catch (error) {
    console.error('Error fetching Music:', error)
  }
}

const fetchHiddenMusic = async () => {
  try {
      const response = await axios.get(`${base_url}/api/music/get/hidden/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
    hiddenMusics.value = response.data
  } catch (error) {
    console.error('Error fetching Music:', error)
  }
}





const toggleHideMusic = async (music) => {
  const originalIsHidden = !music.is_hidden
  const newIsHidden = !originalIsHidden
  const action = newIsHidden ? 'hide' : 'unhide'

  const requestUrl = `${base_url}/api/music/${action}/${music.id}/`

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

  const requestUrl = `${base_url}/api/music/${action}/${music.id}/`

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
function confirmDelete() {
  axios({
    method: 'delete',
    url: `${base_url}/api/music/delete/${toDeleteValue}`,
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


function confirmRestore() {
  axios({
    method: 'delete',
    url: `${base_url}/api/music/recover/${toRestoreValue}`,
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

onMounted(() =>{
  fetchMusics()
})
</script>

<style scoped>

</style>
