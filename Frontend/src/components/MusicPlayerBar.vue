<template lang="">
    <div class="z-50 fixed lg:w-[73vw] md:w-[73vw] md:ml-[26vw] lg:ml-[23vw] bottom-16 sm:bottom-5 sm:border sm:rounded-lg sm:h-16 bg-light-primary-color h-16 w-full flex px-8 justify-between items-center shadow-lg">
        <div class="flex items-center gap-4 sm:gap-8 text-white">
            <img src="https://source.unsplash.com/800x800/?portrait" alt="Album Cover" class="h-12 w-12 rounded-md">
            <div class="flex flex-col">
                <span v-if="playerData" class="font-semibold">{{ playerData.name }}</span>
                <span class="text-sm">{{ playerData.description }}</span>
            </div>
        </div>
        <div class="flex items-center gap-4 sm:gap-8">
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
        <div class="flex items-center gap-4 sm:gap-8">
            <input type="range" min="0" max="100" v-model="playerData.volume" class="w-24 sm:w-48 h-1 bg-gray-400 rounded-lg appearance-none cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5l-7 7m0 0l7 7m-7-7h18" />
            </svg>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default{
    
     computed:{
            ...mapState(['playerData']),
            
        },
        mounted(){
            this.playMusic
        },
        method:{
            playMusic(){
             this.$store.dispatch('setMusicPlayer', this.musicDetail)
            }
        }


}
</script>
<style lang="">
    
</style>