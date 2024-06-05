<template>
  <div
    class="mt-5 w-[80vw] h-40 bg-light-primary-color p-5 md:w-56 md:h-40 md:mt-20 lg:mt-24 lg:w-96 lg:h-52 lg:p-6 rounded-md sm:mt-10"
  >
    <h1 class="font-semibold text-primary-text-color lg:text-lg">INTRODUCTION</h1>
    <div class="mt-2">
      <p class="text-sm text-primary-text-color lg:text-lg">Name: {{ userData.username }}</p>
      <p class="mt-1 text-sm text-primary-text-color lg:text-lg">Country: {{ userData.country }}</p>
      <p class="mt-1 text-sm text-primary-text-color lg:text-lg">Bio: {{ userData.bio }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted ,defineProps} from 'vue'
import axios from 'axios'

const props = defineProps({
  userData: {
    type:Object,
    required:true
  }})
</script>

<style scoped>
/* Add your custom styles here */
</style>
