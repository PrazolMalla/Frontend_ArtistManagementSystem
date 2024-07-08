<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
      <div v-if="is_blur"
        class="fixed top-16 bggradientpopup w-screen h-screen z-40 flex flex-col justify-between gap-10 items-center">
      </div>
      <ManageConfirmDialogue v-if="is_OpenDelete" actionQuestion="Do you really want to delete your account?"
        actionConfirm="Confirm Delete"
        notes="(You can recover your account by logging again and providing confirmation)" @confirm="confirmDelete"
        @close="toggleCloseDelete" />
      <Credential v-if="is_confirm" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-40 "
        @confirm="confirmCredential" @close="toggleCloseCredential" />
      <EditProfile v-if="is_OpenEdit" @close="toggleCloseEdit" :userData="userData" />


      <div class="settings-container flex flex-col gap-5 p-5">
        <div class="flex flex-col flex-grow-0 w-40">

          <MdButton text="Logout" @action="logout" />
          <MdButton text="Edit Account" @action="toggleOpenEdit" />
          <MdButton text="Change Password" @action="" />
          <MdButton text="Delete Account" @action="toggleOpenDelete" />


        </div>
        <div>
          <h4 class="text-lg font-bold text-primary-text-color self-start">Switch Account:</h4>
          <div class="flex gap-2 overflow-y-hidden">
            <SwitchAccountCard v-for="x in artistData" class="p-5" :artistData="x" />
          </div>
        </div>




        <fieldset v-if="userData.is_artist" class="border border-slate-700 rounded-md p-5">
          <legend class="ml-5 p-2">
            <h4 class="text-lg font-bold text-primary-text-color self-start">Select Theme</h4>
          </legend>

          <div class="flex gap-5 flex-grow-0 flex-wrap">

            <div
              class="border hover:border-secondary-color hover:shadow-md shadow-blue-400 border-slate-300 relative  rounded-md overflow-hidden w-28 h-28 cursor-pointer"
              @click="selectDefaultTheme">
              <div class="absolute w-full h-full"></div>
              <div
                class="absolute flex justify-center items-center bgThemeGlass z-10 h-full w-full opacity-90 p-2 backdrop-blur-3xl filter">
                <p class="z-20 text-md">Default</p>
              </div>
            </div>
            <ThemeCard v-for="x in themeData" :themeData="x" />
          </div>

          <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
            @action="page => handlePageChange(page, fetchThemes)" />
        </fieldset>

      </div>
    </template>
  </PageLayoutWithPlayer>
</template>

<script setup>
import PaginationCard from '@/components/cards/PaginationCard.vue'
import MdButton from '@/components/buttons/md-button.vue'
import EditProfile from '@/components/profile/EditProfile.vue'
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'
import Credential from '@/components/manage/Credential.vue'
import ThemeCard from '@/components/cards/ThemeCard.vue'
import { useToast } from 'vue-toast-notification'
import store from '@/store/store'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import SwitchAccountCard from '@/components/cards/SwitchAccountCard.vue'
const $toast = useToast()
const base_url = import.meta.env.VITE_BASE_API_URL;
const artistData = ref()
const is_blur = ref(false)
const is_OpenEdit = ref(false)
const is_OpenDelete = ref(false)
const is_confirm = ref(false)
const totalItems = ref([0])
const currentPage = ref(1)
const isLoading = ref(false)

const themeData = ref([])

const userData = ref([])

computed(() => logout)

const userDataFunc = () => {
  userData.value = store.getters.getLoggedInUserData
}

const fetchArtists = async () => {
  try {
    const response = await fetch(`${base_url}/api/artist/get/`)
    const data = await response.json()
    artistData.value = data.map((artist) => ({
      id: artist.id,
      img_profile: artist.img_profile,
      password: "Password"
    }))
  } catch (error) {
    console.error('Error fetching artists:', error)
  }
}


const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  store.dispatch('setLoggedInUserData')
  $toast.success('Logout sucess', {
    position: 'top-right'
  })
  window.location.reload()
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
function toggleCloseCredential() {
  is_confirm.value = false
  is_blur.value = false
}


function confirmDelete() {
  is_OpenDelete.value = false
  is_confirm.value = true
}
function confirmCredential() {
  axios({
    method: 'delete',
    url: `${base_url}/api/user/delete/${userData.value.id}/`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    }
  })
    .then((response) => {

      if (response.status === 200) {
        is_confirm.value = false
        is_blur.value = false

      }
      $toast.success('Your account is deleted', {
        position: 'top-right'
      })

      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      store.dispatch('setLoggedInUserData')
      setTimeout(() => {
        window.location.reload()
      }, 3000);


    })
    .catch((err) => {
      console.log(err.response.data)
    })
}

const selectDefaultTheme = async () => {
  try {
    const response = await axios.patch(
      `${base_url}/api/user/theme/unset/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        }
      }
    )

    $toast.success(response.data.message, {
      position: 'top-right'
    })
    console.log('default selected')
  } catch (error) {
    console.error('Error fetching Themes:', error)
  }
}
const handlePageChange = (page, func) => {
  currentPage.value = page
  func(page)
}




const fetchThemes = async (page = 1) => {
  isLoading.value = true
  try {
    const response = await axios.get(`${base_url}/api/theme/get/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    themeData.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching themes:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchThemes(currentPage.value)
  userDataFunc()
  fetchArtists()
}
)
</script>
<style scoped></style>