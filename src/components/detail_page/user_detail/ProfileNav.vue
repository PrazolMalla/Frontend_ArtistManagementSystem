<template>
  <div
    class="absolute top-44 w-[80vw] h-12 md:w-[60vw] bg-light-primary-color lg:top-[22rem] lg:h-20 lg:w-[77vw] flex gap-5 justify-center items-center lg:justify-start lg:pl-64"
    :style="{
      backgroundColor: `${user?.theme?.darkPrimaryColor}`
    }"
  >
    <RouterLink :to="'/artist/' + user.id" class="flex flex-row items-center text-sm">
      <p
        class="text-sm text-primary-text-color hover:text-secondary-color md:text-xl"
        :style="{
          color: `${user?.theme?.secondaryColor}`
        }"
      >
        Home
      </p>
    </RouterLink>
    <RouterLink :to="'/artist/' + user.id + '/music/'" class="flex flex-row items-center text-sm">
      <p
        class="text-sm text-primary-text-color hover:text-secondary-color md:text-xl"
        :style="{
          color: `${user?.theme?.secondaryColor}`
        }"
      >
        Music
      </p>
    </RouterLink>
    <RouterLink :to="'/artist/' + user.id + '/album/'" class="flex flex-row items-center text-sm">
      <p
        class="text-sm text-primary-text-color hover:text-secondary-color md:text-xl"
        :style="{
          color: `${user?.theme?.secondaryColor}`
        }"
      >
        Albums
      </p>
    </RouterLink>
  </div>
</template>
<script setup>
import { onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  console.log('Component mounted with user:', props.user)
})

watch(
  () => props.user,
  (newTheme) => {
    console.log('Theme changed:', newTheme)
  },
  { deep: true }
)
</script>
<style lang="">
    
</style>