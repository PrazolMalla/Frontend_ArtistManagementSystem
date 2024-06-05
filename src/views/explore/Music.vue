<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
    <div class="flex gap-4 flex-wrap flex-grow justify-center ">
          <MusicCard v-for="x in musicData" class="p-5" :musicData="x" linkto="music"/>
    </div>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import MusicCard from '@/components/cards/MusicCard.vue'
import { mapState } from 'vuex';
export default{
   components:{
    MusicCard
  },
    data(){
      return {
         musicData :[
            { id: 1, name: 'Music 1', album: '1', artist: '1' },
            { id: 2, name: 'Music 2', album: '1', artist: '2' },
            { id: 3, name: 'Music 3', album: '1', artist: '3' },
            { id: 4, name: 'Music 4', album: '1', artist: '4' },
            { id: 5, name: 'Music 5', album: '1', artist: '5' },
            { id: 6, name: 'Music 6', album: '1', artist: '6' }
        ]
      }
    }
}

</script>