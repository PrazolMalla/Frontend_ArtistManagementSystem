<template lang="">
  <div class="group ml-2 lg:ml-5 w-40 h-54 hover:bg-secondary-color rounded-2xl flex flex-col justify-start items-start p-3 gap-1 hover:transition-all cursor-pointer hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#FF516D,0_0_4px_#FF516D,0_0_15px_#FF516D] hover:border-2 text-primary-text-color hover:text-dark-primary-color">
    <RouterLink :to="'/music/' + musicData.id">
      <img
        src="../../assets/images/album-cover-design-template-05a138f43b181c728e956968786fdf7d_screen.jpg"
        class="w-32 h-32 rounded-lg"
      />
    </RouterLink>
    <div class="flex justify-between w-full items-center">
      <div class="flex flex-col">
        <RouterLink :to="'/music/' + musicData.id" class="text-md font-semibold text-center">{{ musicData.name }}</RouterLink>

        <RouterLink :to="'/music/'+ musicData.id">
          <img :src="`http://127.0.0.1:8000${musicData.img_profile}`" class="w-32 h-32 rounded-lg" />
        </RouterLink>               

        <RouterLink :to="'/music/'+ musicData.id" class="text-md font-semibold text-center hover:underline">{{ musicData.name }}</RouterLink>
                    
        <RouterLink :to="'/artist/'+ musicData.artist" class="text-sm text-gray-600 hover:underline">{{ musicData.artist }}</RouterLink>
                              
        <RouterLink :to="'/album/'+ musicData.album" class="text-sm text-gray-600 hover:underline">{{ musicData.album }}</RouterLink>

        <RouterLink :to="'/album/' + musicData.album" class="text-sm">{{ musicData.album }}</RouterLink>
      </div>

      <v-icon
        name="md-playcircleoutline-round"
        @click="playMusic"
        fill="#302f31"
        scale="1.5"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    musicData: Object
  },
  methods: {
    playMusic() {
      this.$store.dispatch('setMusicPlayer', this.musicData)
      console.log(this.musicData)
    }
  }
}
</script>
<style lang=""></style>
