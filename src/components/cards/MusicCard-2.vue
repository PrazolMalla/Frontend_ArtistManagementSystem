<template>
  <div
    class="album-card p-2 transform hover:scale-105 transition-transform duration-300 bg-light-primary-color rounded-lg shadow-md o"
  >
    <div class="flex flex-col items-center gap-2">
      <RouterLink :to="'/music/' + musicData.id">
        <img :src="`http://127.0.0.1:8000${musicData.img_profile}`" alt="" class="rounded-lg"
      /></RouterLink>
      <div class="flex justify-between w-full items-center">
        <div class="flex flex-col">
          <RouterLink
            :to="'/music/' + musicData.id"
            class="text-md text-blue-500 font-semibold text-center hover:underline"
            >{{ musicData.name }}</RouterLink
          >

          <div class="flex  flex-col gap-2">
            <RouterLink
              :to="'/artist/' + musicData.artist"
              class="text-sm text-gray-600 hover:underline"
              >{{ musicData.artist_name }}</RouterLink
            >
            

            <RouterLink
              :to="'/album/' + musicData.album"
              class="text-sm text-gray-600 hover:underline"
              >{{ musicData.album_name }}</RouterLink
            >
          </div>
        </div>

        <!-- <v-icon
          name="md-playcircleoutline-round"
          @click="playMusic"
          fill="#302f31"
          scale="1.5"
          class="cursor-pointer"
        /> -->
      </div>
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
<style scoped>
@media (min-width: 768px) {
  .album-card {
    width: calc(33.33% - 1rem);
  }
}

@media (min-width: 1024px) {
  .album-card {
    width: calc(25% - 1rem);
  }
}
</style>
