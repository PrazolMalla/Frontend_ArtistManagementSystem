<template>
  <PageLayoutWithPlayer>
    <template #content >
        <TopArtist/>
         <TopAlbum/>
        <TopMusic/>

  </template>
  </PageLayoutWithPlayer>
</template>

<script setup>
 import TopArtist from '@/components/home/TopArtist.vue';
  import TopAlbum from '@/components/home/TopAlbum.vue';
import    TopMusic from '@/components/home/TopMusic.vue';


</script>