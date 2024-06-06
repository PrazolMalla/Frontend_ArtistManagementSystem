<template>
  <div class="w-full bg-dark-primary-color">
    <RouterView />
  </div>
</template>

<script setup>
import store from './store/store'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(()=>{
    store.dispatch('setLoggedInUserData')
})
</script>

<style scoped></style>
