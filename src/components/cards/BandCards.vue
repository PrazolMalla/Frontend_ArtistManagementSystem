<template>
    <div class="flex gap-4 flex-wrap flex-grow justify-center ">
    <BandBandCardBandCardTile v-for="x in bandData" class="p-5" :bandDetail="x"/>

    </div>

</template>


<script>
import BandCard from '@/components/cards/BandCard.vue'
import { mapState } from 'vuex';
export default{
    components:{
        BandCard
    },
        computed:{
            ...mapState(['bandData']),
            
        },
        mounted(){
            this.$store.dispatch('setBandData')
        },
}

</script>