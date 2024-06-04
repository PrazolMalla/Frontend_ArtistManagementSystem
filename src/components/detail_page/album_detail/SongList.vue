<template lang="">
  <div>
    <div class="w-[50vw] h-[24rem] flex flex-col gap-2 items-start">
      <h1 class="text-2xl font-semibold mb-4 ml-4">Songs</h1>
      <div class="flex justify-between w-40 p-4">
        <p class="text-lg">{{ songs.length }} Songs</p>
        <p class="text-lg">2018</p>
      </div>

      <div class="overflow-y-scroll w-[40vw] h-[40vh]">
        <div
          class="bg-transparent w-[30vw] h-12 rounded-lg px-4 text-primary-text-color first-letter mt-4 hover:bg-secondary-color hover:text-dark-primary-color cursor-pointer"
          v-for="(item, index) in songs"
          :key="index"
        >
          <router-link :to="`/music/${item.id}`">
            <div class="flex items-center justify-between py-2">
              <div class="flex gap-4 items-center justify-center">
                <p class="font-semibold text-xl">{{ index + 1 }}</p>
                <p class="text-lg text-wrap">{{ item.name }}</p>
              </div>
              <p>{{ item.duration }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const songs = ref([
  { id: '1', name: 'Let me love you', duration: '3:23' },
  { id: '2', name: 'Hello Its me', duration: '2:02' },
  { id: '3', name: 'Hawa jastai malai', duration: '3:20' },
  { id: '4', name: 'Timro Pratikshya', duration: '3:30' },
  { id: '5', name: 'Komal tyo timro', duration: '3:21' }
])
</script>
<style lang=""></style>
