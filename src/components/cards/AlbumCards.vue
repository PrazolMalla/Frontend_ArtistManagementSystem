<template>
    <div class="flex gap-4 flex-wrap flex-grow justify-center ">
    <AlbumCard v-for="x in albumData" class="p-5" :albumDetail="x" linkto="album"/>
    </div>
</template>


<script>
import AlbumCard from '@/components/cards/AlbumCard.vue'
import { mapState } from 'vuex';
export default{
    components:{
        AlbumCard
    },
        computed:{
            ...mapState(['albumData']),
            
        },
        mounted(){
            this.$store.dispatch('setAlbumData')
        },
}

</script>