<template>

    <div class="tile-container  flex flex-col justify-center max-w-56 p-0 overflow-hidden rounded-lg   gap-1 shadow-sm shadow-slate-500 hover:shadow-md hover:shadow-slate-600  cursor-pointer">
        <RouterLink :to="'/music/'+ musicDetail.id" >
            
        <img src="https://source.unsplash.com/800x800/?portrait" alt="" class="w-full rounded-md hover:cursor-pointer ">
        <div class="p-3 text-center"> {{ musicDetail.name }}</div>

            <div class="p-3  text-sm text-center text-slate-600"> {{ musicDetail.description }}</div>

        </RouterLink>
        <div class="rounded-full w-8 bg-secondary-color p-1 mx-auto" @click="playMusic">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-6.586-3.384A1 1 0 007 8.618v6.764a1 1 0 001.166.986l6.586-3.384a1 1 0 000-1.804z" />
                    </svg>
        
        </div>
        </div>
</template>
<script>
// import imgSrc from '../../assets/default_album.png' 
export default{
    props:{
        musicDetail: Object,
    },
    methods:{
        playMusic(){
                this.$store.dispatch('setMusicPlayer', this.musicDetail)
                console.log(this.musicDetail)
        }
    }

}
</script>