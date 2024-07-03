<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
       <AlbumTiles/>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import AlbumCard from '@/components/cards/AlbumCard.vue'
import axios from 'axios';
const base_url  = import.meta.env.VITE_BASE_API_URL;

export default{
   components:{
    AlbumCard
  },
    data(){
      return {
         albumData :[]
      }
    },mounted() {
    this.fetchAlbumData();
  },

      methods: {
    fetchAlbumData() {
      axios.get(`${base_url}/api/album/get/`)
        .then(response => {
          this.albumData = response.data;
        })
        .catch(error => {
          console.error('Error fetching Album data:', error);
        });
    }
  }

}

</script>