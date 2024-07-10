<template>
    <div v-if="state == 'danger'" class=" flex cursor-pointer rounded-full border p-2 hover:border-secondary-color "
        @click="action">
        <v-icon :name="name" fill="red" scale="1"></v-icon>

    </div>

    <div v-else class=" flex cursor-pointer border p-2 rounded-full hover:border-green-700" @click="action">
        <v-icon :name="name" fill="#00b166" scale="1"></v-icon>
    </div>
</template>
<script setup>

defineProps(['name', 'state'])

const emit = defineEmits(['action'])
function action() {
    emit('action')
}
</script>