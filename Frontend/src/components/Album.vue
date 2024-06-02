<template>
  <PageLayout id="display-flex">
    <template #content>
       <AlbumTiles/>
    </template>
  </PageLayout>
</template>

<script>
import  AlbumTiles from '../components/Tiles/AlbumTiles.vue'
export default{

  components:{
    AlbumTiles
  }

}

</script>