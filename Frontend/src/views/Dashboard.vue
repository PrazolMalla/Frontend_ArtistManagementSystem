<template>
 <div class="flex flex-row bg-dark-primary-color">
    <div class="flex flex-col">
        <Navbar/>
        <div class="flex flex-wrap justify-between  gap-6 mx-7 my-4">
        <NewArtist/>
        <NewSong/>
        <NewBand/>
        <NewAlbum/>
    </div>
    </div>
    
  </div>
    
</template>
<script setup>
    import NewArtist from '../components/NewArtist.vue'
    import NewBand from '../components/NewBand.vue'
    import NewSong from '../components/NewSong.vue'
    import NewAlbum from '../components/NewAlbum.vue'
    import Navbar from '../components/Navbar.vue';
</script>