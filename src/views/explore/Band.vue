<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
       <AlbumTiles/>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import  BandTiles from '@/components/cards/BandCards.vue'
export default{

  components:{
    BandTiles
  }

}

</script>