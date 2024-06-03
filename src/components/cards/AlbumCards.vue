<template>
    <div class="flex gap-4 flex-wrap flex-grow justify-center ">
    <AlbumTile v-for="x in albumData" class="p-5" :cardDetail="x" linkto="album"/>

    </div>

</template>


<script>
import AlbumTile from '@/components/cards/card_item/AlbumCard.vue'
import { mapState } from 'vuex';
export default{
    components:{
        AlbumTile
    },
        computed:{
            ...mapState(['albumData']),
            
        },
        mounted(){
            this.$store.dispatch('setAlbumData')
        },
}

</script>