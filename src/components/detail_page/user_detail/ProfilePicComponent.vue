<template lang="">
  <div class="absolute lg:top-64 z-10 sm:w-72 sm:h-72 top-36 md:top-32">
    <img
      :src="`http://127.0.0.1:8000${userImg}`"
      alt=""
      class="lg:w-44 lg:h-44 sm:w-32 sm:h-32 h-20 w-20 border-4 rounded-full mt-4 hover:cursor-pointer border-secondary-color"
    />
  </div>
</template>
<script setup>

const props = defineProps({
  userImg: {
    type: String,
    required: true
  }
})
</script>
<style lang=""></style>
