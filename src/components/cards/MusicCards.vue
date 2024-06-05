<template>
    <div class="flex gap-4 flex-wrap flex-grow justify-center ">
    <MusicCard v-for="x in musicData" class="p-5" :musicDetail="x"/>

    </div>

</template>


<script>
import MusicCard from '@/components/cards/MusicCard-2.vue'
import { mapState } from 'vuex';
export default{
    components:{
        MusicCard
    },
        computed:{
            ...mapState(['musicData']),
            
        },
        mounted(){
            this.$store.dispatch('setMusicData')
        },
}

</script>