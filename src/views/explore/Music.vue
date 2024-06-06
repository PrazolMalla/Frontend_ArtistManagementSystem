<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
      <div class="flex gap-4 flex-wrap flex-grow justify-center">
        <MusicCard v-for="music in musicData" :key="music.id" class="p-5" :musicData="music" linkto="music"/>
      </div>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import MusicCard from '@/components/cards/MusicCard.vue'
import axios from 'axios'

export default {
  components: {
    MusicCard
  },
  data() {
    return {
      musicData: []
    }
  },
  mounted() {
    this.fetchMusicData();
  },
  methods: {
    fetchMusicData() {
      axios.get('http://127.0.0.1:8000/api/music/get/')
        .then(response => {
          this.musicData = response.data;
        })
        .catch(error => {
          console.error('Error fetching music data:', error);
        });
    }
  }
}
</script>
