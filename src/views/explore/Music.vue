<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
      <div class="mt-4 flex gap-2 flex-wrap justify-start w-[80vw] ml-[-2rem]">
        <MusicCard v-for="music in musicData" :key="music.id" :musicData="music" linkto="music" />
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
    this.fetchMusicData()
  },
  methods: {
    fetchMusicData() {
      axios
        .get('http://127.0.0.1:8000/api/music/get/')
        .then((response) => {
          this.musicData = response.data
        })
        .catch((error) => {
          console.error('Error fetching music data:', error)
        })
    }
  }
}
</script>
