<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
    <div class="flex gap-4 flex-wrap flex-grow justify-center ">
          <ArtistCard v-for="x in artistData" class="p-5" :artistData="x" linkto="artist"/>
    </div>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import ArtistCard from '@/components/cards/ArtistCard.vue'
import { mapState } from 'vuex';
export default{
  components:{
    ArtistCard
  },
    data(){
      return {
         artistData :[
  { id: 1, name: 'Taylor Swift', username:'taylor' },
  { id: 2, name: 'Ed Sheeran',username:'taylor'  },
  { id: 3, name: 'Beyoncé',username:'taylor'   },
  { id: 4, name: 'Drake',username:'taylor'   },
  { id: 5, name: 'Ariana Grande',username:'taylor'   },
  { id: 6, name: 'Bruno Mars',username:'taylor'   }
]
      }
    }

}

</script>