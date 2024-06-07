<template>
  <div class="w-full bg-dark-primary-color">
    <RouterView />
  </div>
</template>

<script setup>
import store from './store/store'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()

// const csrf = async () => {
//   try {
//     const response = await axios.get('http://127.0.0.1:8000/api/getCSRF')
//     const data = response.data.splice(0, 10)
//     albumData.value = data
//     console.log(data)
//   } catch (error) {
//     console.error('Error fetching CSRF:', error)
//   }
// }
onMounted(() => {
  store.dispatch('setLoggedInUserData')
  // csrf()
})
</script>

<style scoped></style>
