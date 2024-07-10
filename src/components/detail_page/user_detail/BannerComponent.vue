<template lang="">
    <div class="relative w-full mt-5 lg:h-72 md:h-58  bg-white overflow-hidden rounded-t-lg ">
        <img :src="`${base_url}${userBanner}`" style=" backgroundSize: 'cover'" class="flex justify-center h-full sm:h-auto  w-full"/>
    </div>
</template>
<script setup>
const base_url = import.meta.env.VITE_BASE_API_URL;
const props = defineProps({
  userBanner: {
    type: String,
    required: true
  }
})

</script>
<style lang=""></style>
