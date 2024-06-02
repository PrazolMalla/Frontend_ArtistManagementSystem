<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
       <MusicTiles/>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import  MusicTiles from '../components/Tiles/MusicTiles.vue'
export default{

  components:{
    MusicTiles
  }

}

</script>