<template>
  <div
    class="absolute top-44 w-[80vw] h-12 md:w-[60vw] bg-light-primary-color lg:top-[22rem] lg:h-20 lg:w-[77vw] flex gap-3 pl-24 justify-center items-center lg:justify-start lg:pl-52"
    :style="{
      backgroundColor: `${user?.theme?.darkPrimaryColor}`
    }"
  >
    <router-link to="" class="flex flex-row items-center text-sm">
      <p
        class="text-sm text-primary-text-color hover:text-secondary-color md:text-xl"
        :style="{
          color: `${user?.theme?.secondaryColor}`
        }"
      >
        Home
      </p>
    </router-link>
    <router-link to="" class="flex flex-row items-center text-sm">
      <p
        class="text-sm text-primary-text-color hover:text-secondary-color md:text-xl"
        :style="{
          color: `${user?.theme?.secondaryColor}`
        }"
      >
        Music
      </p>
    </router-link>
    <router-link to="" class="flex flex-row items-center text-sm">
      <p
        class="text-sm text-primary-text-color hover:text-secondary-color md:text-xl"
        :style="{
          color: `${user?.theme?.secondaryColor}`
        }"
      >
        Albums
      </p>
    </router-link>
  </div>
</template>

<script setup>
import { defineProps, onMounted, watch } from 'vue'

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

<style lang=""></style>
