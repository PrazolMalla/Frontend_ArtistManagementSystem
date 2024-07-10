<template>
  <fieldset
    class="border border-slate-700 rounded-md absolute sm:w-[60vw] ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-10 mt-20">
    <CloseButton @action="
      emit('close')" />
    <div class="form-container w-full p-10 h-full flex flex-wrap justify-center gap-5 align-middle">
      <div class="text-center">
        <p class="text-md">{{ actionQuestion }}</p>
        <p class="text-secondary-color text-sm">{{ notes }}</p>
        <div v-if="email" class="mt-5 flex flex-col">
          <label class="text-xs font-helvetica text-primary-text-color pl-3">
            Enter your Credentials
          </label>
          <input type="password" name="password" @blur="() => {
            error = ''
          }" v-model="password" placeholder="Enter your account password"
            class="p-2  focus:outline-none w-full text-xs mb rounded-3xl border border-border-color focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 primary-text-color" />
          <span v-if="error" class=" text-xs text-error-text-color pl-3">{{
            error
            }}</span>

        </div>
      </div>

      <div class="w-full flex justify-center gap-2 align-middle">
        <button v-if="email"
          class="bg-btn-yellow h-7 w-2/6 text-sm hover:text-secondary-color text-light-primary-color rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
          type="submit" @click="confirm">
          {{ actionConfirm }}
        </button>
        <button v-else
          class="bg-btn-yellow h-7 w-2/6 text-sm hover:text-secondary-color text-light-primary-color rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
          type="submit" @click="emit('confirm')">
          {{ actionConfirm }}
        </button>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
import CloseButton from '@/components/buttons/CloseButton.vue'
import { ref } from 'vue';
import axios from 'axios';
const props = defineProps(['actionQuestion', 'actionConfirm', 'notes', 'email'])

const base_url = import.meta.env.VITE_BASE_API_URL
const emit = defineEmits(['close', 'confirm'])
const password = ref()
const error = ref()


const validateField = () => {
  error.value = ''
}

const confirm = () => {
  if (!password) {
    error.value = 'Please provide your Credential.'
  }
  if (!props.email) {
    error.value = 'Please provide your Credential'
  }
  if (!error.value) {
    console.log({ email: props.email, password: password.value })
    axios
      .post(`${base_url}/api/credential/`, { email: props.email, password: password.value }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then((response) => {
        emit('close')
        emit('confirm')
      })
      .catch((err) => {
        console.error('Error logging in:', err)
        if (err.response && err.response.data && err.response.data.msg) {
          error.value = err.response.data.msg
        } else {
          $toast.error("An error occurred while checking credential.")
        }
      })
  }
}

</script>

<style scoped></style>
