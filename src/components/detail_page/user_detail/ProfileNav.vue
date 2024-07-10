<template>
  <div class="realtive  bg-light-primary-color flex gap-3 justify-center sm:justify-end items-center lg:pl-64 text-md font-semibold
        text-primary-text-color rounded-b-lg " :style="{
          backgroundColor: `${user?.theme?.darkPrimaryColor}`,
          color: `${user?.theme?.secondaryColor}`
        }">
    <RouterLink :to="'/artist/' + user.id" class=" p-3 ">
      Home
    </RouterLink>
    <RouterLink :to="'/artist/' + user.id + '/music/'" class=" p-3  ">
      Music
    </RouterLink>
    <RouterLink :to="'/artist/' + user.id + '/album/'" class=" p-3  ">
      Albums
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

<style lang=""></style>
