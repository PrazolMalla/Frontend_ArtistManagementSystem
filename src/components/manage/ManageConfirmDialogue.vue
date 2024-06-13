<template>
  <fieldset
    class="border border-slate-700 rounded-md absolute sm:w-[60vw] ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-40 mt-20"
  >
    <legend class="ml-10">Confirmation Box</legend>
    <v-icon
      name="fa-times"
      fill="#302f31"
      scale="1"
      @click="close"
      class="absolute right-3 cursor-pointer"
    />
    <div class="form-container w-full p-10 h-full flex flex-wrap justify-center gap-5 align-middle">
      <div class="text-center">
        <p class="text-xl">{{ actionQuestion }}</p>
        <p class="text-red-500 text-lg">{{ notes }}</p>
      </div>
      
      <div class="w-full flex justify-center gap-2 align-middle">
        <button
          class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-slate-200 text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
          type="submit"
          @click="confirm"
        >
          {{ actionConfirm }}
        </button>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps(['actionQuestion', 'actionConfirm','notes'])

const emit = defineEmits(['close', 'confirm'])

function close() {
  emit('close')
}

function confirm() {
  emit('confirm')
}
</script>

<style scoped></style>
