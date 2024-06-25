<template>
  <PageLayout>
    <template #content>
      <div
        v-if="is_blur"
        class="fixed top-16 bggradientpopup ml-[-3rem] w-screen h-screen z-40 flex flex-col justify-between gap-10 items-center"
      ></div>
      <AddTheme v-if="is_OpenAdd" @close="toggleCloseAdd" />
      <ManageConfirmDialogue
        v-if="is_OpenDelete"
        actionQuestion="Do yo want to delete XYZ?"
        actionConfirm="Confirm Delete"
        @close="toggleCloseDelete"
        @confirm="confirmDelete"
      />
      <EditTheme v-if="is_OpenEdit" :themeId="editThemeId" @close="toggleCloseEdit" />
      <ManageConfirmDialogue
        v-if="is_OpenRestore"
        actionQuestion="Do yo want to restore XYZ?"
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


              <h1 class="text-lg sm:text-3xl font-bold"  v-if="!is_deletedShown">All Theme</h1>
              <h1 class="text-lg sm:text-3xl font-bold" v-else>All Deleted Theme</h1>
              <div class="flex items-center space-x-4">
                 <div v-if="!is_deletedShown" @click="showDeletedList" class="border text-sm bg-secondary-color text-dark-primary-color  p-2 rounded-md hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none"> Show Deleted</div>
               <div v-if="is_deletedShown" @click="showAllList" class="border text-sm bg-secondary-color text-dark-primary-color  p-2 rounded-md hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none">Show All</div>
                
                <div class="hidden md:flex lg:w-[15vw] h-10 my-4 justify-between border border-primary-text-color rounded-full">
                  <input
                    type="text"
                    class="text-sm border-none w-full p-2 bg-transparent focus:outline-none text-xsm text-primary-text-color placeholder:text-primary-text-color hidden sm:flex"
                    placeholder="Search Theme..."
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
                  Add Theme
                </button>
              </div>
            </div>

            <div class="flex flex-col justify-between">
              <div
                class="hidden sm:flex flex-row bg-transparent border-b border-b-primary-text-color"
              >
                <div class="w-3/6 font-semibold">Name</div>
                <div class="flex w-full justify-around items-center">
                  <div class="font-semibold" v-if="is_deletedShown">Restore</div>
                  <div class="font-semibold" v-if="!is_deletedShown">Edit</div>
                  <div class="font-semibold" v-if="!is_deletedShown">Delete</div>
                </div>
              </div>


              <div v-if="!is_deletedShown"
                v-for="theme in themes"
                :key="theme.name"
                class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                <router-link :to="`/theme/${theme.id}`" class="flex items-center w-3/6">
                  <img
                    :src="`${base_url}${theme.img_profile}`"
                    alt="Theme image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ theme.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ theme.artist_name }}</div>

                    </div>
                  </div>
                </router-link>
                <div
                  class="flex w-full justify-around flex-row bg-transparent sm:hidden border-b border-b-primary-text-color"
                >
                  <p v-if="userData">Edit</p>
                  <p v-if="userData">Delete</p>
                </div>
                <div class="flex w-full  justify-around items-center">
                 
                  <v-icon 
                    class="cursor-pointer"
                    @click="toggleOpenEdit(theme)"
                    name="fa-regular-edit"
                    fill="#00b166"
                    scale="1.5"
                  ></v-icon>
                  <v-icon
                    class="cursor-pointer"
                    @click="toggleOpenDelete(theme.id)"
                    name="fa-regular-trash-alt"
                    fill="#ff4000"
                    scale="1.5"
                  ></v-icon>
                </div>
               </div>

               <div v-else
                v-for="deletedtheme in deletedThemes"
                :key="deletedtheme.name"
                class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                <div class="flex items-center w-3/6">
                  <img
                    :src="`${base_url}${deletedtheme.img_profile}`"
                    alt="Theme image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />
                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ deletedtheme.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ deletedtheme.artist }}</div>

                      <div class="text-sm sm:text-base">{{ deletedtheme.theme }}</div>
                    </div>
                  </div>
                </div>
                <div class="flex w-full justify-around items-center">
                    <div  @click="toggleOpenRestore(deletedtheme.id)" class="border border-secondary-color rounded bg-secondary-color hover:text-secondary-color hover:bg-transparent text-sm p-1 text-dark-primary-color" >
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
import AddTheme from '@/components/manage/theme/AddTheme.vue'
import EditTheme from '@/components/manage/theme/EditTheme.vue'
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'
import { useToast } from 'vue-toast-notification'
import store from '@/store/store'

import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
const $toast = useToast()
const access_token = localStorage.getItem('access_token')
const userData = computed(() => store.getters.getLoggedInUserData)
const themes = ref([])
const is_deletedShown = ref(false)
const deletedThemes = ref([])
const is_blur = ref(false)
const is_OpenAdd = ref(false)
const is_OpenEdit = ref(false)
const is_OpenDelete = ref(false)
const is_OpenRestore = ref(false)
let toDeleteValue = 0
let toRestoreValue = 0
const base_url  = import.meta.env.VITE_BASE_API_URL;

const editThemeId = ref(null)
function toggleOpenAdd() {
  is_OpenAdd.value = true
  is_blur.value = true
}
function toggleCloseAdd() {
  is_OpenAdd.value = false
  is_blur.value = false
  fetchThemes()
}
function toggleOpenEdit(theme) {
  is_OpenEdit.value = true
  is_blur.value = true
  editThemeId.value = theme.id
  
}
function toggleCloseEdit() {
  is_OpenEdit.value = false
  is_blur.value = false
  fetchThemes()
}
function toggleOpenDelete(deletevalue) {
  is_OpenDelete.value = true
  is_blur.value = true
  toDeleteValue = deletevalue
  fetchDeletedTheme()
  
}
function toggleCloseDelete() {
  is_OpenDelete.value = false
  is_blur.value = false
  fetchThemes()
}

function toggleOpenRestore(restoreId) {
  is_OpenRestore.value = true
  is_blur.value = true
  toRestoreValue = restoreId
}
function toggleCloseRestore() {
  is_OpenRestore.value = false
  is_blur.value = false
  fetchDeletedTheme()
}

const showDeletedList = async () => {
    is_deletedShown.value = true
}
const showAllList = async () => {
 is_deletedShown.value = false 
  fetchThemes()

}

const fetchThemes = async () => {
  try {
      const response = await axios.get(`${base_url}/api/theme/get/`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      console.log(response.data)
    themes.value = response.data
  } catch (error) {
    console.error('Error fetching themes:', error)
  }
}


const fetchDeletedTheme = async () => {
  try {
      const response = await axios.get(`${base_url}/api/theme/get/`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
    deletedThemes.value = response.data
  } catch (error) {
    console.error('Error fetching themes:', error)
  }
}

function confirmDelete() {
  axios({
    method: 'delete',
    url: `${base_url}/api/theme/delete/${toDeleteValue}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      themes.value = themes.value.filter((theme) => theme.id !== toDeleteValue)
      $toast.success('Theme is deleted', {
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
    url: `${base_url}/api/theme/recover/${toRestoreValue}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      deletedThemes.value = deletedThemes.value.filter((deletedThemes) => deletedThemes.id !== toRestoreValue)
      $toast.success('Theme is Restored', {
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
  fetchThemes()
  fetchDeletedTheme()
})
</script>

<style scoped>

</style>
