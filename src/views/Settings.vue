<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
      <div
        v-if="is_blur"
        class="fixed top-16 bggradientpopup w-screen h-screen z-40 flex flex-col justify-between gap-10 items-center"
      ></div>
      <EditProfile v-if="is_OpenEdit" @close="toggleCloseEdit" :userData="userData" />
      <div class="settings-container flex flex-col gap-5 p-5">
        <h1 class="text-3xl font-bold mb-5">Settings</h1>

        <button @click="logout" class="flex gap-2 logout-button w-40 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 cursor-pointer">
          <v-icon name="md-logout" fill="#fff" scale="1.5"></v-icon>
          <p>Logout</p> </button>
        <button class="px-4 py-2 flex gap-2 w-40 bg-red-500 text-white  rounded-full hover:bg-red-700 cursor-pointer"  @click="toggleOpenEdit"  >
          <v-icon name="fa-regular-edit" fill="#fff" scale="1.5"></v-icon>
          <p>Edit Profile</p>
        </button>
        <button class="px-4 py-2 flex gap-2 w-48 bg-red-500 text-white  rounded-full hover:bg-red-700 cursor-pointer"  @click="toggleOpenDelete"  >
          <v-icon name="fa-regular-trash-alt" fill="#fff" scale="1.4"></v-icon>
          <p>Delete Account</p>
        </button>
        
        <div v-if="userData.is_artist">
          <p class="text-xl">Select Theme:</p>
        <div class="flex gap-5 flex-grow-0">
          <div
            class="border hover:border-blue-800 hover:shadow-md shadow-blue-400 border-slate-300 relative rounded-md overflow-hidden w-[20vw] h-[20vh] cursor-pointer"
            @click="selectDefaultTheme"
          >
            <div class="absolute w-full h-full"></div>
            <div
              class="absolute bgThemeGlass z-10 h-full w-full opacity-90 p-2 backdrop-blur-3xl filter"
            >
              <p class="z-20 text-md" :style="{ color: themeData.secondaryColor }">Default Theme</p>
            </div>
          </div>
          <ThemeCard v-for="x in themeData" :themeData="x" />
        </div>
        </div>

      </div>
    </template>
  </PageLayoutWithPlayer>
</template>

<script setup>
import EditProfile from '@/components/profile/EditProfile.vue'
import ThemeCard from '@/components/cards/ThemeCard.vue'
import { useToast } from 'vue-toast-notification'
import store from '@/store/store'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
const $toast = useToast()
const defaultTheme = ref([])

const is_blur = ref(false)
const is_OpenEdit = ref(false)
const is_OpenDelete= ref(false)


const userData = ref([])

computed(() => logout)

const userDataFunc = () => {
     userData.value = store.getters.getLoggedInUserData
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
function toggleOpenEdit(album) {
  is_OpenEdit.value = true
  is_blur.value = true
}
function toggleCloseEdit() {
  is_OpenEdit.value = false
  is_blur.value = false
}
function toggleOpenDelete(){
  is_OpenDelete.value = true
  is_blur.value = true
}
const themeData = ref([])
const selectDefaultTheme = async () => {
  try {
    const response = await axios.patch(
      'http://127.0.0.1:8000/api/user/theme/unset/',
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
const fetchTheme = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/theme/get/', {

      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      }
    })
    themeData.value = response.data
  } catch (error) {
    console.error('Error fetching Themes:', error)
  }
}

onMounted(() => {
  fetchTheme()
  userDataFunc()
}
)
</script>
<style scoped>

</style>