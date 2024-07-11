<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
      <BackgroundBlur v-if="is_blur" />
      <ManageConfirmDialogue v-if="is_OpenDelete" :email="userData.email"
        actionQuestion="Do you really want to delete your account?" actionConfirm="Confirm Delete"
        notes="(You can recover your account by logging again and providing confirmation)" @confirm="deleteUser"
        @close="toggleCloseDelete" />

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
                class="absolute flex justify-center items-center bgThemeGlass  h-full w-full opacity-90 p-2 backdrop-blur-3xl filter">
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
import BackgroundBlur from '@/components/cards/BackgroundBlur.vue'
import PaginationCard from '@/components/cards/PaginationCard.vue'
import MdButton from '@/components/buttons/md-button.vue'
import EditProfile from '@/components/profile/EditProfile.vue'
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'
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
const totalItems = ref([0])
const currentPage = ref(1)
const isLoading = ref(false)
const accessToken = ref()
const refreshToken = ref()

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
  store.dispatch('removeLoggedInUserData')
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

function deleteUser() {
  axios({
    method: 'delete',
    url: `${base_url}/api/user/delete/${userData.value.id}/`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    }
  })
    .then((response) => {
      $toast.success('Your account is deleted', {
        position: 'top-right'
      })
      store.dispatch('removeLoggedInUserData')
      window.location.reload()

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

const login = (email, password) => {
  axios
    .post(`${base_url}/api/login/`, {
      email: email,
      password: password
    })
    .then((response) => {
      accessToken.value = response.data.access_token
      refreshToken.value = response.data.refresh_token
      const disabled = response.data.user.is_disabled
      const deleted = response.data.user.is_deleted
      const id = response.data.user.id
      if (disabled) {
        $toast.error('Your account has been disabled', {
          position: 'top-left'
        })
      }
      else if (deleted) {
        $toast.error('Your account has been Deleted', {
          position: 'top-left'
        })
      }
      else {
        setToken()
      }

    })
    .catch((error) => {
      console.error('Error logging in:', error)

      $toast.error('Invalid Username or password', {
        position: 'top-left'
      })
    })
}
const setToken = () => {

  localStorage.setItem('access_token', accessToken.value)
  localStorage.setItem('refresh_token', refreshToken.value)
  $toast.success('Login success', {
    position: 'top-right'
  })

  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`
  router.push('/')
}


onMounted(() => {
  fetchThemes(currentPage.value)
  userDataFunc()
  fetchArtists()
}
)
</script>
<style scoped></style>