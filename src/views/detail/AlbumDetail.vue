<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
       <DetailCard  info="Album" :id="id"/>


       <MusicTiles/>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import  DetailCard from '@/components/cards/card_item/DetailCard.vue'
import MusicTiles from '@/components/cards/MusicCards.vue';
export default{
    data(){
        return{
            id : this.$route.params.id
        }
    },
  components:{
    DetailCard,
     MusicTiles
  }

}

</script>