<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
       <AlbumTiles/>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import  AlbumTiles from '../components/Tiles/AlbumTiles.vue'
import PageLayoutWithPlayer from './PageLayoutWithPlayer.vue';
export default{

  components:{
    AlbumTiles
  }

}

</script>