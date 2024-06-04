<template>
  <PageLayoutWithPlayer>
    <template #content >
        <TopArtist/>
         <TopAlbum/>

  </template>
  </PageLayoutWithPlayer>
</template>

<script setup>
 import TopArtist from '@/components/TopArtist.vue';
  import TopAlbum from '@/components/TopAlbum.vue'


</script>