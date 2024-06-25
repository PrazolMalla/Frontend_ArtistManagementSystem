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
const base_url  = import.meta.env.VITE_BASE_API_URL;

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
        .get(`${base_url}/api/music/get/`)
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
