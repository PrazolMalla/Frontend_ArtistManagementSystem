<template>
    <div class="flex gap-4 flex-wrap flex-grow justify-center ">
    <AlbumTile v-for="x in bandData" class="p-5" :bandDetail="x"/>

    </div>

</template>


<script>
import BandTile from '../Tile/BandTile.vue'
import { mapState } from 'vuex';
export default{
    components:{
        BandTile
    },
        computed:{
            ...mapState(['bandData']),
            
        },
        mounted(){
            this.$store.dispatch('setBandData')
        },
}

</script>