<template lang="">
  <div>
    <div class=" h-[24rem] flex flex-col gap-2 items-start ">
      <h1 class="text-md font-semibold  mb-4">Lyrics</h1>
      <div class="overflow-y-scroll">
        <pre
          class="lg:w-[45vw] text-justify text-sm w-[90vw] lg:mb-0 mb-40 md:w-[65vw] overflow-scroll"
          >{{ musicLyrics }}
          </pre
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  musicLyrics: {
    type: String,
    // required: true
  }
})
</script>
<style lang=""></style>
