<template>
  <PageLayout id="display-flex">
    <template #content>
       <MusicTiles/>
    </template>
  </PageLayout>
</template>

<script>
import  MusicTiles from '../components/Tiles/MusicTiles.vue'
export default{

  components:{
    MusicTiles
  }

}

</script>