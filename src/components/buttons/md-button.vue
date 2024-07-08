<template>
    <button  class="px-4 py-2 text-sm  bg-secondary-color text-dark-primary-color rounded-lg border-2 hover:bg-transparent hover:border-secondary-color hover:text-secondary-color" @click="action">{{ text }}</button>
</template>
<script setup>
    
defineProps(['text'])

const emit = defineEmits(['action'])
function action() {
  emit('action')
}
</script>