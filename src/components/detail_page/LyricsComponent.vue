<template lang="">
  <div>
    <div class=" h-[24rem] flex flex-col gap-2 items-start ">
        <div v-if="description">
          <h1 class="text-md font-semibold  mb">Description</h1>
          <TextTruncate :text="description" class="text-xs"  length="100"/>
        </div>
      
        <h1 class="text-md font-semibold  my-3" >Lyrics</h1>
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
import TextTruncate from '@/components/buttons/TextTruncate.vue'
import { ref } from 'vue'

const props = defineProps({
  musicLyrics: {
    type: String,
    // required: true
  },
  description: {
    type: String
  }
})
</script>
<style lang=""></style>
