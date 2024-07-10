<template>

    <div @click="action"
        class="group flex  z-20 flex-col justify-center  items-center w-5 h-5 rounded-bl-lg top-0 right-0  absolute bg-secondary-color hover:w-full hover:h-full hover:bg-dark-primary-color hover:bg-opacity-80 transform transition-transform duration-900 ">
        <v-icon name="fa-times" scale="0.75"
            class="cursor-pointer fill-dark-primary-color group-hover:scale-105 group-hover:fill-secondary-color" />
    </div>
</template>
<script setup>

defineProps(['index'])

const emit = defineEmits(['action'])
function action() {
    emit('action')
}
</script>