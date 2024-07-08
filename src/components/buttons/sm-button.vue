<template>
    <button  class="px-2 py-1 text-xs bg-secondary-color text-dark-primary-color rounded-lg border-2 hover:bg-transparent hover:border-secondary-color hover:text-secondary-color" @click="action">{{ text }}</button>
</template>
<script setup>
    
defineProps(['text'])

const emit = defineEmits(['action'])
function action() {
  emit('action')
}
</script>