<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
      <div class="settings-container flex flex-col gap-5 p-5">
        <h1 class="text-3xl font-bold mb-5">Settings</h1>
        <button @click="logout" class="logout-button w-20 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700"> Logout </button>
        <p class="text-xl">Select Theme:</p>
        <div class="flex gap-5 flex-grow-0">
            <ThemeCard  v-for="x in themeData"  :themeData="x" />
        </div>

      </div>


    </template>
  </PageLayoutWithPlayer>
</template>

<script setup>
import ThemeCard from '@/components/cards/ThemeCard.vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import store from '@/store/store'
import { ref, onMounted,computed } from 'vue'
import axios from 'axios'
const $toast = useToast()

computed(() => logout)

const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  store.dispatch('setLoggedInUserData')
  $toast.success('Logout sucess', {
    position: 'top-right'
  })
  window.location.reload()
}


const themeData = ref([])

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

onMounted(fetchTheme)
</script>
