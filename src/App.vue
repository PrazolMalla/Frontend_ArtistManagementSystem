<template>
  <div class="w-full bg-dark-primary-color">
    <RouterView />
  </div>
</template>

<script setup>
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped></style>
