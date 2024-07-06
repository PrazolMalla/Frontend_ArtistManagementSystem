<template>
  <PageLayout>
    <template #content>
      <div
        v-if="is_blur"
        class="fixed top-16 bggradientpopup ml-[-3rem] w-screen h-screen z-40 flex flex-col justify-between gap-10 items-center"
      ></div>
      <AddAlbum v-if="is_OpenAdd" @close="toggleCloseAdd" />
      <ManageConfirmDialogue
        v-if="is_OpenDelete"
        :actionQuestion="`Do yoy want to delete ${itemName}?`"
        actionConfirm="Confirm Delete"
        @close="toggleCloseDelete"
        @confirm="confirmDelete"
      />
      <EditAlbum v-if="is_OpenEdit" :albumId="editAlbumId" @close="toggleCloseEdit" />
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


                <h1 class="text-md sm:text-lg font-bold">

                    All
                    <span v-if="is_tabShown=='deleted'">Deleted</span>
                    <span  v-if="is_tabShown=='disabled'">Disabled</span>
                    <span v-if="is_tabShown=='hidden'">Hidden</span>
                    Albums
                </h1>


              <div class="flex items-center space-x-4">

                <div v-if="is_tabShown!='deleted' && userData.is_artist" @click="showDeletedList" class="border text-xs bg-secondary-color text-dark-primary-color px-2 p-1 rounded-lg hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none">Deleted</div>
               <div v-if="is_tabShown!='disabled' && userData.is_staff" @click="showDisabledList" class="border text-xs bg-secondary-color text-dark-primary-color px-2  p-1 rounded-lg hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none">Disabled</div>
              <div v-if="is_tabShown!='hidden' && userData.is_artist" @click="showHiddenList" class="border text-xs bg-secondary-color text-dark-primary-color px-2  p-1 rounded-lg hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none">Hidden</div>
              
               <div v-if="is_tabShown!='all'" @click="showAllList" class="border text-xs bg-secondary-color text-dark-primary-color px-2  p-1 rounded-md hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none">All</div>
    
                <div class="hidden md:flex lg:w-[15vw] h-7 my-4 justify-between border border-primary-text-color rounded-lg">
                  <input
                    type="text"
                    class="text-xs border-none w-full p-2 bg-transparent focus:outline-none text-xsm text-primary-text-color placeholder:text-primary-text-color hidden sm:flex"
                    placeholder="Search Album..."
                  />
                  <v-icon
                    name="md-search"
                    fill="#302f31"
                    scale="1.5"
                    class="cursor-pointer hover:text-gray-950 p-1"
                  />
                </div>
                <button    v-if="userData.is_artist"
                  class="px-2 py-1 text-xs bg-secondary-color text-dark-primary-color rounded-lg border-2 hover:bg-transparent hover:border-secondary-color hover:text-secondary-color"
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
                v-for="album in albums"
                :key="album.name"
                class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                <AlbumDetail :album="album" :is_disabled="album.is_disabled"/>
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
                    @click="toggleOpenDelete(album)"
                    name="fa-regular-trash-alt"
                    fill="#ff4000"
                    scale="1.5"
                  ></v-icon>
                </div>
               </div>




               <div v-if="is_tabShown=='hidden'"
                v-for="hiddenalbum in hiddenAlbums"
                :key="hiddenalbum.name"
                class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
               
              <AlbumDetail :album="hiddenalbum" :is_disabled="hiddenalbum.is_disabled"/>

                <div class="flex w-full justify-around items-center">
                    <label
                    class="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      :id="'hideswitch-' + hiddenalbum.id"
                      type="checkbox"
                      v-model="hiddenalbum.is_hidden"
                      @change="toggleHideAlbum(hiddenalbum)"
                      class="peer sr-only"
                    />
                    <label :for="'hideswitch-' + hiddenalbum.id" class="hidden"></label>
                    <div
                      class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                    ></div>
                  </label>
                </div>
               </div>



               <div v-if="is_tabShown=='disabled'"
                v-for="disabledalbum in disabledAlbums"
                :key="disabledalbum.name"
                class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                <AlbumDetail :album="disabledalbum" :is_disabled="true"/>
                <div class="flex w-full justify-around items-center">
                   <label
                    class="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      :id="'disableswitch-' + disabledalbum.id"
                      type="checkbox"
                      v-model="disabledalbum.is_disabled"
                      @change="toggleDisableAlbum(disabledalbum)"
                      class="peer sr-only"
                    />
                    <label :for="'disableswitch-' + disabledalbum.id" class="hidden"></label>
                    <div
                      class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                    ></div>
                  </label>
                </div>
               </div>



               <div v-if="is_tabShown=='deleted'"
                v-for="deletedalbum in deletedAlbums"
                :key="deletedalbum.name"
                class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                <AlbumDetail :album="deletedalbum" :is_disabled="true"/>
                <div class="flex w-full justify-around items-center">
                    <div  @click="toggleOpenRestore(deletedalbum)" class="border border-secondary-color rounded bg-secondary-color hover:text-secondary-color hover:bg-transparent text-sm p-1 text-dark-primary-color" >
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
import AlbumDetail from '@/components/manage/album/AlbumDetail.vue'
import EditAlbum from '@/components/manage/album/EditAlbum.vue'
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'
import { useToast } from 'vue-toast-notification'
import store from '@/store/store'
const base_url  = import.meta.env.VITE_BASE_API_URL;

