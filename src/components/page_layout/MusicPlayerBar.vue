<template lang="">
    <div :class="{ 'lg:w-[73vw]': is_ShownPlayer, 'md:w-[73vw]': is_ShownPlayer, }" class="bggradient cursor-pointer z-50 fixed   md:ml-[26vw] lg:ml-[23vw] bottom-16 sm:bottom-5 sm:border sm:rounded-lg sm:h-16  h-16  flex px-2 justify-between items-center shadow-lg">
        <div class="flex items-center gap-4 sm:gap-8 text-white">
            <img @click="toggleBar"  src="https://source.unsplash.com/800x800/?portrait" alt="Album Cover" class="h-12 w-12 rounded-md">
            <router-link v-if="is_ShownPlayer" :to="'/music/' + playerData.id" class=" flex flex-col  flex-wrap hover:underline">
                <span  class="font-semibold">{{ playerData.name }}</span>
                <span class="text-sm">{{ playerData.description }}</span>
            </router-link>
        </div>

         
        <div v-if="is_ShownPlayer" class="sm:flex items-center gap-4 sm:gap-8">
            <input type="range" min="0" max="100" v-model="playerData.volume" class="w-24 sm:w-48 h-1 bg-gray-400 rounded-lg appearance-none cursor-pointer">
        </div>


        <div v-if="is_ShownPlayer"  class="flex items-center gap-4 sm:gap-8">
            <button @click="prevTrack" class="p-2 rounded-full hover:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m7-7l-7 7 7 7" />
                </svg>

            </button>
            <button @click="togglePlayPause" class="p-2 rounded-full hover:bg-gray-600">
                <svg v-if="playerData.isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m4-6v6" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-6.586-3.384A1 1 0 007 8.618v6.764a1 1 0 001.166.986l6.586-3.384a1 1 0 000-1.804z" />
                </svg>
            </button>
            <button @click="nextTrack" class="p-2 rounded-full hover:bg-gray-600">
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