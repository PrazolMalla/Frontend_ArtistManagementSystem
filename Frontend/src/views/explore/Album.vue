<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
       <AlbumTiles/>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import  AlbumTiles from '@/components/cards/AlbumCards.vue'
export default{

  components:{
    AlbumTiles
  }

}

</script>