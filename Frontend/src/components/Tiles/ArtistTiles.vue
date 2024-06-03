<template>
    <div class="flex gap-4 flex-wrap flex-grow justify-center ">
    <ArtistTile v-for="x in artistData" class="p-5" :artistDetail="x"/>

    </div>

</template>


<script>
import ArtistTile from '../Tile/ArtistCard.vue'
import { mapState } from 'vuex';
export default{
    components:{
        ArtistTile
    },
        computed:{
            ...mapState(['artistData']),
            
        },
        mounted(){
            this.$store.dispatch('setArtistData')
        },
}

</script>