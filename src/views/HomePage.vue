<template>
  <PageLayoutWithPlayer>
    <template #content >
        <TopArtist/>
         <TopAlbum/>
        <TopMusic/>
        <WeatherRecommendation/>

  </template>
  </PageLayoutWithPlayer>
</template>

<script setup>
  import WeatherRecommendation from '@/components/home/WeatherRecommendation.vue'
  import TopArtist from '@/components/home/TopArtist.vue';
  import TopAlbum from '@/components/home/TopAlbum.vue';
  import TopMusic from '@/components/home/TopMusic.vue';


</script>