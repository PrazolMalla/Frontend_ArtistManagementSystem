<template>
  <BackgroundBlur v-if="is_blur" />
  <ManageConfirmDialogue v-if="is_OpenRestore"
    actionQuestion="You have deleted your account. Do you want to restore your account?" actionConfirm="Confirm Restore"
    @close="toggleCloseRestore" @confirm="confirmRestore"
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-20" />

  <div class="flex flex-col sm:flex-row items-center h-screen w-full bg-dark-primary-color">
    <div class="form-container w-full h-full bg-light-primary-color flex sm:flex-row flex-col">
      <div class="w-[90vw] m-auto sm:w-[50vw] h-full bg-dark-primary-color flex items-center justify-center">
        <form id="form"
          class="w-full sm:w-[500px] h-[500px] flex flex-col gap-4 justify-center p-10 bg-brown-900 rounded-xl border-4 border-primary-text-color"
          @submit.prevent="login">
          <h1 class="text-4xl font-bold text-center mb-5 font-helvetica text-secondary-color">
            Welcome Back
          </h1>

          <div>
            <label for="email" class="text-sm font-helvetica text-primary-text-color pl-3">
              Email</label>
            <input type="email"
              class="p-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black"
              id="email" v-model="user.email" required />
          </div>
          <div>
            <label for="password" class="text-sm font-helvetica text-primary-text-color pl-3">
              Password</label>
            <input type="password"
              class="p-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black"
              id="password" v-model="user.password" required />
          </div>
          <div class="w-full flex justify-start gap-2 align-middle items-center">
            <button
              class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-light-primary-color font-semibold text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
              type="submit">
              Login
            </button>
            <div class="text-primary-text-color mt-2">
              <span class="px-2 text-slate-500"> Don't Have an account? </span>
              <RouterLink to="/signup" class="hover:text-secondary-color"> SignUp </RouterLink>
            </div>
          </div>
        </form>
      </div>
      <div class="md:flex justify-center items-center hidden p-16">
        <div class="flex justify-center items-center form-img h-screen w-full sm:w-full rounded-lg">
          <div class="relative w-full h-full flex justify-center items-center">
            <div class="absolute w-[70%] h-[60%]  flex justify-center items-center">
              <h1 class="font-helvetica text-4xl text-light-primary-color p-10 font-bold">
                Artistry Amplified
                <br />
                <br />
                <span class="text-light-primary-color text-4xl font-helvetica font-normal">Revolutionizing the Industry
                  with Our Artist Management System</span>
              </h1>
            </div>
            <div
              class="absolute w-[80%] h-[10rem] sm:h-[20rem] bg-button-color rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BackgroundBlur from '@/components/cards/BackgroundBlur.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import store from '@/store/store'
import { useToast } from 'vue-toast-notification'
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'
const router = useRouter()
const $toast = useToast()

const base_url = import.meta.env.VITE_BASE_API_URL;
const user = ref({
  email: '',
  password: ''
})
const accessToken = ref()
const refreshToken = ref()


const login = () => {
  axios
    .post(`${base_url}/api/login/`, user.value)
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
        console.log("Recover Account")
        toggleOpenRestore(id)
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
  window.location.reload()
  router.push('/')
}
const is_blur = ref(false)
const is_OpenRestore = ref(false)
let toRestoreValue = 0
function toggleOpenRestore(id) {
  is_OpenRestore.value = true
  is_blur.value = true
  toRestoreValue = id
}
function toggleCloseRestore() {
  is_OpenRestore.value = false
  is_blur.value = false
}
function confirmRestore() {
  axios({
    method: 'delete',
    url: `${base_url}/api/user/recover/${toRestoreValue}/`,
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      $toast.success('Your account is restored', {
        position: 'top-right'
      })
      if (response.status === 200) {
        is_OpenRestore.value = false
        is_blur.value = false
      }
      setToken()
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}
</script>

<style scoped>
.body {
  background-image: url();
}

.form-img {
  width: 45vw;
  height: 95%;
  background-image: url('../assets/background.jpeg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
