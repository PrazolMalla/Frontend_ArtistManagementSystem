<template>
  <PageLayout id="display-flex">
    <template #content>
       <ArtistTiles/>
    </template>
  </PageLayout>
</template>

<script>
import  ArtistTiles from '../components/Tiles/ArtistTiles.vue'
export default{

  components:{
    ArtistTiles
  }

}

</script>