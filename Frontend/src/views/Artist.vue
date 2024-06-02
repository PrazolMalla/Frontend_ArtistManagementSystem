<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
       <ArtistTiles/>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import PageLayoutWithPlayer from '@/views/PageLayoutWithPlayer.vue';
import  ArtistTiles from '../components/Tiles/ArtistTiles.vue'
export default{

  components:{
    ArtistTiles
  }

}

</script>