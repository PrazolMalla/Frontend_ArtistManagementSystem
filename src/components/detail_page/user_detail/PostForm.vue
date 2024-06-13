<template lang="">
  <div
    class="mt-10 w-[80vw] h-24 bg-light-primary-color border-none px-5 pt-2 md:w-[22rem] md:h-[7rem] md:mt-20 lg:mt-24 lg:w-[50vw] lg:h-[10rem] lg:p-6 rounded-md"
    :style="{
      backgroundColor: hexWithOpacity(`${user?.theme?.darkPrimaryColor}`, 0.5),
      boxShadow: user.theme ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
      backdropFilter: user.theme ? 'blur(4.9px)' : 'none',
      color: `${user?.theme?.secondaryColor}`
    }"
  >
    <form>
      <h1 class="font-semibold lg:text-lg">POST</h1>
      <input
        type="text"
        placeholder="Write Something ...."
        class="bg-transparent w-[70vw] focus:outline-none border-none lg:text-lg placeholder:opacity-90"
      />
      <button
        type="submit"
        class="mt-2 bg-secondary-color w-16 h-6 text-dark-primary-color rounded-sm text-sm font-semibold lg:w-24 lg:h-10 lg:text-lg lg:mt-4 hover:border-2 hover:bg-transparent hover:border-secondary-color hover:text-secondary-color"
      >
        Share
      </button>
    </form>
  </div>
</template>
<script setup>
const props = defineProps({
  user: {
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

<style lang=""></style>
