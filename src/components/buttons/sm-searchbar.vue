<template>
  <form @submit.prevent="action"
    class="flex w-[20vw] h-7 my-4 justify-between border border-primary-text-color rounded-lg">
    <input type="text"
      class="text-xs border-none w-full p-2 bg-transparent focus:outline-none text-xsm text-primary-text-color placeholder:text-primary-text-color flex"
      :placeholder="text" v-model="searchText" />
    <!-- <v-icon name="md-search" fill="#302f31" scale="1" class="cursor-pointer hover:text-gray-950 p-1" /> -->
  </form>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['text'])
const searchText = ref('')
const emit = defineEmits(['action'])
function action() {
  emit('action', searchText.value)
}
</script>