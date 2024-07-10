<template>
    <div class="relative inline-block cursor-pointer text-sm" @mouseover="showFullText" @mouseleave="hideFullText">
        <span>{{ displayedText }}</span>
        <div v-if="isHovered"
            class="absolute left-0 top-full mt-1 bg-light-primary-color border border-gray-300 p-2 z-10 text-xs">
            {{ text }}
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    }
});

const isHovered = ref(false);

const displayedText = computed(() => {
    return props.text.length > props.length
        ? props.text.substring(0, props.length) + "..."
        : props.text;
});

const showFullText = () => {
    if (props.text.length > props.length) isHovered.value = true;
};

const hideFullText = () => {
    isHovered.value = false;
};
</script>
