<template lang="">
  <div
    class="album-card transform hover:scale-105 transition-transform duration-300 bg-light-primary-color shadow-md p-2 rounded-lg flex flex-col gap-4 items-center"
  >
    <RouterLink :to="'album/' + albumDetail.id" class="flex justify-start lg:w-[15vw] sm:w-[35vw] w-[80vw]">
      <div class="z-20">
        <img v-if="albumDetail.img_profile" :src="`http://127.0.0.1:8000${albumDetail.img_profile}`" alt="" class="w-[10rem]" />
        <img else :src="``" alt="" class="w-[10rem]" />
        
      </div>
      <div class="relative z-10 lg:ml-[-6rem] lg:mt-[-1.5rem] mt-[-0.75rem] ml-[-3.5rem]">
        <div
          class="absolute lg:w-12 lg:h-12 rounded-full bg-red-50 lg:top-[4.5rem] lg:left-[4.75rem] lg:flex hidden overflow-hidden"
        >
          <img :src="`http://127.0.0.1:8000${albumDetail.img_profile}`" alt="" />
        </div>
        <img src="../../assets/images/musiccassette.png" alt="" class="w-[12.5rem]" />
      </div>
    </RouterLink>

    <div class="flex justify-between w-full items-center">
      <div class="flex flex-col">
        <RouterLink
          :to="'/music/' + albumDetail.id"
          class="text-md font-semibold text-center hover:underline"
          >{{ albumDetail.name }}</RouterLink
        >
        <RouterLink
          :to="'/artist/' + albumDetail.artist"
          class="text-sm text-gray-600 hover:underline"
          >{{ albumDetail.artist }}</RouterLink
        >
      </div>

      <v-icon name="md-playcircleoutline-round" fill="#302f31" scale="1.5" class="cursor-pointer" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    albumDetail: Object,
    linkto: ''
  }
}
</script>
<style lang=""></style>
