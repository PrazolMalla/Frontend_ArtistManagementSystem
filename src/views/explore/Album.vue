<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
    <div class="flex gap-4 flex-wrap flex-grow justify-center ">
          <AlbumCard v-for="x in albumData" class="p-5" :albumDetail="x" linkto="album"/>
        </div>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import AlbumCard from '@/components/cards/AlbumCard.vue'
import axios from 'axios';
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
      axios.get('http://127.0.0.1:8000/api/album/get/')
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