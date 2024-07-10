<template lang="">
  <div class="absolute z-10 bottom-12 sm:bottom-3  sm:w-auto w-full flex justify-center sm:left-3 ">
    <img
      :src="`${base_url}${userImg}`"
      alt=""
      class="lg:w-44 lg:h-44 w-28 h-28 marker:h-20 border-4 rounded-full hover:cursor-pointer border-secondary-color"
    />
  </div>
</template>
<script setup>
const base_url = import.meta.env.VITE_BASE_API_URL;
const props = defineProps({
  userImg: {
    type: String,
    required: true
  }
})
</script>
<style lang=""></style>
