<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
       <ArtistTiles/>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import  ArtistTiles from '@/components/cards/ArtistCards.vue'
export default{

  components:{
    ArtistTiles
  }

}

</script>