<template>
  <PageLayoutWithPlayer>
    <template #content >
        <TopArtist/>
         <TopAlbum/>

  </template>
  </PageLayoutWithPlayer>
</template>

<script setup>
 import TopArtist from '@/components/home/TopArtist.vue';
  import TopAlbum from '@/components/home/TopAlbum.vue'


</script>