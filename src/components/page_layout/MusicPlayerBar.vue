<template lang="">
  <div
    :class="{ 'sm:w-[63vw] md:w-[73vw] lg:w-[78vw]': is_ShownPlayer }"
    class=" flex flex-col playerGradient cursor-pointer z-40 sm:ml-[30vw] fixed md:ml-[26vw] lg:ml-[18vw] bottom-16 sm:bottom-5  sm:rounded-lg sm:h-17 h-17 "
  >
    <input v-if="is_ShownPlayer"
      type="range"
      min="0"
      max="100"
      v-model="playerData.volume"
      class="sliderBar w-full hover:h-2 h-1 rounded-full appearance-none cursor-pointer thumb-edit"/>
    <div class="flex px-2 justify-between items-center  py-2">
      <div class="flex items-center gap-1 text-light-primary-color">
        <v-icon v-if="is_ShownPlayer" name="md-playlistplay-round" fill="#f6f3eb" scale="2" class="mt-2 cursor-pointer" />
        <img
          @click="toggleBar"
          :src="playerData.img_src"
          alt="Album Cover"
          class="h-12 w-12 rounded-md"
        />
        <div v-if="is_ShownPlayer" :to="'/music/' + playerData.id" class="flex flex-col flex-wrap">
          <router-link :to="'/music/' + playerData.id" class="font-semibold hover:underline">{{
            playerData.name
          }}</router-link>
          <span class="text-sm">
            <router-link :to="'/album/' + playerData.album" class="font-semibold hover:underline">{{
              playerData.album
            }}</router-link>
            ,
            <router-link
              :to="'/artist/' + playerData.artist"
              class="font-semibold hover:underline"
              >{{ playerData.artist }}</router-link
            >
          </span>
        </div>


        <div v-if="is_ShownPlayer"  class="flex items-center gap-4 sm:gap-8">
            <button @click="prevTrack" class="p-2 rounded-full hover:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="sm:flex hidden h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m7-7l-7 7 7 7" />
                </svg>

            </button>
            <button @click="togglePlayPause" class=" p-2 rounded-full hover:bg-gray-600">
                <svg v-if="playerData.isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m4-6v6" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class=" h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-6.586-3.384A1 1 0 007 8.618v6.764a1 1 0 001.166.986l6.586-3.384a1 1 0 000-1.804z" />
                </svg>
            </button>
            <button @click="nextTrack" class="p-2  sm:flex hidden rounded-full hover:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
            </button>
        
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default{
        data(){
           return{
             is_ShownPlayer: true
           }
        },
     computed:{
            ...mapState(['playerData']),
            
        },
        mounted(){
            console.log("Player MOunted")
            // this.playMusic()
        },
        methods:{
            // playMusic(){
            //  this.$store.dispatch('setMusicPlayer', this.musicDetail)
            // },
            toggleBar(){
                    console.log("CLicked")
                    this.is_ShownPlayer = !this.is_ShownPlayer
            }
        }


}
</script>
<style>
    .bggradient {
        background: linear-gradient(45deg, rgba(255, 81, 109, 0.5), rgba(8, 7, 39, 0.5));    backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>