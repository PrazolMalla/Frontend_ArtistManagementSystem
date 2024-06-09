<template>
  <div class="w-full bg-dark-primary-color">
    <RouterView />
  </div>
</template>

<script setup>
import store from './store/store'
import { onMounted, computed } from 'vue'
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
if(localStorage.getItem("refresh_token")){
                axios.post(`http://127.0.0.1:8000/api/token/refresh/`, {'refresh': localStorage.getItem("refresh_token")}, {
                headers: {
                "content-Type": "application/json",
                }}).then(response =>{
                    if(response.status == 200){
                        localStorage.setItem("access_token",response.data.access)
                    }
                    else{

                    }
                })
            }
  store.dispatch('setLoggedInUserData')
})
// computed(() =>{
// store.dispatch('setLoggedInUserData')
// })
</script>

<style scoped></style>
