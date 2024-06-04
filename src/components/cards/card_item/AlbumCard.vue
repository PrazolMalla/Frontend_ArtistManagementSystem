<template lang="">
  <RouterLink
    :to="'/album/' + cardDetail.id"
    class="ml-2 lg:ml-5 w-52 h-66 hover:bg-secondary-color rounded-2xl flex flex-col justify-start items-start p-6 gap-1 hover:transition-all cursor-pointer hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#FF516D,0_0_4px_#FF516D,0_0_15px_#FF516D] hover:border-2"
  >
    <img src="https://source.unsplash.com/800x800/?portrait" class="w-40 h-40 rounded-lg" />
    <div class="h-14 overflow-hidden">
      <h1 class="text-primary-text-color font-semibold text-lg">{{ cardDetail.name }}</h1>
      <p class="text-primary-text-color">{{ cardDetail.description }}</p>
    </div>
  </RouterLink>
</template>
<script>
export default {
  props: {
    cardDetail: Object,
    linkto: ''
  }
}
</script>
<style lang=""></style>
