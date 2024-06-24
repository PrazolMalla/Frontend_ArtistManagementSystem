<template>
  <div
    class="mt-5 w-[80vw] h-40 bg-light-primary-color p-5 md:w-56 md:h-40 md:mt-20 lg:mt-24 lg:w-[30vw] lg:p-6 rounded-md sm:mt-10 text-primary-text-color"
    :style="{
      backgroundColor: hexWithOpacity(`${userData?.theme?.darkPrimaryColor}`, 0.5),
      boxShadow: userData.theme ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
      backdropFilter: userData.theme ? 'blur(4.9px)' : 'none',
      color: `${userData?.theme?.secondaryColor}`
    }"
  >
    <h1 class="font-semibold lg:text-lg">Introduction</h1>
    <div class="mt-2">
      <p class="text-sm lg:text-lg">Name: {{ userData.firstname }}</p>
      <p class="mt-1 text-sm lg:text-lg">Country: {{ userData.country }}</p>
      <p class="mt-1 text-sm lg:text-lg">Bio: {{ userData.bio }}</p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})

function hexWithOpacity(hex, opacity) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase()
  return `${hex}${alpha}`
}
</script>

<style scoped></style>
