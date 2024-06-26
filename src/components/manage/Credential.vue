<template>
  <fieldset
    class="border border-slate-700 rounded-md absolute sm:w-[40vw] ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-40"
  >
    <legend class="ml-10">Credential</legend>
    <v-icon
      name="fa-times"
      fill="#302f31"
      scale="1"
      @click="close"
      class="absolute right-3 cursor-pointer"
    />
    <div class="form-container w-full p-10 h-full flex flex-wrap justify-center gap-5 align-middle">
      
      <form id="form" class="w-full sm:w-[500px] h-[500px] flex flex-col gap-4 justify-center p-10 bg-brown-900 rounded-xl border-4 border-primary-text-color" @submit.prevent="login">
          <h1 class="text-4xl font-bold text-center mb-5 font-helvetica text-secondary-color">
            Please input your credential
          </h1>

          <div>
            <label for="email" class="text-sm font-helvetica text-primary-text-color pl-3">
              Email</label
            >
            <input
              type="email"
              class="p-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black"
              id="email"
              v-model="user.email"
              required
            />
          </div>
          <div>
            <label for="password" class="text-sm font-helvetica text-primary-text-color pl-3">
              Password</label
            >
            <input
              type="password"
              class="p-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black"
              id="password"
              v-model="user.password"
              required
            />
          </div>
          <div class="w-full flex justify-start gap-2 align-middle items-center">
            <button
              class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-light-primary-color font-semibold text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
    </div>
  </fieldset>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'

const base_url  = import.meta.env.VITE_BASE_API_URL

const toast = useToast()
const user = ref({
  email: '',
  password: ''
})
const login = () => {
  axios
    .post(`${base_url}/api/credential/`, user.value,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then((response) => {
      console.log(response)
      confirm()
      
    })
    .catch((error) => {
      console.error('Error logging in:', error)
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg)
      } else {
        toast.error("An error occurred while checking credential.")
      }
    })
}

const emit = defineEmits(['close', 'confirm'])


function close() {
  emit('close')
}

function confirm() {
  emit('confirm')
}
</script>

<style scoped></style>
