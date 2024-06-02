<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
       <AlbumTiles/>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import  BandTiles from '../components/Tiles/BandTiles.vue'
import PageLayoutWithPlayer from './PageLayoutWithPlayer.vue';
export default{

  components:{
    BandTiles
  }

}

</script>