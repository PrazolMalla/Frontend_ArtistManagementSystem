<template>
  <div class=" bg-light-primary-color p-5 rounded-md text-primary-text-color flex flex-col justify-start flex-wrap"
    :style="{
      backgroundColor: hexWithOpacity(`${userData?.theme?.darkPrimaryColor}`, 0.5),
      boxShadow: userData.theme ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
      backdropFilter: userData.theme ? 'blur(4.9px)' : 'none',
      color: `${userData?.theme?.secondaryColor}`
    }">
    <p class="text-sm lg:text-lg font-semibold">{{ userData.firstname }} {{ userData.lastname }}</p>
    <p class="mb-1 text-sm lg:text-xs opacity-50"> @{{ userData.username }}</p>
    <p class="mt-1 text-sm lg:text-xs font-semibold opacity-70">
      <span v-if="userData.total_music">{{ userData.total_music }} music<span v-if="userData.total_music > 0">s</span>
      </span>
      <span v-if="userData.total_album"> | {{ userData.total_album }} album<span
          v-if="userData.total_album > 0">s</span>
      </span>
    </p>
    <p v-if="userData?.bio" class="mt-1 text-sm lg:text-sm opacity-50">Bio:
      <TextTruncate :text="userData.bio" length="50" />
    </p>
    <p class="mt-1 text-sm lg:text-sm">Country: {{ userData.country }}</p>

  </div>
</template>

<script setup>
import TextTruncate from '@/components/buttons/TextTruncate.vue'

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})

function hexWithOpacity(hex, opacity) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase()
  return `${hex}${alpha}`
}
</script>

<style scoped></style>