import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
const $toast = useToast()
const access_token = localStorage.getItem('access_token')
const userData = computed(() => store.getters.getLoggedInUserData)
const albums = ref([])
const is_tabShown = ref("all")
const deletedAlbums = ref([])
const disabledAlbums = ref([])
const hiddenAlbums = ref([])
const is_blur = ref(false)
const is_OpenAdd = ref(false)
const is_OpenEdit = ref(false)
const is_OpenDelete = ref(false)
const is_OpenRestore = ref(false)
let toDeleteValue = 0
let toRestoreValue = 0
const itemName=ref()

const editAlbumId = ref(null)
function toggleOpenAdd() {
  is_OpenAdd.value = true
  is_blur.value = true
}
function toggleCloseAdd() {
  is_OpenAdd.value = false
  is_blur.value = false
  fetchAlbums()
}
function toggleOpenEdit(album) {
  is_OpenEdit.value = true
  is_blur.value = true
  editAlbumId.value = album.id
  
}
function toggleCloseEdit() {
  is_OpenEdit.value = false
  is_blur.value = false
  fetchAlbums()
}
function toggleOpenDelete(deletevalue) {
  is_OpenDelete.value = true
  is_blur.value = true
  toDeleteValue = deletevalue.id
  itemName.value=deletevalue.name
  fetchDeletedAlbum()
  
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
  fetchDeletedAlbum()
}

const showDisabledList =  () => {
  is_tabShown.value = "disabled"
  fetchDisabledAlbum()
}
const showAllList =  () => {
  is_tabShown.value = "all"
  fetchAlbums()
}


const showHiddenList =  () => {

  is_tabShown.value = "hidden"
  fetchHiddenAlbum()
}

const fetchAlbums = async () => {
  try {
    let data
    if (!userData.value.is_artist) {
      const response = await axios.get(`${base_url}/api/album/get/`)
      data = response.data
    } else {
      const response = await axios.get(`${base_url}/api/album/get/loggedin/`, {
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
      const response = await axios.get( `${base_url}/api/album/get/deleted/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
    deletedAlbums.value = response.data
  } catch (error) {
    console.error('Error fetching Album:', error)
  }
}



const fetchDisabledAlbum = async () => {
  try {
      const response = await axios.get(`${base_url}/api/album/get/disabled/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
    disabledAlbums.value = response.data
  } catch (error) {
    console.error('Error fetching Album:', error)
  }
}

const fetchHiddenAlbum = async () => {
  try {
      const response = await axios.get(`${base_url}/api/album/get/hidden/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
    hiddenAlbums.value = response.data
  } catch (error) {
    console.error('Error fetching Album:', error)
  }
}





const toggleHideAlbum = async (album) => {
  const originalIsHidden = !album.is_hidden
  const newIsHidden = !originalIsHidden
  const action = newIsHidden ? 'hide' : 'unhide'

  const requestUrl = `${base_url}/api/album/${action}/${album.id}/`

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

  const requestUrl = `${base_url}/api/album/${action}/${album.id}/`

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
    url: `${base_url}/api/album/delete/${toDeleteValue}`,
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


function confirmRestore() {
  axios({
    method: 'delete',
    url: `${base_url}/api/album/recover/${toRestoreValue}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      deletedAlbums.value = deletedAlbums.value.filter((deletedAlbums) => deletedAlbums.id !== toRestoreValue)
      $toast.success('Album is Restored', {
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
  fetchAlbums()
})
</script>

<style scoped>

</style>
