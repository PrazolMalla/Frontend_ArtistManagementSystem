<template>
    <div class="flex gap-4 flex-wrap flex-grow justify-center ">
    <ArtistCard v-for="x in artistData" class="p-5" :artistDetail="x"/>

    </div>

</template>


<script>
import ArtistCard from '@/components/cards/ArtistCard.vue'
import { mapState } from 'vuex';
export default{
    components:{
        ArtistCard
    },
        computed:{
            ...mapState(['artistData']),
            
        },
        mounted(){
            this.$store.dispatch('setArtistData')
        },
}

</script>