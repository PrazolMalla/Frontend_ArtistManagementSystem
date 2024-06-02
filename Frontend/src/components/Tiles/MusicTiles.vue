<template>
    <div class="flex gap-4 flex-wrap flex-grow justify-center ">
    <MusicTile v-for="x in musicData" class="p-5" :musicDetail="x"/>

    </div>

</template>


<script>
import MusicTile from '../Tile/MusicTile.vue'
import { mapState } from 'vuex';
export default{
    components:{
        MusicTile
    },
        computed:{
            ...mapState(['musicData']),
            
        },
        mounted(){
            this.$store.dispatch('setMusicData')
        },
}

</script>